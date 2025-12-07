#!/usr/bin/env node

/**
 * check-api-impact.js
 * 
 * Dieses Script wird automatisch aufgerufen wenn API/Type-Dateien
 * geändert werden. Es listet alle Consumer-Dateien auf.
 * 
 * Installation:
 * 1. Speichere in: scripts/check-api-impact.js
 * 2. Mache ausführbar: chmod +x scripts/check-api-impact.js
 * 3. Konfiguriere in .claude/settings.json (siehe unten)
 */

const { execSync } = require('child_process');
const path = require('path');

const changedFile = process.argv[2];
if (!changedFile) process.exit(0);

const apiPaths = ['src/api/', 'backend/routes/', 'shared/types/'];
const isApiFile = apiPaths.some(p => changedFile.includes(p));

if (isApiFile) {
  console.log('\n⚠️  API/TYPE-DATEI GEÄNDERT!');
  console.log('━'.repeat(50));
  
  const fileName = path.basename(changedFile, '.ts');
  
  try {
    const result = execSync(
      `grep -rn "${fileName}" src/ --include="*.ts" --include="*.tsx" | head -20`,
      { encoding: 'utf-8' }
    );
    
    console.log('📋 Potenzielle Consumer gefunden:\n');
    console.log(result);
    console.log('━'.repeat(50));
    console.log('AKTION ERFORDERLICH: Prüfe und aktualisiere alle Consumer!');
    console.log('Dann: npm run typecheck');
  } catch (e) {
    console.log('✅ Keine Consumer gefunden.');
  }
}
