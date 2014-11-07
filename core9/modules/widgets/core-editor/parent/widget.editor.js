;
(function($) {
			this.child = {},
			_appendIframe = function(){
				if($('#ifr-editor').size() == 0){
					$('body')
					.append(
							'<iframe id="ifr-editor" src="widgets/core-editor/child/editor.html"></iframe>');
					this.child = $('#ifr-editor').seamless({
						loading : ''
					});

					this.child.receive(function(data, event) {

						  console.log('recieving data.. : ');
						  console.log(data);

						  if(data.url){
							  this.url = data.url;

							  PubSub.publish( 'geturl', data.url );
						  }

						});
				}
			},

			_show = function() {
				_appendIframe();
				setTimeout(function() {

					this.child.send({
						action : 'init'
					});

				}, 30);


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
					$('#ifr-editor').css('position', 'absolute');
					$('#ifr-editor').css('top', '0px');
					$('#ifr-editor').css('height', height + 'px');
					$('#ifr-editor').css('width', $('body').width() + 'px');
					$('#ifr-editor').show();

				}, 1500);



			},

			_destroy = function(){
				$('#ifr-editor').hide();
			},

			$.fn.editor = function(options) {
				if (!$(this).length) {
					return this;
				}
				this.defaultOptions = {};
				var settings = $.extend({}, this.defaultOptions, options);
				return this;
			};
	$.editor = function(obj) {
	};

	$.editor.destroy = function(){
		_destroy();
	},
	$.editor.init = function(data) {
		if (data.size == 'full') {
			_show();
		}
	};

	$(function() {
	});

})(window.widget);