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

//save original init
const originalInit = tinymce.init;

tinymce.init = function (options) {
	//save options
	let finalOptions = options;
	//try and set everything up
	try{
		//make copy of options to work on
		finalOptions = { ...options };
		//save original setup settings
		const originalSetup = finalOptions.setup;
		//defined css link and load inside editor
		const calloutsCssUrl = `${CFG_GLPI.root_doc}/plugins/callouts/callouts.css`;
		
		//if content_css isn't assigned, just set it to the css url
		if (!finalOptions.content_css) {
			finalOptions.content_css = calloutsCssUrl;
		} else {
			// if its an array, add to the end of the array
			if (Array.isArray(finalOptions.content_css)) {
				finalOptions.content_css.push(calloutsCssUrl);
			} else {
				//otherwise append to the end of the string
				finalOptions.content_css += ',' + calloutsCssUrl;
			}
		}
		
		finalOptions.setup = function (editor) {
			//add the button with the label
			editor.ui.registry.addMenuButton('callouts', {
				icon: 'addtag',
				tooltip: 'Callouts',
			
				fetch: (callback) => {
					//array of callout objects available
					const callouts = [
						{
							text: __('Note', 'callouts'),
							class: 'callouts-note',
							icon: 'ti ti-info-circle'
						},
						{
							text: __('Success', 'callouts'),
							class: 'callouts-success',
							icon: 'ti ti-circle-check'
						},
						{
							text: __('Warning', 'callouts'),
							class: 'callouts-warning',
							icon: 'ti ti-alert-triangle'
						},
						{
							text: __('Danger', 'callouts'),
							class: 'callouts-danger',
							icon: 'ti ti-alert-octagon'
						},
						{
							text: __('Examples', 'callouts'),
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
		if (typeof finalOptions.toolbar === 'string' && !finalOptions.toolbar.includes('callouts')) {
		finalOptions.toolbar += ' | callouts';
		}
	//if setup failed
	} catch (err) {
		//log error for investigation
		console.error("Callouts plugin failed, falling back to original init.", err);
		//revert to the original options
		finalOptions = options;
	}
	
	//return original init call with our added option, or with the original values if it ran into an error
	return originalInit.call(this, finalOptions);
};