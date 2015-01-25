;
(function($) {

			$.fn.login = function(options) {
				if (!$(this).length) {
					return this;
				}
				this.defaultOptions = {};
				var settings = $.extend({}, this.defaultOptions, options);
				return this;
			};
	$.login = function(obj) {
	};

	$.login.state = {},

	$.login.ifr = '<iframe id="ifr-login" src="widgets/login/child/login.html"></iframe>',
	$.login.child = {},
	$.login._appendIframe = function(){
				if($('#ifr-login').size() == 0){
					$('body')
					.append($.login.ifr);
					$.login.child = $('#ifr-login').seamless({
						loading : ''
					});
					$.login.child.receive(function(data, event) {

						console.log("recieving login data");
						console.log(data);

						if(data.username == "robert" && data.password == "test"){
							$.login.destroy();
							PubSub.publish( 'openContextMenu', "" );
						}

						if (data.destroy) {
							$.login.destroy();
						}
					});
				}
			},

			$.login._show = function() {
				$.login._appendIframe();
				setTimeout(function() {
					$.login.child.send({
						action : 'init',
						state : $.login.state
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
					$('#ifr-login').css('position', 'fixed');
					$('#ifr-login').css('top', '0px');
					$('#ifr-login').css('height', docHeight + 'px');
					$('#ifr-login').css('width', width + 'px');
					$('#ifr-login').css('z-index','9999');
					$('#ifr-login').show();
				}, 2500);

			},



	$.login.destroy = function(){
				$('#ifr-login').hide();
	},
	$.login.init = function(data) {

	    var loginState = data;


	    $.login.state = loginState;

		var getUrlServiceResult = function( msg, data ){
		};
		var getUrlServiceResultToken = PubSub.subscribe( 'getUrlServiceResult', getUrlServiceResult );

		if (data.size == 'full') {
			$.login._show();
		}
	};


})(window.widget);