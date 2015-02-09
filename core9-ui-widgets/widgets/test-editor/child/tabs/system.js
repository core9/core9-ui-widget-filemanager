
var auth = function(callback){
	var user = store.get('user')
	if (typeof user === "undefined") {

		var person = prompt("Please enter your name", "");
		if (person != null) {
			store.set('user', person)
		}

		var password = prompt("Please enter your password", "");
		if (password != null) {
			store.set('password', password)
		}

	} else {
		// dooo backup
		// http://easydrain.localhost:8090/plugins/editor/backup

		callback();

	}
}

$("#ui-update-btn").on('click', function(){
	$.post("/plugins/editor/ui-widgets-downloader", {
		user : store.get('user'),
		password : store.get('password')
	}).done(function(data) {
		alert("Data Loaded: " + data);
	});
});

$("#flush-btn").on('click', function(){
	$.post("/plugins/editor/flush", {
		user : store.get('user'),
		password : store.get('password')
	}).done(function(data) {
		alert("Data Loaded: " + data);
	});
});

$('#backup-btn').on('click', function() {

	var callback = function(){
		$.post("/plugins/editor/backup", {
			user : store.get('user'),
			password : store.get('password')
		}).done(function(data) {
			alert("Backup complete");
		});
	};
	auth(callback);

});

