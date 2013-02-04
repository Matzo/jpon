(function($) {
    if (!$) return;
    if (!this.jpon) this.jpon = {};
    if (jpon.Templates) return;

    jpon.Templates = [
        // sample1.json
        {
            filename : "sample1.json",
            charset : "UTF-8",
            template : {
                type:"map",
                value:[
                    {
                        name:"mapObject1",
                        type:"list",
                        expandable:true,
                        min:1,
                        max:10,
                        value:{
                            type:"map",
                            value:[
                                { name:"date",   type:"string" },
                                { name:"title",  type:"string" },
                                { name:"description", type:"string-multi" },
                                { name:"option",      type:"string", option:true },
                                { name:"nullable",    type:"string", nullable:true },
                                { name:"score",       type:"number" },
                                { name:"type",   type:"select", value:["select1", "select2", "select3"] },
                                { name:"attributes", type:"select-multi", value:["attr1", "attr2", "attr3", "attr4"] },
                                { name:"foo",    type:"boolean", value:true }
                            ]
                        }
                    },
                    {
                        name:"mapObject2",
                        type:"list",
                        expandable:true,
                        min:1,
                        max:10,
                        value:{
                            type:"map",
                            value:[
                                { name:"date",   type:"string" },
                                { name:"title",  type:"string" },
                                { name:"description", type:"string-multi" },
                                { name:"option",      type:"string-multi", option:true },
                                { name:"nullable",    type:"string-multi", nullable:true },
                                { name:"score",       type:"number" },
                                { name:"type", type:"select", value:["select1", "select2", "select3"] },
                                { name:"attributes", type:"select-multi", value:["attr1", "attr2", "attr3", "attr4"] },
                                { name:"foo",    type:"boolean", value:false }
                            ]
                        }
                    },
                    {
                        name:"custom",
                        type:"map",
                        expandable:true,
                        value:[
                            { name:"key1", type:"string" },
                            { name:"key2", type:"string" }
                        ]
                    }
                ]
            }
        },

        // sample2.json
        {
            filename : "sample2.json",
            charset : "UTF-8",
            template : {
                type:"map",
                value:[
                    {
                        name:"foo",
                        type:"map",
                        value:[
                            { name:"aaa",   type:"string" },
                            { name:"bbb",  type:"string" },
                        ]
                    },
                    {
                        name:"bar",
                        type:"map",
                        value:[
                            { name:"ccc",   type:"string" },
                            { name:"ddd",  type:"string" },
                        ]
                    },
                ]
            }
        },
        // sample3.json
        {
            filename : "sample3.json",
            charset : "Shift_JIS",
            template : {
                type:"map",
                value:[
                    {
                        name:"multibyte",
                        type:"map",
                        value:[
                            { name:"foo",   type:"string" },
                            { name:"bar",  type:"string" },
                        ]
                    },
                ]
            }
        },
        // sample4.json
        {
            filename : "sample4.json",
            charset : "UTF-8",
            template : {
                type: "map",
                value:[
                    {
                        name : "custom",
                        type : "map",
                        expandable:true,
                        value : [
                            { name:"key1", type:"string", value:"a" },
                            { name:"key2", type:"string", value:"b" }
                        ]
                    }
                ]
            }
        }
    ];
})(this.jQuery);
