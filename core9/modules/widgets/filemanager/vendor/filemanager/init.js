





function loadCss(url){
	var link = document.createElement("link");
	link.setAttribute("rel","stylesheet");
	link.setAttribute("type","text/css");
	link.setAttribute("href",url);
	document.getElementsByTagName("head")[0].appendChild(link);
}
function loadCssUrls(baseUrl){
loadCss(baseUrl + "assets/bootstrap.min.css");
loadCss(baseUrl + "assets/bootstrap-responsive.min.css");
loadCss(baseUrl + "assets/animate.min.css");
loadCss(baseUrl + "assets/style.css");
loadCss(baseUrl + "assets/style.css");
loadCss(baseUrl + "assets/jquery.fancybox-1.3.4.css");
loadCss(baseUrl + "assets/font-awesome.min.css");
loadCss(baseUrl + "assets/prettyPhoto.css");
}
// Handles message from ResponsiveFilemanager
//
function OnMessage(e) {
	var event = e.originalEvent;
	// Make sure the sender of the event is trusted
	if (event.data.sender === 'responsivefilemanager') {
		if (event.data.field_id) {
			var fieldID = event.data.field_id;
			var url = event.data.url;
			$('#' + fieldID).val(url).trigger('change');
			$.fancybox.close();

			// Delete handler of the message from ResponsiveFilemanager
			$(window).off('message', OnMessage);
		}
	}
}

function  initMyPage(baseUrl){

	loadCssUrls(baseUrl);

jQuery(document).ready(function($) {


			$('.iframe-btn').fancybox({
				'width' : 880,
				'height' : 570,
				'type' : 'iframe',
				'autoScale' : false
			});



			// Handler for a message from ResponsiveFilemanager
			$('.iframe-btn').on('click', function(e) {
				e.preventDefault();
				$(window).on('message', OnMessage);

			});

		});

}

initMyPage(baseUrl);