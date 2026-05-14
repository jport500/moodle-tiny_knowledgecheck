// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Action handler for tiny_knowledgecheck: opens the picker modal and
 * inserts the chosen knowledge check's embed token at the editor cursor.
 *
 * Uses core/modal directly with an inline `template` config rather than
 * subclassing Modal. Subclassing Modal requires `class Foo extends Modal`
 * (an ES6 class declaration); doing it in classic AMD via prototype
 * inheritance and Modal.call(this, ...) throws because Modal is an ES
 * class and its constructor can only be invoked with `new`. Passing
 * `template` as a modalConfig key bypasses the registry/subclass path
 * entirely — Modal.create renders the named template and uses Modal's
 * default behaviour for everything else.
 *
 * @module     tiny_knowledgecheck/ui
 * @copyright  2026 LMS Light
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
define('tiny_knowledgecheck/ui', [
    'core/modal',
    'core/notification',
    'core/str',
    'core/templates',
    'tiny_knowledgecheck/common',
    'tiny_knowledgecheck/options',
], function(Modal, Notification, Str, Templates, Common, Options) {

    var handleAction = function(editor) {
        var kcs = Options.getKnowledgechecks(editor);

        var templateContext = {
            hasknowledgechecks: kcs.length > 0,
            kcs: kcs.map(function(kc) {
                return {
                    uuid: kc.uuid,
                    name: kc.name,
                    hasquestions: kc.hasquestions,
                };
            }),
        };

        Promise.all([
            Str.get_string('pickerheading', Common.component),
            Str.get_string('pickerintro', Common.component),
            Str.get_string('emptystate', Common.component),
            Str.get_string('noquestionswarning', Common.component),
        ]).then(function(strings) {
            templateContext.pickerintro = strings[1];
            templateContext.emptystate = strings[2];
            templateContext.noquestionswarning = strings[3];

            // Render our picker template as the modal BODY content. Passing
            // it as `template` to Modal.create() would treat it as the full
            // modal scaffold (with the bootstrap modal wrapper, header, etc.),
            // which our template isn't — that path crashes in core/modal's
            // constructor when it can't find the .modal-container element.
            // The Templates.render promise plugs in as `body` instead;
            // Modal.create() uses its own scaffold around it.
            return Modal.create({
                title: strings[0],
                body: Templates.render('tiny_knowledgecheck/picker', templateContext),
                large: false,
                show: true,
            });
        }).then(function(modal) {
            var root = modal.getRoot()[0];
            root.addEventListener('click', function(e) {
                var row = e.target.closest('[data-kc-uuid]');
                if (!row) {
                    return;
                }
                e.preventDefault();
                var uuid = row.getAttribute('data-kc-uuid');
                if (!uuid) {
                    return;
                }
                editor.insertContent('{knowledgecheck id=' + uuid + '}');
                modal.destroy();
                editor.focus();
            });
            return null;
        }).catch(function(error) {
            Notification.exception(error);
        });
    };

    return {
        handleAction: handleAction,
    };
});
