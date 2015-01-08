console.log("exec loaded script..");


$('#test-btn').on('click', function() {
	
	console.log(location);
	Core9.parent.send({
		hoopla : true
	});

});