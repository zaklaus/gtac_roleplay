# Asshat Gaming
## GTA Connected Roleplay Division

### Description
This is the roleplay resource for Asshat Gaming's GTAC servers

### Git Branches
* master/main - The current release. *Never commit to this branch directly*
* testing - The next upcoming release. All feature/fix/change branches are merged into this one
* feature/fix/change - This is where the stuff you're currently working on goes into.

### Scripting Style
* Always use camelCase, even for event names.
* Use a util function where possible. Keep raw logic in command/event/network handlers to a minimum.
* Keep opening curly brackets in-line. Don't linebreak before an opening curly brackets.
* Use sentence case instead of adjacent uppercase letters in class/member names. (i.e. Id instead of ID)
* Use generic, non-specific class member names wherever possible. (i.e. databaseId instead of accountId)
* All communications from server to client are handled in `client.js` script file via utils
* All server events are handled in `event.js` script file, sometimes with utils.

### Database Style
* Always use lowercase.
* Shorten prefix names to four characters or less (i.e. acct=account, veh=vehicle)
* Add an underscore between each word
* Append _main to any tables that store primary data (i.e. acct_main, ban_main, etc)
* Prefix field names with the table name, except for _main tables (i.e. acct_id, job_loc_id)
* Tables use primary index on their ID column.
* Tables use both secondary indexes & cascading foreign key links to any ID that points to another table

### Notes
* The resource is designed to load the script files first, then initialize after that's done.
* Never edit scripts directly on the server. Always edit in the cloned repo on your PC.
* Never upload scripts to the main server. Vortrex will handle deployment of public releases.
* The IDEAS.md file is not a to-do list. It's just a random file to throw ideas into when they come to mind.
* Delete the row containing the bug or idea from the database once you've scripted and tested it and it works.
