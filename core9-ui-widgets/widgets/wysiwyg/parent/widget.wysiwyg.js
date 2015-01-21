;
(function($) {

    $.fn.wysiwyg = function(options) {
        if (!$(this).length) {
            return this;
        }
        this.defaultOptions = {};
        var settings = $.extend({}, this.defaultOptions, options);
        return this;
    };

    $.wysiwyg = function(obj) {};

    $.wysiwyg.child = {},

        $.wysiwyg.destroy = function() {
            $('#ifr-wysiwyg').hide();
        },

        $.wysiwyg.init = function(data) {
            if (data.size == 'full') {
                $.wysiwyg._show();
            }
        };

    $.wysiwyg._show = function() {
            $.wysiwyg._appendIframe();
            setTimeout(function() {
                $.wysiwyg.child.send({
                    action: 'init'
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
                $('#ifr-wysiwyg').css('position', 'absolute');
                $('#ifr-wysiwyg').css('top', '0px');
                $('#ifr-wysiwyg').css('height', height + 'px');
                $('#ifr-wysiwyg').css('width', $('body').width() + 'px');
                $('#ifr-wysiwyg').css('z-index', '9999');
                $('#ifr-wysiwyg').show();

            }, 1000);

        },

        $.wysiwyg._appendIframe = function() {
            if ($('#ifr-wysiwyg').size() == 0) {
                $('body')
                    .append(
                        '<iframe id="ifr-wysiwyg" src="widgets/wysiwyg/child/wysiwyg.html"></iframe>');
                $.wysiwyg.child = $('#ifr-wysiwyg').seamless({
                    loading: ''
                });

                $.wysiwyg.child.receive(function(data, event) {

                	
                	// saved data
                	if(data.content){
                		
                		PubSub.publish('wysiwygdataService', data.content);
                	}
                	
                	if(data.getwysiwyg){
                		PubSub.publish('getwysiwyg', "");
                	}
                	
                    if (data.url) {
                        PubSub.publish('destroyUrlService', data.url);
                    }

                });
            }
        },

        $(function() {

        });

})(window.widget);