# Changes

## Unreleased

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
