

$('.test-btn').on('click', function() {
	
	var location = this.getAttribute("data-request");

	Core9.parent.send({
		hoopla : true,
		location : location
	});
	
	Core9.parent.receive(function(data, event) {

	});

});