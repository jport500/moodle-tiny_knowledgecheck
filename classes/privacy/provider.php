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

namespace tiny_knowledgecheck\privacy;

/**
 * Privacy null provider for tiny_knowledgecheck.
 *
 * The TinyMCE picker plugin is purely authoring convenience — it
 * inserts a filter token into the editor at the cursor position. No
 * personal data is read or stored by this plugin; any user-specific
 * data (attempts, responses) lives in mod_knowledgecheck.
 *
 * @package    tiny_knowledgecheck
 * @copyright  2026 LMS Light
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class provider implements \core_privacy\local\metadata\null_provider {
    /**
     * Reason this plugin stores no user data.
     *
     * @return string Lang-string identifier within this component.
     */
    public static function get_reason(): string {
        return 'privacy:metadata';
    }
}
