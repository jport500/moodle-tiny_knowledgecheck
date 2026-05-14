# Changes

## Unreleased

### Dependency bump for mod_knowledgecheck v1.0.1

No picker behaviour change. `mod_knowledgecheck` dependency
bumped from `2026051402` (v1.0.0) to `2026051403` (v1.0.1) so
sites installing the suite cleanly satisfy version-ordering on
plugin install / upgrade. Tiny version itself stays at v1.0.0
since no code changed.

---

## v1.0.0 — Knowledge Check TinyMCE picker (tiny_knowledgecheck)

First stable release. Companion authoring plugin to
`mod_knowledgecheck`: adds a Knowledge Check picker to the
TinyMCE toolbar and Insert menu, inserting the embed token at
the cursor.

### Capabilities

- Toolbar button + Insert-menu item, both opening a picker
  modal that lists the current course's Knowledge Checks.
- Picker rows display the activity name and a "No questions
  yet" badge when applicable.
- Plain-text token insertion at cursor (`{knowledgecheck id=<uuid>}`).
- Pre-baked picker data at editor init via
  `plugininfo::get_plugin_configuration_for_context()` — no
  AJAX per modal open.
- Course-scoped: each editor only lists activities from the
  course it's rendering in.
- Empty-state placeholder when the course has no Knowledge
  Checks yet.
- Null privacy provider.

### Test surface

4 PHPUnit tests / 12 assertions. phpcs clean.

### Documentation

- `README.md` — install and usage overview.
- `docs/MANUAL_SMOKE.md` — picker-specific operator checklist.
- `docs/DECISIONS.md` — four ADR-lite records.

### Out of scope for v1.0; v1.x candidates

- Cross-course KC reuse from the picker.
- AJAX-on-open for very large KC lists.
- Editor-side rendering of inserted tokens as placeholders.

---

## Pre-1.0 release history

### Phase 6b-polish-A (AMD build refresh)

- `amd/build/*.min.js` (+ sourcemaps) are now proper babel-
  transpiled UMD output produced via Moodle's standard
  `grunt amd` pipeline. Source files (`amd/src/*.js`)
  unchanged. No version bump; this is a binary-only change.

### Phase 6b-docs (Documentation pass)

No code changes. Pure documentation work:

- `docs/DECISIONS.md` — four ADR-lite records covering
  picker-specific architectural decisions (course-scoped
  picker, pre-baked init data, plain-text token insertion,
  null privacy provider).
- `docs/MANUAL_SMOKE.md` — operator smoke checklist for
  toolbar button visibility, picker listing, token insertion,
  empty-course state, and course-scoping.
- `README.md` rewritten to standard Moodle plugin shape.

### v1.0 (planned, lands at end of Phase 6b-polish)

Final release. Capability summary:

**Shipped:**
- Toolbar button and Insert-menu item that open a picker
  modal listing the current course's Knowledge Checks.
- Pre-baked picker data at editor init via
  `plugininfo::get_plugin_configuration_for_context()` — no
  AJAX per modal open.
- Plain-text token insertion at cursor: `{knowledgecheck id=<uuid>}`.
- Empty-state placeholder when the course has no Knowledge
  Checks.
- Null privacy provider (no PII stored).

**Out of scope for v1.0; v1.x candidates:**
- Cross-course KC reuse from the picker.
- AJAX-on-open for very large KC lists.
- Editor-side rendering of inserted tokens as placeholders
  (so authors see the embed during editing instead of the
  literal token).

### v0.1.1 — Phase 6a (Privacy null provider)
- `classes/privacy/provider.php` implementing
  `\core_privacy\local\metadata\null_provider`. The TinyMCE picker
  is purely an authoring affordance; the only thing it inserts is
  a filter token, and it stores no personal data of its own.
- Bumped `mod_knowledgecheck` dependency to the v0.6.0 release.

### v0.1.0 — Phase 4 (Initial TinyMCE picker)
- TinyMCE 7 plugin: toolbar button + Insert-menu item that open a Knowledge Check picker modal
- Modal lists the current course's knowledge checks (pre-baked at editor init via `get_plugin_configuration_for_context()`; no AJAX)
- Each row shows the KC name plus a "No questions yet" badge when applicable
- Empty state when the course has no knowledge checks
- Row click inserts `{knowledgecheck id=<uuid>}` at the editor cursor and closes the modal
- Button is shown to anyone with editor access; permission gating is the filter's responsibility at render time (per SPEC §Permissions approximation)
- Depends on `mod_knowledgecheck` >= 2026051303 (Phase 3.5 release)
- phpcs clean, PHPUnit covers the plugininfo configuration shape
