(function($) {
    if (!$) return;
    if (!this.jsoned) this.jsoned = {};
    if (jsoned.Storage) return;

    jsoned.Storage = function(options) {
        this.options = $.extend({
            loadBoxId : "dragAndDropBox"
        }, options);
    }

    jsoned.Storage.prototype = {
        initStorage : function(template) {
            var self = this;
            $("#" + this.options.loadBoxId).bind("drop", function(jqEvent) {
                var e = jqEvent.originalEvent;
                e.preventDefault();

                var files = e.dataTransfer.files;
                self.load(files[0]);
            });
        },
        load : function(file) {
            var self = this;
            this.options.file = file;
            var reader = new FileReader();

            var loading = true;
            if (file.type.match('text.*')) {
                reader.onload = function (evt) {
                    if (self.options.loadSuccess) {
                        self.options.loadSuccess(reader.result);
                    } else {
                        self.loadSuccess(reader.result);
                    }
                }
                reader.readAsText(file, 'UTF-8');
            }
        },
        loadSuccess : function(jsonString) {
            console.log(jsonString);
        },
        save : function(jsonString, filename) {
        }
    }

})(this.jQuery);

