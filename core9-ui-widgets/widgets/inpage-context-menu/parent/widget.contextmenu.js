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



	
	$.contextmenu.child = {},
	$.contextmenu._appendIframe = function(){
		
		$.contextmenu.ifr = '<iframe id="ifr-contextmenu" src="' +store.get('page')+ '"></iframe>';
		
				if($('#ifr-contextmenu').size() == 0){
					$('body')
					.append($.contextmenu.ifr);
					$.contextmenu.child = $('#ifr-contextmenu').seamless({
						loading : '',
						showLoadingIndicator : false
					});
					$.contextmenu.child.receive(function(data, event) {

						if (data.destroy) {
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
					
				    var top = 20;  
				   if($('#ifr-conversion').size() == 1){
					   top = top + 215;
				   }
				      
				   var height = getDocHeight();
					$('#ifr-contextmenu').css('position', 'absolute');
					$('#ifr-contextmenu').css('top', top + 'px');
					$('#ifr-contextmenu').css('height', height + 'px');
					$('#ifr-contextmenu').css('width', $('body').width() - 15 + 'px');
					$('#ifr-contextmenu').show();
				}, 1500);

				iFrameResize({
					log : false,
					enablePublicMethods : true,
					resizedCallback : function(messageData) {
					},
					messageCallback : function(messageData) {
						PubSub.publish('geteditor', messageData);

					},
					closedCallback : function(id) {
					}
				});



			},



	$.contextmenu.destroy = function(){
				$('#ifr-contextmenu').remove();//.hide();
	},
	$.contextmenu.init = function(data) {

	    var contextmenuState = data;
	    if(isNaN(contextmenuState['inc'])){
	    	contextmenuState['inc'] = 1;
	    }else{
	    	contextmenuState['inc'] = contextmenuState['inc'] + 1;
	    }

	    store.set('contextmenu-state', contextmenuState);

		var getUrlServiceResult = function( msg, data ){
		};
		var getUrlServiceResultToken = PubSub.subscribe( 'getUrlServiceResult', getUrlServiceResult );

		if (data.size == 'full') {
			$.contextmenu._show();
		}
	};

	$(function() {
	});

})(window.widget);
