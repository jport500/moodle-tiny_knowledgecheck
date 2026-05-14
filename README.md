# tiny_knowledgecheck

A TinyMCE 7 plugin for Moodle that adds a "Knowledge Check" picker to
the editor toolbar (and Insert menu). Clicking a knowledge check
inserts its embed token at the cursor; the token is rendered inline
by `filter_knowledgecheck` at view time.

Part of the Knowledge Check plugin suite for LMS Light:

- [`mod_knowledgecheck`](https://github.com/jport500/moodle-mod_knowledgecheck) — activity module (required dependency)
- [`filter_knowledgecheck`](https://github.com/jport500/moodle-filter_knowledgecheck) — text filter that renders embed tokens
- `tiny_knowledgecheck` — this plugin (TinyMCE picker)

## What it does

1. Author edits a Page, Label, Section summary, or other field
   served through Atto / TinyMCE.
2. Clicks the Knowledge Check button on the toolbar (or Insert →
   Knowledge Check in the menu).
3. Picker modal lists all knowledge checks in the current course,
   pre-baked at editor init. Each row shows the activity name plus
   a "No questions yet" badge when the KC has no questions pinned.
4. Author clicks a row. Modal closes; the token
   `{knowledgecheck id=<uuid>}` is inserted at the cursor.

When the content is saved and rendered to learners, `filter_knowledgecheck`
substitutes each token with the embedded knowledge-check view.

## Installation

Place the plugin under
`<moodle-root>/lib/editor/tiny/plugins/knowledgecheck/` and visit
Site administration → Notifications to complete install.

## Configuration

None for v1.0. The picker is on by default for users who can see
the TinyMCE editor.

## Permissions

Per SPEC §Permissions, the button is shown to anyone with editor
access — no explicit capability check. Authors without the
`mod/knowledgecheck:manage` capability won't typically be authoring
embedded content; if they do, the filter's own permission checks at
render time will keep things safe.

## Development

Depends on `mod_knowledgecheck`'s `\mod_knowledgecheck\api::list_for_course()`.
The shared DDEV setup for the three-plugin suite is documented in
`moodle-mod_knowledgecheck/DEV_SETUP.md`.
