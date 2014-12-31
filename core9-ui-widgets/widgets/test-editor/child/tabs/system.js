console.log("exec loaded system script..");

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

	}else{
		// dooo backup
	}

});