
$('#backup-btn').on('click', function() {
	var user = store.get('user')
	if (typeof user === "undefined") {

		var person = prompt("Please enter your name", "Harry Potter");
		if (person != null) {
			store.set('user', person)
		}

		var password = prompt("Please enter your password", "Harry Potter");
		if (password != null) {
			store.set('password', password)
		}

	} else {
		// dooo backup
		// http://easydrain.localhost:8090/plugins/editor/backup

		$.post("/plugins/editor/backup", {
			user : store.get('user'),
			password : store.get('password')
		}).done(function(data) {
			alert("Data Loaded: " + data);
		});
	}

});