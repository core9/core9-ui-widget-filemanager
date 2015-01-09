;
(function($) {

			$.fn.console = function(options) {
				if (!$(this).length) {
					return this;
				}
				this.defaultOptions = {};
				var settings = $.extend({}, this.defaultOptions, options);
				return this;
			};
	$.console = function(obj) {
	};

	$.console.state = {},

	$.console.ifr = '<iframe id="ifr-console" src="widgets/js-console/child/console.html"></iframe>',
	$.console.child = {},
	$.console._appendIframe = function(){
				if($('#ifr-console').size() == 0){
					$('body')
					.append($.console.ifr);
					$.console.child = $('#ifr-console').seamless({
						loading : ''
					});
					$.console.child.receive(function(data, event) {

						if(data.geturlservice){
							PubSub.publish('geturl', 'for console');
						}

						if (data.destroy) {
							$.console.destroy();
						}
					});
				}
			},

			$.console._show = function() {
				$.console._appendIframe();
				setTimeout(function() {
					$.console.child.send({
						action : 'init',
						state : $.console.state
					});
				}, 1100);

				setTimeout(function() {
					function getDocHeight() {
				          var doc = document;
				          return Math.max(
				              Math.max(doc.body.scrollHeight, doc.documentElement.scrollHeight),
				              Math.max(doc.body.offsetHeight, doc.documentElement.offsetHeight),
				              Math.max(doc.body.clientHeight, doc.documentElement.clientHeight)
				          );
				      }
				   var docHeight = getDocHeight();
				   var height = 200;
				   var width = $('body').width();
				   //width = width - 50;
					$('#ifr-console').css('position', 'fixed');
					$('#ifr-console').css('top', ($(window).height() - height)+'px');
					$('#ifr-console').css('height', height + 'px');
					$('#ifr-console').css('width', width + 'px');
					$('#ifr-console').show();
				}, 2500);

			},



	$.console.destroy = function(){
				$('#ifr-console').hide();
	},
	$.console.init = function(data) {

	    var consoleState = data;
	    if(isNaN(consoleState['inc'])){
	    	consoleState['inc'] = 1;
	    }else{
	    	consoleState['inc'] = consoleState['inc'] + 1;
	    }

	    //store.set('console-state', consoleState);

	    $.console.state = consoleState;

		var getUrlServiceResult = function( msg, data ){
		};
		var getUrlServiceResultToken = PubSub.subscribe( 'getUrlServiceResult', getUrlServiceResult );

		if (data.size == 'full') {
			$.console._show();
		}
	};


})(window.widget);