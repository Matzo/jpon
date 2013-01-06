(function($) {
    if (!$) return;
    if (!this.jsoned) this.jsoned = {};
    if (jsoned.Editor) return;

    jsoned.Editor = function(options) {
        this.options = $.extend({
            editorAreaId : "editor"
        }, options);
    }

    jsoned.Editor.prototype = {
        initEditor : function(template, value) {
            var editorObj = this.buildEditor(template, value);
            var self = this;

            $("#" + this.options.editorAreaId).html("");
            $("#" + this.options.editorAreaId).append(editorObj);
        },

        /**
         * Editor
         */
        buildEditor : function(template, value) {
            var result = null;
            if (template.type == "string") {
                result = this.buildStringEditor(template, value);
            } else if (template.type == "map") {
                result = this.buildMapEditor(template, value);
            } else if (template.type == "list") {
                result = this.buildListEditor(template, value);
            } else if (template.type == "select") {
                result = this.buildSelectEditor(template, value);
            } else if (template.type == "select-multi") {
                result = this.buildSelectMultipleEditor(template, value);
            }
            return result;
        },

        buildStringEditor : function(template, value) {
            var val = value ? value : template.value ? template.value : "";
            var tag = $('<input type="text" name="' + template.name + '" value="' + val + '" class="span6">').addClass("stringEditor");
            return tag;
        },
        buildListEditor : function(template, value) {
            var max = template.max ? template.max : 0;
            var min = template.min ? template.min : 0;
            var len = value ? value.length : 0;
            var self = this;
            var i;
            var list = $("<ul></ul>").addClass("listEditor");
            list.data("template", template);
            value = value || [];

            if (template.expandable) {
                list.sortable({axis: "y", items:"> li.values"});
            }

            var loopMax = Math.max(min, len);
            if (0 < max) {
                loopMax = Math.min(loopMax, max);
            }

            var buildListItem = function(liTemplate, value) {
                var li = $("<li class='values'></li>");
                var item = self.buildEditor(liTemplate, value);
                li.append(item);

                if (template.expandable) {
                    var del = $("<div class='delBtn'>x</div>");
                    del.click(function() {
                        del.hide();
                        li.hide("fast", function() {
                            li.remove();
                        });
                    });
                    li.prepend(del);
                    del.hide().show("fast");
                }
                return li;
            }

            for (i = 0; i < loopMax; i++) {
                list.append(buildListItem(template.value, value[i]));
            }

            if (template.expandable) {
                var more = $("<li class='moreBtn'>+</li>");
                more.click(function() {
                    var li = buildListItem(template.value);
                    list.append(li);
                    li.hide().show("fast");
                    list.append(more);
                });
                list.append(more);
            }
            return list;
        },
        buildMapEditor : function(template, value) {
            var mapObj = $("<dl></dl>").addClass("dl-horizontal").addClass("mapEditor");
            var i, propTmpl, propVal;
            for (i = 0; i < template.value.length; i++) {
                propTmpl = template.value[i];
                if (value) {
                    propVal = value[propTmpl.name];
                }

                // dt
                mapObj.append($("<dt></dt>").html(propTmpl.name));
                // dd
                mapObj.append($("<dd></dd>").append(this.buildEditor(propTmpl, propVal)));
            }
            return mapObj;
        },
        buildSelectEditor : (function() {
            var radioCount = 0;
            return function(template, value) {
                var list = $("<ul></ul>").addClass("inline").addClass("selectEditor");
                //var list = $("<ul></ul>");

                for (i = 0; i < template.value.length; i++) {
                    var li = $("<li></li>");
                    var name = template.name + '_' + radioCount;
                    var id = name + '_' + i;
                    var val = template.value[i];
                    var radio = $('<label for="' + id + '"><input type="radio" id="' + id + '" name="' + name + '" value="' + val + '"> ' + (val?val:'""') + '</label>');
                    li.append(radio);
                    list.append(li);
                }
                if (value !== undefined && value !== null) {
                    $("input[type=radio]", list).val([value]);
                } else {
                    $("input[type=radio]", list).val([template.default]);
                }
                radioCount++;
                return list;
            }
        })(),
        buildSelectMultipleEditor : (function() {
            var checkboxCount = 0;
            return function(template, value) {
                var list = $("<ul></ul>").addClass("inline").addClass("selectMultipleEditor");
                //var list = $("<ul></ul>");

                for (i = 0; i < template.value.length; i++) {
                    var li = $("<li></li>");
                    var name = template.name + '_' + checkboxCount;
                    var id = name + '_' + i;
                    var val = template.value[i];
                    var checkbox = $('<label for="' + id + '"><input type="checkbox" id="' + id + '" name="' + name + '" value="' + val + '"> ' + (val?val:'""') + '</label>');
                    li.append(checkbox);
                    list.append(li);
                }
                if (value) {
                    $("input[type=checkbox]", list).val(value);
                } else if(template.default) {
                    $("input[type=checkbox]", list).val(template.default);
                }
                checkboxCount++;
                return list;
            }
        })(),

        /**
         * JSON
         */
        buildJSONString : function() {
            return JSON.stringify(this.buildJSON());
        },
        buildJSON : function() {
            var rootEditor = $("#" + this.options.editorAreaId).children();
            return this.buildJSONRecursive(rootEditor, {});
        },
        buildJSONRecursive : function(editor) {
            if (editor.hasClass("stringEditor")) {
                return this.buildJSONFromString(editor);
            } else if (editor.hasClass("mapEditor")) {
                return this.buildJSONFromMap(editor);
            } else if (editor.hasClass("listEditor")) {
                return this.buildJSONFromList(editor);
            } else if (editor.hasClass("selectEditor")) {
                return this.buildJSONFromSelect(editor);
            } else if (editor.hasClass("selectMultipleEditor")) {
                return this.buildJSONFromSelectMultiple(editor);
            }
        },
        buildJSONFromString : function(editor) {
            return editor.val();
        },
        buildJSONFromMap : function(editor) {
            var obj = {};
            var children = editor.children();

            for (var i = 0; i < children.size(); i+=2) {
                var key = $(children.get(i)).text();
                var child = $(children.get(i+1)).children();
                var value = this.buildJSONRecursive(child);
                obj[key] = value;
            }

            return obj;
        },
        buildJSONFromList : function(editor) {
            var list = [];
            var children = editor.children().filter(".values");
            for (var i = 0; i < children.size(); i++) {
                var child = $(children.get(i)).children();
                list.push(this.buildJSONRecursive(child));
            }
            return list;
        },
        buildJSONFromSelect : function(editor) {
            var result = $("input[type=radio]:checked", editor).val();
            return result;
        },
        buildJSONFromSelectMultiple : function(editor) {
            var checkedObj = $("input[type=checkbox]:checked", editor);
            var list = [];
            $.each(checkedObj, function() {
                list.push(this.value);
            });
            return list;
        }
    }

})(this.jQuery);
