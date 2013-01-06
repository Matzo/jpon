(function($) {
    if (!$) return;
    if (!this.jsoned) this.jsoned = {};
    if (jsoned.Storage) return;

    jsoned.Storage = function(options) {
        this.options = $.extend({
            inputBoxId : "inputBox",
            outputBoxId : "outputBox"
        }, options);
    }

    jsoned.Storage.prototype = {
        initStorage : function(template) {
            var self = this;

            var inputBox = $("#" + this.options.inputBoxId);
            inputBox.append('<div id="inputFileBox"><input type="file" id="inputFile"></input></div>');
            if ($.browser.chrome) {
                inputBox.append('<div style="margin:10px;"> or </div>');
                inputBox.append('<div id="dragAndDropBox">Drag & Drop Here!</div>');
            }

            $(document.body).bind("drop", function(jqEvent) {
                var e = jqEvent.originalEvent;
                var dragAndDropBox = $("#dragAndDropBox");

                if (e.toElement == dragAndDropBox.get(0)) {
                    var files = e.dataTransfer.files;
                    self.load(files[0]);
                }
                e.preventDefault();
            });

            $("#inputFile").bind("change", function(jqEvent) {
                var e = jqEvent.originalEvent;
                var files = e.target.files;
                self.load(files[0]);
            });

            var outputBody = this.outputBody = $(
                '<div class="modal-backdrop"></div>' +
                '<div class="modal">' +
                    '<div class="modal-header">generated JSON</div>' +
                    '<div class="modal-body">' +
                        '<textarea id="output" readonly></textarea>' +
                    '</div>' +
                    '<div class="modal-footer">' +
                        '<button id="closeOutputBtn">close</button>' +
                    '</div>' +
                '</div>'
            );

            var outputBox = $("#" + this.options.outputBoxId);
            outputBox.addClass("modal-background").addClass("invisible").append(outputBody);
            $("#output").click(function() {
                $(this).select();
            });


            $("#closeOutputBtn").click(function() {
                self.close();
            });
        },
        load : function(file) {
            var self = this;
            this.options.file = file;
            var reader = new FileReader();

            var loading = true;
            if (/\.js$|\.json$/.test(file.name)) {
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
        //    console.log(jsonString);
        },
        save : function(jsonString, filename) {
            // var blobBuilder;
            //if (window.Blob) {
            //    blobBuilder = new Blob();
            // if (window.MozBlobBuilder) {
            //     blobBuilder = new MozBlobBuilder();
            // } else if (window.WebKitBlobBuilder) {
            //     blobBuilder = new WebKitBlobBuilder();
            // }
            // blobBuilder.append(jsonString);

            // var link;
            // window.URL = window.URL || window.webkitURL;
            // location.href = window.URL.createObjectURL(blobBuilder.getBlob());

            $("#output").val(jsonString);
        },
        display : function(jsonString, filename) {
            var outputBox = $("#" + this.options.outputBoxId);
            outputBox.removeClass("invisible");
            $("#output").val(jsonString).focus().select();
        },
        close : function(jsonString, filename) {
            var outputBox = $("#" + this.options.outputBoxId).addClass("invisible");
        }
    }

})(this.jQuery);

