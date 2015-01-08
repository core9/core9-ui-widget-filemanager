console.log("exec loaded script..");


$('#test-btn').on('click', function() {
	
	console.log(location);
	Core9.parent.send({
		hoopla : true,
		location : "http://easydrain.localhost:8090/ui-widgets/index.html?page=/p/scraper/nl/"
	});
	
	Core9.parent.receive(function(data, event) {
		console.log('conversion ok working example recieving url data.. : ');
		console.log(data);

	});

});