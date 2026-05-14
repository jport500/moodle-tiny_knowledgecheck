# Knowledge Check TinyMCE picker (`tiny_knowledgecheck`)

TinyMCE plugin that adds a Knowledge Check picker to the
editor toolbar and Insert menu.

## What it does

When an author edits a Page, Label, or any other content field
served through TinyMCE:

1. The author clicks the Knowledge Check button on the toolbar
   (or **Insert → Knowledge Check** in the menu).
2. A picker modal lists the current course's Knowledge Checks,
   each row showing the activity name and a "No questions yet"
   badge when applicable.
3. The author clicks a row. The modal closes and the embed
   token `{knowledgecheck id=<uuid>}` is inserted at the cursor.

When the content saves and renders to learners,
[`filter_knowledgecheck`](../moodle-filter_knowledgecheck)
replaces each token with the inline embedded view.

This plugin is pure authoring convenience. It owns no data and
no rendering of the embed itself.

## Requirements

- Moodle 5.1 or later
- [`mod_knowledgecheck`](../moodle-mod_knowledgecheck) ≥ 2026051305
- TinyMCE 7 (Moodle 4.3+ ships this by default)

## Install

Standard Moodle plugin install. Drop the repo contents into
`lib/editor/tiny/plugins/knowledgecheck/` under your Moodle root
and run the database upgrade from **Site administration →
Notifications**.

The plugin appears on the TinyMCE toolbar automatically once
installed. Authors don't need to enable anything per-course.

## Configuration

None in v1.0. The picker is available to any user who can edit
TinyMCE content.

## Permissions

The button is visible to anyone with editor access — no
capability check on visibility. Picker rows list Knowledge
Checks in the current course; capability-gating of the rendered
embed happens at filter render time, not at authoring time, so
an author without the Knowledge Check manage capability who
inserts a token still produces working content for learners
who can attempt the activity.

## Usage

Open any TinyMCE editor (Page activity, Label, section
summary, etc.) and use the Knowledge Check button. The full
authoring workflow including the stealth-activity pattern is in
[`docs/MANUAL_SMOKE.md`](docs/MANUAL_SMOKE.md).

## Documentation

- [`docs/MANUAL_SMOKE.md`](docs/MANUAL_SMOKE.md) — operator
  walkthrough.
- [`docs/DECISIONS.md`](docs/DECISIONS.md) — picker-specific
  decision records.
- [`CHANGES.md`](CHANGES.md) — release history.

## License

GNU GPL v3 or later.
