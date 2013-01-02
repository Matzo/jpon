(function($) {
    if (!$) return;
    if (!this.jsoned) this.jsoned = {};
    if (jsoned.Storage) return;

    jsoned.Storage = function(options) {
        this.options = $.extend({
        }, options);
    }

    jsoned.Storage.prototype = {
        initStorage : function(template) {
            var editorObj = this.buildEditor(template);

            $("#editor").append(editorObj);
        }
    }

})(this.jQuery);

