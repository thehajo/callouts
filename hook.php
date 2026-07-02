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
 * @link	  https://github.com/thehajo/callouts
 * -------------------------------------------------------------------------
 */
 
function plugin_callouts_install()
{
	// No install needed, as just JS and CSS are injected
	return true;
}

function plugin_callouts_uninstall()
{
	// No database cleanup needed, JS and CSS just stop getting loaded
	return true;
}