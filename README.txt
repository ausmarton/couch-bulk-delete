INSTALLATION:

1) Copy the file couch.bulk.delete.js to "/usr/share/couchdb/www/scripts" or to the appropriate web scripts location based on your OS and CouchDB installation
2) Modify "/usr/share/couchdb/www/database.html" to contain the following line in the HEAD section of the HTML,
	<script src="script/couch.bulk.delete.js?0.11.0"></script>

USAGE:
To delete documents, first visit the database in the browser. Then click on "Enable Bulk Delete" (more about this at the bottom)
Now select any number of documents and click on "Delete Documents".

*Every page refresh requires clicking on "Enable Bulk Delete". This is because documents are loaded into the DOM much later after the DOM is ready, because of which it is not possible to put checkboxes next to each document at the time when the DOM becomes ready.
