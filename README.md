# Callouts
A GLPI plugin to inject a button into the tinymce editor to allow the usage of markdown callouts.

The button basically only adds div containers with a specific icon, title and certain css classes which then get colored in with the provided css file.
Button is not visible on the User side in the helpdesk/simplified interface, however the CSS is still available, so technicians can add callouts to tickets and users will see them.

This plugin does not utilize the database in any additional way, as it only loads the additional JS and CSS file.
The CSS also specifically uses ".callouts" to avoid clashing with the class ".callout" that is already present in GLPI.

What it looks like in the editor:
<img width="1097" height="594" alt="grafik" src="https://github.com/user-attachments/assets/cf6ef3f2-bf39-4545-ac39-f2ce44fd35d7" />
End result:
<img width="1572" height="703" alt="grafik" src="https://github.com/user-attachments/assets/a6a2ba14-1943-4924-b76b-16ce31a1b405" />
