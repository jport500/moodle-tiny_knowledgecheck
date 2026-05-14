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
 * Toolbar / menu placement for tiny_knowledgecheck.
 *
 * Adds the picker button to TinyMCE's "content" toolbar group (where
 * Link and Insert image live — authors look for content-insertion
 * actions there) and a "Knowledge Check" menu item under the Insert
 * menu.
 *
 * @module     tiny_knowledgecheck/configuration
 * @copyright  2026 LMS Light
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
define('tiny_knowledgecheck/configuration', [
    'editor_tiny/utils',
    'tiny_knowledgecheck/common',
], function(Utils, Common) {

    var configure = function(instanceConfig) {
        return {
            toolbar: Utils.addToolbarButton(instanceConfig.toolbar, 'content', Common.buttonName),
            menu: Utils.addMenubarItem(instanceConfig.menu, 'insert', Common.buttonName),
        };
    };

    return {
        configure: configure,
    };
});
