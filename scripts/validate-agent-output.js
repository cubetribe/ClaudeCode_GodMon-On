#!/usr/bin/env node

/**
 * Agent Output Validator (v5.6.0)
 *
 * SubagentStop Hook Implementation
 *
 * Validates that subagent outputs meet quality standards and include
 * all required sections based on agent role.
 *
 * Triggered automatically after every agent completes.
 *
 * Features:
 * - Agent-specific validation rules
 * - Required section checking
 * - Output quality assessment
 * - Actionable feedback for incomplete outputs
 */

const fs = require('fs');
const path = require('path');

// ANSI Colors
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m'
};

/**
 * Agent-specific validation rules
 */
const VALIDATION_RULES = {
  architect: {
    requiredSections: [
      'Architectural Decisions',
      'Implementation Strategy',
      'Risk Assessment',
      'Handoff'
    ],
    requiredPatterns: [
      /##\s+ARCHITECTURAL DECISIONS/i,
      /##\s+IMPLEMENTATION/i,
      /##\s+RISK/i
    ],
    minLength: 1000,
    name: '@architect'
  },

  'api-guardian': {
    requiredSections: [
      'Impact Analysis',
      'Consumer Files',
      'Breaking Changes',
      'Migration Checklist'
    ],
    requiredPatterns: [
      /##\s+IMPACT ANALYSIS/i,
      /##\s+CONSUMER/i,
      /##\s+BREAKING/i
    ],
    minLength: 800,
    name: '@api-guardian'
  },

  builder: {
    requiredSections: [
      'Files Created',
      'Files Modified',
      'Quality Gates',
      'Tests'
    ],
    requiredPatterns: [
      /###\s+Files Created/i,
      /###\s+Files Modified/i,
      /###\s+Quality Gates/i
    ],
    minLength: 500,
    name: '@builder'
  },

  validator: {
    requiredSections: [
      'Code Quality',
      'TypeScript',
      'Tests',
      'Decision'
    ],
    requiredPatterns: [
      /##\s+CODE QUALITY/i,
      /TypeScript/i,
      /Tests/i,
      /(APPROVED|BLOCKED)/i
    ],
    minLength: 400,
    name: '@validator'
  },

  tester: {
    requiredSections: [
      'E2E Tests',
      'Visual Regression',
      'Accessibility',
      'Decision'
    ],
    requiredPatterns: [
      /##\s+E2E/i,
      /Visual/i,
      /A(11y|ccessibility)/i,
      /(APPROVED|BLOCKED)/i
    ],
    minLength: 400,
    name: '@tester'
  },

  scribe: {
    requiredSections: [
      'CHANGELOG',
      'VERSION',
      'Documentation'
    ],
    requiredPatterns: [
      /##\s+CHANGELOG/i,
      /VERSION/i,
      /v?\d+\.\d+\.\d+/
    ],
    minLength: 300,
    name: '@scribe'
  },

  'github-manager': {
    requiredSections: [
      'Action',
      'Result'
    ],
    requiredPatterns: [
      /(Issue|PR|Release)/i,
      /(Created|Updated|Closed)/i
    ],
    minLength: 200,
    name: '@github-manager'
  }
};

/**
 * Validate agent output
 */
function validateAgentOutput(agentName, output) {
  const rules = VALIDATION_RULES[agentName];

  if (!rules) {
    // No validation rules for this agent - pass
    return {
      valid: true,
      agent: agentName,
      message: 'No validation rules defined (pass by default)'
    };
  }

  const validation = {
    valid: true,
    agent: agentName,
    agentDisplay: rules.name,
    issues: [],
    warnings: [],
    stats: {
      length: output.length,
      requiredLength: rules.minLength,
      sectionsFound: 0,
      sectionsRequired: rules.requiredSections.length,
      patternsMatched: 0,
      patternsRequired: rules.requiredPatterns.length
    }
  };

  // Check minimum length
  if (output.length < rules.minLength) {
    validation.valid = false;
    validation.issues.push(
      `Output too short: ${output.length} chars (minimum: ${rules.minLength})`
    );
  }

  // Check required sections
  rules.requiredSections.forEach(section => {
    const regex = new RegExp(section, 'i');
    if (regex.test(output)) {
      validation.stats.sectionsFound++;
    } else {
      validation.warnings.push(`Missing recommended section: "${section}"`);
    }
  });

  // Check required patterns
  rules.requiredPatterns.forEach((pattern, index) => {
    if (pattern.test(output)) {
      validation.stats.patternsMatched++;
    } else {
      validation.valid = false;
      validation.issues.push(
        `Missing required pattern #${index + 1}: ${pattern.toString()}`
      );
    }
  });

  // Calculate completeness score
  const sectionScore = validation.stats.sectionsFound / validation.stats.sectionsRequired;
  const patternScore = validation.stats.patternsMatched / validation.stats.patternsRequired;
  validation.completeness = Math.round(((sectionScore + patternScore) / 2) * 100);

  return validation;
}

/**
 * Display validation results
 */
function displayValidationResults(validation) {
  console.log('');
  console.log(`${colors.cyan}╔════════════════════════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.cyan}║  AGENT OUTPUT VALIDATION (v5.6.0)                          ║${colors.reset}`);
  console.log(`${colors.cyan}╚════════════════════════════════════════════════════════════╝${colors.reset}`);
  console.log('');

  // Agent info
  console.log(`${colors.bright}Agent:${colors.reset} ${validation.agentDisplay || validation.agent}`);
  console.log(`${colors.bright}Status:${colors.reset} ${getValidationStatusDisplay(validation)}`);
  console.log(`${colors.bright}Completeness:${colors.reset} ${getCompletenessDisplay(validation.completeness)}`);
  console.log('');

  // Stats
  console.log(`${colors.cyan}Statistics:${colors.reset}`);
  console.log(`  Output length: ${validation.stats.length} chars (min: ${validation.stats.requiredLength})`);
  console.log(`  Required sections: ${validation.stats.sectionsFound}/${validation.stats.sectionsRequired}`);
  console.log(`  Required patterns: ${validation.stats.patternsMatched}/${validation.stats.patternsRequired}`);
  console.log('');

  // Issues
  if (validation.issues.length > 0) {
    console.log(`${colors.red}Issues (BLOCKING):${colors.reset}`);
    validation.issues.forEach(issue => {
      console.log(`  ${colors.red}✗${colors.reset} ${issue}`);
    });
    console.log('');
  }

  // Warnings
  if (validation.warnings.length > 0) {
    console.log(`${colors.yellow}Warnings:${colors.reset}`);
    validation.warnings.forEach(warning => {
      console.log(`  ${colors.yellow}⚠${colors.reset} ${warning}`);
    });
    console.log('');
  }

  // Recommendation
  if (!validation.valid) {
    console.log(`${colors.yellow}Recommendation:${colors.reset}`);
    console.log(`  Agent output incomplete - consider re-running ${validation.agentDisplay}`);
    console.log(`  or manually verify output quality.`);
    console.log('');
  } else if (validation.completeness < 80) {
    console.log(`${colors.yellow}Note:${colors.reset}`);
    console.log(`  Output passed validation but completeness is below 80%.`);
    console.log(`  Consider improving output quality for better results.`);
    console.log('');
  } else {
    console.log(`${colors.green}✓ Agent output meets quality standards${colors.reset}`);
    console.log('');
  }
}

/**
 * Get validation status display
 */
function getValidationStatusDisplay(validation) {
  if (validation.valid) {
    return `${colors.green}✓ VALID${colors.reset}`;
  } else {
    return `${colors.red}✗ INVALID${colors.reset}`;
  }
}

/**
 * Get completeness display
 */
function getCompletenessDisplay(completeness) {
  let color = colors.gray;

  if (completeness >= 90) {
    color = colors.green;
  } else if (completeness >= 70) {
    color = colors.yellow;
  } else {
    color = colors.red;
  }

  return `${color}${completeness}%${colors.reset}`;
}

/**
 * Load agent output from report file
 */
function loadAgentOutput(reportPath) {
  try {
    if (!fs.existsSync(reportPath)) {
      return null;
    }

    return fs.readFileSync(reportPath, 'utf-8');
  } catch (error) {
    console.error(`${colors.red}Error loading report: ${error.message}${colors.reset}`);
    return null;
  }
}

/**
 * Detect agent name from report filename
 */
function detectAgentName(filename) {
  const agentPatterns = {
    'architect': /architect/i,
    'api-guardian': /api-guardian/i,
    'builder': /builder/i,
    'validator': /validator/i,
    'tester': /tester/i,
    'scribe': /scribe/i,
    'github-manager': /github-manager/i
  };

  for (const [agent, pattern] of Object.entries(agentPatterns)) {
    if (pattern.test(filename)) {
      return agent;
    }
  }

  return null;
}

/**
 * Main CLI interface
 */
function main() {
  const reportPath = process.argv[2];
  const agentName = process.argv[3];

  if (!reportPath) {
    console.error('Usage: validate-agent-output.js <report-file> [agent-name]');
    console.error('');
    console.error('Example: validate-agent-output.js reports/v5.6.0/00-architect-plan.md architect');
    process.exit(1);
  }

  // Load output
  const output = loadAgentOutput(reportPath);

  if (!output) {
    console.error(`${colors.red}Could not load report: ${reportPath}${colors.reset}`);
    process.exit(1);
  }

  // Detect agent name if not provided
  let detectedAgent = agentName;
  if (!detectedAgent) {
    detectedAgent = detectAgentName(path.basename(reportPath));
  }

  if (!detectedAgent) {
    console.error(`${colors.yellow}Warning: Could not detect agent name from filename${colors.reset}`);
    console.error(`${colors.yellow}Validation skipped - provide agent name as second argument${colors.reset}`);
    process.exit(0);
  }

  // Validate
  const validation = validateAgentOutput(detectedAgent, output);

  // Display results
  displayValidationResults(validation);

  // Exit with appropriate code
  // Note: We use exit code 0 even for invalid output to avoid blocking workflows
  // The validation is for information/warning purposes
  process.exit(0);
}

// Export for use by other scripts
module.exports = {
  validateAgentOutput,
  displayValidationResults,
  VALIDATION_RULES
};

// CLI mode
if (require.main === module) {
  main();
}
