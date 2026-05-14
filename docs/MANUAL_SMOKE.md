# MANUAL_SMOKE — tiny_knowledgecheck

Operator-facing smoke checklist for the Knowledge Check TinyMCE
picker. The full authoring workflow lives in
[`mod_knowledgecheck`'s MANUAL_SMOKE](../../moodle-mod_knowledgecheck/docs/MANUAL_SMOKE.md);
this file covers picker-specific verification.

---

## 1. Toolbar button present

1. Open any TinyMCE editor in a course where the test
   Knowledge Check from
   [`mod_knowledgecheck` MANUAL_SMOKE §1a](../../moodle-mod_knowledgecheck/docs/MANUAL_SMOKE.md)
   exists. A Page resource works.
2. Look at the editor toolbar.

**Verification.** A **Knowledge Check** button is visible.
Hover tooltip reads "Insert Knowledge Check".

3. Open the editor's **Insert** menu.

**Verification.** A **Knowledge Check** menu item appears.

---

## 2. Picker opens and lists the course's KCs

1. Click the toolbar button.

**Verification.** A modal opens titled "Insert a Knowledge
Check". The body lists every Knowledge Check in the current
course. Each row shows the activity name. KCs with no
questions yet are tagged with a **No questions yet** badge.

---

## 3. Token insertion

1. Click any row in the picker.

**Verification.** The modal closes. The editor's content
now contains `{knowledgecheck id=<uuid>}` at the cursor
position, where `<uuid>` is a hyphenated 36-character UUID.
The cursor is positioned immediately after the inserted
token.

---

## 4. Empty-course state

1. Create a new course with no Knowledge Check activities.
2. Open a Page editor in that course.
3. Click the toolbar button.

**Verification.** The modal opens with an empty-state
message ("No knowledge checks in this course yet. Create
one via 'Add an activity or resource.'") and no rows.

---

## 5. Course-scoping

1. In course A, create Knowledge Check "KC-A".
2. In course B, create Knowledge Check "KC-B".
3. In course A, open a Page editor and click the picker.

**Verification.** The picker shows **KC-A only**. KC-B
does not appear, even though the same user has access to
both courses. Cross-course KC reuse is not supported by
design — see [ADR-001](DECISIONS.md).

---

## 6. No editor button in restricted contexts

The button appears for any user who can use the TinyMCE
editor. There is no separate capability check.

**Verification.** A user without `mod/knowledgecheck:manage`
who has editor access (e.g. a non-editing teacher editing a
forum post body) still sees the button. The picker still
works. The downstream filter renders the embed at view time
using its own capability logic.

---

## 7. Backout

Uninstalling the picker is safe — it owns no data. Tokens
already inserted into content via the picker continue to
work because the filter, not the picker, handles rendering.
The picker is purely authoring convenience.
