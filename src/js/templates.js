(function($) {
    if (!$) return;
    if (!this.jpon) this.jpon = {};
    if (jpon.Templates) return;

    jpon.Templates = [
        // sample1
        {
            filename : "basic.json",
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
                            expandable:true,
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

        // sample2
        {
            filename : "map_x_map.json",
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
        // sample3
        {
            filename : "multibyte.json",
            charset : "Shift_JIS",
            template : {
                type:"map",
                value:[
                    {
                        name:"Shift_JIS String",
                        type:"map",
                        value:[
                            { name:"foo",   type:"string" },
                            { name:"bar",  type:"string" },
                        ]
                    },
                ]
            }
        },
        // sample4
        {
            filename : "expandable_map.json",
            charset : "UTF-8",
            template : {
                type: "map",
                value:[
                    {
                        name : "custom",
                        type : "map",
                        expandable:true,
                        value : [
                            { name:"2012/01/01", type:"map", value:[
                                { name:"title",  type:"string" },
                                { name:"description", type:"string-multi" },
                                { name:"score",       type:"number" },
                                { name:"type",   type:"select", value:["select1", "select2", "select3"] },
                                { name:"attributes", type:"select-multi", value:["attr1", "attr2", "attr3"] },
                                { name:"foo",    type:"boolean", value:true }
                            ]}
                        ]
                    }
                ]
            }
        },
        // sample5
        {
            filename : "prefix_suffix.json",
            prefix : "var json = ",
            suffix : ";",
            template : {
                type:"map",
                value:[
                    { name:"foo", type:"string" },
                    { name:"bar", type:"string" }
                ]
            }
        }
    ];
})(this.jQuery);
