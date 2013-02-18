(function($) {
    if (!$) return;
    if (!this.jpon) this.jpon = {};
    if (jpon.Editor) return;

    // for IE
    var _DEFAULT = "default";

    jpon.Editor = function(options) {
        this.options = $.extend({
            editorAreaId : "editor",
            prefixId : "prefix",
            suffixId : "suffix"
        }, options);
    }

    jpon.Editor.prototype = {
        initEditor : function(template, value) {
            var editorObj = this.buildEditor(template, value);
            var self = this;
            var editorArea = $("#" + this.options.editorAreaId);
            this.prefix = $("#" + this.options.prefixId);
            this.suffix = $("#" + this.options.suffixId);

            editorArea.html(editorObj);

            this.prefix.html(this.buildPrefixEditor(this.options.selectedMaster));
            this.suffix.html(this.buildSuffixEditor(this.options.selectedMaster));

            this.initAppendix(this.prefix);
            this.initAppendix(this.suffix);
        },

        initAppendix : function(part) {
            var $part = $(part);
            if ($part.html()) {
                $part.show();
            } else {
                $part.hide();
            }
        },

        /**
         * Editor
         */
        buildEditor : function(template, value) {
            var result = null;
            var template = template || {};
            if (template.type == "string") {
                result = this.buildStringEditor(template, value);
            } else if (template.type == "string-multi") {
                result = this.buildStringMultipleEditor(template, value);
            } else if (template.type == "number") {
                result = this.buildNumberEditor(template, value);
            } else if (template.type == "boolean") {
                result = this.buildBooleanEditor(template, value);
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
            if (template.nullable === true) {
                tag.addClass("nullable");
            }
            if (template.option === true) {
                tag.addClass("option");
            }
            return tag;
        },
        buildStringMultipleEditor : function(template, value) {
            var val = value ? value : template.value ? template.value : "";
            var tag = $('<textarea name="' + template.name + '" class="span6">' + val + '</textarea>').addClass("stringMultipleEditor");
            if (template.nullable === true) {
                tag.addClass("nullable");
            }
            if (template.option === true) {
                tag.addClass("option");
            }
            return tag;
        },
        buildNumberEditor : function(template, value) {
            var val = value ? value : template.value ? template.value : 0;
            var tag = $('<input type="text" name="' + template.name + '" value="' + parseFloat(val, 10) + '" class="span6">').addClass("numberEditor");
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
            var i, propTmpl, propName, propVal, dt;
            var key, val;
            var self = this;
            var keyEdit = function(_dt) {
                if (0 < $("input", _dt).length) {
                    return;
                }
                var _orgName = _dt.html();
                var _input = $('<input type="text" value="' + _orgName + '" class="span2">');
                var _newKey;
                _dt.html("");
                _dt.append(_input);
                _input.focus();
                var _blur = function() {
                    _newKey = _input.val();
                    if (_newKey) {
                        _dt.html(_newKey);
                    } else {
                        _dt.next().remove();
                        _dt.remove();
                    }
                };
                _input.bind("keyup", function(e) {
                    switch (e.keyCode) {
                    case 13: // Enter
                        _blur();
                    }
                });
                _input.bind("blur", function() {
                    _blur();
                });
            };
            var addProperty = function(mapObj, propName, propVal, propTmpl) {
                var dt,dd;
                propTmpl = propTmpl || template.value[0];
                propTmpl.name = propName;
                //propTmpl = propTmpl || {
                //    type:"string",
                //    name:propName,
                //    option:true,
                //    value:propVal
                //};
                // dt
                dt = $("<dt></dt>").html(propName);
                if (template.expandable) {
                    dt.addClass("editable");

                    dt.click(function() {
                        keyEdit($(this));
                    });
                }
                mapObj.append(dt);
                // dd
                dd = $("<dd></dd>").append(self.buildEditor(propTmpl, propVal));
                mapObj.append(dd);
                return mapObj;
            };
            var moreProperty = function(mapObj) {
                var more = $('<dt class="moreBtn span2">+</dt><dd>&nbsp;</dd>');
                more.click(function() {
                    addProperty(mapObj, "", "");
                    mapObj.append(more);
                    var dt = $("dt.editable", mapObj).last();
                    dt.trigger("click");
                    dt.hide().slideDown(100);
                    dt.next().hide().slideDown(100);
                });
                mapObj.append(more);
            }
            if (template.expandable && value) {
                for (propName in value) {
                    if (value.hasOwnProperty(propName)) {
                        propVal = value[propName];
                        propTmpl = template.value[0];
                        //propTmpl = {
                        //    type:"string",
                        //    name:propName,
                        //    option:true,
                        //    value:propVal
                        //};

                        addProperty(mapObj, propName, propVal, propTmpl);
                    }
                }
            } else {
                for (i = 0; i < template.value.length; i++) {
                    propTmpl = template.value[i];
                    if (propTmpl && propTmpl.name) {
                        propName = propTmpl.name;
                    }
                    if (value && propName) {
                        propVal = value[propName];
                    }

                    addProperty(mapObj, propName, propVal, propTmpl);
                }
            }
            if (template.expandable) {
                moreProperty(mapObj);
            }
            return mapObj;
        },
        buildBooleanEditor : (function() {
            var radioCount = 0;
            return function(template, value) {
                var list = $("<ul></ul>").addClass("inline").addClass("booleanEditor");
                //var list = $("<ul></ul>");

                var items = ["true", "false"];
                for (i = 0; i < items.length; i++) {
                    var li = $("<li></li>");
                    var name = template.name + '_' + radioCount;
                    var id = name + '_' + i;
                    var val = items[i];
                    var radio = $('<label for="' + id + '"><input type="radio" id="' + id + '" name="' + name + '" value="' + val + '"> ' + val + '</label>');
                    li.append(radio);
                    list.append(li);
                }
                if (value === false) {
                    $("input[type=radio]", list).val(["false"]);
                } else if (template.value === false) {
                    $("input[type=radio]", list).val(["false"]);
                } else {
                    $("input[type=radio]", list).val(["true"]);
                }
                radioCount++;
                return list;
            }
        })(),
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
                    $("input[type=radio]", list).val([template[_DEFAULT]]);
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
                } else if(template[_DEFAULT]) {
                    $("input[type=checkbox]", list).val(template[_DEFAULT]);
                }
                checkboxCount++;
                return list;
            }
        })(),

        buildPrefixEditor : function(master) {
            return (master && master.prefix) || "";
        },

        buildSuffixEditor : function(master) {
            return (master && master.suffix) || "";
        },

        updatePrefix : function(newPrefix) {
            this.prefix.html(newPrefix);
        },

        updateSuffix : function(newSuffix) {
            this.suffix.html(newSuffix);
        },

        /**
         * JSON
         */
        buildJSONString : function() {
            var prefix = $("#" + this.options.prefixId).html();
            var suffix = $("#" + this.options.suffixId).html();

            return this.unescapeHtml(prefix) + JSON.stringify(this.buildJSON()) + this.unescapeHtml(suffix);
        },
        buildJSON : function() {
            var rootEditor = $("#" + this.options.editorAreaId).children();
            return this.buildJSONRecursive(rootEditor, {});
        },
        buildJSONRecursive : function(editor) {
            if (editor.hasClass("stringEditor")) {
                return this.buildJSONFromString(editor);
            } else if (editor.hasClass("stringMultipleEditor")) {
                return this.buildJSONFromStringMultiple(editor);
            } else if (editor.hasClass("numberEditor")) {
                return this.buildJSONFromNumber(editor);
            } else if (editor.hasClass("booleanEditor")) {
                return this.buildJSONFromBoolean(editor);
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
            var result = editor.val();
            if (editor.hasClass("option") && !result) {
                result = undefined;
            } else if (editor.hasClass("nullable") && !result) {
                result = null;
            }
            return result;
        },
        buildJSONFromStringMultiple : function(editor) {
            var result = editor.val();
            if (editor.hasClass("option") && !result) {
                result = undefined;
            } else if (editor.hasClass("nullable") && !result) {
                result = null;
            }
            return result;
        },
        buildJSONFromNumber : function(editor) {
            return parseFloat(editor.val(), 10);
        },
        buildJSONFromBoolean : function(editor) {
            var result = $("input[type=radio]:checked", editor).val();
            if (result == "true") {
                return true;
            } else {
                return false;
            }
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
            if (result === undefined) {
                result = null;
            }
            return result;
        },
        buildJSONFromSelectMultiple : function(editor) {
            var checkedObj = $("input[type=checkbox]:checked", editor);
            var list = [];
            $.each(checkedObj, function() {
                list.push(this.value);
            });
            return list;
        },
        unescapeHtml : function(pattern) {
            return pattern.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
        }
    }

})(this.jQuery);
