JPON
====

edit a JSON with specified format.

Here is [JPON Demo](http://matzo.github.com/jpon_demo/).

### Template Types ###
<table>
<tr><th>type name</th><th>data type</th><th>form</th></</tr>
<tr><td>string</td><td>String</td><td>input[type=text]</td></</tr>
<tr><td>string-multi</td><td>String</td><td>textarea</td></</tr>
<tr><td>number</td><td>int or float</td><td>input[type=text]</td></</tr>
<tr><td>boolean</td><td>boolean</td><td>input[type=radio]</td></</tr>
<tr><td>select</td><td>String</td><td>input[type=radio]</td></</tr>
<tr><td>select-multi</td><td>Array&lt;String&gt;</td><td>input[type=checkbox]</td></</tr>
<tr><td>map</td><td>Object</td><td></td></</tr>
<tr><td>list</td><td>Array</td><td></td></</tr>
</table>

### Sample Template ###

    {
        filename : "sample.json",
        template : {
            type:"map",
            value:[
                {
                    name:"hello",
                    type:"map",
                    value:[
                        { name:"foo", type:"string" },
                        { name:"bar", type:"string-multi" }
                    ]
                }
            ]
        }
    }

This template build following JSON.

    {
      "hello":{
        "foo":"***",
        "bar":"***"
      }
    }
