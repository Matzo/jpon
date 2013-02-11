(function($) {
    if (!$) return;
    if (!this.jpon) this.jpon = {};
    if (jpon.Jpon) return;

    jpon.Jpon = function(options) {
        var self = this;
        this.options = $.extend({
            controllerId: "controller",
            saveBtnId : "saveBtn",
            displayBtnId : "displayBtn",
            loadSuccess : function(jsonString, filename) {
                self.parseJSON(jsonString, filename);
            }
        }, options);

        this.initControls();
        this.initEditor(this.options.template, this.options.value);
        this.initStorage();
    }

    jpon.Jpon.prototype = {
        initEditor : function(template, value) {
            this.editor = new jpon.Editor(this.options);
            this.editor.initEditor(template, value);
        },
        initStorage : function() {
            this.storage = new jpon.Storage(this.options);
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
                var filename = self.options.selectedMaster ? self.options.selectedMaster.filename : "data.json";
                self.storage.display(self.editor.buildJSONString(), filename);
            });

            // templates
            var selectTemplateHtml = '<div class="btn-group">';
            selectTemplateHtml += '<a class="btn dropdown-toggle" data-toggle="dropdown" href="#">';
            selectTemplateHtml += '<span id="selectedTemplateName"></span>';
            selectTemplateHtml += '<span class="caret"></span>';
            selectTemplateHtml += '</a>';
            selectTemplateHtml += '<ul class="dropdown-menu">';
            for (var i = 0; i < this.options.templateMaster.length; i++) {
                var tpl = this.options.templateMaster[i];
                selectTemplateHtml += '<li><a href="#" class="item">' + tpl.filename + '</a></li>';
            }
            selectTemplateHtml += '</ul>';
            selectTemplateHtml += '</div>';

            $("#templateBox").html(selectTemplateHtml);
            $("#templateBox a.item").click(function() {
                var filename = $(this).html();
                self.selectTemplate(filename);
            });

            this.selectTemplate(this.options.templateMaster[0].filename);
        },

        selectTemplate : function(filename) {
            var self = this;
            if (this.options.selectedMaster && this.options.selectedMaster.filename == filename) {
                return;
            }

            $("#selectedTemplateName").html(filename);

            $.each(self.options.templateMaster, function(i, e) {
                if (filename && filename == e.filename) {
                    self.options.template = e.template;
                    self.options.selectedMaster = e;
                    return false;
                }

            });
            this.initEditor(self.options.template);
        },

        parseJSON : function(jsonString, filename) {
            var prefixPattern = /^[^{]*/;
            var suffixPattern = /[^}]*$/;
            var prefix = jsonString.match(prefixPattern);
            var suffix = jsonString.match(suffixPattern);
            var jsonObj = JSON.parse(jsonString.replace(prefixPattern, "").replace(suffixPattern, ""));
            this.selectTemplate(filename);
            this.editor.initEditor(this.options.template, jsonObj);
            this.editor.updatePrefix(prefix);
            this.editor.updateSuffix(suffix);
        }
    }
})(this.jQuery);
