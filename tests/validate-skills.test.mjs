import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, symlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { validateSkill, validateDirectory } from "../scripts/validate-skills.mjs";

const valid = (name = "sample-skill", description = "Use when checking a controlled example.") =>
  `---\nname: ${name}\ndescription: ${JSON.stringify(description)}\n---\n# Sample skill\n\nCheck the authorized fixture and record the result.\n`;

test("accepts matching portable metadata", () => {
  assert.equal(validateSkill(valid(), "sample-skill").name, "sample-skill");
});

const negatives = [
  ["missing frontmatter", "# Missing metadata\n"],
  ["missing description", "---\nname: sample-skill\n---\n# Title\n"],
  ["empty description", valid("sample-skill", " ")],
  ["invalid YAML", "---\nname: [\ndescription: x\n---\n# Title\n"],
  ["duplicate field", "---\nname: sample-skill\nname: sample-skill\ndescription: x\n---\n# Title\n"],
  ["non-string description", "---\nname: sample-skill\ndescription: 123\n---\n# Title\n"],
  ["unapproved tools field", "---\nname: sample-skill\ndescription: x\nallowed-tools: all\n---\n# Title\n"],
  ["uppercase name", valid("Sample-skill")],
  ["consecutive hyphens", valid("sample--skill")],
  ["leading hyphen", valid("-sample-skill")],
  ["too-long name", valid("a".repeat(65))],
  ["too-long description", valid("sample-skill", "a".repeat(1025))],
  ["directory mismatch", valid("other-skill")],
  ["empty body", "---\nname: sample-skill\ndescription: x\n---\n"],
  ["missing body title", "---\nname: sample-skill\ndescription: x\n---\nOnly text\n"],
  ["non-scalar description", valid("sample-skill", "\uD800")],
  ["BOM", "\uFEFF" + valid()],
  ["CRLF", valid().replaceAll("\n", "\r\n")],
];
for (const [name, text] of negatives) {
  test(`rejects ${name}`, () => assert.throws(() => validateSkill(text, "sample-skill")));
}

test("description limit counts Unicode code points", () => {
  assert.equal([...validateSkill(valid("sample-skill", "😀".repeat(1024)), "sample-skill").description].length, 1024);
});

test("collection discovery rejects empty sets, extra files and symlinks", () => {
  const root = mkdtempSync(join(tmpdir(), "skill-validator-"));
  try {
    assert.throws(() => validateDirectory(root));
    const dir = join(root, "sample-skill");
    mkdirSync(dir);
    writeFileSync(join(dir, "SKILL.md"), valid());
    assert.equal(validateDirectory(root).length, 1);
    writeFileSync(join(dir, "SKILL.md"), Buffer.concat([Buffer.from(valid()), Buffer.from([0xff])]));
    assert.throws(() => validateDirectory(root));
    writeFileSync(join(dir, "SKILL.md"), "\uFEFF" + valid());
    assert.throws(() => validateDirectory(root));
    writeFileSync(join(dir, "SKILL.md"), valid());
    writeFileSync(join(dir, "unexpected.txt"), "fixture");
    assert.throws(() => validateDirectory(root));
    rmSync(join(dir, "unexpected.txt"));
    symlinkSync(dir, join(root, "linked-skill"));
    assert.throws(() => validateDirectory(root));
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
