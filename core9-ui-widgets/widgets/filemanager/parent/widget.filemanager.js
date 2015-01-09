;
(function($) {

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

	$.filemanager.child = {},

	$.filemanager.destroy = function() {
		$('#ifr').hide();
	},

	$.filemanager.init = function(data) {
		if (data.size == 'full') {
			$.filemanager._show();
		}
	};

	$.filemanager._show = function() {
		$.filemanager._appendIframe();
		setTimeout(function() {
					$.filemanager.child.send({
						action : 'init'
					});
		}, 1000);
		setTimeout(function() {

					function getDocHeight() {
						var doc = document;
						return Math.max(Math.max(doc.body.scrollHeight,
								doc.documentElement.scrollHeight), Math.max(
								doc.body.offsetHeight,
								doc.documentElement.offsetHeight), Math.max(
								doc.body.clientHeight,
								doc.documentElement.clientHeight));
					}

					var height = getDocHeight();
					$('#ifr').css('position', 'absolute');
					$('#ifr').css('top', '0px');
					$('#ifr').css('height', height + 'px');
					$('#ifr').css('width', $('body').width() + 'px');
					$('#ifr').show();

		}, 1500);

	},

	$.filemanager._appendIframe = function() {
				if ($('#ifr').size() == 0) {
					$('body')
							.append(
									'<iframe id="ifr" src="widgets/filemanager/child/filemanager.html"></iframe>');
					$.filemanager.child = $('#ifr').seamless({
						loading : ''
					});

					$.filemanager.child.receive(function(data, event) {


						if (data.url) {
							PubSub.publish('destroyUrlService', data.url);
						}

					});
				}
			},

			$(function() {

			});

})(window.widget);