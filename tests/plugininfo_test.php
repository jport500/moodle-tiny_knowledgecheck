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

use mod_knowledgecheck\local\questions;

/**
 * Tests for tiny_knowledgecheck\plugininfo.
 *
 * Verifies the editor configuration payload: the picker's KC list is
 * pre-baked at editor init via get_plugin_configuration_for_context(),
 * scoped to the editor's nearest course context.
 *
 * @package    tiny_knowledgecheck
 * @copyright  2026 LMS Light
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 * @covers     \tiny_knowledgecheck\plugininfo
 */
final class plugininfo_test extends \advanced_testcase {
    /**
     * Declared toolbar buttons and menu items are well-formed strings.
     */
    public function test_available_buttons_and_menuitems(): void {
        $this->assertSame(
            ['tiny_knowledgecheck/tiny_knowledgecheck_picker'],
            plugininfo::get_available_buttons()
        );
        $this->assertSame(
            ['tiny_knowledgecheck/tiny_knowledgecheck_picker'],
            plugininfo::get_available_menuitems()
        );
    }

    /**
     * Configuration at a course context returns that course's KCs.
     */
    public function test_configuration_returns_course_kcs(): void {
        global $DB;
        $this->resetAfterTest();

        $course = $this->getDataGenerator()->create_course();
        $kc1 = $this->getDataGenerator()->create_module('knowledgecheck', [
            'course' => $course->id,
            'name' => 'Alpha',
        ]);
        $kc2 = $this->getDataGenerator()->create_module('knowledgecheck', [
            'course' => $course->id,
            'name' => 'Bravo',
        ]);

        // Pin a question to kc1 so it has hasquestions=true.
        /** @var \core_question_generator $qgen */
        $qgen = $this->getDataGenerator()->get_plugin_generator('core_question');
        $cat = $qgen->create_question_category(
            ['contextid' => \context_course::instance($course->id)->id]
        );
        $q = $qgen->create_question('truefalse', null, ['category' => $cat->id]);
        $qbeid = (int) $DB->get_field('question_versions', 'questionbankentryid', ['questionid' => $q->id]);
        $version = (int) $DB->get_field('question_versions', 'version', ['questionid' => $q->id]);
        questions::add((int) $kc1->id, $qbeid, $version);

        $context = \context_course::instance($course->id);

        $config = plugininfo::get_plugin_configuration_for_context($context, [], [], null);

        $this->assertSame((int) $course->id, $config['courseid']);
        $this->assertCount(2, $config['kcs']);

        $byname = [];
        foreach ($config['kcs'] as $row) {
            $byname[$row['name']] = $row;
        }
        $this->assertTrue($byname['Alpha']['hasquestions']);
        $this->assertFalse($byname['Bravo']['hasquestions']);
        $this->assertSame($kc1->uuid, $byname['Alpha']['uuid']);
    }

    /**
     * Configuration at a non-course context returns an empty kcs list.
     *
     * Site-front-page editors and similar live at system context. The
     * picker still loads (the modal will show the empty-state message),
     * but no course-scoped list is possible.
     */
    public function test_configuration_outside_course_returns_empty(): void {
        $this->resetAfterTest();

        $context = \context_system::instance();
        $config = plugininfo::get_plugin_configuration_for_context($context, [], [], null);

        $this->assertSame(0, $config['courseid']);
        $this->assertSame([], $config['kcs']);
    }

    /**
     * Module-context editors (e.g. inside a Page activity) walk up to the course.
     */
    public function test_configuration_from_module_context_walks_to_course(): void {
        $this->resetAfterTest();

        $course = $this->getDataGenerator()->create_course();
        $kc = $this->getDataGenerator()->create_module('knowledgecheck', [
            'course' => $course->id,
            'name' => 'WalkUp',
        ]);
        $cm = get_coursemodule_from_instance('knowledgecheck', $kc->id, $course->id, false, MUST_EXIST);
        $modulecontext = \context_module::instance($cm->id);

        $config = plugininfo::get_plugin_configuration_for_context($modulecontext, [], [], null);

        $this->assertSame((int) $course->id, $config['courseid']);
        $this->assertCount(1, $config['kcs']);
        $this->assertSame('WalkUp', $config['kcs'][0]['name']);
    }
}
