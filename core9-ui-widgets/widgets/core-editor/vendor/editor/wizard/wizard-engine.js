var Wizard = {
	widgetJson : {},
	state : {},
	action : "",
	activatedWidget : "",
	config : {},
	getStep : function(step, label) {
		var li = document.createElement("li");
		li.setAttribute("class", "step");
		var a = document.createElement("a");
		a.setAttribute("href", "javascript:void(0);");
		a.appendChild(document.createTextNode(label));
		li.appendChild(a);
		var div = document.createElement("div");
		div.setAttribute("class", "main-container form-container");
		var innerDiv = document.createElement("div");
		innerDiv.setAttribute("id", "editor_holder-" + step);
		div.appendChild(innerDiv);
		var button = document.createElement("button");
		button.setAttribute("id", "submit-" + step);
		button.appendChild(document.createTextNode("Submit"));
		div.appendChild(button);
		li.appendChild(div);
		return li;
	},

	getScript : function(script, step) {
		script = Wizard.config.baseUrl + script;
		$LAB.script(script).wait(function() {
			init(step);
		});
	},

	goToNextStep : function(event) {
		var selectedLi = Wizard.getParentElementWithClass(event.target, 'step');
		if (selectedLi.nextSibling != null) {
			Wizard.hideAllDivs();
			selectedLi.nextSibling.querySelector('.main-container').style.display = "block";
		}
	},

	createWizard : function(steps) {

		var ul = document.getElementById('tab-ul');
		var lis = document.querySelectorAll('li > a');
		for ( var step in steps) {
			var script = steps[step].file;
			if(lis.length == 1){
				ul.appendChild(Wizard.getStep(step, steps[step].label));
				Wizard.getScript(script, step);
			}
		}
		Wizard.hideAllDivs();
		Wizard.showChooseDiv();

		
	},

	showChooseDiv : function() {
		document.getElementById('choose-div').style.display = "block";
	},

	hideAllDivs : function() {
		var divs = document.getElementsByClassName('main-container');
		for ( var div in divs) {
			var elem = divs[div];
			if (elem.tagName == 'DIV') {
				elem.style.display = "none";
			}
		}
	},

	getParentElementWithClass : function(element, className) {
		function collectionHas(a, b) { // helper function (see below)
			for (var i = 0, len = a.length; i < len; i++) {
				if (a[i] == b)
					return true;
			}
			return false;
		}
		function findParentBySelector(elm, selector) {
			var all = document.querySelectorAll(selector);
			var cur = elm.parentNode;
			while (cur && !collectionHas(all, cur)) { // keep going up until
				cur = cur.parentNode; // go up
			}
			return cur; // will return null if not found
		}

		var parent = findParentBySelector(element, "." + className);
		return parent;
	},

	endsWith : function(str, suffix) {
		return str.indexOf(suffix, str.length - suffix.length) !== -1;
	},

	activateWidget : function(widget, widgets) {
		Wizard.activatedWidget = widget;
		var stepFile = widgets[widget].steps;
		stepFile = Wizard.config.baseUrl + stepFile;
		if (!Wizard.endsWith(stepFile, ".json")) {
			return;
		}

		promise.get(stepFile).then(function(error, text, xhr) {
			if (error) {
				//alert('Error ' + xhr.status);
				return;
			}
			Wizard.createWizard(JSON.parse(text))
		});

		document.getElementById('tab-ul')
				.addEventListener(
						"click",
						function(e) {
							if (e.target.tagName != 'A') {
								return;
							}
							Wizard.hideAllDivs();
							var elem = e.target.parentNode
									.getElementsByTagName('div')[0];
							if (elem !== undefined && elem.tagName == 'DIV') {
								elem.style.display = "block";
							}
						});

	},

	activateChooseButtons : function(json) {
	
		var old_element = document.getElementById("choose-button");
		var new_element = old_element.cloneNode(true);
		old_element.parentNode.replaceChild(new_element, old_element);

		var button = document.getElementById("choose-button");
		button.addEventListener("click", function(event) {
			Wizard.activateWidget(document.getElementById("data-list").value,
					json);
		}, false);

	},

	setUpChooseOptions : function(json) {
		var options = '';
		for ( var key in json) {
			if (json.hasOwnProperty(key)) {
				options += '<option value="' + key + '" />';
			}
		}
		document.getElementById('widgets').innerHTML = options;
	},

	selectChoosenBlock : function(state){
	//"#reset-button"
	    document.getElementById("reset-button").click();
		document.getElementById("block-action").innerHTML=JSON.stringify(state);

		document.getElementById("data-list").value = state.type;

		document.getElementById("choose-button").click();
		setTimeout(function(){
			var lis = document.querySelectorAll('li > a');
			if(typeof lis[1] !== 'undefined'){
				lis[1].click();
			}
			

		}, 500);
	},

	init : function(config) {
		promise.get(config.widgets).then(function(error, text, xhr) {
			if (error) {
				return;
			}
			var json = JSON.parse(text);
			Wizard.widgetJson = json;
			Wizard.config = config;
			Wizard.action = config.state.action;
			Wizard.state = JSON.parse(config.state.contextmenu.message);
			Wizard.setUpChooseOptions(json);
			Wizard.activateChooseButtons(json);
			Wizard.selectChoosenBlock(Wizard.state);
		});
	},

	getData : function(step, dataRequest, callback) {

		var editor;
		var req = dataRequest;
		if (req == "") {
			req = Wizard.config.baseUrl + config.data;
		}
		promise.get(req).then(
				function(error, text, xhr) {
					// what a fucking mess
					if (error) {
						//alert('Error ' + xhr.status);
						return;
					}
					var starting_value = "";
					try {
						starting_value = JSON.parse(text).data;
					} catch (e) {
					}

					if (typeof (starting_value) == "undefined"
							|| starting_value == "") {
						starting_value = JSON.parse(text);
					}
					var placeHolder = document.getElementById('editor_holder-'
							+ step);
					editor = new JSONEditor(placeHolder, {
						ajax : true,
						schema : config.schema,
						// Seed the form with a starting
						// value
						startval : starting_value,
						// Disable additional properties
						no_additional_properties : true,
						disable_edit_json : true,
						disable_properties : true,
						disable_collapse : true,
						// Require all properties by default
						required_by_default : true
					});
					// Hook up the submit button to log to the
					// console

					editor.on('change',function() {
					});



					editor.on('ready',function() {

						 	if (typeof callback == 'function') {
						 		callback(editor);
						 		}
						});

					document.getElementById('submit-' + step).addEventListener(
							'click', function(event) {
								event.stopPropagation();
								Wizard.goToNextStep(event);
								var data = Wizard.getPostToApiData(editor);
								Wizard.postToApi(data)

							});

				});
	},

	getPostToApiData : function(editor) {

		var meta = {
			"absolute-url" : Wizard.config.pageUrl,
			"state" : Wizard.state.action.split('-')[0],
			"block" : Wizard.state.block,
			"type" : Wizard.activatedWidget,
			"template" : Wizard.widgetJson[Wizard.activatedWidget].template,
			"contentid" : Wizard.state.contentid
		}

		var fullData = {
			"meta" : meta,
			"editor" : editor.getValue(),
		}

		var jsonString = JSON.stringify(fullData);

		var data = {
			"id" : 112,
			"data" : jsonString
		};
		return data;
	},

	postToApi : function(data) {

		var postUrl = '/api/block';
		if(typeof Wizard.state.contentid !== 'undefined' && Wizard.state.contentid.length > 2){
			postUrl = "/dynamic-blocks/update/" + Wizard.state.contentid;
		}

		promise
				.post(postUrl, data)
				.then(
						function(error, text, xhr) {
							if (error) {
								//alert('Error ' + xhr.status);
								return;
							}
							
							Core9.parent.send({
						destroy : true// ,
					});

						});
	},

	run : function(step, config, callback) {
		var parser = document.createElement('a');
		parser.href = Wizard.config.pageUrl;

		var dataRequest = Wizard.config.baseUrl;
		dataRequest += 'site/data.json?page=';
		// page=/scraper/nl&state=edit-block-0-type-video
		dataRequest += parser.pathname + '&state=';
		dataRequest += Wizard.state.action + "-" + Wizard.state.block
				+ "-type-" + Wizard.activatedWidget;



		if(typeof Wizard.state.contentid !== 'undefined' && Wizard.state.contentid.length > 2){
			dataRequest = "/dynamic-blocks/"+Wizard.activatedWidget+"/data/"+Wizard.activatedWidget+".json?id=" + Wizard.state.contentid;
		}

		promise.get(dataRequest).then(function(error, text, xhr) {
			if (error) {
				// /alert('Error ' + xhr.status);
				// return;
				dataRequest = "";
			} else {
				var json = JSON.parse(text);
			}
			Wizard.getData(step, dataRequest, callback);
		});

	}

}
