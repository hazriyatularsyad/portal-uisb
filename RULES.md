# CLAUDE.md

Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

Saat mengembangkan project, gunakan Context7 untuk mengambil dokumentasi resmi dan terbaru dari library yang digunakan.

Aturan:
1. Gunakan Context7 sebelum mengimplementasikan API atau fitur library.
2. Sesuaikan implementasi dengan versi dependency yang terpasang di package.json.
3. Prioritaskan dokumentasi resmi.
4. Jangan menggunakan API yang sudah deprecated.
5. Jangan mengarang nama fungsi, konfigurasi, atau API.
6. Pertahankan arsitektur dan struktur project existing.
7. Jangan memperbarui dependency tanpa alasan teknis yang jelas.
8. Jika dokumentasi tidak tersedia, jelaskan keterbatasannya.

Gunakan Context7 terutama untuk Next.js, React, TypeScript, Tailwind CSS, Prisma ORM, PostgreSQL, dan Framer Motion.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:

- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:

- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:

- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:

- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:

```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

---

## 5. Grill Before Building
- For any non-trivial change, interview me about the plan until every open decision is resolved. Don't write code with unresolved branches.

## 6. Shared Language
- Keep a GLOSSARY.md of project terms (periode, prodi, submission, dosen, aktivasi). Use these exact terms in code, names, and messages.
- Record hard-to-explain decisions as short ADRs.

## 7. Red-Green-Refactor, One Slice at a Time
- Write a failing test first, make it pass, then refactor.
- Build one thin end-to-end slice at a time. Test behavior through the public interface, not internals.
- Take small steps; the speed of feedback is the speed limit.

## 8. Diagnose Bugs With a Loop
- Reproduce with a failing check → minimise → hypothesise → instrument → fix → add a regression test.
- Never print or log secrets or keys. Redact them.

## 9. Deep Modules, Only at Real Seams
- Prefer small interfaces that hide a lot of behavior.
- Add a seam only when two real implementations exist (e.g. mock vs Supabase). Otherwise rule 2 wins.

## 10. Review Before Commit
- Review the diff on two axes: follows repo standards, and matches the request/spec.
- PR summary: what changed, evidence it works, and whether the merge is reversible.

## 11. Communication
- Be concise and use glossary terms. If I say "wait, what?", re-explain in plain language with the missing context.

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.

## write a command tag above every time you make a code


