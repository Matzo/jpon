$(function() {
    var editor = new jsoned.Editor();
    var storage = new jsoned.Storage();
    var template = {
        type:"map",
        value:[
            {
                name:"announce",
                type:"list",
                expandable:true,
                min:1,
                max:10,
                value:{
                    type:"map",
                    value:[
                        { name:"date",   type:"string" },
                        { name:"title",  type:"string" },
                        { name:"url",    type:"string" },
                        { name:"openIn", type:"select", value:["window", "iframe", ""] },
                        { name:"target", type:"select-multi", value:["android", "windows", "ios", "web"] }
                    ]
                }
            },
            {
                name:"maintenance",
                type:"list",
                expandable:true,
                min:1,
                max:10,
                value:{
                    type:"map",
                    value:[
                        { name:"date",   type:"string" },
                        { name:"title",  type:"string" },
                        { name:"url",    type:"string" },
                        { name:"openIn", type:"select", value:["window", "iframe", ""] },
                        { name:"target", type:"select-multi", value:["android", "windows", "ios", "web"] }
                    ]
                }
            },
        ]
    };

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
        var result = editor.buildEditor({name:"announce", type:"list", min:5, value:
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
        var result = editor.buildEditor({name:"announce", type:"list", min:3, value:
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
        var result = editor.buildEditor({name:"openIn", type:"select", value:["window", "iframe", ""]});

        var inputObj = $("input[type=radio]", result);
        equal(inputObj.get(0).value, "window");
        equal(inputObj.get(1).value, "iframe");
        equal(inputObj.get(2).value, "");
    });

    test("buildSelectEditor()", function() {
        var result = editor.buildEditor({name:"openIn", type:"select", value:["window", "iframe", ""], "default":"iframe"});

        var checkedObj = $("input[type=radio]:checked", result);
        equal(checkedObj.val(), "iframe", "iframe");
    });

    test("buildSelectEditor()", function() {
        var result = editor.buildEditor({name:"openIn", type:"select", value:["window", "iframe", ""], "default":"window"}, "");

        var checkedObj = $("input[type=radio]:checked", result);
        equal(checkedObj.val(), "", "");
    });

    test("buildSelectEditor()", function() {
        var result = editor.buildEditor({name:"openIn", type:"select", value:["window", "iframe", ""]}, "iframe");

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

    test("buildJSONFromStringMulti()", function() {
        editor.initEditor({type:"string-multi", value:"foo\nbar"});
        var result = editor.buildJSON();
        var expect = "foo\nbar";
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

    test("buildJSONFromMap()", function() {
        editor.initEditor({type:"map", value:[
            { name:"date",   type:"string", value:"foo" },
            { name:"title",  type:"string", value:"bar" }
        ]});
        var result = editor.buildJSON();
        var expect = {
            date: "foo",
            title: "bar"
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
            "announce" : [
                {
                    "date" : "",
                    "title" : "",
                    "url" : "",
                    "openIn" : "",
                    "target" : []
                }
            ],
            "maintenance" : [
                {
                    "date" : "",
                    "title" : "",
                    "url" : "",
                    "openIn" : "",
                    "target" : []
                }
            ]
        };
        equal(JSON.stringify(result), JSON.stringify(expect));
    });

    module("Storage");
});
