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
 * Per-editor options registration for tiny_knowledgecheck.
 *
 * The PHP plugininfo's get_plugin_configuration_for_context() returns an
 * object that lands in options.plugins.tiny_knowledgecheck at editor
 * config time. To read it cleanly inside the AMD module, declare two
 * editor options here (courseid and kcs) and populate them from that
 * config blob on register.
 *
 * @module     tiny_knowledgecheck/options
 * @copyright  2026 LMS Light
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
define('tiny_knowledgecheck/options', [
    'editor_tiny/options',
    'tiny_knowledgecheck/common',
], function(EditorOptions, Common) {

    var COURSEID_OPTION = 'courseid';
    var KCS_OPTION = 'kcs';

    var register = function(editor) {
        var registerOption = editor.options.register;

        registerOption(getOptionName(COURSEID_OPTION), {
            processor: 'number',
            default: 0,
        });

        registerOption(getOptionName(KCS_OPTION), {
            processor: 'array',
            default: [],
        });
    };

    var getOptionName = function(name) {
        return EditorOptions.getPluginOptionName(Common.pluginName, name);
    };

    var getCourseId = function(editor) {
        return editor.options.get(getOptionName(COURSEID_OPTION));
    };

    var getKnowledgechecks = function(editor) {
        return editor.options.get(getOptionName(KCS_OPTION)) || [];
    };

    return {
        register: register,
        getCourseId: getCourseId,
        getKnowledgechecks: getKnowledgechecks,
    };
});
