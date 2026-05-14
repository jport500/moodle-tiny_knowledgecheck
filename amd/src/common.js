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
 * Shared constants for tiny_knowledgecheck.
 *
 * Classic AMD define() style so Moodle's requirejs.php can serve
 * amd/src/*.js directly without an ESM-to-AMD grunt build step. Each
 * src file has a corresponding amd/build/*.min.js marker copy because
 * find_one_amd_module() looks at the build path first to decide whether
 * the module exists.
 *
 * @module     tiny_knowledgecheck/common
 * @copyright  2026 LMS Light
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
define('tiny_knowledgecheck/common', [], function() {
    return {
        component: 'tiny_knowledgecheck',
        pluginName: 'tiny_knowledgecheck/plugin',
        // Both ui.registry.addButton() AND the toolbar config string must use
        // the same name string so TinyMCE can resolve toolbar items to their
        // registered handlers. tiny_link convention: no slash, no component
        // prefix here. The slashed form (`tiny_knowledgecheck/tiny_knowledgecheck_picker`)
        // is only returned by plugininfo::get_available_buttons() on the PHP
        // side — that path is separate from the JS-side registry resolution.
        buttonName: 'tiny_knowledgecheck_picker',
        icon: 'help',
    };
});
