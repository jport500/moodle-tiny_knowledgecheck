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

/**
 * Version information for tiny_knowledgecheck.
 *
 * @package    tiny_knowledgecheck
 * @copyright  2026 LMS Light
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

$plugin->version      = 2026051402;
$plugin->requires     = 2024100100;
$plugin->component    = 'tiny_knowledgecheck';
$plugin->maturity     = MATURITY_STABLE;
$plugin->release      = 'v1.0.0';
$plugin->dependencies = [
    'mod_knowledgecheck' => 2026051403,
];
