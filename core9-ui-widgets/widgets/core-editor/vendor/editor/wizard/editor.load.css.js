function loadCss(url){
	var link = document.createElement("link");
	link.setAttribute("rel","stylesheet");
	link.setAttribute("type","text/css");
	link.setAttribute("href",url);
	document.getElementsByTagName("head")[0].appendChild(link);
}
function loadCssUrls(baseUrl){
loadCss(baseUrl + "vendor/editor/assets/css/bootstrap.min.css");
loadCss(baseUrl + "vendor/editor/assets/css/bootstrap-theme.min.css");
loadCss(baseUrl + "vendor/editor/assets/css/jquery.sceditor.default.min.css");
loadCss(baseUrl + "vendor/editor/assets/css/default.min.css");
loadCss(baseUrl + "vendor/editor/assets/css/select2.css");
loadCss(baseUrl + "vendor/editor/assets/css/font-awesome.min.css");
loadCss(baseUrl + "vendor/editor/assets/css/editor.css");
loadCss(baseUrl + "vendor/editor/assets/css/wizard-engine.css");
}

function  initMyPage(baseUrl){
	loadCssUrls(baseUrl);
}
initMyPage(baseUrl);