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
 
//save original init
const originalInit = tinymce.init;

tinymce.init = function (options) {
	//save original setup settings
    const originalSetup = options.setup;
	//defined css link and load inside editor
	const calloutsCssUrl = '/plugins/callouts/callouts.css';
	
	//if content_css isn't assigned, just set it to the css url
	if (!options.content_css) {
        options.content_css = calloutsCssUrl;
    } else {
        // if its an array, add to the end of the array
        if (Array.isArray(options.content_css)) {
            options.content_css.push(calloutsCssUrl);
        } else {
			//otherwise append to the end of the string
            options.content_css += ',' + calloutsCssUrl;
        }
    }

	
	
    options.setup = function (editor) {
		//add the button with the label
		editor.ui.registry.addMenuButton('callouts', {
			text: '💬',
		
			fetch: (callback) => {
				//array of callout objects available
				const callouts = [
					{
						text: 'Note',
						class: 'callouts-note',
						icon: 'ti ti-info-circle'
					},
					{
						text: 'Success',
						class: 'callouts-success',
						icon: 'ti ti-circle-check'
					},
					{
						text: 'Warning',
						class: 'callouts-warning',
						icon: 'ti ti-alert-triangle'
					},
					{
						text: 'Danger',
						class: 'callouts-danger',
						icon: 'ti ti-alert-octagon'
					},
					{
						text: 'Examples',
						class: 'callouts-examples',
						icon: 'ti ti-flask'
					}
				];
				//turn array of options into an array of dropdown options, including the content that gets pasted
				callback(callouts.map(callouts => ({
					type: 'menuitem',
					text: callouts.text,
		
					onAction: () => {
						editor.insertContent(`
							<div class="callouts ${callouts.class}">
								<div class="callouts-title"><span class="${callouts.icon}">&nbsp;</span>${callouts.text}</div>
								<div class="callouts-content">
									<p>&nbsp;</p>
								</div>
							</div>
							<p>&nbsp;</p>
						`);
					}
				})));
			}
		});

        if (originalSetup) {
            originalSetup(editor);
        }
    };
	//add button to toolbar
    if (!options.toolbar.includes('callouts')) {
        options.toolbar += ' | callouts';
    }
	//return original init call with our added option
    return originalInit.call(this, options);
};