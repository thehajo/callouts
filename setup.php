<?php

/**
 * -------------------------------------------------------------------------
 * Callouts plugin for GLPI
 * -------------------------------------------------------------------------
 *
 * LICENSE
 *
 * This file is part of Callouts.
 *
 * Callouts is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 *
 * Callouts is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Callouts. If not, see <http://www.gnu.org/licenses/>.
 * -------------------------------------------------------------------------
 * @copyright Copyright (C) 2026 by thehajo.
 * @license   GPLv3 https://www.gnu.org/licenses/gpl-3.0.html
 * @link      https://github.com/pluginsGLPI/example
 * -------------------------------------------------------------------------
 */
use Glpi\Plugin\Hooks;

use function Safe\define;

define('PLUGIN_CALLOUTS_VERSION', '1.0.0');

// Minimal GLPI version, inclusive
define('PLUGIN_CALLOUTS_MIN_GLPI', '11.0.0');
// Maximum GLPI version, exclusive
define('PLUGIN_CALLOUTS_MAX_GLPI', '11.0.99');

/**
 * Init hooks of the plugin.
 * REQUIRED
 *
 * @return void
 */
function plugin_init_callouts()
{
    global $PLUGIN_HOOKS,$CFG_GLPI;

	//Only add the JS file to inject the button when not using the helpdesk (simple) interface
	//if 'interface' is set in $_SESSION and the interface is NOT helpdesk, load the JS file
    if (isset($_SESSION['glpiactiveprofile']['interface'])
        && $_SESSION['glpiactiveprofile']['interface'] !== 'helpdesk') {

        $PLUGIN_HOOKS[Hooks::ADD_JAVASCRIPT]['callouts'] = 'callouts.js';
    }
		

    // Always add CSS file, so it still renders properly on the user side
    $PLUGIN_HOOKS[Hooks::ADD_CSS]['callouts'] = 'callouts.css';

}


/**
 * Get the name and the version of the plugin
 * REQUIRED
 *
 * @return array
 */
function plugin_version_callouts()
{
    return [
        'name'         => 'Callouts',
        'version'      => PLUGIN_CALLOUTS_VERSION,
        'author'       => 'thehajo',
        'license'      => 'GPLv3',
        'homepage'     => 'https://github.com/thehajo/callouts',
        'requirements' => [
            'glpi' => [
                'min' => PLUGIN_CALLOUTS_MIN_GLPI,
                'max' => PLUGIN_CALLOUTS_MAX_GLPI,
            ],
        ],
    ];
}