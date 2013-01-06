(function($) {
    if (!$) return;
    if (!this.jsoned) this.jsoned = {};
    if (jsoned.Jsoned) return;

    jsoned.Jsoned = function(options) {
        var self = this;
        this.options = $.extend({
            controllerId: "controller",
            saveBtnId : "saveBtn",
            displayBtnId : "displayBtn",
            loadSuccess :function(jsonString) {
                var jsonObj = JSON.parse(jsonString);
                self.editor.initEditor(self.options.template, jsonObj);
            }
        }, options);

        this.initEditor(this.options.template, this.options.value);
        this.initStorage();
        this.initControls();
    }

    jsoned.Jsoned.prototype = {
        initEditor : function(template, value) {
            this.editor = new jsoned.Editor(this.options);
            this.editor.initEditor(template, value);
        },
        initStorage : function(template) {
            this.storage = new jsoned.Storage(this.options);
            this.storage.initStorage();
        },

        initControls : function() {
            var self = this;

            $("#" + this.options.controllerId).append(
                '<button id="displayBtn" type="button" class="btn btn-primary">build JSON</button>'
            );
            //<button id="saveBtn" type="button" class="btn btn-primary">save</button>

            // save
            $("#saveBtn").click(function() {
                self.storage.save(self.editor.buildJSONString());
            });

            // preview
            $("#displayBtn").click(function() {
                self.storage.display(self.editor.buildJSONString());
            });
        }
    }
})(this.jQuery);
