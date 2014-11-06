;
(function($) {
			this.child = {},
			this.url = {},
			this.pubsub = {},
			_appendIframe = function(){
				if($('#ifr').size() == 0){
					$('body')
					.append(
							'<iframe id="ifr" src="widgets/filemanager/child/filemanager.html"></iframe>');
					this.child = $('#ifr').seamless({
						loading : ''
					});

					this.child.receive(function(data, event) {

						  console.log('recieving data.. : ');
						  console.log(data);

						  if(data.url){
							  this.url = data.url;


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
					$('#ifr').css('position', 'absolute');
					$('#ifr').css('top', '0px');
					$('#ifr').css('height', height + 'px');
					$('#ifr').css('width', $('body').width() + 'px');
					$('#ifr').show();

				}, 1500);



			},

			$.fn.filemanager = function(options) {
				if (!$(this).length) {
					return this;
				}
				this.defaultOptions = {};
				var settings = $.extend({}, this.defaultOptions, options);
				return this;
			};
	$.filemanager = function(obj) {
	};

	$.filemanager.setPubSub = function(pubsub) {
		this.pubsub = pubsub;
	};

	$.filemanager.init = function(data) {
		if (data.size == 'full') {
			_show();
		}
	};

	$(function() {
	});

})(window.widget);