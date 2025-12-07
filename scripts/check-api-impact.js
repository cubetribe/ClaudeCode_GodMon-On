#!/usr/bin/env node

/**
 * check-api-impact.js
 *
 * This script is automatically called when API/Type files
 * are changed. It lists all consumer files.
 *
 * Installation:
 * 1. Save as: scripts/check-api-impact.js
 * 2. Make executable: chmod +x scripts/check-api-impact.js
 * 3. Configure in .claude/settings.json (see below)
 */

const { execSync } = require('child_process');
const path = require('path');

const changedFile = process.argv[2];
if (!changedFile) process.exit(0);

const apiPaths = ['src/api/', 'backend/routes/', 'shared/types/'];
const isApiFile = apiPaths.some(p => changedFile.includes(p));

if (isApiFile) {
  console.log('\n⚠️  API/TYPE FILE CHANGED!');
  console.log('━'.repeat(50));

  const fileName = path.basename(changedFile, '.ts');

  try {
    const result = execSync(
      `grep -rn "${fileName}" src/ --include="*.ts" --include="*.tsx" | head -20`,
      { encoding: 'utf-8' }
    );

    console.log('📋 Potential consumers found:\n');
    console.log(result);
    console.log('━'.repeat(50));
    console.log('ACTION REQUIRED: Review and update all consumers!');
    console.log('Then: npm run typecheck');
  } catch (e) {
    console.log('✅ No consumers found.');
  }
}
