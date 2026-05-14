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
 * Entry point for tiny_knowledgecheck.
 *
 * Moodle's editor_tiny loader calls `require(['tiny_knowledgecheck/plugin'], resolve, reject)`
 * via the RequireJS path and expects the AMD module value to be either a string
 * (plain TinyMCE plugin name) or an array `[pluginName, Configuration]`. The
 * resolve in editor_tiny chains through promise unwrapping, so an AMD module
 * value that is itself a Promise resolving to that array works the same as a
 * direct array.
 *
 * Important: this define() does NOT include 'exports' in its dependency list.
 * AMD modules that declare 'exports' have their module value set to that
 * populated exports object, not the function's return value. We want the
 * function's return (the Promise) to be the module value, so we declare only
 * the runtime deps.
 *
 * @module     tiny_knowledgecheck/plugin
 * @copyright  2026 LMS Light
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
define('tiny_knowledgecheck/plugin', [
    'editor_tiny/loader',
    'editor_tiny/utils',
    'tiny_knowledgecheck/common',
    'tiny_knowledgecheck/commands',
    'tiny_knowledgecheck/configuration',
    'tiny_knowledgecheck/options',
], function(Loader, Utils, Common, Commands, Configuration, Options) {

    return new Promise(function(resolve, reject) {
        Promise.all([
            Loader.getTinyMCE(),
            Commands.getSetup(),
            Utils.getPluginMetadata(Common.component, Common.pluginName),
        ]).then(function(values) {
            var tinyMCE = values[0];
            var setupCommands = values[1];
            var pluginMetadata = values[2];

            tinyMCE.PluginManager.add(Common.pluginName, function(editor) {
                Options.register(editor);
                setupCommands(editor);
                return pluginMetadata;
            });

            resolve([Common.pluginName, Configuration]);
            return null;
        }).catch(function(error) {
            window.console.error('tiny_knowledgecheck failed to load:', error);
            reject(error);
        });
    });
});
