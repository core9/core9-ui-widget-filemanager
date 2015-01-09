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
				   var height = getDocHeight();
					$('#ifr-editor').css('position', 'absolute');
					$('#ifr-editor').css('top', '0px');
					$('#ifr-editor').css('height', height + 'px');
					$('#ifr-editor').css('width', $('body').width() + 'px');
					$('#ifr-editor').css('z-index','9999');
					$('#ifr-editor').show();
				}, 2500);

			},



	$.editor.destroy = function(){
				PubSub.publish('reloadContextMenu', 'reload context menu');
				$('#ifr-editor').hide();
				
	},
	$.editor.init = function(data) {

	    var editorState = data;
	    if(isNaN(editorState['inc'])){
	    	editorState['inc'] = 1;
	    }else{
	    	editorState['inc'] = editorState['inc'] + 1;
	    }

	    //store.set('editor-state', editorState);

	    $.editor.state = editorState;

		var getUrlServiceResult = function( msg, data ){
		};
		var getUrlServiceResultToken = PubSub.subscribe( 'getUrlServiceResult', getUrlServiceResult );

		if (data.size == 'full') {
			$.editor._show();
		}
	};


})(window.widget);