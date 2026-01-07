#!/usr/bin/env node

/**
 * User Prompt Analyzer (v5.6.0)
 *
 * UserPromptSubmit Hook Implementation
 *
 * Analyzes user input to provide:
 * - Task type detection (feature/bug/refactor/docs)
 * - Complexity assessment (low/medium/high)
 * - Suggested workflow
 * - Estimated time and agent sequence
 *
 * Features:
 * - Pattern-based task classification
 * - Intelligent workflow suggestions
 * - Context-aware optimization tips
 * - Proactive guidance
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
 * Task type detection patterns
 */
const TASK_PATTERNS = {
  feature: {
    patterns: [
      /add|implement|create|build|new|feature/i,
      /integrate|introduce|establish/i
    ],
    keywords: ['add', 'new', 'create', 'implement', 'feature', 'build'],
    weight: 10
  },

  bug: {
    patterns: [
      /fix|bug|error|problem|issue|broken/i,
      /crash|fail|wrong|incorrect/i
    ],
    keywords: ['fix', 'bug', 'error', 'issue', 'broken', 'crash'],
    weight: 15
  },

  refactor: {
    patterns: [
      /refactor|optimize|improve|restructure|clean/i,
      /enhance|reorganize|consolidate/i
    ],
    keywords: ['refactor', 'optimize', 'improve', 'clean', 'enhance'],
    weight: 8
  },

  api: {
    patterns: [
      /api|endpoint|route|type|interface/i,
      /contract|schema|graphql|openapi/i
    ],
    keywords: ['api', 'endpoint', 'route', 'type', 'interface', 'schema'],
    weight: 12
  },

  documentation: {
    patterns: [
      /document|readme|changelog|docs/i,
      /write docs|update docs/i
    ],
    keywords: ['document', 'readme', 'changelog', 'docs'],
    weight: 5
  },

  release: {
    patterns: [
      /release|publish|deploy|version/i,
      /prepare release|bump version/i
    ],
    keywords: ['release', 'publish', 'deploy', 'version'],
    weight: 7
  },

  issue: {
    patterns: [
      /issue #\d+|process issue|work on issue/i,
      /github issue|close issue/i
    ],
    keywords: ['issue', '#', 'github'],
    weight: 10
  }
};

/**
 * Complexity indicators
 */
const COMPLEXITY_INDICATORS = {
  high: {
    patterns: [
      /architecture|redesign|migration|breaking/i,
      /multiple files|many files|complex/i,
      /significant change|major update/i
    ],
    keywords: ['architecture', 'breaking', 'migration', 'complex', 'major'],
    indicators: ['multiple', 'many', 'all', 'entire', 'system-wide']
  },

  medium: {
    patterns: [
      /update|modify|change|extend/i,
      /several|some|few files/i
    ],
    keywords: ['update', 'modify', 'extend', 'enhance'],
    indicators: ['several', 'some', 'few', 'couple']
  },

  low: {
    patterns: [
      /small|minor|quick|simple/i,
      /one file|single file|typo/i
    ],
    keywords: ['small', 'minor', 'quick', 'simple', 'typo'],
    indicators: ['one', 'single', 'just', 'only']
  }
};

/**
 * Workflow suggestions based on task type
 */
const WORKFLOW_SUGGESTIONS = {
  feature: {
    workflow: '@architect → @builder → @validator → @tester → @scribe',
    agents: ['architect', 'builder', 'validator', 'tester', 'scribe'],
    estimatedTime: {
      low: '2-3 hours',
      medium: '4-8 hours',
      high: '1-2 days'
    },
    tips: [
      'Start with @architect for design decisions',
      'Ensure comprehensive testing',
      'Update documentation'
    ]
  },

  bug: {
    workflow: '@builder → @validator → @tester',
    agents: ['builder', 'validator', 'tester'],
    estimatedTime: {
      low: '30-60 minutes',
      medium: '1-2 hours',
      high: '3-5 hours'
    },
    tips: [
      'Reproduce the bug first',
      'Add regression tests',
      'Verify fix doesn\'t break other functionality'
    ]
  },

  refactor: {
    workflow: '@architect → @builder → @validator → @tester',
    agents: ['architect', 'builder', 'validator', 'tester'],
    estimatedTime: {
      low: '1-2 hours',
      medium: '3-5 hours',
      high: '1-2 days'
    },
    tips: [
      'Ensure no behavior changes',
      'Run full test suite',
      'Consider incremental approach for large refactors'
    ]
  },

  api: {
    workflow: '@architect → @api-guardian → @builder → @validator → @tester → @scribe',
    agents: ['architect', 'api-guardian', 'builder', 'validator', 'tester', 'scribe'],
    estimatedTime: {
      low: '2-3 hours',
      medium: '4-6 hours',
      high: '1-2 days'
    },
    tips: [
      '@api-guardian is MANDATORY for API changes',
      'Check all consumers',
      'Consider backward compatibility',
      'Update API documentation'
    ]
  },

  documentation: {
    workflow: '@scribe',
    agents: ['scribe'],
    estimatedTime: {
      low: '30 minutes',
      medium: '1-2 hours',
      high: '3-4 hours'
    },
    tips: [
      'Include code examples',
      'Update CHANGELOG if needed',
      'Verify all links work'
    ]
  },

  release: {
    workflow: '@scribe → @github-manager',
    agents: ['scribe', 'github-manager'],
    estimatedTime: {
      low: '30 minutes',
      medium: '1 hour',
      high: '2 hours'
    },
    tips: [
      'Verify VERSION file updated',
      'CHANGELOG complete',
      'All tests passing',
      'Get user permission before push'
    ]
  },

  issue: {
    workflow: '@github-manager → [dynamic based on issue type]',
    agents: ['github-manager'],
    estimatedTime: {
      low: 'Variable',
      medium: 'Variable',
      high: 'Variable'
    },
    tips: [
      'Let @github-manager analyze issue first',
      'Workflow will be determined by issue content',
      'PR will reference issue automatically'
    ]
  }
};

/**
 * Analyze user prompt
 */
function analyzeUserPrompt(prompt) {
  const analysis = {
    timestamp: new Date().toISOString(),
    prompt: prompt.slice(0, 100) + (prompt.length > 100 ? '...' : ''),
    taskType: detectTaskType(prompt),
    complexity: assessComplexity(prompt),
    confidence: 0,
    suggestedWorkflow: null,
    estimatedTime: null,
    tips: []
  };

  // Get workflow suggestion
  if (analysis.taskType !== 'unknown') {
    const suggestion = WORKFLOW_SUGGESTIONS[analysis.taskType];

    if (suggestion) {
      analysis.suggestedWorkflow = suggestion.workflow;
      analysis.estimatedTime = suggestion.estimatedTime[analysis.complexity] || 'Variable';
      analysis.tips = suggestion.tips || [];
      analysis.agents = suggestion.agents || [];
    }
  }

  // Calculate confidence
  analysis.confidence = calculateConfidence(prompt, analysis);

  return analysis;
}

/**
 * Detect task type from prompt
 */
function detectTaskType(prompt) {
  const scores = {};

  // Score each task type
  Object.entries(TASK_PATTERNS).forEach(([type, config]) => {
    let score = 0;

    // Check patterns
    config.patterns.forEach(pattern => {
      if (pattern.test(prompt)) {
        score += config.weight;
      }
    });

    // Check keywords
    config.keywords.forEach(keyword => {
      if (prompt.toLowerCase().includes(keyword.toLowerCase())) {
        score += config.weight / 2;
      }
    });

    scores[type] = score;
  });

  // Find highest score
  let maxScore = 0;
  let bestType = 'unknown';

  Object.entries(scores).forEach(([type, score]) => {
    if (score > maxScore) {
      maxScore = score;
      bestType = type;
    }
  });

  // Return unknown if confidence too low
  if (maxScore < 5) {
    return 'unknown';
  }

  return bestType;
}

/**
 * Assess complexity from prompt
 */
function assessComplexity(prompt) {
  const scores = {
    high: 0,
    medium: 0,
    low: 0
  };

  // Score each complexity level
  Object.entries(COMPLEXITY_INDICATORS).forEach(([level, config]) => {
    // Check patterns
    config.patterns.forEach(pattern => {
      if (pattern.test(prompt)) {
        scores[level] += 3;
      }
    });

    // Check keywords
    config.keywords.forEach(keyword => {
      if (prompt.toLowerCase().includes(keyword.toLowerCase())) {
        scores[level] += 2;
      }
    });

    // Check indicators
    config.indicators.forEach(indicator => {
      if (prompt.toLowerCase().includes(indicator.toLowerCase())) {
        scores[level] += 1;
      }
    });
  });

  // Default to medium if no strong signals
  if (scores.high === 0 && scores.medium === 0 && scores.low === 0) {
    return 'medium';
  }

  // Find highest score
  let maxScore = 0;
  let complexity = 'medium';

  Object.entries(scores).forEach(([level, score]) => {
    if (score > maxScore) {
      maxScore = score;
      complexity = level;
    }
  });

  return complexity;
}

/**
 * Calculate confidence score
 */
function calculateConfidence(prompt, analysis) {
  let confidence = 0;

  // Prompt length indicator
  if (prompt.length > 50) confidence += 20;
  if (prompt.length > 100) confidence += 10;

  // Task type detection
  if (analysis.taskType !== 'unknown') confidence += 40;

  // Complexity signals
  if (analysis.complexity !== 'medium') confidence += 15;

  // Specific keywords
  const hasSpecificKeywords = /file|component|function|api|test/i.test(prompt);
  if (hasSpecificKeywords) confidence += 15;

  return Math.min(confidence, 100);
}

/**
 * Display analysis results
 */
function displayAnalysis(analysis) {
  // Only display if confidence is reasonable
  if (analysis.confidence < 40) {
    return; // Don't show low-confidence suggestions
  }

  console.log('');
  console.log(`${colors.cyan}╔════════════════════════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.cyan}║  💡 WORKFLOW SUGGESTION (v5.6.0)                           ║${colors.reset}`);
  console.log(`${colors.cyan}╚════════════════════════════════════════════════════════════╝${colors.reset}`);
  console.log('');

  // Task info
  console.log(`${colors.bright}Task Type:${colors.reset} ${getTaskTypeDisplay(analysis.taskType)}`);
  console.log(`${colors.bright}Complexity:${colors.reset} ${getComplexityDisplay(analysis.complexity)}`);
  console.log(`${colors.bright}Confidence:${colors.reset} ${getConfidenceDisplay(analysis.confidence)}`);
  console.log('');

  // Suggested workflow
  if (analysis.suggestedWorkflow) {
    console.log(`${colors.bright}Suggested Workflow:${colors.reset}`);
    console.log(`  ${colors.cyan}${analysis.suggestedWorkflow}${colors.reset}`);
    console.log('');

    console.log(`${colors.bright}Estimated Time:${colors.reset} ${analysis.estimatedTime}`);
    console.log('');
  }

  // Tips
  if (analysis.tips.length > 0) {
    console.log(`${colors.bright}Tips:${colors.reset}`);
    analysis.tips.forEach(tip => {
      console.log(`  ${colors.gray}•${colors.reset} ${tip}`);
    });
    console.log('');
  }
}

/**
 * Get task type display
 */
function getTaskTypeDisplay(taskType) {
  const colors_map = {
    'feature': colors.green,
    'bug': colors.red,
    'refactor': colors.blue,
    'api': colors.yellow,
    'documentation': colors.cyan,
    'release': colors.bright,
    'issue': colors.yellow,
    'unknown': colors.gray
  };

  const color = colors_map[taskType] || colors.gray;
  return `${color}${taskType.toUpperCase()}${colors.reset}`;
}

/**
 * Get complexity display
 */
function getComplexityDisplay(complexity) {
  const colors_map = {
    'low': colors.green,
    'medium': colors.yellow,
    'high': colors.red
  };

  const color = colors_map[complexity] || colors.gray;
  return `${color}${complexity.toUpperCase()}${colors.reset}`;
}

/**
 * Get confidence display
 */
function getConfidenceDisplay(confidence) {
  let color = colors.gray;

  if (confidence >= 80) {
    color = colors.green;
  } else if (confidence >= 60) {
    color = colors.yellow;
  } else {
    color = colors.red;
  }

  return `${color}${confidence}%${colors.reset}`;
}

/**
 * Main CLI interface
 */
function main() {
  const prompt = process.argv.slice(2).join(' ');

  if (!prompt) {
    console.error('Usage: analyze-prompt.js <user prompt>');
    console.error('');
    console.error('Example: analyze-prompt.js "Add authentication to user API"');
    process.exit(1);
  }

  // Analyze prompt
  const analysis = analyzeUserPrompt(prompt);

  // Display results
  displayAnalysis(analysis);

  // Exit successfully
  process.exit(0);
}

// Export for use by other scripts
module.exports = {
  analyzeUserPrompt,
  displayAnalysis,
  detectTaskType,
  assessComplexity
};

// CLI mode
if (require.main === module) {
  main();
}
