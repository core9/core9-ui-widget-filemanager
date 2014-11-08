;
(function($) {

			$.fn.contextmenu = function(options) {
				if (!$(this).length) {
					return this;
				}
				this.defaultOptions = {};
				var settings = $.extend({}, this.defaultOptions, options);
				return this;
			};
	$.contextmenu = function(obj) {
	};


	$.contextmenu.ifr = '<iframe id="ifr-contextmenu" src="widgets/inpage-context-menu/child/contextmenu.html"></iframe>',
	$.contextmenu.child = {},
	$.contextmenu._appendIframe = function(){
				if($('#ifr-contextmenu').size() == 0){
					$('body')
					.append($.contextmenu.ifr);
					$.contextmenu.child = $('#ifr-contextmenu').seamless({
						loading : ''
					});
					$.contextmenu.child.receive(function(data, event) {
						console.log('contextmenu recieving url data.. : ');
						console.log(data);

						if (data.destroy) {
							console.log('contextmenu sending destroy message.. :');
							//PubSub.publish('destroyUrlService', data.url);
							$.contextmenu.destroy();
						}
					});
				}
			},

			$.contextmenu._show = function() {
				$.contextmenu._appendIframe();
				setTimeout(function() {
					$.contextmenu.child.send({
						action : 'init'
					});
				}, 900);

				setTimeout(function() {
					function getDocHeight() {
				          var doc = document;
				          return Math.max(
				              Math.max(doc.body.scrollHeight, doc.documentElement.scrollHeight),
				              Math.max(doc.body.offsetHeight, doc.documentElement.offsetHeight),
				              Math.max(doc.body.clientHeight, doc.documentElement.clientHeight)
				          );
				      }
				   var height = getDocHeight();
					console.log("height : " + height);
					$('#ifr-contextmenu').css('position', 'absolute');
					$('#ifr-contextmenu').css('top', '0px');
					$('#ifr-contextmenu').css('height', height + 'px');
					$('#ifr-contextmenu').css('width', $('body').width() + 'px');
					$('#ifr-contextmenu').show();
				}, 1500);

			},



	$.contextmenu.destroy = function(){
				$('#ifr-contextmenu').hide();
	},
	$.contextmenu.init = function(data) {

	    var contextmenuState = data;
	    if(isNaN(contextmenuState['inc'])){
	    	contextmenuState['inc'] = 1;
	    }else{
	    	contextmenuState['inc'] = contextmenuState['inc'] + 1;
	    }

	    store.set('contextmenu-state', contextmenuState);

		console.log('initializing contextmenu with state data : ');
		console.log(contextmenuState);
		var getUrlServiceResult = function( msg, data ){
			console.log("getUrlServiceResult recieving data : ");
		    console.log( msg, data );
		};
		var getUrlServiceResultToken = PubSub.subscribe( 'getUrlServiceResult', getUrlServiceResult );

		if (data.size == 'full') {
			$.contextmenu._show();
		}
	};

	$(function() {
	});

})(window.widget);