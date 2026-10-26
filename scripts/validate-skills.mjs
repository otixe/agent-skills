import { readdirSync, readFileSync, lstatSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseDocument } from "yaml";

const fail = (message) => { throw new Error(message); };

export function validateSkill(text, directoryName) {
  if (text.includes("\r") || text.startsWith("\uFEFF")) fail("Use UTF-8 without BOM and LF line endings");
  const match = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) fail("Missing opening/closing YAML frontmatter");
  const document = parseDocument(match[1], { uniqueKeys: true, strict: true });
  if (document.errors.length) fail(`Invalid YAML: ${document.errors[0].message}`);
  const data = document.toJS({ maxAliasCount: 0 });
  if (!data || typeof data !== "object" || Array.isArray(data)) fail("Frontmatter must be a map");
  if (Object.keys(data).sort().join(",") !== "description,name") fail("This portable collection uses only name and description");
  const { name, description } = data;
  if (typeof name !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name)) fail("Invalid lowercase skill name");
  if ([...name].length > 64 || name !== directoryName) fail("Name must match directory and be at most 64 characters");
  if (typeof description !== "string" || !description.isWellFormed() || !description.trim() || [...description].length > 1024) fail("Description must contain 1–1024 Unicode characters");
  if (!match[2].trim() || !/^#\s+\S/m.test(match[2])) fail("A nonempty Markdown instruction body and title are required");
  return { name, description, body: match[2] };
}

export function validateDirectory(directory) {
  const root = resolve(directory);
  const rootStat = lstatSync(root);
  if (rootStat.isSymbolicLink() || !rootStat.isDirectory()) fail("Root must be a real directory");
  const entries = readdirSync(root).sort();
  if (!entries.length) fail("Collection is empty");
  const result = [];
  for (const entry of entries) {
    const skillDir = join(root, entry);
    const stat = lstatSync(skillDir);
    if (stat.isSymbolicLink() || !stat.isDirectory()) fail(`Unexpected non-directory or symlink: ${entry}`);
    const files = readdirSync(skillDir);
    if (files.length !== 1 || files[0] !== "SKILL.md") fail(`Each directory must contain only SKILL.md: ${entry}`);
    const file = join(skillDir, "SKILL.md");
    const fileStat = lstatSync(file);
    if (fileStat.isSymbolicLink() || !fileStat.isFile()) fail(`SKILL.md must be a regular file: ${entry}`);
    try {
      const text = new TextDecoder("utf-8", { fatal: true, ignoreBOM: true }).decode(readFileSync(file));
      result.push(validateSkill(text, basename(skillDir)));
    }
    catch (error) { fail(`${entry}: ${error.message}`); }
  }
  if (new Set(result.map(({ name }) => name)).size !== result.length) fail("Duplicate names");
  return result;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const root = resolve(dirname(fileURLToPath(import.meta.url)), "..", "skills");
    const skills = validateDirectory(process.argv[2] || root);
    console.log(JSON.stringify({ result: "PASS", skills: skills.length, names: skills.map(({ name }) => name) }, null, 2));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
