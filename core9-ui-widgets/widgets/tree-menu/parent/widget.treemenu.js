;
(function($) {

			$.fn.treemenu = function(options) {
				if (!$(this).length) {
					return this;
				}
				this.defaultOptions = {};
				var settings = $.extend({}, this.defaultOptions, options);
				return this;
			};
	$.treemenu = function(obj) {
	};

	$.treemenu.state = {},

	$.treemenu.ifr = '<iframe id="ifr-treemenu" style="height: 100vh;" src="widgets/tree-menu/child/treemenu.html"></iframe>',
	$.treemenu.child = {},
	$.treemenu._appendIframe = function(){
				if($('#ifr-treemenu').size() == 0){
					$('body')
					.append($.treemenu.ifr);
					$.treemenu.child = $('#ifr-treemenu').seamless({
						loading : ''
					});
					$.treemenu.child.receive(function(data, event) {

						if(data.geturlservice){
							PubSub.publish('geturl', 'for treemenu');
						}

						if (data.destroy) {
							$.treemenu.destroy();
						}
					});
				}
			},

			$.treemenu._show = function() {
				$.treemenu._appendIframe();
				setTimeout(function() {
					$.treemenu.child.send({
						action : 'init',
						state : $.treemenu.state
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
					$('#ifr-treemenu').css('position', 'fixed');
					$('#ifr-treemenu').css('top', '20px');
					//$('#ifr-treemenu').css('height', (docHeight - 20) + 'px');
					$('#ifr-treemenu').css('width', width + 'px');
					$('#ifr-treemenu').show();
				}, 2500);

			},



	$.treemenu.destroy = function(){
				$('#ifr-treemenu').hide();
	},
	$.treemenu.init = function(data) {

	    var treemenuState = data;
	    if(isNaN(treemenuState['inc'])){
	    	treemenuState['inc'] = 1;
	    }else{
	    	treemenuState['inc'] = treemenuState['inc'] + 1;
	    }

	    //store.set('treemenu-state', treemenuState);

	    $.treemenu.state = treemenuState;

		var getUrlServiceResult = function( msg, data ){
		};
		var getUrlServiceResultToken = PubSub.subscribe( 'getUrlServiceResult', getUrlServiceResult );

		if (data.size == 'full') {
			$.treemenu._show();
		}
	};


})(window.widget);