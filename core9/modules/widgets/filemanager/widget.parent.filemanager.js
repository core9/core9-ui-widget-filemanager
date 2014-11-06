

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

	  $(function() {
			$('body').append('<iframe id="ifr" src="widgets/filemanager/filemanager.html"></iframe>');
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