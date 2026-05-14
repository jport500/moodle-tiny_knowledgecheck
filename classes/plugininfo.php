<?php
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

namespace tiny_knowledgecheck;

use context;
use editor_tiny\editor;
use editor_tiny\plugin;
use editor_tiny\plugin_with_buttons;
use editor_tiny\plugin_with_configuration;
use editor_tiny\plugin_with_menuitems;
use mod_knowledgecheck\api;

/**
 * TinyMCE plugin info for tiny_knowledgecheck.
 *
 * Registers the toolbar button and Insert-menu item that open the
 * Knowledge Check picker modal. The picker lists course-scoped
 * knowledge checks via mod_knowledgecheck\api::list_for_course(),
 * pre-baked into the editor configuration at init time rather than
 * fetched on each picker open (one less external function to maintain;
 * staleness is acceptable for the create-then-embed authoring flow).
 *
 * @package    tiny_knowledgecheck
 * @copyright  2026 LMS Light
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class plugininfo extends plugin implements plugin_with_buttons, plugin_with_configuration, plugin_with_menuitems {
    /**
     * Toolbar buttons this plugin contributes.
     *
     * @return string[]
     */
    public static function get_available_buttons(): array {
        return [
            'tiny_knowledgecheck/tiny_knowledgecheck_picker',
        ];
    }

    /**
     * Menu items this plugin contributes (lives in the Insert menu).
     *
     * @return string[]
     */
    public static function get_available_menuitems(): array {
        return [
            'tiny_knowledgecheck/tiny_knowledgecheck_picker',
        ];
    }

    /**
     * Configuration payload for the editor instance.
     *
     * Walks the editor context up to its nearest course context and
     * pre-bakes the course's knowledge-check list (id, uuid, name,
     * hasquestions flag) for the JS picker. When the editor isn't
     * hosted inside a course (e.g. site-front-page editor), no list
     * is included and the picker shows its empty state.
     *
     * @param context $context The context the editor is being instantiated for.
     * @param array $options Editor options.
     * @param array $fpoptions Filepicker options (unused).
     * @param editor|null $editor The editor instance (unused).
     * @return array{courseid:int, kcs:array}
     */
    public static function get_plugin_configuration_for_context(
        context $context,
        array $options,
        array $fpoptions,
        ?editor $editor = null,
    ): array {
        $coursecontext = $context->get_course_context(false);
        if (!$coursecontext) {
            return [
                'courseid' => 0,
                'kcs' => [],
            ];
        }

        $courseid = (int) $coursecontext->instanceid;
        $kcs = [];
        foreach (api::list_for_course($courseid) as $kc) {
            $kcs[] = [
                'id' => (int) $kc->id,
                'uuid' => (string) $kc->uuid,
                'name' => (string) $kc->name,
                'hasquestions' => (bool) $kc->hasquestions,
            ];
        }

        return [
            'courseid' => $courseid,
            'kcs' => $kcs,
        ];
    }
}
