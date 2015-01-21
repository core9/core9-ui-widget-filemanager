

;
(function($) {
	$.fn.skeleton = function(options) {
		if (!$(this).length) {
			return this;
		}
		this.defaultOptions = {};
		var settings = $.extend({}, this.defaultOptions, options);
		return this;
	};
	$.skeleton = function(obj) {
	};

	  $(function() {
			$('body').append('<iframe id="ifr" src="widgets/skeleton/skeleton.html"></iframe>');
			setTimeout(function(){
				var child =   $('#ifr').seamless({
			    	  loading: ''
			    }).show();
				child.receive(function(data, event) {
					  console.log(data);
				});
			}, 30);

	  });


})(window.widget);