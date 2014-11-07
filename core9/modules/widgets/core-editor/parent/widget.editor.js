;
(function($) {

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


	$.editor.ifr = '<iframe id="ifr-editor" src="widgets/core-editor/child/editor.html"></iframe>',
	$.editor.child = {},
	$.editor._appendIframe = function(){
				if($('#ifr-editor').size() == 0){
					$('body')
					.append($.editor.ifr);
					$.editor.child = $('#ifr-editor').seamless({
						loading : ''
					});
					$.editor.child.receive(function(data, event) {
						console.log(data);
					});
				}
			},

			$.editor._show = function() {
				$.editor._appendIframe();
				setTimeout(function() {
					$.editor.child.send({
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
					$('#ifr-editor').css('position', 'absolute');
					$('#ifr-editor').css('top', '0px');
					$('#ifr-editor').css('height', height + 'px');
					$('#ifr-editor').css('width', $('body').width() + 'px');
					$('#ifr-editor').show();
				}, 1500);

			},



	$.editor.destroy = function(){
				$('#ifr-editor').hide();
	},
	$.editor.init = function(data) {
		if (data.size == 'full') {
			$.editor._show();
		}
	};

	$(function() {
	});

})(window.widget);