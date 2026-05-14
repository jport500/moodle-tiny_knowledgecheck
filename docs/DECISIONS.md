# DECISIONS — tiny_knowledgecheck

Architectural decision records for the TinyMCE Knowledge Check
picker plugin. Each record is one decision in ADR-lite form:
context, decision, consequences, revisit trigger.

The Tiny picker is the authoring-convenience surface — a toolbar
button and modal that lists the current course's Knowledge
Checks and inserts the embed token at the editor cursor. It owns
no data and no rendering of the embed itself; the filter
([filter_knowledgecheck](../../moodle-filter_knowledgecheck))
handles that. Most architectural decisions about the suite live
in the companion mod's
[DECISIONS.md](../../moodle-mod_knowledgecheck/docs/DECISIONS.md).

---

## 001 — Course-scoped picker, no cross-course listing

**Context.** The picker modal needs a list of Knowledge Checks
to show. Options range from "every KC the user can attempt
anywhere on the site" to "only KCs in the course this editor is
loaded for."

**Decision.** The picker queries only the editor's current
course context. KCs from other courses, even ones the author
also teaches, never appear in the modal.

**Consequences.** Matches the mod's [course-scoped question bank
decision](../../moodle-mod_knowledgecheck/docs/DECISIONS.md):
the embed reference goes by UUID, which is unique within a tenant
DB, but authoring is course-local for tenant-isolation hygiene.
Authors who want to reuse a KC across courses must duplicate the
activity itself (a Moodle workflow) and then re-pick from the
destination course. The cost is no cross-course reuse from the
picker UI — by design.

**Would revisit if.** A tenant requirement lands for cross-
course KC reuse. Implementation would widen
`tiny_knowledgecheck\plugininfo::get_plugin_configuration_for_context()`
to scan beyond the course context, plus a permissions check on
each candidate's course.

---

## 002 — Picker data pre-baked at editor init, not AJAX

**Context.** Two patterns exist for editor-plugin pickers: load
list contents at editor-init time and ship them with the page
payload, or fetch on modal-open via AJAX. Moodle examples
(`tiny_link`, `tiny_media`) use both depending on data volume.

**Decision.** Pre-bake at editor init via
`get_plugin_configuration_for_context()`. The KC list, names,
UUIDs, and "no questions yet" flags ship with the page in
`options.plugins['tiny_knowledgecheck']`.

**Consequences.** Zero modal-open latency — the picker renders
instantly from the in-memory list. The cost is shipping the
list with every page load that includes the editor, even if the
author never opens the picker. Bounded by KCs-per-course,
typically small for the formative-check use case (single-digit
to low double-digit). No spinner, no loading state, no error
handling for a failed fetch.

**Would revisit if.** A tenant has courses with hundreds of KCs
and the init payload becomes meaningful. Mitigation: switch to
AJAX-on-open with a cached response. Unlikely given the
formative-check positioning of the suite.

---

## 003 — Token insertion at cursor, plain text

**Context.** Editor-plugin pickers can insert various payloads:
a placeholder element (`<span data-knowledgecheck="..."></span>`)
that the editor renders specially, or plain text the editor
treats as content.

**Decision.** The picker inserts plain text: `{knowledgecheck
id=<uuid>}` at the cursor position. No wrapping element, no
data attributes, no editor-side rendering of the token shape.

**Consequences.** The text survives copy/paste between editors,
between courses, between Moodle installations. The filter (run
on the rendered side, not the editor side) is the only place
that needs to know about the token shape. Authors can edit the
token literally if they need to — the round-trip through
Moodle's HTML cleaning is clean because the token is plain text.
The cost is no preview of the embed in the editor — the author
sees `{knowledgecheck id=...}` literally during editing and the
rendered embed only after saving the content.

**Would revisit if.** Author feedback says the literal-token
view in the editor is confusing. Mitigation: an editor-side
plugin that renders a placeholder for tokens at edit time,
without changing the persisted payload.

---

## 004 — Owns no data; null privacy provider

**Context.** Privacy providers are mandatory in Moodle 4.0+.
Plugins declare what PII they store or implement the null
provider to declare they store none.

**Decision.** `tiny_knowledgecheck` implements
`\core_privacy\local\metadata\null_provider`. The picker is
purely an authoring affordance — it lists existing activities
and inserts a string into editor content. No per-user state, no
attempt data, nothing persisted by the plugin itself.

**Consequences.** SAR exports and delete operations skip the
picker entirely. The privacy boundary is clean across the suite:
`mod_knowledgecheck` owns PII; the filter and the picker don't.

**Would revisit if.** A future feature creates PII inside the
plugin (e.g. per-user "recently inserted" list, click tracking
on the picker). At that point the null provider becomes a real
provider.
