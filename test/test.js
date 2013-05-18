$(function() {
    var editor = new jpon.Editor();
    var storage = new jpon.Storage();
    var template = jpon.Templates[0].template;

    module("Editor");
    test("buildStringEditor()", function() {
        var result = editor.buildEditor({name:"date", type:"string"});
        equal(result.get(0).tagName, 'INPUT', "tagName");
        equal(result.get(0).type, 'text', "type");
        equal(result.get(0).name, 'date', "name");
        equal(result.get(0).value, '',"value");
    });

    test("buildStringEditor()", function() {
        var result = editor.buildEditor({name:"date", type:"string", value:"2013/01/01"});
        equal(result.get(0).tagName, 'INPUT', "tagName");
        equal(result.get(0).type, 'text', "type");
        equal(result.get(0).name, 'date', "name");
        equal(result.get(0).value, '2013/01/01', "value");
    });

    test("buildStringEditor()", function() {
        var result = editor.buildEditor({name:"date", type:"string", value:"2013/01/01"}, "2012/12/31");
        equal(result.get(0).tagName, 'INPUT');
        equal(result.get(0).type, 'text');
        equal(result.get(0).name, 'date');
        equal(result.get(0).value, '2012/12/31');
    });

    test("buildStringEditor() nullable", function() {
        var result = editor.buildEditor({name:"date", type:"string", value:"2013/01/01", nullable:true});
        ok(result.hasClass("nullable"), "nullable");
    });

    test("buildStringEditor() option", function() {
        var result = editor.buildEditor({name:"date", type:"string", value:"2013/01/01", option:true});
        ok(result.hasClass("option"), "option");
    });

    test("buildStringEditor() validate date", function() {
        var result = editor.buildEditor({name:"date", type:"string", validate:"^[0-9]{4}/[0-9]{2}/[0-9]{2}$"});
        result.focus();
        result.val("2013/01/01");
        result.blur();
        ok(!result.hasClass("invalid"), "this is valid");

        result.focus();
        result.val("");
        result.blur();
        ok(result.hasClass("invalid"), "this is invalid");

        result.focus();
        result.val("a2013/01/01");
        result.blur();
        ok(result.hasClass("invalid"), "this is invalid");

        result.focus();
        result.val("2013/01/1");
        result.blur();
        ok(result.hasClass("invalid"), "this is invalid");

        result.focus();
        result.val("2013/01/100");
        result.blur();
        ok(result.hasClass("invalid"), "this is invalid");
    });

    test("buildStringEditor() validate number", function() {
        var result = editor.buildEditor({name:"date", type:"string", validate:"^[0-9]+$"});
        result.focus();
        result.val("0");
        result.blur();
        ok(!result.hasClass("invalid"), "this is valid");

        result.focus();
        result.val("1234567890");
        result.blur();
        ok(!result.hasClass("invalid"), "this is valid");

        result.focus();
        result.val("");
        result.blur();
        ok(result.hasClass("invalid"), "this is invalid");

        result.focus();
        result.val("1234567890a");
        result.blur();
        ok(result.hasClass("invalid"), "this is invalid");

        result.focus();
        result.val("1234567890_");
        result.blur();
        ok(result.hasClass("invalid"), "this is invalid");
    });

    test("buildStringEditor() validate alphanumeric", function() {
        var result = editor.buildEditor({name:"date", type:"string", validate:"^[0-9a-zA-Z]+$"});
        result.focus();
        result.val("0aA");
        result.blur();
        ok(!result.hasClass("invalid"), "this is valid");

        result.focus();
        result.val("");
        result.blur();
        ok(result.hasClass("invalid"), "this is invalid");

        result.focus();
        result.val("0aA_");
        result.blur();
        ok(result.hasClass("invalid"), "this is invalid");
    });

    test("buildStringEditor() placeholder", function() {
        var result = editor.buildEditor({name:"date", type:"string", placeholder:"12345abcABC", validate:"^[0-9a-zA-Z]+$"});
        equal(result.get(0).placeholder, '12345abcABC', "placeholder");
    });

    test("buildStringMultiEditor()", function() {
        var result = editor.buildEditor({name:"date", type:"string-multi"});
        equal(result.get(0).tagName, 'TEXTAREA', "tagName");
        equal(result.get(0).type, 'textarea');
        equal(result.get(0).name, 'date', "name");
        equal(result.get(0).value, '',"value");
    });

    test("buildStringMultiEditor()", function() {
        var result = editor.buildEditor({name:"date", type:"string-multi", value:"2013/01/01"});
        equal(result.get(0).tagName, 'TEXTAREA', "tagName");
        equal(result.get(0).type, 'textarea');
        equal(result.get(0).name, 'date', "name");
        equal(result.get(0).value, '2013/01/01', "value");
    });

    test("buildStringMultiEditor()", function() {
        var result = editor.buildEditor({name:"date", type:"string-multi", value:"2013/01/01"}, "2012/12/31");
        equal(result.get(0).tagName, 'TEXTAREA');
        equal(result.get(0).type, 'textarea');
        equal(result.get(0).name, 'date');
        equal(result.get(0).value, '2012/12/31');
    });

    test("buildStringMultiEditor() nullable", function() {
        var result = editor.buildEditor({name:"date", type:"string-multi", nullable:true});
        ok(result.hasClass("nullable"), "nullable");
    });

    test("buildStringMultiEditor() option", function() {
        var result = editor.buildEditor({name:"date", type:"string-multi", option:true});
        ok(result.hasClass("option"), "option");
    });

    test("buildStringMultiEditor() placeholder", function() {
        var result = editor.buildEditor({name:"date", type:"string", placeholder:"12345\nabcABC", validate:"^[0-9a-zA-Z]+$"});
        equal(result.get(0).placeholder, '12345\nabcABC', "placeholder");
    });


    test("buildNumberEditor()", function() {
        var result = editor.buildEditor({name:"date", type:"number"});
        equal(result.get(0).tagName, 'INPUT', "tagName");
        equal(result.get(0).type, 'text', "type");
        equal(result.get(0).name, 'date', "name");
        equal(result.get(0).value, 0,"value");
    });

    test("buildNumberEditor()", function() {
        var result = editor.buildEditor({name:"date", type:"number", value:12345});
        equal(result.get(0).tagName, 'INPUT', "tagName");
        equal(result.get(0).type, 'text', "type");
        equal(result.get(0).name, 'date', "name");
        equal(result.get(0).value, 12345, "value");
    });

    test("buildNumberEditor()", function() {
        var result = editor.buildEditor({name:"date", type:"number", value:12345}, 123456);
        equal(result.get(0).tagName, 'INPUT');
        equal(result.get(0).type, 'text');
        equal(result.get(0).name, 'date');
        equal(result.get(0).value, 123456);
    });

    test("buildBooleanEditor()", function() {
        var result = editor.buildEditor({name:"foo", type:"boolean", value:true});

        var checkedObj = $("input[type=radio]:checked", result);
        equal(checkedObj.val(), "true", "true");
    });

    test("buildBooleanEditor()", function() {
        var result = editor.buildEditor({name:"foo", type:"boolean", value:false});

        var checkedObj = $("input[type=radio]:checked", result);
        equal(checkedObj.val(), "false", "false");
    });

    test("buildBooleanEditor()", function() {
        var result = editor.buildEditor({name:"foo", type:"boolean", value:true}, false);

        var checkedObj = $("input[type=radio]:checked", result);
        equal(checkedObj.val(), "false", "false");
    });


    test("buildBooleanEditor()", function() {
        var result = editor.buildEditor({name:"foo", type:"boolean", option:true});

        var checkedObj = $("input[type=radio]:checked", result);
        equal(checkedObj.size(), 0, "not selected");
    });

    test("buildMapEditor()", function() {
        var result = editor.buildEditor({name:"date", type:"map", value:[
            { name:"date",   type:"string" },
            { name:"title",  type:"string" }
        ]});

        equal(result.get(0).tagName, 'DL');
        var resultDate = $("input[name=date]", result);
        equal(resultDate.size(), 1);
        equal(resultDate.val(), "");

        var resultTitle = $("input[name=title]", result);
        equal(resultTitle.size(), 1);
        equal(resultTitle.val(), "");
    });

    test("buildMapEditor() expandable", function() {
        var result = editor.buildEditor({name:"date", type:"map", expandable:true, value:[
            { name:"date",   type:"string" },
            { name:"title",  type:"string" }
        ]});

        equal(result.get(0).tagName, 'DL');
        var dt = $("dt", result);
        ok(dt.hasClass("editable"));
    });

    test("buildListEditor()", function() {
        var result = editor.buildEditor({name:"date", type:"map", value:[
            { name:"date",   type:"string" },
            { name:"title",  type:"string" }
        ]},
        {
            date: "2013/01/23",
            title: "title"
        });

        equal(result.get(0).tagName, 'DL');
        var resultDate = $("input[name=date]", result);
        equal(resultDate.size(), 1);
        equal(resultDate.val(), "2013/01/23");

        var resultTitle = $("input[name=title]", result);
        equal(resultTitle.size(), 1);
        equal(resultTitle.val(), "title");

    });


    test("buildListEditor()", function() {
        var result = editor.buildEditor({name:"mapObject1", type:"list", min:5, value:
            {
                type:"map",
                value:[
                    { name:"date",   type:"string" },
                    { name:"title",  type:"string" }
                ]
            }
        });

        equal(result.get(0).tagName, 'UL');

        var resultDate = $("input[name=date]", result);
        equal(resultDate.size(), 5);
        equal(resultDate.val(), "");

        var resultTitle = $("input[name=title]", result);
        equal(resultTitle.size(), 5);
        equal(resultTitle.val(), "");
    });

    test("buildListEditor()", function() {
        var result = editor.buildEditor({name:"mapObject1", type:"list", min:3, value:
            {
                type:"map",
                value:[
                    { name:"date",   type:"string" },
                    { name:"title",  type:"string" }
                ]
            }
        },
        [
            {
                date: "2013/02/12",
                title: "foo1"
            },
            {
                date: "2013/02/13",
                title: "foo2"
            }
        ]);

        var resultDate = $("input[name=date]", result);
        equal(resultDate.size(), 3);
        equal(resultDate.get(0).value, "2013/02/12");
        equal(resultDate.get(1).value, "2013/02/13");
        equal(resultDate.get(2).value, "");

        var resultTitle = $("input[name=title]", result);
        equal(resultTitle.size(), 3);
        equal(resultTitle.get(0).value, "foo1");
        equal(resultTitle.get(1).value, "foo2");
        equal(resultTitle.get(2).value, "");
    });


    test("buildSelectEditor()", function() {
        var result = editor.buildEditor({name:"type", type:"select", value:["window", "iframe", ""]});

        var inputObj = $("input[type=radio]", result);
        equal(inputObj.get(0).value, "window");
        equal(inputObj.get(1).value, "iframe");
        equal(inputObj.get(2).value, "");
    });

    test("buildSelectEditor()", function() {
        var result = editor.buildEditor({name:"type", type:"select", value:["window", "iframe", ""], "default":"iframe"});

        var checkedObj = $("input[type=radio]:checked", result);
        equal(checkedObj.val(), "iframe", "iframe");
    });

    test("buildSelectEditor()", function() {
        var result = editor.buildEditor({name:"type", type:"select", value:["window", "iframe", ""], "default":"window"}, "");

        var checkedObj = $("input[type=radio]:checked", result);
        equal(checkedObj.val(), "", "");
    });

    test("buildSelectEditor()", function() {
        var result = editor.buildEditor({name:"type", type:"select", value:["window", "iframe", ""]}, "iframe");

        var checkedObj = $("input[type=radio]:checked", result);
        equal(checkedObj.val(), "iframe", "iframe");
    });

    test("buildSelectMultipleEditor()", function() {
        var result = editor.buildEditor({name:"target", type:"select-multi", value:["android", "window", "ios", "web"]});

        var inputObj = $("input[type=checkbox]", result);
        equal(inputObj.get(0).value, "android");
        equal(inputObj.get(1).value, "window");
        equal(inputObj.get(2).value, "ios");
        equal(inputObj.get(3).value, "web");
    });

    test("buildSelectMultipleEditor()", function() {
        var result = editor.buildEditor({name:"target", type:"select-multi", value:["android", "window", "ios", "web"], "default":["ios", "web"]});

        var checkedObj = $("input[type=checkbox]:checked", result);
        equal(checkedObj.size(), 2);
        equal(checkedObj.get(0).value, "ios");
        equal(checkedObj.get(1).value, "web");
    });

    test("buildSelectMultipleEditor()", function() {
        var result = editor.buildEditor({name:"target", type:"select-multi", value:["android", "window", "ios", "web"]}, ["window", "ios"]);

        var checkedObj = $("input[type=checkbox]:checked", result);
        equal(checkedObj.size(), 2);
        equal(checkedObj.get(0).value, "window");
        equal(checkedObj.get(1).value, "ios");
    });

    test("buildSelectMultipleEditor()", function() {
        var result = editor.buildEditor({name:"target", type:"select-multi", value:["android", "window", "ios", "web"], "default":["android", "window"]}, ["window", "ios"]);

        var checkedObj = $("input[type=checkbox]:checked", result);
        equal(checkedObj.size(), 2);
        equal(checkedObj.get(0).value, "window");
        equal(checkedObj.get(1).value, "ios");
    });

    module("JSON", {
        setup: function() {
            $("<div id='editor'></div>").appendTo(document.body);
        },
        teardown: function() {
            $("#editor").remove();
        }
    });

    test("buildJSONFromString()", function() {
        editor.initEditor({type:"string", value:"foo"});
        var result = editor.buildJSON();
        var expect = "foo";
        equal(JSON.stringify(result), JSON.stringify(expect));
    });

    test("buildJSONFromString() hasOption", function() {
        editor.initEditor({type:"string", value:"", option:true});
        var result = editor.buildJSON();
        var expect = undefined;
        equal(JSON.stringify(result), JSON.stringify(expect));
    });

    test("buildJSONFromString() hasOption", function() {
        editor.initEditor({type:"string", value:"foo", option:true});
        var result = editor.buildJSON();
        var expect = "foo";
        equal(JSON.stringify(result), JSON.stringify(expect));
    });

    test("buildJSONFromString() hasNullable", function() {
        editor.initEditor({type:"string", value:"", nullable:true});
        var result = editor.buildJSON();
        var expect = null;
        equal(JSON.stringify(result), JSON.stringify(expect));
    });

    test("buildJSONFromString() hasNullable", function() {
        editor.initEditor({type:"string", value:"foo", nullable:true});
        var result = editor.buildJSON();
        var expect = "foo";
        equal(JSON.stringify(result), JSON.stringify(expect));
    });


    test("buildJSONFromStringMulti()", function() {
        editor.initEditor({type:"string-multi", value:"foo\nbar"});
        var result = editor.buildJSON();
        var expect = "foo\nbar";
        equal(JSON.stringify(result), JSON.stringify(expect));
    });

    test("buildJSONFromStringMulti() hasNullable", function() {
        editor.initEditor({type:"string-multi", value:"", nullable:true});
        var result = editor.buildJSON();
        var expect = null;
        equal(JSON.stringify(result), JSON.stringify(expect));
    });

    test("buildJSONFromStringMulti() hasOption", function() {
        editor.initEditor({type:"string-multi", value:"", option:true});
        var result = editor.buildJSON();
        var expect = undefined;
        equal(JSON.stringify(result), JSON.stringify(expect));
    });

    test("buildJSONFromNumber()", function() {
        editor.initEditor({type:"number", value:null});
        var result = editor.buildJSON();
        var expect = 0;
        equal(JSON.stringify(result), JSON.stringify(expect));
    });

    test("buildJSONFromNumber()", function() {
        editor.initEditor({type:"number", value:"09"});
        var result = editor.buildJSON();
        var expect = 9;
        equal(JSON.stringify(result), JSON.stringify(expect));
    });

    test("buildJSONFromNumber()", function() {
        editor.initEditor({type:"number", value:123});
        var result = editor.buildJSON();
        var expect = 123;
        equal(JSON.stringify(result), JSON.stringify(expect));
    });

    test("buildJSONFromNumber()", function() {
        editor.initEditor({type:"number", value:123.4});
        var result = editor.buildJSON();
        var expect = 123.4;
        equal(JSON.stringify(result), JSON.stringify(expect));
    });

    test("buildJSONFromBoolean()", function() {
        editor.initEditor({type:"boolean", value:true});
        var result = editor.buildJSON();
        var expect = true;
        equal(JSON.stringify(result), JSON.stringify(expect));
    });

    test("buildJSONFromBoolean()", function() {
        editor.initEditor({type:"boolean", value:false});
        var result = editor.buildJSON();
        var expect = false;
        equal(JSON.stringify(result), JSON.stringify(expect));
    });

    test("buildJSONFromBoolean()", function() {
        editor.initEditor({type:"boolean", value:true}, false);
        var result = editor.buildJSON();
        var expect = false;
        equal(JSON.stringify(result), JSON.stringify(expect));
    });

    test("buildJSONFromMap()", function() {
        editor.initEditor({type:"map", value:[
            { name:"date",    type:"string", value:"foo" },
            { name:"title",   type:"string", value:"bar" },
            { name:"caption", type:"string", value:"", nullable:true },
            { name:"remark",  type:"string", value:"", option:true }
        ]});
        var result = editor.buildJSON();
        var expect = {
            date: "foo",
            title: "bar",
            caption: null
        };
        equal(JSON.stringify(result), JSON.stringify(expect));
    });

    test("buildJSONFromList()", function() {
        editor.initEditor({type:"list", min:2, value:{type:"string", value:"aa"}});
        var result = editor.buildJSON();
        var expect = ["aa","aa"];
        equal(JSON.stringify(result), JSON.stringify(expect));
    });

    test("buildJSONFromSelect()", function() {
        editor.initEditor({type:"select", value:["aa","bb","cc"]}, "bb");
        var result = editor.buildJSON();
        var expect = "bb";
        equal(JSON.stringify(result), JSON.stringify(expect));
    });

    test("buildJSONFromSelectMultiple()", function() {
        editor.initEditor({type:"select-multi", value:["aa","bb","cc","dd"]}, ["bb","cc"]);
        var result = editor.buildJSON();
        var expect = ["bb","cc"];
        equal(JSON.stringify(result), JSON.stringify(expect));
    });

    test("buildJSON()", function() {
        editor.initEditor(template);
        var result = editor.buildJSON();
        var expect = {
            "mapObject1" : [
                {
                    "date" : "",
                    "title" : "",
                    "description" : "",
                    "nullable" : null,
                    "score" : 0,
                    "type" : null,
                    "attributes" : [],
                    "foo" : true
                }
            ],
            "mapObject2" : [
                {
                    "date" : "",
                    "title" : "",
                    "description" : "",
                    "nullable" : null,
                    "score" : 0,
                    "type" : null,
                    "attributes" : [],
                    "foo" : false
                }
            ],
            "custom" : {
                "key1" : "",
                "key2" : ""
            }
        };
        equal(JSON.stringify(result), JSON.stringify(expect));
    });

    test("buildJSON() with object", function() {
        editor.initEditor(template, {
            "mapObject1" : [{
                "option" : "yes",
            }],
            "custom" : {
                "customized_key1" : "a",
                "customized_key2" : "b",
                "customized_key3" : "c"
            }
        });
        var result = editor.buildJSON();
        var expect = {
            "mapObject1" : [
                {
                    "date" : "",
                    "title" : "",
                    "description" : "",
                    "option" : "yes",
                    "nullable" : null,
                    "score" : 0,
                    "type" : null,
                    "attributes" : [],
                    "foo" : true
                }
            ],
            "mapObject2" : [
                {
                    "date" : "",
                    "title" : "",
                    "description" : "",
                    "nullable" : null,
                    "score" : 0,
                    "type" : null,
                    "attributes" : [],
                    "foo" : false
                }
            ],
            "custom" : {
                "customized_key1" : "a",
                "customized_key2" : "b",
                "customized_key3" : "c"
            }
        };
        equal(JSON.stringify(result), JSON.stringify(expect));
    });

    test("option for list 1", function() {
        editor.initEditor({
            type:"map",
            value:[
                {
                    name:"list",
                    type:"list",
                    min:3,
                    value:{
                        option:true,
                        type:"string"
                    }
                }
            ]
        }, {
            "list" : ["","",""]
        });
        var result = editor.buildJSON();
        var expect = {"list":[]};
        equal(JSON.stringify(result), JSON.stringify(expect));
    });

    test("option for list 2", function() {
        editor.initEditor({
            type:"map",
            value:[
                {
                    name:"list",
                    type:"list",
                    option:true,
                    min:3,
                    value:{
                        option:true,
                        type:"string"
                    }
                }
            ]
        }, {
            "list" : ["","",""]
        });
        var result = editor.buildJSON();
        var expect = {};
        equal(JSON.stringify(result), JSON.stringify(expect));
    });

    test("option for boolean", function() {
        editor.initEditor({
            name:"foo",
            type:"boolean",
            option:true
        });
        var result = editor.buildJSON();
        var expect = undefined;
        equal(JSON.stringify(result), JSON.stringify(expect));
    });

    test("option for boolean2", function() {
        editor.initEditor({
            type:"map",
            value:[
                {
                    name:"foo",
                    type:"boolean",
                    option:true
                }
            ]
        });
        var result = editor.buildJSON();
        var expect = {};
        equal(JSON.stringify(result), JSON.stringify(expect));
    });


    test("option for map", function() {
        editor.initEditor({
            type:"map",
            value:[
                {
                    name:"data",
                    type:"map",
                    option:true,
                    value:[
                        { name:"key", option:true, type:"string" }
                    ]
                }
            ]
        });
        var result = editor.buildJSON();
        var expect = {};
        equal(JSON.stringify(result), JSON.stringify(expect));
    });

    test("escape regexp", function() {
        var pon = new jpon.Jpon({
            templateMaster:jpon.Templates
        });
        equal(pon.escapeRegexp("`~!@#$%^&*()-_=+[{]}\\|;:'\",<.>/?"), "`~!@#\\$%\\^&\\*\\(\\)-_=\\+\\[{\\]}\\\\\\|;:'\",<.>/\\?");
    });
    test("unescape html", function() {
        var pon = new jpon.Jpon({
            templateMaster:jpon.Templates
        });
        equal(pon.editor.unescapeHtml("&amp;&lt;&gt;"), "&<>");
    });

    test("prefix suffix without value", function() {
        var pon = new jpon.Jpon({
            templateMaster:jpon.Templates
        });
        pon.selectTemplate("prefix_suffix.json");
        equal(pon.editor.unescapeHtml($("#prefix").html()), "var data = {\"test\":$(\"#id\").val()+\"1234567890!@#$%^&*()~-_=+[{]}\\|;:'\\\",<.>/?\"};\nvar json = ");
        equal(pon.editor.unescapeHtml($("#suffix").html()), ";\nvar data2 = {\"aaa\":[1,2,3]};");
        equal(pon.editor.buildJSONString(), "var data = {\"test\":$(\"#id\").val()+\"1234567890!@#$%^&*()~-_=+[{]}\\|;:'\\\",<.>/?\"};\nvar json = {\"foo\":\"\",\"bar\":\"\"};\nvar data2 = {\"aaa\":[1,2,3]};");
    });

    test("prefix suffix with value", function() {
        var pon = new jpon.Jpon({
            templateMaster:jpon.Templates
        });
        pon.parseJSON("var data = {\"test\":$(\"#id\").val()+\"1234567890!@#$%^&*()~-_=+[{]}\\|;:'\\\",<.>/?\"};\nvar json = {\"foo\":\"111\",\"bar\":\"222\"};\nvar data2 = {\"aaa\":[1,2,3]};", "prefix_suffix.json");
        equal(pon.editor.unescapeHtml($("#prefix").html()), "var data = {\"test\":$(\"#id\").val()+\"1234567890!@#$%^&*()~-_=+[{]}\\|;:'\\\",<.>/?\"};\nvar json = ");
        equal(pon.editor.unescapeHtml($("#suffix").html()), ";\nvar data2 = {\"aaa\":[1,2,3]};");
        equal(pon.editor.buildJSONString(), "var data = {\"test\":$(\"#id\").val()+\"1234567890!@#$%^&*()~-_=+[{]}\\|;:'\\\",<.>/?\"};\nvar json = {\"foo\":\"111\",\"bar\":\"222\"};\nvar data2 = {\"aaa\":[1,2,3]};");
    });

    test("prefix suffix with customized", function() {
        var pon = new jpon.Jpon({
            templateMaster:jpon.Templates
        });
        pon.parseJSON("var data = {\"foo\":\"111\",\"bar\":\"222\"} ;", "prefix_suffix.json");
        equal(pon.editor.unescapeHtml($("#prefix").html()), "var data = {\"test\":$(\"#id\").val()+\"1234567890!@#$%^&*()~-_=+[{]}\\|;:'\\\",<.>/?\"};\nvar json = ");
        equal(pon.editor.unescapeHtml($("#suffix").html()), ";\nvar data2 = {\"aaa\":[1,2,3]};");
        equal(pon.editor.buildJSONString(), "var data = {\"test\":$(\"#id\").val()+\"1234567890!@#$%^&*()~-_=+[{]}\\|;:'\\\",<.>/?\"};\nvar json = {\"foo\":\"\",\"bar\":\"\"};\nvar data2 = {\"aaa\":[1,2,3]};");
    });

    test("URL encode", function() {
        var pon = new jpon.Jpon({
            templateMaster:jpon.Templates
        });
        var jsonString = '{"Shift_JIS String":{"foo":"http://localhost/test?a=b&amp;param1=param1","bar":"bbb"}}';
        pon.parseJSON(jsonString, "multibyte.json");

        equal(pon.editor.buildJSONString(), jsonString);
    });

    test("URL encode string-multi", function() {
        var pon = new jpon.Jpon({
            templateMaster:jpon.Templates
        });
        var jsonString = '{"custom":{"2012/01/01":{"title":"","description":"http://localhost/test?a=b&amp;param1=param1","score":0,"type":null,"attributes":[],"foo":true}}}';
        pon.parseJSON(jsonString, "expandable_map.json");

        equal(pon.editor.buildJSONString(), jsonString);
    });

    module("Jpon", {
        setup : function() {
            jpon.location = {};
        },
        teardown : function() {
            jpon.location = {};
        }
    });

    test("buildJSON() validate", function() {
        var pon = new jpon.Jpon({
            templateMaster:jpon.Templates
        });
        pon.parseJSON('{"Name":"First Last", "Address":"Japan\\nTokyo", "ZipCode":1112222, "YYYY-MM-DD":"2013-04-13"}', "validate.json");
        ok(pon.validate(), "valid");

        pon.parseJSON('{"Name":"First Last_", "Address":"Japan\\nTokyo", "ZipCode":1112222, "YYYY-MM-DD":"2013-04-13"}', "validate.json");
        ok(!pon.validate(), "invalid");

        pon.parseJSON('{"Name":"First Last", "Address":"Japan\\nTokyo_", "ZipCode":1112222, "YYYY-MM-DD":"2013-04-13"}', "validate.json");
        ok(!pon.validate(), "invalid");

        pon.parseJSON('{"Name":"First Last", "Address":"Japan\\nTokyo", "ZipCode":"a1112222", "YYYY-MM-DD":"2013-04-13"}', "validate.json");
        ok(!pon.validate(), "invalid");

        pon.parseJSON('{"Name":"First Last", "Address":"Japan\\nTokyo", "ZipCode":1112222, "YYYY-MM-DD":"2013-04-130"}', "validate.json");
        ok(!pon.validate(), "invalid");
    });

    test("selectTemplate()", function() {
        var pon = new jpon.Jpon({
            templateMaster:jpon.Templates,
            value: {}
        });
        pon.selectTemplate("map_x_map.json");
        equal($("#selectedTemplateName").html(), "map_x_map.json");
    });

    test("selectTemplate() same as storage", function() {
        var pon = new jpon.Jpon({
            templateMaster:jpon.Templates,
            value: {}
        });
        pon.selectTemplate("map_x_map.json");
        equal(pon.options.selectedMaster.filename, "map_x_map.json");
        equal(pon.storage.options.selectedMaster.filename, "map_x_map.json");
    });


    test("init with hash", function() {
        jpon.location.hash = "#prefix_suffix.json";
        var pon = new jpon.Jpon({
            templateMaster:jpon.Templates,
            value: {}
        });
        equal($("#selectedTemplateName").html(), "prefix_suffix.json");
    });

    test("init with invalid hash", function() {
        jpon.location.hash = "#prefix_suffix.jsonnnn";
        var pon = new jpon.Jpon({
            templateMaster:jpon.Templates,
            value: {}
        });
        equal($("#selectedTemplateName").html(), "basic.json");
    });
});
