console.log("exec loaded script..");


$('.test-btn').on('click', function() {
	
	var location = this.getAttribute("data-request");

	console.log(location);
	Core9.parent.send({
		hoopla : true,
		location : location
	});
	
	Core9.parent.receive(function(data, event) {
		console.log('conversion ok working example recieving url data.. : ');
		console.log(data);

	});

});