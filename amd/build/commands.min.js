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
 * Toolbar button + Insert-menu item registration for tiny_knowledgecheck.
 *
 * @module     tiny_knowledgecheck/commands
 * @copyright  2026 LMS Light
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
define('tiny_knowledgecheck/commands', [
    'core/str',
    'tiny_knowledgecheck/common',
    'tiny_knowledgecheck/ui',
], function(Str, Common, Ui) {

    var getSetup = function() {
        return Promise.all([
            Str.get_string('buttontitle', Common.component),
            Str.get_string('menuitem', Common.component),
        ]).then(function(strings) {
            var buttonTitle = strings[0];
            var menuItemTitle = strings[1];

            return function(editor) {
                editor.ui.registry.addButton(Common.buttonName, {
                    icon: Common.icon,
                    tooltip: buttonTitle,
                    onAction: function() {
                        Ui.handleAction(editor);
                    },
                });

                editor.ui.registry.addMenuItem(Common.buttonName, {
                    icon: Common.icon,
                    text: menuItemTitle,
                    onAction: function() {
                        Ui.handleAction(editor);
                    },
                });
            };
        });
    };

    return {
        getSetup: getSetup,
    };
});
