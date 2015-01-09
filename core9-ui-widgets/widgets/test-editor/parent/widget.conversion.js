;
(function($) {

			$.fn.conversion = function(options) {
				if (!$(this).length) {
					return this;
				}
				this.defaultOptions = {};
				var settings = $.extend({}, this.defaultOptions, options);
				return this;
			};
	$.conversion = function(obj) {
	};

	$.conversion.state = {},

	$.conversion.ifr = '<iframe id="ifr-conversion" src="widgets/test-editor/child/conversion.html"></iframe>',
	$.conversion.child = {},
	$.conversion._appendIframe = function(){
				if($('#ifr-conversion').size() == 0){
					$('body')
					.append($.conversion.ifr);
					$.conversion.child = $('#ifr-conversion').seamless({
						loading : ''
					});
					$.conversion.child.receive(function(data, event) {

						console.log(data);
						store.set('page',data.location);
						store.set('editor-state', { page: store.get('page'), action: 'edit', 'size':'full' });
						widget.contextmenu.destroy();
						widget.contextmenu.init({'size':'full','url' : data.location});

						if(data.geturlservice){
							PubSub.publish('geturl', 'for conversion');
						}

						if (data.destroy) {
							//PubSub.publish('destroyUrlService', data.url);
							$.conversion.destroy();
						}
					});
				}
			},

			$.conversion._show = function() {
				$.conversion._appendIframe();
				setTimeout(function() {
					$.conversion.child.send({
						action : 'init',
						state : $.conversion.state
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
				   var height = getDocHeight();
				   height = 200;
				   var width = $('body').width();
				   //width = width - 50;
					$('#ifr-conversion').css('position', 'fixed');
					$('#ifr-conversion').css('top', '20px');
					$('#ifr-conversion').css('height', height + 'px');
					$('#ifr-conversion').css('width', width + 'px');
					$('#ifr-conversion').css('border-bottom','15px solid #073163');
					$('#ifr-conversion').show();
				}, 2500);

			},



	$.conversion.destroy = function(){
				$('#ifr-conversion').hide();
	},
	$.conversion.init = function(data) {

	    var conversionState = data;
	    if(isNaN(conversionState['inc'])){
	    	conversionState['inc'] = 1;
	    }else{
	    	conversionState['inc'] = conversionState['inc'] + 1;
	    }

	    //store.set('conversion-state', conversionState);

	    $.conversion.state = conversionState;

		var getUrlServiceResult = function( msg, data ){
		};
		var getUrlServiceResultToken = PubSub.subscribe( 'getUrlServiceResult', getUrlServiceResult );

		if (data.size == 'full') {
			$.conversion._show();
		}
	};


})(window.widget);