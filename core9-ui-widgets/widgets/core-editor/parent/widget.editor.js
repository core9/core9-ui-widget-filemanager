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

	$.editor.state = {},

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

						if(data.getwysiwyg){
							PubSub.publish('getwysiwyg', data.payload);
						}

						if(data.geturlservice){
							PubSub.publish('geturl', 'for editor');
						}

						if (data.destroy) {
							$.editor.destroy();
						}
					});
				}
			},

			$.editor._show = function() {
				$.editor._appendIframe();
				setTimeout(function() {
					$.editor.child.send({
						action : 'init',
						state : $.editor.state
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

				       var positionY = store.get('positionY');
				       console.log('positionY : ' + positionY);

				   var height = getDocHeight();
				   console.log("height : " + height);
					$('#ifr-editor').css('position', 'absolute');
					//$('#ifr-editor').css('top', positionY + 'px');
					$('#ifr-editor').css('top', '0px');
					$('#ifr-editor').css('height', height + 'px');
					$('#ifr-editor').css('width', $('body').width() + 'px');
					$('#ifr-editor').css('z-index','9999');
					$('#ifr-editor').show();
				}, 2500);

			},



	$.editor.destroy = function(){
				PubSub.publish('reloadContextMenu', 'reload context menu');
				$('#ifr-editor').remove();//.hide();

	},
	$.editor.init = function(data) {
		var positionY = store.get('positionY');
	       console.log('positionY : ' + positionY);
		data['positionY'] = positionY;

	    $.editor.state = data;

		if (data.size == 'full') {
			$.editor._show();
		}
	};


})(window.widget);