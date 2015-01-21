		//Create DB and fill it with records
		var request = TAFFY([ {
			"ua" : "firefox",
			"language" : "M",
			"device" : "ipad",
			"queryparams" : "",
			"refferal" : ""
		} ]);

		var variations = [ {
			"variation" : "a",
			"percentage" : 60,
			"percentage-had" : 50,
			"query" : {
				ua : "firefox",
				device : "iphone"
			}
		}, {
			"variation" : "b",
			"percentage" : 40,
			"percentage-had" : 30,
			"query" : {
				ua : "firefox",
				device : "ipad"
			}
		} ];

		var dict = [];

		for (var i = 0; i < variations.length; i++) {
			var test = variations[i];
			
			var item = { 
							"result" : request(test.query).count(),
							"test" : test
					}; 
			
			dict.push(item);
		}

		var result = request();



		for (var i = 0; i < dict.length; i++) {
			
			var tst = dict[i];

			if(tst.result != 0){

			}
			
		}



