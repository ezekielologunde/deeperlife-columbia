/**
 * Guards against the single highest-risk regression in the Supabase
 * migration: a mutating admin Server Action that forgot requireAdmin().
 * There's no Postgres RLS anymore to catch this at the database layer, so
 * this check is the substitute. Run via `npm run verify-admin-actions`;
 * exits non-zero (and lists offenders) if it finds one.
 */
import fs from "node:fs";
import path from "node:path";

const ADMIN_ACTIONS_ROOT = path.join(process.cwd(), "src", "app", "admin", "(dashboard)");
const MUTATION_PATTERN = /\bdb\s*\.\s*(insert|update|delete)\s*\(/;
const REQUIRE_ADMIN_PATTERN = /\brequireAdmin\s*\(/;

function findActionFiles(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...findActionFiles(full));
    } else if (entry.isFile() && entry.name === "actions.ts") {
      files.push(full);
    }
  }
  return files;
}

// Splits a file into top-level `export async function name(...) { ... }`
// blocks by brace-counting. Good enough for this codebase's consistently
// flat action-file shape (no nested top-level functions).
function extractFunctions(source: string): { name: string; body: string }[] {
  const results: { name: string; body: string }[] = [];
  const fnStart = /export\s+async\s+function\s+(\w+)\s*\([^)]*\)\s*\{/g;
  let match: RegExpExecArray | null;

  while ((match = fnStart.exec(source))) {
    const name = match[1];
    const bodyStart = match.index + match[0].length - 1; // position of the opening `{`
    let depth = 0;
    let i = bodyStart;
    for (; i < source.length; i++) {
      if (source[i] === "{") depth++;
      else if (source[i] === "}") {
        depth--;
        if (depth === 0) break;
      }
    }
    results.push({ name, body: source.slice(bodyStart, i + 1) });
  }

  return results;
}

function main() {
  const files = findActionFiles(ADMIN_ACTIONS_ROOT);
  const offenders: string[] = [];

  for (const file of files) {
    const source = fs.readFileSync(file, "utf8");
    const relative = path.relative(process.cwd(), file);

    for (const fn of extractFunctions(source)) {
      const mutates = MUTATION_PATTERN.test(fn.body);
      const guarded = REQUIRE_ADMIN_PATTERN.test(fn.body);
      if (mutates && !guarded) {
        offenders.push(`${relative}: ${fn.name}()`);
      }
    }
  }

  if (offenders.length > 0) {
    console.error("Found admin mutations missing requireAdmin():\n");
    for (const offender of offenders) console.error(`  - ${offender}`);
    console.error(`\n${offenders.length} offender(s). Fix before shipping.`);
    process.exitCode = 1;
    return;
  }

  console.log("All admin mutations call requireAdmin(). ✓");
}

main();
