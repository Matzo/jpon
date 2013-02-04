(function($) {
    if (!$) return;
    if (!this.jpon) this.jpon = {};
    if (jpon.Storage) return;

    jpon.Storage = function(options) {
        this.options = $.extend({
            inputBoxId : "inputBox",
            outputBoxId : "outputBox"
        }, options);
    }

    jpon.Storage.prototype = {
        initStorage : function() {
            var self = this;

            var inputBox = $("#" + this.options.inputBoxId);
            inputBox.append('<div id="dragAndDropBox"><input type="file" id="inputFile" class="basket"></input><div>^ Drag & Drop Here!</div></div>');
            //inputBox.append('<div id="manualInputBox"><textarea id="manualInput"></textarea>');
            //inputBox.append('<div id="selectFileBox"><input type="file" id="selectFile"></input></div>');

            //$(document.body).bind("drop", function(jqEvent) {
            //    var e = jqEvent.originalEvent;
            //    var dragAndDropBox = $("#dragAndDropBox");

            //    if (e.toElement == dragAndDropBox.get(0)) {
            //        var files = e.dataTransfer.files;
            //        self.load(files[0]);
            //    }
            //    e.preventDefault();
            //});

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
                        '<a id="downloadBtn" class="btn btn-primary">download</a>' +
                        '<button id="closeOutputBtn" class="btn">close</button>' +
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
            var charset = "UTF-8";

            $.each(self.options.templateMaster, function(i, master) {
                if (file.name == master.filename) {
                    self.options.template = master.template;
                    charset = master.charset;
                    return false;
                }
            });

            var loading = true;
            if (/\.js$|\.json$/.test(file.name)) {
                reader.onload = function (evt) {
                    if (self.options.loadSuccess) {
                        self.options.loadSuccess(reader.result, file.name);
                    } else {
                        self.loadSuccess(reader.result, file.name);
                    }
                }
                reader.readAsText(file, charset);
            }
        },
        loadSuccess : function(jsonString, filename) {
        //    console.log(jsonString, filename);
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

            if ($.browser.chrome && window.Blob) {
                var bb = new Blob([jsonString]);

                var url = window.URL || window.webkitURL;
                var blobURL = url.createObjectURL(bb);
                var a = $("#downloadBtn").get(0);
                a.innerHTML = "download";
                a.download = filename;
                a.file = filename;
                a.href = blobURL;

                $("#downloadBtn").show();
            } else {
                $("#downloadBtn").hide();
            }
        },
        close : function(jsonString, filename) {
            var outputBox = $("#" + this.options.outputBoxId).addClass("invisible");
        }
    }

})(this.jQuery);

