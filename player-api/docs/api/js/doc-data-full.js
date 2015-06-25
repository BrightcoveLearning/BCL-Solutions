var docData = 
[
    {
        "comment": "/**\n * @file Needed for full path retrieval\n */",
        "meta": {
            "range": [
                0,
                47
            ],
            "filename": "big-play-button.js",
            "lineno": 1,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "name": "big-play-button.js",
        "kind": "file",
        "description": "<p>Needed for full path retrieval</p>",
        "preserveName": true,
        "longname": "big-play-button.js",
        "scope": "global"
    },
    {
        "comment": "/**\n * Initial play button. Shows before the video has played. The hiding of the\n * big play button is done via CSS and player states.\n *\n * @extends Button\n * @class BigPlayButton\n */",
        "meta": {
            "range": [
                49,
                233
            ],
            "filename": "big-play-button.js",
            "lineno": 5,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Initial play button. Shows before the video has played. The hiding of the\nbig play button is done via CSS and player states.</p>",
        "augments": [
            "Button"
        ],
        "kind": "class",
        "name": "BigPlayButton",
        "longname": "BigPlayButton",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Allow sub components to stack CSS class names\n  *\n  * @return {String} The constructed class name\n  * @method buildCSSClass\n  */",
        "meta": {
            "range": [
                235,
                371
            ],
            "filename": "big-play-button.js",
            "lineno": 13,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Allow sub components to stack CSS class names</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "String"
                    ]
                },
                "description": "<p>The constructed class name</p>"
            }
        ],
        "kind": "function",
        "name": "buildCSSClass",
        "longname": "buildCSSClass",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Handles click for play \n  *\n  * @method handleClick\n  */",
        "meta": {
            "range": [
                373,
                437
            ],
            "filename": "big-play-button.js",
            "lineno": 20,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Handles click for play</p>",
        "kind": "function",
        "name": "handleClick",
        "longname": "handleClick",
        "scope": "global"
    },
    {
        "comment": "/**\n * @file Needed for full path retrieval\n */",
        "meta": {
            "range": [
                0,
                47
            ],
            "filename": "button.js",
            "lineno": 1,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "name": "button.js",
        "kind": "file",
        "description": "<p>Needed for full path retrieval</p>",
        "preserveName": true,
        "longname": "button.js",
        "scope": "global"
    },
    {
        "comment": "/**\n * Base class for all buttons\n *\n * @param {Object} player  Main Player\n * @param {Object=} options Object of option names and values\n * @extends Component\n * @class Button\n */",
        "meta": {
            "range": [
                49,
                229
            ],
            "filename": "button.js",
            "lineno": 5,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Base class for all buttons</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "description": "<p>Main Player</p>",
                "name": "player"
            },
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "optional": true,
                "description": "<p>Object of option names and values</p>",
                "name": "options"
            }
        ],
        "augments": [
            "Component"
        ],
        "kind": "class",
        "name": "Button",
        "longname": "Button",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Create the component's DOM element\n  *\n  * @param {String=} type Element's node type. e.g. 'div'\n  * @param {Object=} props An object of element attributes that should be set on the element Tag name \n  * @return {Element}\n  * @method createEl\n  */",
        "meta": {
            "range": [
                231,
                486
            ],
            "filename": "button.js",
            "lineno": 14,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Create the component's DOM element</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "String"
                    ]
                },
                "optional": true,
                "description": "<p>Element's node type. e.g. 'div'</p>",
                "name": "type"
            },
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "optional": true,
                "description": "<p>An object of element attributes that should be set on the element Tag name</p>",
                "name": "props"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "Element"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "createEl",
        "longname": "createEl",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Controls text - both request and localize \n  *\n  * @param {String} text Text for button\n  * @return {String}\n  * @method controlText\n  */",
        "meta": {
            "range": [
                488,
                633
            ],
            "filename": "button.js",
            "lineno": 23,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Controls text - both request and localize</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "String"
                    ]
                },
                "description": "<p>Text for button</p>",
                "name": "text"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "String"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "controlText",
        "longname": "controlText",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Allows sub components to stack CSS class names\n  *\n  * @return {String}\n  * @method buildCSSClass\n  */",
        "meta": {
            "range": [
                635,
                745
            ],
            "filename": "button.js",
            "lineno": 31,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Allows sub components to stack CSS class names</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "String"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "buildCSSClass",
        "longname": "buildCSSClass",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Handle Click - Override with specific functionality for button\n  *\n  * @method handleClick\n  */",
        "meta": {
            "range": [
                747,
                850
            ],
            "filename": "button.js",
            "lineno": 38,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Handle Click - Override with specific functionality for button</p>",
        "kind": "function",
        "name": "handleClick",
        "longname": "handleClick",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Handle Focus - Add keyboard functionality to element\n  *\n  * @method handleFocus\n  */",
        "meta": {
            "range": [
                852,
                945
            ],
            "filename": "button.js",
            "lineno": 44,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Handle Focus - Add keyboard functionality to element</p>",
        "kind": "function",
        "name": "handleFocus",
        "longname": "handleFocus",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Handle KeyPress (document level) - Trigger click when keys are pressed\n  *\n  * @method handleKeyPress\n  */",
        "meta": {
            "range": [
                947,
                1061
            ],
            "filename": "button.js",
            "lineno": 50,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Handle KeyPress (document level) - Trigger click when keys are pressed</p>",
        "kind": "function",
        "name": "handleKeyPress",
        "longname": "handleKeyPress",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Handle Blur - Remove keyboard triggers\n  *\n  * @method handleBlur\n  */",
        "meta": {
            "range": [
                1063,
                1141
            ],
            "filename": "button.js",
            "lineno": 56,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Handle Blur - Remove keyboard triggers</p>",
        "kind": "function",
        "name": "handleBlur",
        "longname": "handleBlur",
        "scope": "global"
    },
    {
        "comment": "/**\n * @file Player Component - Base class for all UI objects\n *\n */",
        "meta": {
            "range": [
                0,
                68
            ],
            "filename": "component.js",
            "lineno": 1,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "name": "component.js",
        "kind": "file",
        "description": "<p>Player Component - Base class for all UI objects</p>",
        "preserveName": true,
        "longname": "component.js",
        "scope": "global"
    },
    {
        "comment": "/**\n * Base UI Component class\n *\n * Components are embeddable UI objects that are represented by both a\n * javascript object and an element in the DOM. They can be children of other\n * components, and can have many children themselves.\n *\n *     // adding a button to the player\n *     var button = player.addChild('button');\n *     button.el(); // -> button element\n *\n *     <div class=\"video-js\">\n *       <div class=\"vjs-button\">Button</div>\n *     </div>\n *\n * Components are also event emitters.\n *\n *     button.on('click', function(){\n *       console.log('Button Clicked!');\n *     });\n *\n *     button.trigger('customevent');\n *\n * @param {Object} player  Main Player\n * @param {Object=} options Object of option names and values\n * @param {Function=} ready    Ready callback function\n * @class Component\n */",
        "meta": {
            "range": [
                70,
                889
            ],
            "filename": "component.js",
            "lineno": 6,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Base UI Component class</p>\n<p>Components are embeddable UI objects that are represented by both a\njavascript object and an element in the DOM. They can be children of other\ncomponents, and can have many children themselves.</p>\n<pre class=\"prettyprint source\"><code>// adding a button to the player\nvar button = player.addChild('button');\nbutton.el(); // -> button element\n\n&lt;div class=&quot;video-js&quot;>\n  &lt;div class=&quot;vjs-button&quot;>Button&lt;/div>\n&lt;/div></code></pre><p>Components are also event emitters.</p>\n<pre class=\"prettyprint source\"><code>button.on('click', function(){\n  console.log('Button Clicked!');\n});\n\nbutton.trigger('customevent');</code></pre>",
        "params": [
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "description": "<p>Main Player</p>",
                "name": "player"
            },
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "optional": true,
                "description": "<p>Object of option names and values</p>",
                "name": "options"
            },
            {
                "type": {
                    "names": [
                        "function"
                    ]
                },
                "optional": true,
                "description": "<p>Ready callback function</p>",
                "name": "ready"
            }
        ],
        "kind": "class",
        "name": "Component",
        "longname": "Component",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Dispose of the component and all child components\n   *\n   * @method dispose\n   */",
        "meta": {
            "range": [
                891,
                981
            ],
            "filename": "component.js",
            "lineno": 35,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Dispose of the component and all child components</p>",
        "kind": "function",
        "name": "dispose",
        "longname": "dispose",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Return the component's player\n   *\n   * @return {Player}\n   * @method player\n   */",
        "meta": {
            "range": [
                983,
                1074
            ],
            "filename": "component.js",
            "lineno": 41,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Return the component's player</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Player"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "player",
        "longname": "player",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Deep merge of options objects\n   *\n   * Whenever a property is an object on both options objects\n   * the two properties will be merged using mergeOptions.\n   *\n   * This is used for merging options for child components. We\n   * want it to be easy to override individual options on a child\n   * component without having to rewrite all the other default options.\n   *\n   *     Parent.prototype.options_ = {\n   *       children: {\n   *         'childOne': { 'foo': 'bar', 'asdf': 'fdsa' },\n   *         'childTwo': {},\n   *         'childThree': {}\n   *       }\n   *     }\n   *     newOptions = {\n   *       children: {\n   *         'childOne': { 'foo': 'baz', 'abc': '123' }\n   *         'childTwo': null,\n   *         'childFour': {}\n   *       }\n   *     }\n   *\n   *     this.options(newOptions);\n   *\n   * RESULT\n   *\n   *     {\n   *       children: {\n   *         'childOne': { 'foo': 'baz', 'asdf': 'fdsa', 'abc': '123' },\n   *         'childTwo': null, // Disabled. Won't be initialized.\n   *         'childThree': {},\n   *         'childFour': {}\n   *       }\n   *     }\n   *\n   * @param  {Object} obj Object of new option values\n   * @return {Object}     A NEW object of this.options_ and obj merged\n   * @method options\n   */",
        "meta": {
            "range": [
                1076,
                2318
            ],
            "filename": "component.js",
            "lineno": 48,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Deep merge of options objects</p>\n<p>Whenever a property is an object on both options objects\nthe two properties will be merged using mergeOptions.</p>\n<p>This is used for merging options for child components. We\nwant it to be easy to override individual options on a child\ncomponent without having to rewrite all the other default options.</p>\n<pre class=\"prettyprint source\"><code>Parent.prototype.options_ = {\n  children: {\n    'childOne': { 'foo': 'bar', 'asdf': 'fdsa' },\n    'childTwo': {},\n    'childThree': {}\n  }\n}\nnewOptions = {\n  children: {\n    'childOne': { 'foo': 'baz', 'abc': '123' }\n    'childTwo': null,\n    'childFour': {}\n  }\n}\n\nthis.options(newOptions);</code></pre><p>RESULT</p>\n<pre class=\"prettyprint source\"><code>{\n  children: {\n    'childOne': { 'foo': 'baz', 'asdf': 'fdsa', 'abc': '123' },\n    'childTwo': null, // Disabled. Won't be initialized.\n    'childThree': {},\n    'childFour': {}\n  }\n}</code></pre>",
        "params": [
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "description": "<p>Object of new option values</p>",
                "name": "obj"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "description": "<p>A NEW object of this.options_ and obj merged</p>"
            }
        ],
        "kind": "function",
        "name": "options",
        "longname": "options",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Get the component's DOM element\n   *\n   *     var domEl = myComponent.el();\n   *\n   * @return {Element}\n   * @method el\n   */",
        "meta": {
            "range": [
                2320,
                2454
            ],
            "filename": "component.js",
            "lineno": 91,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Get the component's DOM element</p>\n<pre class=\"prettyprint source\"><code>var domEl = myComponent.el();</code></pre>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Element"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "el",
        "longname": "el",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Create the component's DOM element\n   *\n   * @param  {String=} tagName  Element's node type. e.g. 'div'\n   * @param  {Object=} attributes An object of element attributes that should be set on the element\n   * @return {Element}\n   * @method createEl\n   */",
        "meta": {
            "range": [
                2456,
                2719
            ],
            "filename": "component.js",
            "lineno": 100,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Create the component's DOM element</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "String"
                    ]
                },
                "optional": true,
                "description": "<p>Element's node type. e.g. 'div'</p>",
                "name": "tagName"
            },
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "optional": true,
                "description": "<p>An object of element attributes that should be set on the element</p>",
                "name": "attributes"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "Element"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "createEl",
        "longname": "createEl",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Return the component's DOM element where children are inserted.\n   * Will either be the same as el() or a new element defined in createEl().\n   *\n   * @return {Element}\n   * @method contentEl\n   */",
        "meta": {
            "range": [
                2721,
                2927
            ],
            "filename": "component.js",
            "lineno": 109,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Return the component's DOM element where children are inserted.\nWill either be the same as el() or a new element defined in createEl().</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Element"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "contentEl",
        "longname": "contentEl",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Get the component's ID\n   *\n   *     var id = myComponent.id();\n   *\n   * @return {String}\n   * @method id\n  */",
        "meta": {
            "range": [
                2929,
                3049
            ],
            "filename": "component.js",
            "lineno": 117,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Get the component's ID</p>\n<pre class=\"prettyprint source\"><code>var id = myComponent.id();</code></pre>",
        "returns": [
            {
                "type": {
                    "names": [
                        "String"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "id",
        "longname": "id",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Get the component's name. The name is often used to reference the component.\n   *\n   *     var name = myComponent.name();\n   *\n   * @return {String}\n   * @method name\n   */",
        "meta": {
            "range": [
                3051,
                3232
            ],
            "filename": "component.js",
            "lineno": 126,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Get the component's name. The name is often used to reference the component.</p>\n<pre class=\"prettyprint source\"><code>var name = myComponent.name();</code></pre>",
        "returns": [
            {
                "type": {
                    "names": [
                        "String"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "name",
        "longname": "name",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Get an array of all child components\n   *\n   *     var kids = myComponent.children();\n   *\n   * @return {Array} The children\n   * @method children\n   */",
        "meta": {
            "range": [
                3234,
                3395
            ],
            "filename": "component.js",
            "lineno": 135,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Get an array of all child components</p>\n<pre class=\"prettyprint source\"><code>var kids = myComponent.children();</code></pre>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Array"
                    ]
                },
                "description": "<p>The children</p>"
            }
        ],
        "kind": "function",
        "name": "children",
        "longname": "children",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Returns a child component with the provided ID\n   *\n   * @return {Component}\n   * @method getChildById\n   */",
        "meta": {
            "range": [
                3397,
                3514
            ],
            "filename": "component.js",
            "lineno": 144,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Returns a child component with the provided ID</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Component"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "getChildById",
        "longname": "getChildById",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Returns a child component with the provided name\n   *\n   * @return {Component}\n   * @method getChild\n   */",
        "meta": {
            "range": [
                3516,
                3631
            ],
            "filename": "component.js",
            "lineno": 151,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Returns a child component with the provided name</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Component"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "getChild",
        "longname": "getChild",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Adds a child component inside this component\n   *\n   *     myComponent.el();\n   *     // -> <div class='my-component'></div>\n   *     myComponent.children();\n   *     // [empty array]\n   *\n   *     var myButton = myComponent.addChild('MyButton');\n   *     // -> <div class='my-component'><div class=\"my-button\">myButton<div></div>\n   *     // -> myButton === myComonent.children()[0];\n   *\n   * Pass in options for child constructors and options for children of the child\n   *\n   *     var myButton = myComponent.addChild('MyButton', {\n   *       text: 'Press Me',\n   *       children: {\n   *         buttonChildExample: {\n   *           buttonChildOption: true\n   *         }\n   *       }\n   *     });\n   *\n   * @param {String|Component} child The class name or instance of a child to add\n   * @param {Object=} options Options, including options to be passed to children of the child.\n   * @return {Component} The child component (created by this process if a string was used)\n   * @method addChild\n   */",
        "meta": {
            "range": [
                3633,
                4647
            ],
            "filename": "component.js",
            "lineno": 158,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Adds a child component inside this component</p>\n<pre class=\"prettyprint source\"><code>myComponent.el();\n// -> &lt;div class='my-component'>&lt;/div>\nmyComponent.children();\n// [empty array]\n\nvar myButton = myComponent.addChild('MyButton');\n// -> &lt;div class='my-component'>&lt;div class=&quot;my-button&quot;>myButton&lt;div>&lt;/div>\n// -> myButton === myComonent.children()[0];</code></pre><p>Pass in options for child constructors and options for children of the child</p>\n<pre class=\"prettyprint source\"><code>var myButton = myComponent.addChild('MyButton', {\n  text: 'Press Me',\n  children: {\n    buttonChildExample: {\n      buttonChildOption: true\n    }\n  }\n});</code></pre>",
        "params": [
            {
                "type": {
                    "names": [
                        "String",
                        "Component"
                    ]
                },
                "description": "<p>The class name or instance of a child to add</p>",
                "name": "child"
            },
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "optional": true,
                "description": "<p>Options, including options to be passed to children of the child.</p>",
                "name": "options"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "Component"
                    ]
                },
                "description": "<p>The child component (created by this process if a string was used)</p>"
            }
        ],
        "kind": "function",
        "name": "addChild",
        "longname": "addChild",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Remove a child component from this component's list of children, and the\n   * child component's element from this component's element\n   *\n   * @param  {Component} component Component to remove\n   * @method removeChild\n   */",
        "meta": {
            "range": [
                4649,
                4882
            ],
            "filename": "component.js",
            "lineno": 187,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Remove a child component from this component's list of children, and the\nchild component's element from this component's element</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Component"
                    ]
                },
                "description": "<p>Component to remove</p>",
                "name": "component"
            }
        ],
        "kind": "function",
        "name": "removeChild",
        "longname": "removeChild",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Add and initialize default child components from options\n   *\n   *     // when an instance of MyComponent is created, all children in options\n   *     // will be added to the instance by their name strings and options\n   *     MyComponent.prototype.options_.children = {\n   *       myChildComponent: {\n   *         myChildOption: true\n   *       }\n   *     }\n   *\n   *     // Or when creating the component\n   *     var myComp = new MyComponent(player, {\n   *       children: {\n   *         myChildComponent: {\n   *           myChildOption: true\n   *         }\n   *       }\n   *     });\n   *\n   * The children option can also be an Array of child names or\n   * child options objects (that also include a 'name' key).\n   *\n   *     var myComp = new MyComponent(player, {\n   *       children: [\n   *         'button',\n   *         {\n   *           name: 'button',\n   *           someOtherOption: true\n   *         }\n   *       ]\n   *     });\n   *\n   * @method initChildren\n   */",
        "meta": {
            "range": [
                4884,
                5869
            ],
            "filename": "component.js",
            "lineno": 195,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Add and initialize default child components from options</p>\n<pre class=\"prettyprint source\"><code>// when an instance of MyComponent is created, all children in options\n// will be added to the instance by their name strings and options\nMyComponent.prototype.options_.children = {\n  myChildComponent: {\n    myChildOption: true\n  }\n}\n\n// Or when creating the component\nvar myComp = new MyComponent(player, {\n  children: {\n    myChildComponent: {\n      myChildOption: true\n    }\n  }\n});</code></pre><p>The children option can also be an Array of child names or\nchild options objects (that also include a 'name' key).</p>\n<pre class=\"prettyprint source\"><code>var myComp = new MyComponent(player, {\n  children: [\n    'button',\n    {\n      name: 'button',\n      someOtherOption: true\n    }\n  ]\n});</code></pre>",
        "kind": "function",
        "name": "initChildren",
        "longname": "initChildren",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Allows sub components to stack CSS class names\n   *\n   * @return {String} The constructed class name\n   * @method buildCSSClass\n   */",
        "meta": {
            "range": [
                5871,
                6013
            ],
            "filename": "component.js",
            "lineno": 231,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Allows sub components to stack CSS class names</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "String"
                    ]
                },
                "description": "<p>The constructed class name</p>"
            }
        ],
        "kind": "function",
        "name": "buildCSSClass",
        "longname": "buildCSSClass",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Add an event listener to this component's element\n   *\n   *     var myFunc = function(){\n   *       var myComponent = this;\n   *       // Do something when the event is fired\n   *     };\n   *\n   *     myComponent.on('eventType', myFunc);\n   *\n   * The context of myFunc will be myComponent unless previously bound.\n   *\n   * Alternatively, you can add a listener to another element or component.\n   *\n   *     myComponent.on(otherElement, 'eventName', myFunc);\n   *     myComponent.on(otherComponent, 'eventName', myFunc);\n   *\n   * The benefit of using this over `VjsEvents.on(otherElement, 'eventName', myFunc)`\n   * and `otherComponent.on('eventName', myFunc)` is that this way the listeners\n   * will be automatically cleaned up when either component is disposed.\n   * It will also bind myComponent as the context of myFunc.\n   *\n   * **NOTE**: When using this on elements in the page other than window\n   * and document (both permanent), if you remove the element from the DOM\n   * you need to call `myComponent.trigger(el, 'dispose')` on it to clean up\n   * references to it and allow the browser to garbage collect it.\n   *\n   * @param  {String|Component} first   The event type or other component\n   * @param  {Function|String}      second  The event handler or event type\n   * @param  {Function}             third   The event handler\n   * @return {Component} \n   * @method on\n   */",
        "meta": {
            "range": [
                6015,
                7414
            ],
            "filename": "component.js",
            "lineno": 238,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Add an event listener to this component's element</p>\n<pre class=\"prettyprint source\"><code>var myFunc = function(){\n  var myComponent = this;\n  // Do something when the event is fired\n};\n\nmyComponent.on('eventType', myFunc);</code></pre><p>The context of myFunc will be myComponent unless previously bound.</p>\n<p>Alternatively, you can add a listener to another element or component.</p>\n<pre class=\"prettyprint source\"><code>myComponent.on(otherElement, 'eventName', myFunc);\nmyComponent.on(otherComponent, 'eventName', myFunc);</code></pre><p>The benefit of using this over <code>VjsEvents.on(otherElement, 'eventName', myFunc)</code>\nand <code>otherComponent.on('eventName', myFunc)</code> is that this way the listeners\nwill be automatically cleaned up when either component is disposed.\nIt will also bind myComponent as the context of myFunc.</p>\n<p><strong>NOTE</strong>: When using this on elements in the page other than window\nand document (both permanent), if you remove the element from the DOM\nyou need to call <code>myComponent.trigger(el, 'dispose')</code> on it to clean up\nreferences to it and allow the browser to garbage collect it.</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "String",
                        "Component"
                    ]
                },
                "description": "<p>The event type or other component</p>",
                "name": "first"
            },
            {
                "type": {
                    "names": [
                        "function",
                        "String"
                    ]
                },
                "description": "<p>The event handler or event type</p>",
                "name": "second"
            },
            {
                "type": {
                    "names": [
                        "function"
                    ]
                },
                "description": "<p>The event handler</p>",
                "name": "third"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "Component"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "on",
        "longname": "on",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Remove an event listener from this component's element\n   *\n   *     myComponent.off('eventType', myFunc);\n   *\n   * If myFunc is excluded, ALL listeners for the event type will be removed.\n   * If eventType is excluded, ALL listeners will be removed from the component.\n   *\n   * Alternatively you can use `off` to remove listeners that were added to other\n   * elements or components using `myComponent.on(otherComponent...`.\n   * In this case both the event type and listener function are REQUIRED.\n   *\n   *     myComponent.off(otherElement, 'eventType', myFunc);\n   *     myComponent.off(otherComponent, 'eventType', myFunc);\n   *\n   * @param  {String=|Component}  first  The event type or other component\n   * @param  {Function=|String}       second The listener function or event type\n   * @param  {Function=}              third  The listener for other component\n   * @return {Component}\n   * @method off\n   */",
        "meta": {
            "range": [
                7416,
                8342
            ],
            "filename": "component.js",
            "lineno": 272,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Remove an event listener from this component's element</p>\n<pre class=\"prettyprint source\"><code>myComponent.off('eventType', myFunc);</code></pre><p>If myFunc is excluded, ALL listeners for the event type will be removed.\nIf eventType is excluded, ALL listeners will be removed from the component.</p>\n<p>Alternatively you can use <code>off</code> to remove listeners that were added to other\nelements or components using <code>myComponent.on(otherComponent...</code>.\nIn this case both the event type and listener function are REQUIRED.</p>\n<pre class=\"prettyprint source\"><code>myComponent.off(otherElement, 'eventType', myFunc);\nmyComponent.off(otherComponent, 'eventType', myFunc);</code></pre>",
        "params": [
            {
                "type": {
                    "names": [
                        "String",
                        "Component"
                    ]
                },
                "description": "<p>The event type or other component</p>",
                "name": "first"
            },
            {
                "type": {
                    "names": [
                        "function",
                        "String"
                    ]
                },
                "description": "<p>The listener function or event type</p>",
                "name": "second"
            },
            {
                "type": {
                    "names": [
                        "function"
                    ]
                },
                "optional": true,
                "description": "<p>The listener for other component</p>",
                "name": "third"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "Component"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "off",
        "longname": "off",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Add an event listener to be triggered only once and then removed\n   *\n   *     myComponent.one('eventName', myFunc);\n   *\n   * Alternatively you can add a listener to another element or component\n   * that will be triggered only once.\n   *\n   *     myComponent.one(otherElement, 'eventName', myFunc);\n   *     myComponent.one(otherComponent, 'eventName', myFunc);\n   *\n   * @param  {String|Component}  first   The event type or other component\n   * @param  {Function|String}       second  The listener function or event type\n   * @param  {Function=}             third   The listener function for other component\n   * @return {Component}\n   * @method one\n   */",
        "meta": {
            "range": [
                8344,
                9012
            ],
            "filename": "component.js",
            "lineno": 294,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Add an event listener to be triggered only once and then removed</p>\n<pre class=\"prettyprint source\"><code>myComponent.one('eventName', myFunc);</code></pre><p>Alternatively you can add a listener to another element or component\nthat will be triggered only once.</p>\n<pre class=\"prettyprint source\"><code>myComponent.one(otherElement, 'eventName', myFunc);\nmyComponent.one(otherComponent, 'eventName', myFunc);</code></pre>",
        "params": [
            {
                "type": {
                    "names": [
                        "String",
                        "Component"
                    ]
                },
                "description": "<p>The event type or other component</p>",
                "name": "first"
            },
            {
                "type": {
                    "names": [
                        "function",
                        "String"
                    ]
                },
                "description": "<p>The listener function or event type</p>",
                "name": "second"
            },
            {
                "type": {
                    "names": [
                        "function"
                    ]
                },
                "optional": true,
                "description": "<p>The listener function for other component</p>",
                "name": "third"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "Component"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "one",
        "longname": "one",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Trigger an event on an element\n   *\n   *     myComponent.trigger('eventName');\n   *     myComponent.trigger({'type':'eventName'});\n   *     myComponent.trigger('eventName', {data: 'some data'});\n   *     myComponent.trigger({'type':'eventName'}, {data: 'some data'});\n   *\n   * @param  {Event|Object|String} event  A string (the type) or an event object with a type attribute\n   * @param  {Object} [hash] data hash to pass along with the event\n   * @return {Component}       self\n   * @method trigger\n   */",
        "meta": {
            "range": [
                9014,
                9529
            ],
            "filename": "component.js",
            "lineno": 312,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Trigger an event on an element</p>\n<pre class=\"prettyprint source\"><code>myComponent.trigger('eventName');\nmyComponent.trigger({'type':'eventName'});\nmyComponent.trigger('eventName', {data: 'some data'});\nmyComponent.trigger({'type':'eventName'}, {data: 'some data'});</code></pre>",
        "params": [
            {
                "type": {
                    "names": [
                        "Event",
                        "Object",
                        "String"
                    ]
                },
                "description": "<p>A string (the type) or an event object with a type attribute</p>",
                "name": "event"
            },
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "optional": true,
                "description": "<p>data hash to pass along with the event</p>",
                "name": "hash"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "Component"
                    ]
                },
                "description": "<p>self</p>"
            }
        ],
        "kind": "function",
        "name": "trigger",
        "longname": "trigger",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Bind a listener to the component's ready state\n   *\n   * Different from event listeners in that if the ready event has already happened\n   * it will trigger the function immediately.\n   *\n   * @param  {Function} fn Ready listener\n   * @return {Component}\n   * @method ready\n   */",
        "meta": {
            "range": [
                9531,
                9819
            ],
            "filename": "component.js",
            "lineno": 326,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Bind a listener to the component's ready state</p>\n<p>Different from event listeners in that if the ready event has already happened\nit will trigger the function immediately.</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "function"
                    ]
                },
                "description": "<p>Ready listener</p>",
                "name": "fn"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "Component"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "ready",
        "longname": "ready",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Trigger the ready listeners\n   *\n   * @return {Component}\n   * @method triggerReady\n   */",
        "meta": {
            "range": [
                9821,
                9919
            ],
            "filename": "component.js",
            "lineno": 337,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Trigger the ready listeners</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Component"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "triggerReady",
        "longname": "triggerReady",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Check if a component's element has a CSS class name\n   *\n   * @param {String} classToCheck Classname to check\n   * @return {Component}\n   * @method hasClass\n   */",
        "meta": {
            "range": [
                9921,
                10092
            ],
            "filename": "component.js",
            "lineno": 344,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Check if a component's element has a CSS class name</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "String"
                    ]
                },
                "description": "<p>Classname to check</p>",
                "name": "classToCheck"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "Component"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "hasClass",
        "longname": "hasClass",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Add a CSS class name to the component's element\n   *\n   * @param {String} classToAdd Classname to add\n   * @return {Component}\n   * @method addClass\n   */",
        "meta": {
            "range": [
                10094,
                10257
            ],
            "filename": "component.js",
            "lineno": 352,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Add a CSS class name to the component's element</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "String"
                    ]
                },
                "description": "<p>Classname to add</p>",
                "name": "classToAdd"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "Component"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "addClass",
        "longname": "addClass",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Remove and return a CSS class name from the component's element\n   *\n   * @param {String} classToRemove Classname to remove\n   * @return {Component}\n   * @method removeClass\n   */",
        "meta": {
            "range": [
                10259,
                10447
            ],
            "filename": "component.js",
            "lineno": 360,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Remove and return a CSS class name from the component's element</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "String"
                    ]
                },
                "description": "<p>Classname to remove</p>",
                "name": "classToRemove"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "Component"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "removeClass",
        "longname": "removeClass",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Show the component element if hidden\n   *\n   * @return {Component}\n   * @method show\n   */",
        "meta": {
            "range": [
                10449,
                10548
            ],
            "filename": "component.js",
            "lineno": 368,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Show the component element if hidden</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Component"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "show",
        "longname": "show",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Hide the component element if currently showing\n   *\n   * @return {Component}\n   * @method hide\n   */",
        "meta": {
            "range": [
                10550,
                10660
            ],
            "filename": "component.js",
            "lineno": 375,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Hide the component element if currently showing</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Component"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "hide",
        "longname": "hide",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Lock an item in its visible state\n   * To be used with fadeIn/fadeOut.\n   *\n   * @return {Component}\n   * @private\n   * @method lockShowing\n   */",
        "meta": {
            "range": [
                10662,
                10816
            ],
            "filename": "component.js",
            "lineno": 382,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Lock an item in its visible state\nTo be used with fadeIn/fadeOut.</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Component"
                    ]
                }
            }
        ],
        "access": "private",
        "kind": "function",
        "name": "lockShowing",
        "longname": "lockShowing",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Unlock an item to be hidden\n   * To be used with fadeIn/fadeOut.\n   *\n   * @return {Component}\n   * @private\n   * @method unlockShowing\n   */",
        "meta": {
            "range": [
                10818,
                10968
            ],
            "filename": "component.js",
            "lineno": 391,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Unlock an item to be hidden\nTo be used with fadeIn/fadeOut.</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Component"
                    ]
                }
            }
        ],
        "access": "private",
        "kind": "function",
        "name": "unlockShowing",
        "longname": "unlockShowing",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Set or get the width of the component (CSS values)\n   *\n   * Setting the video tag dimension values only works with values in pixels.\n   * Percent values will not work.\n   * Some percents can be used, but width()/height() will return the number + %,\n   * not the actual computed width/height.\n   *\n   * @param  {Number|String=} num   Optional width number\n   * @param  {Boolean} skipListeners Skip the 'resize' event trigger\n   * @return {Component} This component, when setting the width\n   * @return {Number|String} The width, when getting\n   * @method width\n   */",
        "meta": {
            "range": [
                10970,
                11545
            ],
            "filename": "component.js",
            "lineno": 400,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Set or get the width of the component (CSS values)</p>\n<p>Setting the video tag dimension values only works with values in pixels.\nPercent values will not work.\nSome percents can be used, but width()/height() will return the number + %,\nnot the actual computed width/height.</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Number",
                        "String"
                    ]
                },
                "description": "<p>Optional width number</p>",
                "name": "num"
            },
            {
                "type": {
                    "names": [
                        "Boolean"
                    ]
                },
                "description": "<p>Skip the 'resize' event trigger</p>",
                "name": "skipListeners"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "Component"
                    ]
                },
                "description": "<p>This component, when setting the width</p>"
            },
            {
                "type": {
                    "names": [
                        "Number",
                        "String"
                    ]
                },
                "description": "<p>The width, when getting</p>"
            }
        ],
        "kind": "function",
        "name": "width",
        "longname": "width",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Get or set the height of the component (CSS values)\n   *\n   * Setting the video tag dimension values only works with values in pixels.\n   * Percent values will not work.\n   * Some percents can be used, but width()/height() will return the number + %,\n   * not the actual computed width/height.\n   *\n   * @param  {Number|String=} num     New component height\n   * @param  {Boolean=} skipListeners Skip the resize event trigger\n   * @return {Component} This component, when setting the height\n   * @return {Number|String} The height, when getting\n   * @method height\n   */",
        "meta": {
            "range": [
                11547,
                12126
            ],
            "filename": "component.js",
            "lineno": 415,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Get or set the height of the component (CSS values)</p>\n<p>Setting the video tag dimension values only works with values in pixels.\nPercent values will not work.\nSome percents can be used, but width()/height() will return the number + %,\nnot the actual computed width/height.</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Number",
                        "String"
                    ]
                },
                "description": "<p>New component height</p>",
                "name": "num"
            },
            {
                "type": {
                    "names": [
                        "Boolean"
                    ]
                },
                "optional": true,
                "description": "<p>Skip the resize event trigger</p>",
                "name": "skipListeners"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "Component"
                    ]
                },
                "description": "<p>This component, when setting the height</p>"
            },
            {
                "type": {
                    "names": [
                        "Number",
                        "String"
                    ]
                },
                "description": "<p>The height, when getting</p>"
            }
        ],
        "kind": "function",
        "name": "height",
        "longname": "height",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Set both width and height at the same time\n   *\n   * @param  {Number|String} width Width of player\n   * @param  {Number|String} height Height of player\n   * @return {Component} The component\n   * @method dimensions\n   */",
        "meta": {
            "range": [
                12128,
                12357
            ],
            "filename": "component.js",
            "lineno": 430,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Set both width and height at the same time</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Number",
                        "String"
                    ]
                },
                "description": "<p>Width of player</p>",
                "name": "width"
            },
            {
                "type": {
                    "names": [
                        "Number",
                        "String"
                    ]
                },
                "description": "<p>Height of player</p>",
                "name": "height"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "Component"
                    ]
                },
                "description": "<p>The component</p>"
            }
        ],
        "kind": "function",
        "name": "dimensions",
        "longname": "dimensions",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Get or set width or height\n   *\n   * This is the shared code for the width() and height() methods.\n   * All for an integer, integer + 'px' or integer + '%';\n   *\n   * Known issue: Hidden elements officially have a width of 0. We're defaulting\n   * to the style.width value and falling back to computedStyle which has the\n   * hidden element issue. Info, but probably not an efficient fix:\n   * http://www.foliotek.com/devblog/getting-the-width-of-a-hidden-element-with-jquery-using-width/\n   *\n   * @param  {String} widthOrHeight  'width' or 'height'\n   * @param  {Number|String=} num     New dimension\n   * @param  {Boolean=} skipListeners Skip resize event trigger\n   * @return {Component} The component if a dimension was set\n   * @return {Number|String} The dimension if nothing was set\n   * @private\n   * @method dimension\n   */",
        "meta": {
            "range": [
                12359,
                13201
            ],
            "filename": "component.js",
            "lineno": 439,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Get or set width or height</p>\n<p>This is the shared code for the width() and height() methods.\nAll for an integer, integer + 'px' or integer + '%';</p>\n<p>Known issue: Hidden elements officially have a width of 0. We're defaulting\nto the style.width value and falling back to computedStyle which has the\nhidden element issue. Info, but probably not an efficient fix:\nhttp://www.foliotek.com/devblog/getting-the-width-of-a-hidden-element-with-jquery-using-width/</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "String"
                    ]
                },
                "description": "<p>'width' or 'height'</p>",
                "name": "widthOrHeight"
            },
            {
                "type": {
                    "names": [
                        "Number",
                        "String"
                    ]
                },
                "description": "<p>New dimension</p>",
                "name": "num"
            },
            {
                "type": {
                    "names": [
                        "Boolean"
                    ]
                },
                "optional": true,
                "description": "<p>Skip resize event trigger</p>",
                "name": "skipListeners"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "Component"
                    ]
                },
                "description": "<p>The component if a dimension was set</p>"
            },
            {
                "type": {
                    "names": [
                        "Number",
                        "String"
                    ]
                },
                "description": "<p>The dimension if nothing was set</p>"
            }
        ],
        "access": "private",
        "kind": "function",
        "name": "dimension",
        "longname": "dimension",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Emit 'tap' events when touch events are supported\n   *\n   * This is used to support toggling the controls through a tap on the video.\n   *\n   * We're requiring them to be enabled because otherwise every component would\n   * have this extra overhead unnecessarily, on mobile devices where extra\n   * overhead is especially bad.\n   *\n   * @private\n   * @method emitTapEvents\n   */",
        "meta": {
            "range": [
                13203,
                13590
            ],
            "filename": "component.js",
            "lineno": 459,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Emit 'tap' events when touch events are supported</p>\n<p>This is used to support toggling the controls through a tap on the video.</p>\n<p>We're requiring them to be enabled because otherwise every component would\nhave this extra overhead unnecessarily, on mobile devices where extra\noverhead is especially bad.</p>",
        "access": "private",
        "kind": "function",
        "name": "emitTapEvents",
        "longname": "emitTapEvents",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Report user touch activity when touch events occur\n   *\n   * User activity is used to determine when controls should show/hide. It's\n   * relatively simple when it comes to mouse events, because any mouse event\n   * should show the controls. So we capture mouse events that bubble up to the\n   * player and report activity when that happens.\n   *\n   * With touch events it isn't as easy. We can't rely on touch events at the\n   * player level, because a tap (touchstart + touchend) on the video itself on\n   * mobile devices is meant to turn controls off (and on). User activity is\n   * checked asynchronously, so what could happen is a tap event on the video\n   * turns the controls off, then the touchend event bubbles up to the player,\n   * which if it reported user activity, would turn the controls right back on.\n   * (We also don't want to completely block touch events from bubbling up)\n   *\n   * Also a touchmove, touch+hold, and anything other than a tap is not supposed\n   * to turn the controls back on on a mobile device.\n   *\n   * Here we're setting the default component behavior to report user activity\n   * whenever touch events happen, and this can be turned off by components that\n   * want touch events to act differently.\n   *\n   * @method enableTouchActivity\n   */",
        "meta": {
            "range": [
                13592,
                14887
            ],
            "filename": "component.js",
            "lineno": 472,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Report user touch activity when touch events occur</p>\n<p>User activity is used to determine when controls should show/hide. It's\nrelatively simple when it comes to mouse events, because any mouse event\nshould show the controls. So we capture mouse events that bubble up to the\nplayer and report activity when that happens.</p>\n<p>With touch events it isn't as easy. We can't rely on touch events at the\nplayer level, because a tap (touchstart + touchend) on the video itself on\nmobile devices is meant to turn controls off (and on). User activity is\nchecked asynchronously, so what could happen is a tap event on the video\nturns the controls off, then the touchend event bubbles up to the player,\nwhich if it reported user activity, would turn the controls right back on.\n(We also don't want to completely block touch events from bubbling up)</p>\n<p>Also a touchmove, touch+hold, and anything other than a tap is not supposed\nto turn the controls back on on a mobile device.</p>\n<p>Here we're setting the default component behavior to report user activity\nwhenever touch events happen, and this can be turned off by components that\nwant touch events to act differently.</p>",
        "kind": "function",
        "name": "enableTouchActivity",
        "longname": "enableTouchActivity",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Creates timeout and sets up disposal automatically.\n   *\n   * @param {Function} fn The function to run after the timeout.\n   * @param {Number} timeout Number of ms to delay before executing specified function.\n   * @return {Number} Returns the timeout ID\n   * @method setTimeout\n   */",
        "meta": {
            "range": [
                14889,
                15182
            ],
            "filename": "component.js",
            "lineno": 498,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Creates timeout and sets up disposal automatically.</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "function"
                    ]
                },
                "description": "<p>The function to run after the timeout.</p>",
                "name": "fn"
            },
            {
                "type": {
                    "names": [
                        "Number"
                    ]
                },
                "description": "<p>Number of ms to delay before executing specified function.</p>",
                "name": "timeout"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "Number"
                    ]
                },
                "description": "<p>Returns the timeout ID</p>"
            }
        ],
        "kind": "function",
        "name": "setTimeout",
        "longname": "setTimeout",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Clears a timeout and removes the associated dispose listener\n   *\n   * @param {Number} timeoutId The id of the timeout to clear\n   * @return {Number} Returns the timeout ID\n   * @method clearTimeout\n   */",
        "meta": {
            "range": [
                15184,
                15397
            ],
            "filename": "component.js",
            "lineno": 507,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Clears a timeout and removes the associated dispose listener</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Number"
                    ]
                },
                "description": "<p>The id of the timeout to clear</p>",
                "name": "timeoutId"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "Number"
                    ]
                },
                "description": "<p>Returns the timeout ID</p>"
            }
        ],
        "kind": "function",
        "name": "clearTimeout",
        "longname": "clearTimeout",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Creates an interval and sets up disposal automatically.\n   *\n   * @param {Function} fn The function to run every N seconds.\n   * @param {Number} interval Number of ms to delay before executing specified function.\n   * @return {Number} Returns the interval ID\n   * @method setInterval\n   */",
        "meta": {
            "range": [
                15399,
                15697
            ],
            "filename": "component.js",
            "lineno": 515,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Creates an interval and sets up disposal automatically.</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "function"
                    ]
                },
                "description": "<p>The function to run every N seconds.</p>",
                "name": "fn"
            },
            {
                "type": {
                    "names": [
                        "Number"
                    ]
                },
                "description": "<p>Number of ms to delay before executing specified function.</p>",
                "name": "interval"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "Number"
                    ]
                },
                "description": "<p>Returns the interval ID</p>"
            }
        ],
        "kind": "function",
        "name": "setInterval",
        "longname": "setInterval",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Clears an interval and removes the associated dispose listener\n   *\n   * @param {Number} intervalId The id of the interval to clear\n   * @return {Number} Returns the interval ID\n   * @method clearInterval\n   */",
        "meta": {
            "range": [
                15699,
                15918
            ],
            "filename": "component.js",
            "lineno": 524,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Clears an interval and removes the associated dispose listener</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Number"
                    ]
                },
                "description": "<p>The id of the interval to clear</p>",
                "name": "intervalId"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "Number"
                    ]
                },
                "description": "<p>Returns the interval ID</p>"
            }
        ],
        "kind": "function",
        "name": "clearInterval",
        "longname": "clearInterval",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Registers a component\n  *\n  * @param {String} name Name of the component to register\n  * @param {Object} comp The component to register  \n  * @static\n  * @method registerComponent\n  */",
        "meta": {
            "range": [
                15920,
                16112
            ],
            "filename": "component.js",
            "lineno": 532,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Registers a component</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "String"
                    ]
                },
                "description": "<p>Name of the component to register</p>",
                "name": "name"
            },
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "description": "<p>The component to register</p>",
                "name": "comp"
            }
        ],
        "scope": "static",
        "kind": "function",
        "name": "registerComponent",
        "longname": "registerComponent"
    },
    {
        "comment": "/**\n  * Gets a component by name\n  *\n  * @param {String} name Name of the component to get\n  * @return {Component}\n  * @static\n  * @method getComponent\n  */",
        "meta": {
            "range": [
                16114,
                16270
            ],
            "filename": "component.js",
            "lineno": 541,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Gets a component by name</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "String"
                    ]
                },
                "description": "<p>Name of the component to get</p>",
                "name": "name"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "Component"
                    ]
                }
            }
        ],
        "scope": "static",
        "kind": "function",
        "name": "getComponent",
        "longname": "getComponent"
    },
    {
        "comment": "/**\n  * Sets up the constructor using the supplied init method\n  * or uses the init of the parent object\n  *\n  * @param {Object} props An object of properties  \n  * @static\n  * @method extend\n  */",
        "meta": {
            "range": [
                16272,
                16468
            ],
            "filename": "component.js",
            "lineno": 550,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Sets up the constructor using the supplied init method\nor uses the init of the parent object</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "description": "<p>An object of properties</p>",
                "name": "props"
            }
        ],
        "scope": "static",
        "kind": "function",
        "name": "extend",
        "longname": "extend"
    },
    {
        "comment": "/**\n * Container of main controls\n *\n * @extends Component\n * @class ControlBar\n */",
        "meta": {
            "range": [
                0,
                83
            ],
            "filename": "control-bar.js",
            "lineno": 1,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar",
            "code": {}
        },
        "description": "<p>Container of main controls</p>",
        "augments": [
            "Component"
        ],
        "kind": "class",
        "name": "ControlBar",
        "longname": "ControlBar",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Create the component's DOM element\n  *\n  * @return {Element}\n  * @method createEl\n  */",
        "meta": {
            "range": [
                85,
                179
            ],
            "filename": "control-bar.js",
            "lineno": 8,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar",
            "code": {}
        },
        "description": "<p>Create the component's DOM element</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Element"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "createEl",
        "longname": "createEl",
        "scope": "global"
    },
    {
        "comment": "/**\n * Toggle fullscreen video\n *\n * @extends Button\n * @class FullscreenToggle\n */",
        "meta": {
            "range": [
                0,
                83
            ],
            "filename": "fullscreen-toggle.js",
            "lineno": 1,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar",
            "code": {}
        },
        "description": "<p>Toggle fullscreen video</p>",
        "augments": [
            "Button"
        ],
        "kind": "class",
        "name": "FullscreenToggle",
        "longname": "FullscreenToggle",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Allow sub components to stack CSS class names\n  *\n  * @return {String} The constructed class name\n  * @method buildCSSClass\n  */",
        "meta": {
            "range": [
                85,
                221
            ],
            "filename": "fullscreen-toggle.js",
            "lineno": 8,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar",
            "code": {}
        },
        "description": "<p>Allow sub components to stack CSS class names</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "String"
                    ]
                },
                "description": "<p>The constructed class name</p>"
            }
        ],
        "kind": "function",
        "name": "buildCSSClass",
        "longname": "buildCSSClass",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Handles click for full screen\n  *\n  * @method handleClick\n  */",
        "meta": {
            "range": [
                223,
                293
            ],
            "filename": "fullscreen-toggle.js",
            "lineno": 15,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar",
            "code": {}
        },
        "description": "<p>Handles click for full screen</p>",
        "kind": "function",
        "name": "handleClick",
        "longname": "handleClick",
        "scope": "global"
    },
    {
        "comment": "/**\n * Displays the live indicator\n * TODO - Future make it click to snap to live\n * \n * @extends Component\n * @class LiveDisplay\n */",
        "meta": {
            "range": [
                0,
                133
            ],
            "filename": "live-display.js",
            "lineno": 1,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar",
            "code": {}
        },
        "description": "<p>Displays the live indicator\nTODO - Future make it click to snap to live</p>",
        "augments": [
            "Component"
        ],
        "kind": "class",
        "name": "LiveDisplay",
        "longname": "LiveDisplay",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Create the component's DOM element\n  *\n  * @return {Element}\n  * @method createEl\n  */",
        "meta": {
            "range": [
                135,
                229
            ],
            "filename": "live-display.js",
            "lineno": 9,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar",
            "code": {}
        },
        "description": "<p>Create the component's DOM element</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Element"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "createEl",
        "longname": "createEl",
        "scope": "global"
    },
    {
        "comment": "/**\n * A button component for muting the audio\n *\n * @param {Player|Object} player\n * @param {Object=} options\n * @extends Button\n * @class MuteToggle\n */",
        "meta": {
            "range": [
                0,
                154
            ],
            "filename": "mute-toggle.js",
            "lineno": 1,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar",
            "code": {}
        },
        "description": "<p>A button component for muting the audio</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Player",
                        "Object"
                    ]
                },
                "name": "player"
            },
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "optional": true,
                "name": "options"
            }
        ],
        "augments": [
            "Button"
        ],
        "kind": "class",
        "name": "MuteToggle",
        "longname": "MuteToggle",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Allow sub components to stack CSS class names\n  *\n  * @return {String} The constructed class name\n  * @method buildCSSClass\n  */",
        "meta": {
            "range": [
                156,
                292
            ],
            "filename": "mute-toggle.js",
            "lineno": 10,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar",
            "code": {}
        },
        "description": "<p>Allow sub components to stack CSS class names</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "String"
                    ]
                },
                "description": "<p>The constructed class name</p>"
            }
        ],
        "kind": "function",
        "name": "buildCSSClass",
        "longname": "buildCSSClass",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Handle click on mute\n  *\n  * @method handleClick\n  */",
        "meta": {
            "range": [
                294,
                355
            ],
            "filename": "mute-toggle.js",
            "lineno": 17,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar",
            "code": {}
        },
        "description": "<p>Handle click on mute</p>",
        "kind": "function",
        "name": "handleClick",
        "longname": "handleClick",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Update volume\n  *\n  * @method update\n  */",
        "meta": {
            "range": [
                357,
                406
            ],
            "filename": "mute-toggle.js",
            "lineno": 23,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar",
            "code": {}
        },
        "description": "<p>Update volume</p>",
        "kind": "function",
        "name": "update",
        "longname": "update",
        "scope": "global"
    },
    {
        "comment": "/**\n * Button to toggle between play and pause\n *\n * @param {Player|Object} player\n * @param {Object=} options\n * @extends Button\n * @class PlayToggle\n */",
        "meta": {
            "range": [
                0,
                154
            ],
            "filename": "play-toggle.js",
            "lineno": 1,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar",
            "code": {}
        },
        "description": "<p>Button to toggle between play and pause</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Player",
                        "Object"
                    ]
                },
                "name": "player"
            },
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "optional": true,
                "name": "options"
            }
        ],
        "augments": [
            "Button"
        ],
        "kind": "class",
        "name": "PlayToggle",
        "longname": "PlayToggle",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Allow sub components to stack CSS class names\n  *\n  * @return {String} The constructed class name\n  * @method buildCSSClass\n  */",
        "meta": {
            "range": [
                156,
                292
            ],
            "filename": "play-toggle.js",
            "lineno": 10,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar",
            "code": {}
        },
        "description": "<p>Allow sub components to stack CSS class names</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "String"
                    ]
                },
                "description": "<p>The constructed class name</p>"
            }
        ],
        "kind": "function",
        "name": "buildCSSClass",
        "longname": "buildCSSClass",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Handle click to toggle between play and pause\n  *\n  * @method handleClick\n  */",
        "meta": {
            "range": [
                294,
                380
            ],
            "filename": "play-toggle.js",
            "lineno": 17,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar",
            "code": {}
        },
        "description": "<p>Handle click to toggle between play and pause</p>",
        "kind": "function",
        "name": "handleClick",
        "longname": "handleClick",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Add the vjs-playing class to the element so it can change appearance\n  *\n  * @method handlePlay\n  */",
        "meta": {
            "range": [
                382,
                490
            ],
            "filename": "play-toggle.js",
            "lineno": 23,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar",
            "code": {}
        },
        "description": "<p>Add the vjs-playing class to the element so it can change appearance</p>",
        "kind": "function",
        "name": "handlePlay",
        "longname": "handlePlay",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Add the vjs-paused class to the element so it can change appearance\n  *\n  * @method handlePause\n  */",
        "meta": {
            "range": [
                492,
                600
            ],
            "filename": "play-toggle.js",
            "lineno": 29,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar",
            "code": {}
        },
        "description": "<p>Add the vjs-paused class to the element so it can change appearance</p>",
        "kind": "function",
        "name": "handlePause",
        "longname": "handlePause",
        "scope": "global"
    },
    {
        "comment": "/**\n * @file Needed for full path retrieval\n */",
        "meta": {
            "range": [
                0,
                47
            ],
            "filename": "playback-rate-menu-button.js",
            "lineno": 1,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/playback-rate-menu",
            "code": {}
        },
        "name": "control-bar/playback-rate-menu/playback-rate-menu-button.js",
        "kind": "file",
        "description": "<p>Needed for full path retrieval</p>",
        "preserveName": true,
        "longname": "control-bar/playback-rate-menu/playback-rate-menu-button.js",
        "scope": "global"
    },
    {
        "comment": "/**\n * The component for controlling the playback rate\n *\n * @param {Player|Object} player\n * @param {Object=} options\n * @extends MenuButton\n * @class PlaybackRateMenuButton\n */",
        "meta": {
            "range": [
                49,
                227
            ],
            "filename": "playback-rate-menu-button.js",
            "lineno": 5,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/playback-rate-menu",
            "code": {}
        },
        "description": "<p>The component for controlling the playback rate</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Player",
                        "Object"
                    ]
                },
                "name": "player"
            },
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "optional": true,
                "name": "options"
            }
        ],
        "augments": [
            "MenuButton"
        ],
        "kind": "class",
        "name": "PlaybackRateMenuButton",
        "longname": "PlaybackRateMenuButton",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Create the component's DOM element\n  *\n  * @return {Element}\n  * @method createEl\n  */",
        "meta": {
            "range": [
                229,
                323
            ],
            "filename": "playback-rate-menu-button.js",
            "lineno": 14,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/playback-rate-menu",
            "code": {}
        },
        "description": "<p>Create the component's DOM element</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Element"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "createEl",
        "longname": "createEl",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Allow sub components to stack CSS class names\n  *\n  * @return {String} The constructed class name\n  * @method buildCSSClass\n  */",
        "meta": {
            "range": [
                325,
                461
            ],
            "filename": "playback-rate-menu-button.js",
            "lineno": 21,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/playback-rate-menu",
            "code": {}
        },
        "description": "<p>Allow sub components to stack CSS class names</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "String"
                    ]
                },
                "description": "<p>The constructed class name</p>"
            }
        ],
        "kind": "function",
        "name": "buildCSSClass",
        "longname": "buildCSSClass",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Create the playback rate menu\n  *\n  * @return {Menu} Menu object populated with items\n  * @method createMenu\n  */",
        "meta": {
            "range": [
                463,
                584
            ],
            "filename": "playback-rate-menu-button.js",
            "lineno": 28,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/playback-rate-menu",
            "code": {}
        },
        "description": "<p>Create the playback rate menu</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Menu"
                    ]
                },
                "description": "<p>Menu object populated with items</p>"
            }
        ],
        "kind": "function",
        "name": "createMenu",
        "longname": "createMenu",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Updates ARIA accessibility attributes\n  *\n  * @method updateARIAAttributes\n  */",
        "meta": {
            "range": [
                586,
                673
            ],
            "filename": "playback-rate-menu-button.js",
            "lineno": 35,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/playback-rate-menu",
            "code": {}
        },
        "description": "<p>Updates ARIA accessibility attributes</p>",
        "kind": "function",
        "name": "updateARIAAttributes",
        "longname": "updateARIAAttributes",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Handle menu item click\n  *\n  * @method handleClick\n  */",
        "meta": {
            "range": [
                675,
                738
            ],
            "filename": "playback-rate-menu-button.js",
            "lineno": 41,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/playback-rate-menu",
            "code": {}
        },
        "description": "<p>Handle menu item click</p>",
        "kind": "function",
        "name": "handleClick",
        "longname": "handleClick",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Get possible playback rates\n  *\n  * @return {Array} Possible playback rates\n  * @method playbackRates\n  */",
        "meta": {
            "range": [
                740,
                854
            ],
            "filename": "playback-rate-menu-button.js",
            "lineno": 47,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/playback-rate-menu",
            "code": {}
        },
        "description": "<p>Get possible playback rates</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Array"
                    ]
                },
                "description": "<p>Possible playback rates</p>"
            }
        ],
        "kind": "function",
        "name": "playbackRates",
        "longname": "playbackRates",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Get supported playback rates\n  *\n  * @return {Array} Supported playback rates\n  * @method playbackRateSupported\n  */",
        "meta": {
            "range": [
                856,
                980
            ],
            "filename": "playback-rate-menu-button.js",
            "lineno": 54,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/playback-rate-menu",
            "code": {}
        },
        "description": "<p>Get supported playback rates</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Array"
                    ]
                },
                "description": "<p>Supported playback rates</p>"
            }
        ],
        "kind": "function",
        "name": "playbackRateSupported",
        "longname": "playbackRateSupported",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Hide playback rate controls when they're no playback rate options to select\n  *\n  * @method updateVisibility\n  */",
        "meta": {
            "range": [
                982,
                1103
            ],
            "filename": "playback-rate-menu-button.js",
            "lineno": 61,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/playback-rate-menu",
            "code": {}
        },
        "description": "<p>Hide playback rate controls when they're no playback rate options to select</p>",
        "kind": "function",
        "name": "updateVisibility",
        "longname": "updateVisibility",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Update button label when rate changed\n  *\n  * @method updateLabel\n  */",
        "meta": {
            "range": [
                1105,
                1183
            ],
            "filename": "playback-rate-menu-button.js",
            "lineno": 67,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/playback-rate-menu",
            "code": {}
        },
        "description": "<p>Update button label when rate changed</p>",
        "kind": "function",
        "name": "updateLabel",
        "longname": "updateLabel",
        "scope": "global"
    },
    {
        "comment": "/**\n * @file Needed for full path retrieval\n */",
        "meta": {
            "range": [
                0,
                47
            ],
            "filename": "playback-rate-menu-item.js",
            "lineno": 1,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/playback-rate-menu",
            "code": {}
        },
        "name": "control-bar/playback-rate-menu/playback-rate-menu-item.js",
        "kind": "file",
        "description": "<p>Needed for full path retrieval</p>",
        "preserveName": true,
        "longname": "control-bar/playback-rate-menu/playback-rate-menu-item.js",
        "scope": "global"
    },
    {
        "comment": "/**\n * The specific menu item type for selecting a playback rate\n *\n * @param {Player|Object} player\n * @param {Object=} options\n * @extends MenuItem\n * @class PlaybackRateMenuItem\n */",
        "meta": {
            "range": [
                49,
                233
            ],
            "filename": "playback-rate-menu-item.js",
            "lineno": 5,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/playback-rate-menu",
            "code": {}
        },
        "description": "<p>The specific menu item type for selecting a playback rate</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Player",
                        "Object"
                    ]
                },
                "name": "player"
            },
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "optional": true,
                "name": "options"
            }
        ],
        "augments": [
            "MenuItem"
        ],
        "kind": "class",
        "name": "PlaybackRateMenuItem",
        "longname": "PlaybackRateMenuItem",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Handle click on menu item\n  *\n  * @method handleClick\n  */",
        "meta": {
            "range": [
                235,
                301
            ],
            "filename": "playback-rate-menu-item.js",
            "lineno": 14,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/playback-rate-menu",
            "code": {}
        },
        "description": "<p>Handle click on menu item</p>",
        "kind": "function",
        "name": "handleClick",
        "longname": "handleClick",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Update playback rate with selected rate\n  *\n  * @method update\n  */",
        "meta": {
            "range": [
                303,
                378
            ],
            "filename": "playback-rate-menu-item.js",
            "lineno": 20,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/playback-rate-menu",
            "code": {}
        },
        "description": "<p>Update playback rate with selected rate</p>",
        "kind": "function",
        "name": "update",
        "longname": "update",
        "scope": "global"
    },
    {
        "comment": "/**\n * @file Needed for full path retrieval\n */",
        "meta": {
            "range": [
                0,
                47
            ],
            "filename": "load-progress-bar.js",
            "lineno": 1,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/progress-control",
            "code": {}
        },
        "name": "control-bar/progress-control/load-progress-bar.js",
        "kind": "file",
        "description": "<p>Needed for full path retrieval</p>",
        "preserveName": true,
        "longname": "control-bar/progress-control/load-progress-bar.js",
        "scope": "global"
    },
    {
        "comment": "/**\n * Shows load progress\n *\n * @param {Player|Object} player\n * @param {Object=} options\n * @extends Component\n * @class LoadProgressBar\n */",
        "meta": {
            "range": [
                49,
                191
            ],
            "filename": "load-progress-bar.js",
            "lineno": 5,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/progress-control",
            "code": {}
        },
        "description": "<p>Shows load progress</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Player",
                        "Object"
                    ]
                },
                "name": "player"
            },
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "optional": true,
                "name": "options"
            }
        ],
        "augments": [
            "Component"
        ],
        "kind": "class",
        "name": "LoadProgressBar",
        "longname": "LoadProgressBar",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Create the component's DOM element\n  *\n  * @return {Element}\n  * @method createEl\n  */",
        "meta": {
            "range": [
                193,
                287
            ],
            "filename": "load-progress-bar.js",
            "lineno": 14,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/progress-control",
            "code": {}
        },
        "description": "<p>Create the component's DOM element</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Element"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "createEl",
        "longname": "createEl",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Update progress bar\n  *\n  * @method update\n  */",
        "meta": {
            "range": [
                289,
                344
            ],
            "filename": "load-progress-bar.js",
            "lineno": 21,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/progress-control",
            "code": {}
        },
        "description": "<p>Update progress bar</p>",
        "kind": "function",
        "name": "update",
        "longname": "update",
        "scope": "global"
    },
    {
        "comment": "/**\n * @file Needed for full path retrieval\n */",
        "meta": {
            "range": [
                0,
                47
            ],
            "filename": "play-progress-bar.js",
            "lineno": 1,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/progress-control",
            "code": {}
        },
        "name": "control-bar/progress-control/play-progress-bar.js",
        "kind": "file",
        "description": "<p>Needed for full path retrieval</p>",
        "preserveName": true,
        "longname": "control-bar/progress-control/play-progress-bar.js",
        "scope": "global"
    },
    {
        "comment": "/**\n * Shows play progress\n *\n * @param {Player|Object} player\n * @param {Object=} options\n * @extends Component\n * @class PlayProgressBar\n */",
        "meta": {
            "range": [
                49,
                191
            ],
            "filename": "play-progress-bar.js",
            "lineno": 5,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/progress-control",
            "code": {}
        },
        "description": "<p>Shows play progress</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Player",
                        "Object"
                    ]
                },
                "name": "player"
            },
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "optional": true,
                "name": "options"
            }
        ],
        "augments": [
            "Component"
        ],
        "kind": "class",
        "name": "PlayProgressBar",
        "longname": "PlayProgressBar",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Create the component's DOM element\n  *\n  * @return {Element}\n  * @method createEl\n  */",
        "meta": {
            "range": [
                193,
                287
            ],
            "filename": "play-progress-bar.js",
            "lineno": 14,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/progress-control",
            "code": {}
        },
        "description": "<p>Create the component's DOM element</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Element"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "createEl",
        "longname": "createEl",
        "scope": "global"
    },
    {
        "comment": "/**\n * @file Needed for full path retrieval\n */",
        "meta": {
            "range": [
                0,
                47
            ],
            "filename": "progress-control.js",
            "lineno": 1,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/progress-control",
            "code": {}
        },
        "name": "control-bar/progress-control/progress-control.js",
        "kind": "file",
        "description": "<p>Needed for full path retrieval</p>",
        "preserveName": true,
        "longname": "control-bar/progress-control/progress-control.js",
        "scope": "global"
    },
    {
        "comment": "/**\n * The Progress Control component contains the seek bar, load progress,\n * and play progress\n *\n * @param {Player|Object} player\n * @param {Object=} options\n * @extends Component\n * @class ProgressControl\n */",
        "meta": {
            "range": [
                49,
                261
            ],
            "filename": "progress-control.js",
            "lineno": 5,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/progress-control",
            "code": {}
        },
        "description": "<p>The Progress Control component contains the seek bar, load progress,\nand play progress</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Player",
                        "Object"
                    ]
                },
                "name": "player"
            },
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "optional": true,
                "name": "options"
            }
        ],
        "augments": [
            "Component"
        ],
        "kind": "class",
        "name": "ProgressControl",
        "longname": "ProgressControl",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Create the component's DOM element\n  *\n  * @return {Element}\n  * @method createEl\n  */",
        "meta": {
            "range": [
                263,
                357
            ],
            "filename": "progress-control.js",
            "lineno": 15,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/progress-control",
            "code": {}
        },
        "description": "<p>Create the component's DOM element</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Element"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "createEl",
        "longname": "createEl",
        "scope": "global"
    },
    {
        "comment": "/**\n * @file Needed for full path retrieval\n */",
        "meta": {
            "range": [
                0,
                47
            ],
            "filename": "seek-bar.js",
            "lineno": 1,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/progress-control",
            "code": {}
        },
        "name": "control-bar/progress-control/seek-bar.js",
        "kind": "file",
        "description": "<p>Needed for full path retrieval</p>",
        "preserveName": true,
        "longname": "control-bar/progress-control/seek-bar.js",
        "scope": "global"
    },
    {
        "comment": "/**\n * Seek Bar and holder for the progress bars\n *\n * @param {Player|Object} player\n * @param {Object=} options\n * @extends Slider\n * @class SeekBar\n */",
        "meta": {
            "range": [
                49,
                202
            ],
            "filename": "seek-bar.js",
            "lineno": 5,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/progress-control",
            "code": {}
        },
        "description": "<p>Seek Bar and holder for the progress bars</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Player",
                        "Object"
                    ]
                },
                "name": "player"
            },
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "optional": true,
                "name": "options"
            }
        ],
        "augments": [
            "Slider"
        ],
        "kind": "class",
        "name": "SeekBar",
        "longname": "SeekBar",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Create the component's DOM element\n  *\n  * @return {Element}\n  * @method createEl\n  */",
        "meta": {
            "range": [
                204,
                298
            ],
            "filename": "seek-bar.js",
            "lineno": 14,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/progress-control",
            "code": {}
        },
        "description": "<p>Create the component's DOM element</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Element"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "createEl",
        "longname": "createEl",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Update ARIA accessibility attributes\n  *\n  * @method updateARIAAttributes\n  */",
        "meta": {
            "range": [
                300,
                386
            ],
            "filename": "seek-bar.js",
            "lineno": 21,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/progress-control",
            "code": {}
        },
        "description": "<p>Update ARIA accessibility attributes</p>",
        "kind": "function",
        "name": "updateARIAAttributes",
        "longname": "updateARIAAttributes",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Get percentage of video played\n  *\n  * @return {Number} Percentage played\n  * @method getPercent\n  */",
        "meta": {
            "range": [
                388,
                497
            ],
            "filename": "seek-bar.js",
            "lineno": 27,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/progress-control",
            "code": {}
        },
        "description": "<p>Get percentage of video played</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Number"
                    ]
                },
                "description": "<p>Percentage played</p>"
            }
        ],
        "kind": "function",
        "name": "getPercent",
        "longname": "getPercent",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Handle mouse down on seek bar\n  *\n  * @method handleMouseDown\n  */",
        "meta": {
            "range": [
                499,
                573
            ],
            "filename": "seek-bar.js",
            "lineno": 34,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/progress-control",
            "code": {}
        },
        "description": "<p>Handle mouse down on seek bar</p>",
        "kind": "function",
        "name": "handleMouseDown",
        "longname": "handleMouseDown",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Handle mouse move on seek bar\n  *\n  * @method handleMouseMove\n  */",
        "meta": {
            "range": [
                575,
                649
            ],
            "filename": "seek-bar.js",
            "lineno": 40,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/progress-control",
            "code": {}
        },
        "description": "<p>Handle mouse move on seek bar</p>",
        "kind": "function",
        "name": "handleMouseMove",
        "longname": "handleMouseMove",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Handle mouse up on seek bar\n  *\n  * @method handleMouseUp\n  */",
        "meta": {
            "range": [
                651,
                721
            ],
            "filename": "seek-bar.js",
            "lineno": 46,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/progress-control",
            "code": {}
        },
        "description": "<p>Handle mouse up on seek bar</p>",
        "kind": "function",
        "name": "handleMouseUp",
        "longname": "handleMouseUp",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Move more quickly fast forward for keyboard-only users\n  *\n  * @method stepForward\n  */",
        "meta": {
            "range": [
                723,
                818
            ],
            "filename": "seek-bar.js",
            "lineno": 52,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/progress-control",
            "code": {}
        },
        "description": "<p>Move more quickly fast forward for keyboard-only users</p>",
        "kind": "function",
        "name": "stepForward",
        "longname": "stepForward",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Move more quickly rewind for keyboard-only users\n  *\n  * @method stepBack\n  */",
        "meta": {
            "range": [
                820,
                906
            ],
            "filename": "seek-bar.js",
            "lineno": 58,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/progress-control",
            "code": {}
        },
        "description": "<p>Move more quickly rewind for keyboard-only users</p>",
        "kind": "function",
        "name": "stepBack",
        "longname": "stepBack",
        "scope": "global"
    },
    {
        "comment": "/**\n * Spacer specifically meant to be used as an insertion point for new plugins, etc.\n *\n * @extends Spacer\n * @class CustomControlSpacer\n */",
        "meta": {
            "range": [
                0,
                143
            ],
            "filename": "custom-control-spacer.js",
            "lineno": 1,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/spacer-controls",
            "code": {}
        },
        "description": "<p>Spacer specifically meant to be used as an insertion point for new plugins, etc.</p>",
        "augments": [
            "Spacer"
        ],
        "kind": "class",
        "name": "CustomControlSpacer",
        "longname": "CustomControlSpacer",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Allow sub components to stack CSS class names\n  *\n  * @return {String} The constructed class name\n  * @method buildCSSClass\n  */",
        "meta": {
            "range": [
                145,
                281
            ],
            "filename": "custom-control-spacer.js",
            "lineno": 8,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/spacer-controls",
            "code": {}
        },
        "description": "<p>Allow sub components to stack CSS class names</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "String"
                    ]
                },
                "description": "<p>The constructed class name</p>"
            }
        ],
        "kind": "function",
        "name": "buildCSSClass",
        "longname": "buildCSSClass",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Create the component's DOM element\n  *\n  * @return {Element}\n  * @method createEl\n  */",
        "meta": {
            "range": [
                283,
                377
            ],
            "filename": "custom-control-spacer.js",
            "lineno": 15,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/spacer-controls",
            "code": {}
        },
        "description": "<p>Create the component's DOM element</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Element"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "createEl",
        "longname": "createEl",
        "scope": "global"
    },
    {
        "comment": "/**\n * Just an empty spacer element that can be used as an append point for plugins, etc.\n * Also can be used to create space between elements when necessary.\n *\n * @extends Component\n * @class Spacer\n */",
        "meta": {
            "range": [
                0,
                204
            ],
            "filename": "spacer.js",
            "lineno": 1,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/spacer-controls",
            "code": {}
        },
        "description": "<p>Just an empty spacer element that can be used as an append point for plugins, etc.\nAlso can be used to create space between elements when necessary.</p>",
        "augments": [
            "Component"
        ],
        "kind": "class",
        "name": "Spacer",
        "longname": "Spacer",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Allow sub components to stack CSS class names\n  *\n  * @return {String} The constructed class name\n  * @method buildCSSClass\n  */",
        "meta": {
            "range": [
                206,
                342
            ],
            "filename": "spacer.js",
            "lineno": 9,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/spacer-controls",
            "code": {}
        },
        "description": "<p>Allow sub components to stack CSS class names</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "String"
                    ]
                },
                "description": "<p>The constructed class name</p>"
            }
        ],
        "kind": "function",
        "name": "buildCSSClass",
        "longname": "buildCSSClass",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Create the component's DOM element\n  *\n  * @param {Object} props An object of properties  \n  * @return {Element}\n  * @method createEl\n  */",
        "meta": {
            "range": [
                344,
                490
            ],
            "filename": "spacer.js",
            "lineno": 16,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/spacer-controls",
            "code": {}
        },
        "description": "<p>Create the component's DOM element</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "description": "<p>An object of properties</p>",
                "name": "props"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "Element"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "createEl",
        "longname": "createEl",
        "scope": "global"
    },
    {
        "comment": "/**\n * The menu item for caption track settings menu\n *\n * @param {Player|Object} player\n * @param {Object=} options\n * @extends TextTrackMenuItem\n * @class CaptionSettingsMenuItem\n */",
        "meta": {
            "range": [
                0,
                184
            ],
            "filename": "caption-settings-menu-item.js",
            "lineno": 1,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/text-track-controls",
            "code": {}
        },
        "description": "<p>The menu item for caption track settings menu</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Player",
                        "Object"
                    ]
                },
                "name": "player"
            },
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "optional": true,
                "name": "options"
            }
        ],
        "augments": [
            "TextTrackMenuItem"
        ],
        "kind": "class",
        "name": "CaptionSettingsMenuItem",
        "longname": "CaptionSettingsMenuItem",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Handle click on menu item\n  *\n  * @method handleClick\n  */",
        "meta": {
            "range": [
                186,
                252
            ],
            "filename": "caption-settings-menu-item.js",
            "lineno": 10,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/text-track-controls",
            "code": {}
        },
        "description": "<p>Handle click on menu item</p>",
        "kind": "function",
        "name": "handleClick",
        "longname": "handleClick",
        "scope": "global"
    },
    {
        "comment": "/**\n * The button component for toggling and selecting captions\n *\n * @param {Object} player  Player object\n * @param {Object=} options Object of option names and values\n * @param {Function=} ready    Ready callback function\n * @extends TextTrackButton\n * @class CaptionsButton\n */",
        "meta": {
            "range": [
                0,
                281
            ],
            "filename": "captions-button.js",
            "lineno": 1,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/text-track-controls",
            "code": {}
        },
        "description": "<p>The button component for toggling and selecting captions</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "description": "<p>Player object</p>",
                "name": "player"
            },
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "optional": true,
                "description": "<p>Object of option names and values</p>",
                "name": "options"
            },
            {
                "type": {
                    "names": [
                        "function"
                    ]
                },
                "optional": true,
                "description": "<p>Ready callback function</p>",
                "name": "ready"
            }
        ],
        "augments": [
            "TextTrackButton"
        ],
        "kind": "class",
        "name": "CaptionsButton",
        "longname": "CaptionsButton",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Allow sub components to stack CSS class names\n  *\n  * @return {String} The constructed class name\n  * @method buildCSSClass\n  */",
        "meta": {
            "range": [
                283,
                419
            ],
            "filename": "captions-button.js",
            "lineno": 11,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/text-track-controls",
            "code": {}
        },
        "description": "<p>Allow sub components to stack CSS class names</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "String"
                    ]
                },
                "description": "<p>The constructed class name</p>"
            }
        ],
        "kind": "function",
        "name": "buildCSSClass",
        "longname": "buildCSSClass",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Update caption menu items\n  *\n  * @method update\n  */",
        "meta": {
            "range": [
                421,
                482
            ],
            "filename": "captions-button.js",
            "lineno": 18,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/text-track-controls",
            "code": {}
        },
        "description": "<p>Update caption menu items</p>",
        "kind": "function",
        "name": "update",
        "longname": "update",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Create caption menu items\n  *\n  * @return {Array} Array of menu items\n  * @method createItems\n  */",
        "meta": {
            "range": [
                484,
                590
            ],
            "filename": "captions-button.js",
            "lineno": 24,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/text-track-controls",
            "code": {}
        },
        "description": "<p>Create caption menu items</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Array"
                    ]
                },
                "description": "<p>Array of menu items</p>"
            }
        ],
        "kind": "function",
        "name": "createItems",
        "longname": "createItems",
        "scope": "global"
    },
    {
        "comment": "/**\n * The button component for toggling and selecting chapters\n *\n * @param {Object} player  Player object\n * @param {Object=} options Object of option names and values\n * @param {Function=} ready    Ready callback function\n * @extends TextTrackButton\n * @class ChaptersButton\n */",
        "meta": {
            "range": [
                0,
                281
            ],
            "filename": "chapters-button.js",
            "lineno": 1,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/text-track-controls",
            "code": {}
        },
        "description": "<p>The button component for toggling and selecting chapters</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "description": "<p>Player object</p>",
                "name": "player"
            },
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "optional": true,
                "description": "<p>Object of option names and values</p>",
                "name": "options"
            },
            {
                "type": {
                    "names": [
                        "function"
                    ]
                },
                "optional": true,
                "description": "<p>Ready callback function</p>",
                "name": "ready"
            }
        ],
        "augments": [
            "TextTrackButton"
        ],
        "kind": "class",
        "name": "ChaptersButton",
        "longname": "ChaptersButton",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Allow sub components to stack CSS class names\n  *\n  * @return {String} The constructed class name\n  * @method buildCSSClass\n  */",
        "meta": {
            "range": [
                283,
                419
            ],
            "filename": "chapters-button.js",
            "lineno": 11,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/text-track-controls",
            "code": {}
        },
        "description": "<p>Allow sub components to stack CSS class names</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "String"
                    ]
                },
                "description": "<p>The constructed class name</p>"
            }
        ],
        "kind": "function",
        "name": "buildCSSClass",
        "longname": "buildCSSClass",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Create a menu item for each text track\n  *\n  * @return {Array} Array of menu items\n  * @method createItems\n  */",
        "meta": {
            "range": [
                421,
                540
            ],
            "filename": "chapters-button.js",
            "lineno": 18,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/text-track-controls",
            "code": {}
        },
        "description": "<p>Create a menu item for each text track</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Array"
                    ]
                },
                "description": "<p>Array of menu items</p>"
            }
        ],
        "kind": "function",
        "name": "createItems",
        "longname": "createItems",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Create menu from chapter buttons\n  *\n  * @return {Menu} Menu of chapter buttons\n  * @method createMenu\n  */",
        "meta": {
            "range": [
                542,
                657
            ],
            "filename": "chapters-button.js",
            "lineno": 25,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/text-track-controls",
            "code": {}
        },
        "description": "<p>Create menu from chapter buttons</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Menu"
                    ]
                },
                "description": "<p>Menu of chapter buttons</p>"
            }
        ],
        "kind": "function",
        "name": "createMenu",
        "longname": "createMenu",
        "scope": "global"
    },
    {
        "comment": "/**\n * The chapter track menu item\n *\n * @param {Player|Object} player\n * @param {Object=} options\n * @extends MenuItem\n * @class ChaptersTrackMenuItem\n */",
        "meta": {
            "range": [
                0,
                155
            ],
            "filename": "chapters-track-menu-item.js",
            "lineno": 1,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/text-track-controls",
            "code": {}
        },
        "description": "<p>The chapter track menu item</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Player",
                        "Object"
                    ]
                },
                "name": "player"
            },
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "optional": true,
                "name": "options"
            }
        ],
        "augments": [
            "MenuItem"
        ],
        "kind": "class",
        "name": "ChaptersTrackMenuItem",
        "longname": "ChaptersTrackMenuItem",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Handle click on menu item\n  *\n  * @method handleClick\n  */",
        "meta": {
            "range": [
                157,
                223
            ],
            "filename": "chapters-track-menu-item.js",
            "lineno": 10,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/text-track-controls",
            "code": {}
        },
        "description": "<p>Handle click on menu item</p>",
        "kind": "function",
        "name": "handleClick",
        "longname": "handleClick",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Update chapter menu item\n  *\n  * @method update\n  */",
        "meta": {
            "range": [
                225,
                285
            ],
            "filename": "chapters-track-menu-item.js",
            "lineno": 16,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/text-track-controls",
            "code": {}
        },
        "description": "<p>Update chapter menu item</p>",
        "kind": "function",
        "name": "update",
        "longname": "update",
        "scope": "global"
    },
    {
        "comment": "/**\n * A special menu item for turning of a specific type of text track\n *\n * @param {Player|Object} player\n * @param {Object=} options\n * @extends TextTrackMenuItem\n * @class OffTextTrackMenuItem\n */",
        "meta": {
            "range": [
                0,
                200
            ],
            "filename": "off-text-track-menu-item.js",
            "lineno": 1,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/text-track-controls",
            "code": {}
        },
        "description": "<p>A special menu item for turning of a specific type of text track</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Player",
                        "Object"
                    ]
                },
                "name": "player"
            },
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "optional": true,
                "name": "options"
            }
        ],
        "augments": [
            "TextTrackMenuItem"
        ],
        "kind": "class",
        "name": "OffTextTrackMenuItem",
        "longname": "OffTextTrackMenuItem",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Handle text track change\n  *\n  * @method handleTracksChange\n  */",
        "meta": {
            "range": [
                202,
                274
            ],
            "filename": "off-text-track-menu-item.js",
            "lineno": 10,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/text-track-controls",
            "code": {}
        },
        "description": "<p>Handle text track change</p>",
        "kind": "function",
        "name": "handleTracksChange",
        "longname": "handleTracksChange",
        "scope": "global"
    },
    {
        "comment": "/**\n * The button component for toggling and selecting subtitles\n *\n * @param {Object} player  Player object\n * @param {Object=} options Object of option names and values\n * @param {Function=} ready    Ready callback function\n * @extends TextTrackButton\n * @class SubtitlesButton\n */",
        "meta": {
            "range": [
                0,
                283
            ],
            "filename": "subtitles-button.js",
            "lineno": 1,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/text-track-controls",
            "code": {}
        },
        "description": "<p>The button component for toggling and selecting subtitles</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "description": "<p>Player object</p>",
                "name": "player"
            },
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "optional": true,
                "description": "<p>Object of option names and values</p>",
                "name": "options"
            },
            {
                "type": {
                    "names": [
                        "function"
                    ]
                },
                "optional": true,
                "description": "<p>Ready callback function</p>",
                "name": "ready"
            }
        ],
        "augments": [
            "TextTrackButton"
        ],
        "kind": "class",
        "name": "SubtitlesButton",
        "longname": "SubtitlesButton",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Allow sub components to stack CSS class names\n  *\n  * @return {String} The constructed class name\n  * @method buildCSSClass\n  */",
        "meta": {
            "range": [
                285,
                421
            ],
            "filename": "subtitles-button.js",
            "lineno": 11,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/text-track-controls",
            "code": {}
        },
        "description": "<p>Allow sub components to stack CSS class names</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "String"
                    ]
                },
                "description": "<p>The constructed class name</p>"
            }
        ],
        "kind": "function",
        "name": "buildCSSClass",
        "longname": "buildCSSClass",
        "scope": "global"
    },
    {
        "comment": "/**\n * The base class for buttons that toggle specific text track types (e.g. subtitles)\n *\n * @param {Player|Object} player\n * @param {Object=} options\n * @extends MenuButton\n * @class TextTrackButton\n */",
        "meta": {
            "range": [
                0,
                205
            ],
            "filename": "text-track-button.js",
            "lineno": 1,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/text-track-controls",
            "code": {}
        },
        "description": "<p>The base class for buttons that toggle specific text track types (e.g. subtitles)</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Player",
                        "Object"
                    ]
                },
                "name": "player"
            },
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "optional": true,
                "name": "options"
            }
        ],
        "augments": [
            "MenuButton"
        ],
        "kind": "class",
        "name": "TextTrackButton",
        "longname": "TextTrackButton",
        "scope": "global"
    },
    {
        "comment": "/**\n * The specific menu item type for selecting a language within a text track kind\n *\n * @param {Player|Object} player\n * @param {Object=} options\n * @extends MenuItem\n * @class TextTrackMenuItem\n */",
        "meta": {
            "range": [
                0,
                201
            ],
            "filename": "text-track-menu-item.js",
            "lineno": 1,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/text-track-controls",
            "code": {}
        },
        "description": "<p>The specific menu item type for selecting a language within a text track kind</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Player",
                        "Object"
                    ]
                },
                "name": "player"
            },
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "optional": true,
                "name": "options"
            }
        ],
        "augments": [
            "MenuItem"
        ],
        "kind": "class",
        "name": "TextTrackMenuItem",
        "longname": "TextTrackMenuItem",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Handle click on text track\n  *\n  * @method handleClick\n  */",
        "meta": {
            "range": [
                203,
                270
            ],
            "filename": "text-track-menu-item.js",
            "lineno": 10,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/text-track-controls",
            "code": {}
        },
        "description": "<p>Handle click on text track</p>",
        "kind": "function",
        "name": "handleClick",
        "longname": "handleClick",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Handle text track change\n  *\n  * @method handleTracksChange\n  */",
        "meta": {
            "range": [
                272,
                344
            ],
            "filename": "text-track-menu-item.js",
            "lineno": 16,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/text-track-controls",
            "code": {}
        },
        "description": "<p>Handle text track change</p>",
        "kind": "function",
        "name": "handleTracksChange",
        "longname": "handleTracksChange",
        "scope": "global"
    },
    {
        "comment": "/**\n * Displays the current time\n * @param {Player|Object} player\n * @param {Object=} options\n * @extends Component\n * @class CurrentTimeDisplay\n */",
        "meta": {
            "range": [
                0,
                148
            ],
            "filename": "current-time-display.js",
            "lineno": 1,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/time-controls",
            "code": {}
        },
        "description": "<p>Displays the current time</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Player",
                        "Object"
                    ]
                },
                "name": "player"
            },
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "optional": true,
                "name": "options"
            }
        ],
        "augments": [
            "Component"
        ],
        "kind": "class",
        "name": "CurrentTimeDisplay",
        "longname": "CurrentTimeDisplay",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Create the component's DOM element\n  *\n  * @return {Element}\n  * @method createEl\n  */",
        "meta": {
            "range": [
                150,
                244
            ],
            "filename": "current-time-display.js",
            "lineno": 9,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/time-controls",
            "code": {}
        },
        "description": "<p>Create the component's DOM element</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Element"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "createEl",
        "longname": "createEl",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Update current time display \n  *\n  * @method updateContent\n  */",
        "meta": {
            "range": [
                246,
                317
            ],
            "filename": "current-time-display.js",
            "lineno": 16,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/time-controls",
            "code": {}
        },
        "description": "<p>Update current time display</p>",
        "kind": "function",
        "name": "updateContent",
        "longname": "updateContent",
        "scope": "global"
    },
    {
        "comment": "/**\n * Displays the duration\n * @param {Player|Object} player\n * @param {Object=} options\n * @extends Component\n * @class DurationDisplay\n */",
        "meta": {
            "range": [
                0,
                141
            ],
            "filename": "duration-display.js",
            "lineno": 1,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/time-controls",
            "code": {}
        },
        "description": "<p>Displays the duration</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Player",
                        "Object"
                    ]
                },
                "name": "player"
            },
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "optional": true,
                "name": "options"
            }
        ],
        "augments": [
            "Component"
        ],
        "kind": "class",
        "name": "DurationDisplay",
        "longname": "DurationDisplay",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Create the component's DOM element\n  *\n  * @return {Element}\n  * @method createEl\n  */",
        "meta": {
            "range": [
                143,
                237
            ],
            "filename": "duration-display.js",
            "lineno": 9,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/time-controls",
            "code": {}
        },
        "description": "<p>Create the component's DOM element</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Element"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "createEl",
        "longname": "createEl",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Update duration time display \n  *\n  * @method updateContent\n  */",
        "meta": {
            "range": [
                239,
                311
            ],
            "filename": "duration-display.js",
            "lineno": 16,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/time-controls",
            "code": {}
        },
        "description": "<p>Update duration time display</p>",
        "kind": "function",
        "name": "updateContent",
        "longname": "updateContent",
        "scope": "global"
    },
    {
        "comment": "/**\n * Displays the time left in the video\n * @param {Player|Object} player\n * @param {Object=} options\n * @extends Component\n * @class RemainingTimeDisplay\n */",
        "meta": {
            "range": [
                0,
                160
            ],
            "filename": "remaining-time-display.js",
            "lineno": 1,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/time-controls",
            "code": {}
        },
        "description": "<p>Displays the time left in the video</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Player",
                        "Object"
                    ]
                },
                "name": "player"
            },
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "optional": true,
                "name": "options"
            }
        ],
        "augments": [
            "Component"
        ],
        "kind": "class",
        "name": "RemainingTimeDisplay",
        "longname": "RemainingTimeDisplay",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Create the component's DOM element\n  *\n  * @return {Element}\n  * @method createEl\n  */",
        "meta": {
            "range": [
                162,
                256
            ],
            "filename": "remaining-time-display.js",
            "lineno": 9,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/time-controls",
            "code": {}
        },
        "description": "<p>Create the component's DOM element</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Element"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "createEl",
        "longname": "createEl",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Update remaining time display \n  *\n  * @method updateContent\n  */",
        "meta": {
            "range": [
                258,
                331
            ],
            "filename": "remaining-time-display.js",
            "lineno": 16,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/time-controls",
            "code": {}
        },
        "description": "<p>Update remaining time display</p>",
        "kind": "function",
        "name": "updateContent",
        "longname": "updateContent",
        "scope": "global"
    },
    {
        "comment": "/**\n * The separator between the current time and duration\n *\n * Can be hidden if it's not needed in the design.\n *\n * @param {Player|Object} player\n * @param {Object=} options\n * @extends Component\n * @class TimeDivider\n */",
        "meta": {
            "range": [
                0,
                224
            ],
            "filename": "time-divider.js",
            "lineno": 1,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/time-controls",
            "code": {}
        },
        "description": "<p>The separator between the current time and duration</p>\n<p>Can be hidden if it's not needed in the design.</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Player",
                        "Object"
                    ]
                },
                "name": "player"
            },
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "optional": true,
                "name": "options"
            }
        ],
        "augments": [
            "Component"
        ],
        "kind": "class",
        "name": "TimeDivider",
        "longname": "TimeDivider",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Create the component's DOM element\n  *\n  * @return {Element}\n  * @method createEl\n  */",
        "meta": {
            "range": [
                226,
                320
            ],
            "filename": "time-divider.js",
            "lineno": 12,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/time-controls",
            "code": {}
        },
        "description": "<p>Create the component's DOM element</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Element"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "createEl",
        "longname": "createEl",
        "scope": "global"
    },
    {
        "comment": "/**\n * The bar that contains the volume level and can be clicked on to adjust the level\n *\n * @param {Player|Object} player\n * @param {Object=} options\n * @extends Slider\n * @class VolumeBar\n */",
        "meta": {
            "range": [
                0,
                194
            ],
            "filename": "volume-bar.js",
            "lineno": 1,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/volume-control",
            "code": {}
        },
        "description": "<p>The bar that contains the volume level and can be clicked on to adjust the level</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Player",
                        "Object"
                    ]
                },
                "name": "player"
            },
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "optional": true,
                "name": "options"
            }
        ],
        "augments": [
            "Slider"
        ],
        "kind": "class",
        "name": "VolumeBar",
        "longname": "VolumeBar",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Create the component's DOM element\n  *\n  * @return {Element}\n  * @method createEl\n  */",
        "meta": {
            "range": [
                196,
                290
            ],
            "filename": "volume-bar.js",
            "lineno": 10,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/volume-control",
            "code": {}
        },
        "description": "<p>Create the component's DOM element</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Element"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "createEl",
        "longname": "createEl",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Handle mouse move on volume bar\n  *\n  * @method handleMouseMove\n  */",
        "meta": {
            "range": [
                292,
                368
            ],
            "filename": "volume-bar.js",
            "lineno": 17,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/volume-control",
            "code": {}
        },
        "description": "<p>Handle mouse move on volume bar</p>",
        "kind": "function",
        "name": "handleMouseMove",
        "longname": "handleMouseMove",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Get percent of volume level\n  *\n  * @retun {Number} Volume level percent\n  * @method getPercent\n  */",
        "meta": {
            "range": [
                370,
                478
            ],
            "filename": "volume-bar.js",
            "lineno": 23,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/volume-control",
            "code": {}
        },
        "description": "<p>Get percent of volume level</p>",
        "tags": [
            {
                "originalTitle": "retun",
                "title": "retun",
                "text": "{Number} Volume level percent",
                "value": "{Number} Volume level percent"
            }
        ],
        "kind": "function",
        "name": "getPercent",
        "longname": "getPercent",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Increase volume level for keyboard users\n  *\n  * @method stepForward\n  */",
        "meta": {
            "range": [
                480,
                561
            ],
            "filename": "volume-bar.js",
            "lineno": 30,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/volume-control",
            "code": {}
        },
        "description": "<p>Increase volume level for keyboard users</p>",
        "kind": "function",
        "name": "stepForward",
        "longname": "stepForward",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Decrease volume level for keyboard users\n  *\n  * @method stepBack\n  */",
        "meta": {
            "range": [
                563,
                641
            ],
            "filename": "volume-bar.js",
            "lineno": 36,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/volume-control",
            "code": {}
        },
        "description": "<p>Decrease volume level for keyboard users</p>",
        "kind": "function",
        "name": "stepBack",
        "longname": "stepBack",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Update ARIA accessibility attributes\n  *\n  * @method updateARIAAttributes\n  */",
        "meta": {
            "range": [
                643,
                729
            ],
            "filename": "volume-bar.js",
            "lineno": 42,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/volume-control",
            "code": {}
        },
        "description": "<p>Update ARIA accessibility attributes</p>",
        "kind": "function",
        "name": "updateARIAAttributes",
        "longname": "updateARIAAttributes",
        "scope": "global"
    },
    {
        "comment": "/**\n * The component for controlling the volume level\n *\n * @param {Player|Object} player\n * @param {Object=} options\n * @extends Component\n * @class VolumeControl\n */",
        "meta": {
            "range": [
                0,
                167
            ],
            "filename": "volume-control.js",
            "lineno": 1,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/volume-control",
            "code": {}
        },
        "description": "<p>The component for controlling the volume level</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Player",
                        "Object"
                    ]
                },
                "name": "player"
            },
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "optional": true,
                "name": "options"
            }
        ],
        "augments": [
            "Component"
        ],
        "kind": "class",
        "name": "VolumeControl",
        "longname": "VolumeControl",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Create the component's DOM element\n  *\n  * @return {Element}\n  * @method createEl\n  */",
        "meta": {
            "range": [
                169,
                263
            ],
            "filename": "volume-control.js",
            "lineno": 10,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/volume-control",
            "code": {}
        },
        "description": "<p>Create the component's DOM element</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Element"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "createEl",
        "longname": "createEl",
        "scope": "global"
    },
    {
        "comment": "/**\n * Shows volume level\n *\n * @param {Player|Object} player\n * @param {Object=} options\n * @extends Component\n * @class VolumeLevel\n */",
        "meta": {
            "range": [
                0,
                137
            ],
            "filename": "volume-level.js",
            "lineno": 1,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/volume-control",
            "code": {}
        },
        "description": "<p>Shows volume level</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Player",
                        "Object"
                    ]
                },
                "name": "player"
            },
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "optional": true,
                "name": "options"
            }
        ],
        "augments": [
            "Component"
        ],
        "kind": "class",
        "name": "VolumeLevel",
        "longname": "VolumeLevel",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Create the component's DOM element\n  *\n  * @return {Element}\n  * @method createEl\n  */",
        "meta": {
            "range": [
                139,
                233
            ],
            "filename": "volume-level.js",
            "lineno": 10,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/volume-control",
            "code": {}
        },
        "description": "<p>Create the component's DOM element</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Element"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "createEl",
        "longname": "createEl",
        "scope": "global"
    },
    {
        "comment": "/**\n * Base class for all buttons\n *\n * @param {Player|Object} player\n * @param {Object=} options\n * @extends MenuButton\n * @class VolumeMenuButton\n */",
        "meta": {
            "range": [
                0,
                151
            ],
            "filename": "volume-menu-button.js",
            "lineno": 1,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar",
            "code": {}
        },
        "description": "<p>Base class for all buttons</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Player",
                        "Object"
                    ]
                },
                "name": "player"
            },
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "optional": true,
                "name": "options"
            }
        ],
        "augments": [
            "MenuButton"
        ],
        "kind": "class",
        "name": "VolumeMenuButton",
        "longname": "VolumeMenuButton",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Allow sub components to stack CSS class names\n  *\n  * @return {String} The constructed class name\n  * @method buildCSSClass\n  */",
        "meta": {
            "range": [
                153,
                289
            ],
            "filename": "volume-menu-button.js",
            "lineno": 10,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar",
            "code": {}
        },
        "description": "<p>Allow sub components to stack CSS class names</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "String"
                    ]
                },
                "description": "<p>The constructed class name</p>"
            }
        ],
        "kind": "function",
        "name": "buildCSSClass",
        "longname": "buildCSSClass",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Allow sub components to stack CSS class names\n  *\n  * @return {Menu} The volume menu button\n  * @method createMenu\n  */",
        "meta": {
            "range": [
                291,
                418
            ],
            "filename": "volume-menu-button.js",
            "lineno": 17,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar",
            "code": {}
        },
        "description": "<p>Allow sub components to stack CSS class names</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Menu"
                    ]
                },
                "description": "<p>The volume menu button</p>"
            }
        ],
        "kind": "function",
        "name": "createMenu",
        "longname": "createMenu",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Handle click on volume menu and calls super\n  *\n  * @method handleClick\n  */",
        "meta": {
            "range": [
                420,
                504
            ],
            "filename": "volume-menu-button.js",
            "lineno": 24,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar",
            "code": {}
        },
        "description": "<p>Handle click on volume menu and calls super</p>",
        "kind": "function",
        "name": "handleClick",
        "longname": "handleClick",
        "scope": "global"
    },
    {
        "comment": "/**\n * @file Needed for full path retrieval\n */",
        "meta": {
            "range": [
                0,
                47
            ],
            "filename": "error-display.js",
            "lineno": 1,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "name": "error-display.js",
        "kind": "file",
        "description": "<p>Needed for full path retrieval</p>",
        "preserveName": true,
        "longname": "error-display.js",
        "scope": "global"
    },
    {
        "comment": "/**\n * Display that an error has occurred making the video unplayable\n *\n * @param {Object} player  Main Player\n * @param {Object=} options Object of option names and values\n * @extends Component\n * @class ErrorDisplay\n */",
        "meta": {
            "range": [
                49,
                271
            ],
            "filename": "error-display.js",
            "lineno": 5,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Display that an error has occurred making the video unplayable</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "description": "<p>Main Player</p>",
                "name": "player"
            },
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "optional": true,
                "description": "<p>Object of option names and values</p>",
                "name": "options"
            }
        ],
        "augments": [
            "Component"
        ],
        "kind": "class",
        "name": "ErrorDisplay",
        "longname": "ErrorDisplay",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Create the component's DOM element\n   *\n   * @return {Element}\n   * @method createEl\n   */",
        "meta": {
            "range": [
                273,
                372
            ],
            "filename": "error-display.js",
            "lineno": 14,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Create the component's DOM element</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Element"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "createEl",
        "longname": "createEl",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Update the error message in localized language\n  *\n  * @method update\n  */",
        "meta": {
            "range": [
                374,
                456
            ],
            "filename": "error-display.js",
            "lineno": 21,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Update the error message in localized language</p>",
        "kind": "function",
        "name": "update",
        "longname": "update",
        "scope": "global"
    },
    {
        "comment": "/**\n * Loading spinner for waiting events\n *\n * @extends Component\n * @class LoadingSpinner\n */",
        "meta": {
            "range": [
                0,
                95
            ],
            "filename": "loading-spinner.js",
            "lineno": 1,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Loading spinner for waiting events</p>",
        "augments": [
            "Component"
        ],
        "kind": "class",
        "name": "LoadingSpinner",
        "longname": "LoadingSpinner",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Create the component's DOM element\n  *\n  * @method createEl\n  */",
        "meta": {
            "range": [
                97,
                169
            ],
            "filename": "loading-spinner.js",
            "lineno": 8,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Create the component's DOM element</p>",
        "kind": "function",
        "name": "createEl",
        "longname": "createEl",
        "scope": "global"
    },
    {
        "comment": "/**\n * @file Needed for full path retrieval\n */",
        "meta": {
            "range": [
                0,
                47
            ],
            "filename": "menu-button.js",
            "lineno": 1,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/menu",
            "code": {}
        },
        "name": "menu/menu-button.js",
        "kind": "file",
        "description": "<p>Needed for full path retrieval</p>",
        "preserveName": true,
        "longname": "menu/menu-button.js",
        "scope": "global"
    },
    {
        "comment": "/**\n * A button class with a popup menu\n * @param {Player|Object} player\n * @param {Object=} options\n * @extends Button\n * @class MenuButton\n */",
        "meta": {
            "range": [
                49,
                193
            ],
            "filename": "menu-button.js",
            "lineno": 5,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/menu",
            "code": {}
        },
        "description": "<p>A button class with a popup menu</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Player",
                        "Object"
                    ]
                },
                "name": "player"
            },
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "optional": true,
                "name": "options"
            }
        ],
        "augments": [
            "Button"
        ],
        "kind": "class",
        "name": "MenuButton",
        "longname": "MenuButton",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Update menu\n  *\n  * @method update\n  */",
        "meta": {
            "range": [
                195,
                242
            ],
            "filename": "menu-button.js",
            "lineno": 13,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/menu",
            "code": {}
        },
        "description": "<p>Update menu</p>",
        "kind": "function",
        "name": "update",
        "longname": "update",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Create menu\n  *\n  * @return {Menu} The constructed menu\n  * @method createMenu\n  */",
        "meta": {
            "range": [
                338,
                429
            ],
            "filename": "menu-button.js",
            "lineno": 25,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/menu",
            "code": {}
        },
        "description": "<p>Create menu</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Menu"
                    ]
                },
                "description": "<p>The constructed menu</p>"
            }
        ],
        "kind": "function",
        "name": "createMenu",
        "longname": "createMenu",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Create the list of menu items. Specific to each subclass.\n  *\n  * @method createItems\n  */",
        "meta": {
            "range": [
                431,
                529
            ],
            "filename": "menu-button.js",
            "lineno": 32,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/menu",
            "code": {}
        },
        "description": "<p>Create the list of menu items. Specific to each subclass.</p>",
        "kind": "function",
        "name": "createItems",
        "longname": "createItems",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Create the component's DOM element\n  *\n  * @return {Element}\n  * @method createEl\n  */",
        "meta": {
            "range": [
                531,
                625
            ],
            "filename": "menu-button.js",
            "lineno": 38,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/menu",
            "code": {}
        },
        "description": "<p>Create the component's DOM element</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Element"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "createEl",
        "longname": "createEl",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Allow sub components to stack CSS class names\n  *\n  * @return {String} The constructed class name\n  * @method buildCSSClass\n  */",
        "meta": {
            "range": [
                627,
                763
            ],
            "filename": "menu-button.js",
            "lineno": 45,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/menu",
            "code": {}
        },
        "description": "<p>Allow sub components to stack CSS class names</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "String"
                    ]
                },
                "description": "<p>The constructed class name</p>"
            }
        ],
        "kind": "function",
        "name": "buildCSSClass",
        "longname": "buildCSSClass",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Focus - Add keyboard functionality to element\n  * This function is not needed anymore. Instead, the \n  * keyboard functionality is handled by\n  * treating the button as triggering a submenu. \n  * When the button is pressed, the submenu\n  * appears. Pressing the button again makes \n  * the submenu disappear.\n  *\n  * @method handleFocus\n  */",
        "meta": {
            "range": [
                765,
                1114
            ],
            "filename": "menu-button.js",
            "lineno": 52,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/menu",
            "code": {}
        },
        "description": "<p>Focus - Add keyboard functionality to element\nThis function is not needed anymore. Instead, the \nkeyboard functionality is handled by\ntreating the button as triggering a submenu. \nWhen the button is pressed, the submenu\nappears. Pressing the button again makes \nthe submenu disappear.</p>",
        "kind": "function",
        "name": "handleFocus",
        "longname": "handleFocus",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Can't turn off list display that we turned\n  * on with focus, because list would go away.\n  *\n  * @method handleBlur\n  */",
        "meta": {
            "range": [
                1116,
                1245
            ],
            "filename": "menu-button.js",
            "lineno": 64,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/menu",
            "code": {}
        },
        "description": "<p>Can't turn off list display that we turned\non with focus, because list would go away.</p>",
        "kind": "function",
        "name": "handleBlur",
        "longname": "handleBlur",
        "scope": "global"
    },
    {
        "comment": "/**\n  * When you click the button it adds focus, which \n  * will show the menu indefinitely.\n  * So we'll remove focus when the mouse leaves the button.\n  * Focus is needed for tab navigation.\n  * Allow sub components to stack CSS class names\n  *\n  * @method handleClick\n  */",
        "meta": {
            "range": [
                1247,
                1522
            ],
            "filename": "menu-button.js",
            "lineno": 71,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/menu",
            "code": {}
        },
        "description": "<p>When you click the button it adds focus, which \nwill show the menu indefinitely.\nSo we'll remove focus when the mouse leaves the button.\nFocus is needed for tab navigation.\nAllow sub components to stack CSS class names</p>",
        "kind": "function",
        "name": "handleClick",
        "longname": "handleClick",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Handle key press on menu\n  *\n  * @param {Object} Key press event\n  * @method handleKeyPress\n  */",
        "meta": {
            "range": [
                1524,
                1628
            ],
            "filename": "menu-button.js",
            "lineno": 81,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/menu",
            "code": {}
        },
        "description": "<p>Handle key press on menu</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "description": "<p>press event</p>",
                "name": "Key"
            }
        ],
        "kind": "function",
        "name": "handleKeyPress",
        "longname": "handleKeyPress",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Makes changes based on button pressed\n  *\n  * @method pressButton\n  */",
        "meta": {
            "range": [
                1630,
                1708
            ],
            "filename": "menu-button.js",
            "lineno": 88,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/menu",
            "code": {}
        },
        "description": "<p>Makes changes based on button pressed</p>",
        "kind": "function",
        "name": "pressButton",
        "longname": "pressButton",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Makes changes based on button unpressed\n  *\n  * @method unpressButton\n  */",
        "meta": {
            "range": [
                1710,
                1792
            ],
            "filename": "menu-button.js",
            "lineno": 94,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/menu",
            "code": {}
        },
        "description": "<p>Makes changes based on button unpressed</p>",
        "kind": "function",
        "name": "unpressButton",
        "longname": "unpressButton",
        "scope": "global"
    },
    {
        "comment": "/**\n * @file Needed for full path retrieval\n */",
        "meta": {
            "range": [
                0,
                47
            ],
            "filename": "menu-item.js",
            "lineno": 1,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/menu",
            "code": {}
        },
        "name": "menu/menu-item.js",
        "kind": "file",
        "description": "<p>Needed for full path retrieval</p>",
        "preserveName": true,
        "longname": "menu/menu-item.js",
        "scope": "global"
    },
    {
        "comment": "/**\n * The component for a menu item. `<li>`\n *\n * @param {Player|Object} player\n * @param {Object=} options\n * @extends Button\n * @class MenuItem\n */",
        "meta": {
            "range": [
                49,
                199
            ],
            "filename": "menu-item.js",
            "lineno": 5,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/menu",
            "code": {}
        },
        "description": "<p>The component for a menu item. <code>&lt;li&gt;</code></p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Player",
                        "Object"
                    ]
                },
                "name": "player"
            },
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "optional": true,
                "name": "options"
            }
        ],
        "augments": [
            "Button"
        ],
        "kind": "class",
        "name": "MenuItem",
        "longname": "MenuItem",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Create the component's DOM element\n  *\n  * @param {String=} type Desc\n  * @param {Object=} props Desc \n  * @return {Element}\n  * @method createEl\n  */",
        "meta": {
            "range": [
                201,
                359
            ],
            "filename": "menu-item.js",
            "lineno": 14,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/menu",
            "code": {}
        },
        "description": "<p>Create the component's DOM element</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "String"
                    ]
                },
                "optional": true,
                "description": "<p>Desc</p>",
                "name": "type"
            },
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "optional": true,
                "description": "<p>Desc</p>",
                "name": "props"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "Element"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "createEl",
        "longname": "createEl",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Handle a click on the menu item, and set it to selected\n  *\n  * @method handleClick\n  */",
        "meta": {
            "range": [
                361,
                457
            ],
            "filename": "menu-item.js",
            "lineno": 23,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/menu",
            "code": {}
        },
        "description": "<p>Handle a click on the menu item, and set it to selected</p>",
        "kind": "function",
        "name": "handleClick",
        "longname": "handleClick",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Set this menu item as selected or not\n  *\n  * @param  {Boolean} selected\n  * @method selected\n  */",
        "meta": {
            "range": [
                459,
                565
            ],
            "filename": "menu-item.js",
            "lineno": 29,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/menu",
            "code": {}
        },
        "description": "<p>Set this menu item as selected or not</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Boolean"
                    ]
                },
                "name": "selected"
            }
        ],
        "kind": "function",
        "name": "selected",
        "longname": "selected",
        "scope": "global"
    },
    {
        "comment": "/**\n * @file Needed for full path retrieval\n */",
        "meta": {
            "range": [
                0,
                47
            ],
            "filename": "menu.js",
            "lineno": 1,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/menu",
            "code": {}
        },
        "name": "menu/menu.js",
        "kind": "file",
        "description": "<p>Needed for full path retrieval</p>",
        "preserveName": true,
        "longname": "menu/menu.js",
        "scope": "global"
    },
    {
        "comment": "/**\n * The Menu component is used to build pop up menus, including subtitle and\n * captions selection menus.\n *\n * @extends Component\n * @class Menu\n */",
        "meta": {
            "range": [
                49,
                201
            ],
            "filename": "menu.js",
            "lineno": 5,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/menu",
            "code": {}
        },
        "description": "<p>The Menu component is used to build pop up menus, including subtitle and\ncaptions selection menus.</p>",
        "augments": [
            "Component"
        ],
        "kind": "class",
        "name": "Menu",
        "longname": "Menu",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Add a menu item to the menu\n  *\n  * @param {Object|String} component Component or component type to add\n  * @method addItem\n  */",
        "meta": {
            "range": [
                203,
                339
            ],
            "filename": "menu.js",
            "lineno": 13,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/menu",
            "code": {}
        },
        "description": "<p>Add a menu item to the menu</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Object",
                        "String"
                    ]
                },
                "description": "<p>Component or component type to add</p>",
                "name": "component"
            }
        ],
        "kind": "function",
        "name": "addItem",
        "longname": "addItem",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Create the component's DOM element\n  *\n  * @return {Element}\n  * @method createEl\n  */",
        "meta": {
            "range": [
                341,
                435
            ],
            "filename": "menu.js",
            "lineno": 20,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/menu",
            "code": {}
        },
        "description": "<p>Create the component's DOM element</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Element"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "createEl",
        "longname": "createEl",
        "scope": "global"
    },
    {
        "comment": "/**\n * @file Needed for full path retrieval\n */",
        "meta": {
            "range": [
                0,
                47
            ],
            "filename": "player.js",
            "lineno": 1,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "name": "player.js",
        "kind": "file",
        "description": "<p>Needed for full path retrieval</p>",
        "preserveName": true,
        "longname": "player.js",
        "scope": "global"
    },
    {
        "comment": "/**\n * An instance of the `Player` class is created when any of the Video.js setup methods are used to initialize a video.\n *\n * ```js\n * var myPlayer = videojs('example_video_1');\n * ```\n *\n * In the following example, the `data-setup` attribute tells the Video.js library to create a player instance when the library is ready.\n *\n * ```html\n * <video id=\"example_video_1\" data-setup='{}' controls>\n *   <source src=\"my-source.mp4\" type=\"video/mp4\">\n * </video>\n * ```\n *\n * After an instance has been created it can be accessed globally using `Video('example_video_1')`.\n *\n * @param {Element} tag        The original video tag used for configuring options\n * @param {Object=} options    Object of option names and values\n * @param {Function=} ready    Ready callback function\n * @extends Component\n * @class Player\n */",
        "meta": {
            "range": [
                49,
                870
            ],
            "filename": "player.js",
            "lineno": 5,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>An instance of the <code>Player</code> class is created when any of the Video.js setup methods are used to initialize a video.</p>\n<pre class=\"prettyprint source lang-js\"><code>var myPlayer = videojs('example_video_1');</code></pre><p>In the following example, the <code>data-setup</code> attribute tells the Video.js library to create a player instance when the library is ready.</p>\n<pre class=\"prettyprint source lang-html\"><code>&lt;video id=&quot;example_video_1&quot; data-setup='{}' controls>\n  &lt;source src=&quot;my-source.mp4&quot; type=&quot;video/mp4&quot;>\n&lt;/video></code></pre><p>After an instance has been created it can be accessed globally using <code>Video('example_video_1')</code>.</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Element"
                    ]
                },
                "description": "<p>The original video tag used for configuring options</p>",
                "name": "tag"
            },
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "optional": true,
                "description": "<p>Object of option names and values</p>",
                "name": "options"
            },
            {
                "type": {
                    "names": [
                        "function"
                    ]
                },
                "optional": true,
                "description": "<p>Ready callback function</p>",
                "name": "ready"
            }
        ],
        "augments": [
            "Component"
        ],
        "kind": "class",
        "name": "Player",
        "longname": "Player",
        "scope": "global"
    },
    {
        "comment": "/**\n   * player's constructor function\n   *\n   * @constructs\n   * @method init\n   * @param {Element} tag        The original video tag used for configuring options\n   * @param {Object=} options    Player options\n   * @param {Function=} ready    Ready callback function\n   */",
        "meta": {
            "range": [
                872,
                1146
            ],
            "filename": "player.js",
            "lineno": 29,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>player's constructor function</p>",
        "alias": "{@thisClass}",
        "kind": "function",
        "name": "init",
        "params": [
            {
                "type": {
                    "names": [
                        "Element"
                    ]
                },
                "description": "<p>The original video tag used for configuring options</p>",
                "name": "tag"
            },
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "optional": true,
                "description": "<p>Player options</p>",
                "name": "options"
            },
            {
                "type": {
                    "names": [
                        "function"
                    ]
                },
                "optional": true,
                "description": "<p>Ready callback function</p>",
                "name": "ready"
            }
        ],
        "longname": "init",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Destroys the video player and does any necessary cleanup\n   *\n   *     myPlayer.dispose();\n   *\n   * This is especially helpful if you are dynamically adding and removing videos\n   * to/from the DOM.\n   *\n   * @method dispose\n   */",
        "meta": {
            "range": [
                1273,
                1513
            ],
            "filename": "player.js",
            "lineno": 45,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Destroys the video player and does any necessary cleanup</p>\n<pre class=\"prettyprint source\"><code>myPlayer.dispose();</code></pre><p>This is especially helpful if you are dynamically adding and removing videos\nto/from the DOM.</p>",
        "kind": "function",
        "name": "dispose",
        "longname": "dispose",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Create the component's DOM element\n  *\n  * @return {Element}\n  * @method createEl\n  */",
        "meta": {
            "range": [
                1515,
                1609
            ],
            "filename": "player.js",
            "lineno": 56,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Create the component's DOM element</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Element"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "createEl",
        "longname": "createEl",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Get/set player width\n  *\n  * @param {Number=} value Value for width\n  * @return {Number} Width when getting\n  * @method width\n  */",
        "meta": {
            "range": [
                1611,
                1749
            ],
            "filename": "player.js",
            "lineno": 63,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Get/set player width</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Number"
                    ]
                },
                "optional": true,
                "description": "<p>Value for width</p>",
                "name": "value"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "Number"
                    ]
                },
                "description": "<p>Width when getting</p>"
            }
        ],
        "kind": "function",
        "name": "width",
        "longname": "width",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Get/set player height\n  *\n  * @param {Number=} value Value for height\n  * @return {Number} Height when getting\n  * @method height\n  */",
        "meta": {
            "range": [
                1751,
                1893
            ],
            "filename": "player.js",
            "lineno": 71,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Get/set player height</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Number"
                    ]
                },
                "optional": true,
                "description": "<p>Value for height</p>",
                "name": "value"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "Number"
                    ]
                },
                "description": "<p>Height when getting</p>"
            }
        ],
        "kind": "function",
        "name": "height",
        "longname": "height",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Get/set dimension for player\n  *\n  * @param {String} dimension Either width or height\n  * @param {Number=} value Value for dimension\n  * @return {Component}\n  * @method dimension\n  */",
        "meta": {
            "range": [
                1895,
                2086
            ],
            "filename": "player.js",
            "lineno": 79,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Get/set dimension for player</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "String"
                    ]
                },
                "description": "<p>Either width or height</p>",
                "name": "dimension"
            },
            {
                "type": {
                    "names": [
                        "Number"
                    ]
                },
                "optional": true,
                "description": "<p>Value for dimension</p>",
                "name": "value"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "Component"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "dimension",
        "longname": "dimension",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Add/remove the vjs-fluid class\n  *\n  * @param {Boolean} bool Value of true adds the class, value of false removes the class \n  * @method fluid\n  */",
        "meta": {
            "range": [
                2088,
                2243
            ],
            "filename": "player.js",
            "lineno": 88,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Add/remove the vjs-fluid class</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Boolean"
                    ]
                },
                "description": "<p>Value of true adds the class, value of false removes the class</p>",
                "name": "bool"
            }
        ],
        "kind": "function",
        "name": "fluid",
        "longname": "fluid",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Get/Set the aspect ratio\n  *\n  * @param {String=} ratio Aspect ratio for player\n  * @return aspectRatio\n  * @method aspectRatio\n  */",
        "meta": {
            "range": [
                2245,
                2385
            ],
            "filename": "player.js",
            "lineno": 95,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Get/Set the aspect ratio</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "String"
                    ]
                },
                "optional": true,
                "description": "<p>Aspect ratio for player</p>",
                "name": "ratio"
            }
        ],
        "returns": [
            {
                "description": "<p>aspectRatio</p>"
            }
        ],
        "kind": "function",
        "name": "aspectRatio",
        "longname": "aspectRatio",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Update styles of the player element (height, width and aspect ratio)\n  *\n  * @method updateStyleEl_\n  */",
        "meta": {
            "range": [
                2387,
                2499
            ],
            "filename": "player.js",
            "lineno": 103,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Update styles of the player element (height, width and aspect ratio)</p>",
        "kind": "function",
        "name": "updateStyleEl_",
        "longname": "updateStyleEl_",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Load the Media Playback Technology (tech)\n  * Load/Create an instance of playback technology including element and API methods\n  * And append playback element in player div.\n  *\n  * @param {String} techName Name of the playback technology\n  * @param {String} source Video source\n  * @method loadTech\n  */",
        "meta": {
            "range": [
                2501,
                2813
            ],
            "filename": "player.js",
            "lineno": 109,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Load the Media Playback Technology (tech)\nLoad/Create an instance of playback technology including element and API methods\nAnd append playback element in player div.</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "String"
                    ]
                },
                "description": "<p>Name of the playback technology</p>",
                "name": "techName"
            },
            {
                "type": {
                    "names": [
                        "String"
                    ]
                },
                "description": "<p>Video source</p>",
                "name": "source"
            }
        ],
        "kind": "function",
        "name": "loadTech",
        "longname": "loadTech",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Unload playback technology\n  *\n  * @method unloadTech\n  */",
        "meta": {
            "range": [
                2815,
                2881
            ],
            "filename": "player.js",
            "lineno": 119,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Unload playback technology</p>",
        "kind": "function",
        "name": "unloadTech",
        "longname": "unloadTech",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Add playback technology listeners\n  *\n  * @method addTechControlsListeners\n  */",
        "meta": {
            "range": [
                2883,
                2970
            ],
            "filename": "player.js",
            "lineno": 125,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Add playback technology listeners</p>",
        "kind": "function",
        "name": "addTechControlsListeners",
        "longname": "addTechControlsListeners",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Remove the listeners used for click and tap controls. This is needed for\n   * toggling to controls disabled, where a tap/touch should do nothing.\n  *\n  * @method removeTechControlsListeners\n  */",
        "meta": {
            "range": [
                2972,
                3175
            ],
            "filename": "player.js",
            "lineno": 131,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Remove the listeners used for click and tap controls. This is needed for\ntoggling to controls disabled, where a tap/touch should do nothing.</p>",
        "kind": "function",
        "name": "removeTechControlsListeners",
        "longname": "removeTechControlsListeners",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Player waits for the tech to be ready\n   * @private\n   * @method handleTechReady\n   */",
        "meta": {
            "range": [
                3177,
                3272
            ],
            "filename": "player.js",
            "lineno": 138,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Player waits for the tech to be ready</p>",
        "access": "private",
        "kind": "function",
        "name": "handleTechReady",
        "longname": "handleTechReady",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Fired when the native controls are used\n   * @private\n   * @method handleTechUseNativeControls\n   */",
        "meta": {
            "range": [
                3274,
                3383
            ],
            "filename": "player.js",
            "lineno": 144,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Fired when the native controls are used</p>",
        "access": "private",
        "kind": "function",
        "name": "handleTechUseNativeControls",
        "longname": "handleTechUseNativeControls",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Fired when the user agent begins looking for media data\n   *\n   * @event loadstart\n   */",
        "meta": {
            "range": [
                3385,
                3482
            ],
            "filename": "player.js",
            "lineno": 150,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Fired when the user agent begins looking for media data</p>",
        "kind": "event",
        "name": "loadstart",
        "longname": "event:loadstart",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Add/remove the vjs-has-started class\n  *\n  * @param {Boolean} hasStarted The value of true adds the class the value of false remove the class\n  * @return {Boolean} Boolean value if has started\n  * @method hasStarted\n  */",
        "meta": {
            "range": [
                3484,
                3712
            ],
            "filename": "player.js",
            "lineno": 156,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Add/remove the vjs-has-started class</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Boolean"
                    ]
                },
                "description": "<p>The value of true adds the class the value of false remove the class</p>",
                "name": "hasStarted"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "Boolean"
                    ]
                },
                "description": "<p>Boolean value if has started</p>"
            }
        ],
        "kind": "function",
        "name": "hasStarted",
        "longname": "hasStarted",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Fired whenever the media begins or resumes playback\n   *\n   * @event play\n   */",
        "meta": {
            "range": [
                3714,
                3802
            ],
            "filename": "player.js",
            "lineno": 164,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Fired whenever the media begins or resumes playback</p>",
        "kind": "event",
        "name": "play",
        "longname": "event:play",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Fired whenever the media begins waiting\n   *\n   * @event waiting\n   */",
        "meta": {
            "range": [
                3804,
                3883
            ],
            "filename": "player.js",
            "lineno": 170,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Fired whenever the media begins waiting</p>",
        "kind": "event",
        "name": "waiting",
        "longname": "event:waiting",
        "scope": "global"
    },
    {
        "comment": "/**\n   * A handler for events that signal that waiting has ended\n   * which is not consistent between browsers. See #1351\n   *\n   * @event canplay\n   */",
        "meta": {
            "range": [
                3885,
                4037
            ],
            "filename": "player.js",
            "lineno": 176,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>A handler for events that signal that waiting has ended\nwhich is not consistent between browsers. See #1351</p>",
        "kind": "event",
        "name": "canplay",
        "longname": "event:canplay",
        "scope": "global"
    },
    {
        "comment": "/**\n   * A handler for events that signal that waiting has ended\n   * which is not consistent between browsers. See #1351\n   *\n   * @event canplaythrough\n   */",
        "meta": {
            "range": [
                4039,
                4198
            ],
            "filename": "player.js",
            "lineno": 183,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>A handler for events that signal that waiting has ended\nwhich is not consistent between browsers. See #1351</p>",
        "kind": "event",
        "name": "canplaythrough",
        "longname": "event:canplaythrough",
        "scope": "global"
    },
    {
        "comment": "/**\n   * A handler for events that signal that waiting has ended\n   * which is not consistent between browsers. See #1351\n   *\n   * @event playing\n   */",
        "meta": {
            "range": [
                4200,
                4352
            ],
            "filename": "player.js",
            "lineno": 190,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>A handler for events that signal that waiting has ended\nwhich is not consistent between browsers. See #1351</p>",
        "kind": "event",
        "name": "playing",
        "longname": "event:playing",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Fired whenever the player is jumping to a new time\n   *\n   * @event seeking\n   */",
        "meta": {
            "range": [
                4354,
                4444
            ],
            "filename": "player.js",
            "lineno": 197,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Fired whenever the player is jumping to a new time</p>",
        "kind": "event",
        "name": "seeking",
        "longname": "event:seeking",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Fired when the player has finished jumping to a new time\n   *\n   * @event seeked\n   */",
        "meta": {
            "range": [
                4446,
                4541
            ],
            "filename": "player.js",
            "lineno": 203,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Fired when the player has finished jumping to a new time</p>",
        "kind": "event",
        "name": "seeked",
        "longname": "event:seeked",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Fired the first time a video is played\n   *\n   * Not part of the HLS spec, and we're not sure if this is the best\n   * implementation yet, so use sparingly. If you don't have a reason to\n   * prevent playback, use `myPlayer.one('play');` instead.\n   *\n   * @event firstplay\n   */",
        "meta": {
            "range": [
                4543,
                4831
            ],
            "filename": "player.js",
            "lineno": 209,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Fired the first time a video is played</p>\n<p>Not part of the HLS spec, and we're not sure if this is the best\nimplementation yet, so use sparingly. If you don't have a reason to\nprevent playback, use <code>myPlayer.one('play');</code> instead.</p>",
        "kind": "event",
        "name": "firstplay",
        "longname": "event:firstplay",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Fired whenever the media has been paused\n   *\n   * @event pause\n   */",
        "meta": {
            "range": [
                4833,
                4911
            ],
            "filename": "player.js",
            "lineno": 219,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Fired whenever the media has been paused</p>",
        "kind": "event",
        "name": "pause",
        "longname": "event:pause",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Fired while the user agent is downloading media data\n   *\n   * @event progress\n   */",
        "meta": {
            "range": [
                4913,
                5006
            ],
            "filename": "player.js",
            "lineno": 225,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Fired while the user agent is downloading media data</p>",
        "kind": "event",
        "name": "progress",
        "longname": "event:progress",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Fired when the end of the media resource is reached (currentTime == duration)\n   *\n   * @event ended\n   */",
        "meta": {
            "range": [
                5008,
                5123
            ],
            "filename": "player.js",
            "lineno": 231,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Fired when the end of the media resource is reached (currentTime == duration)</p>",
        "kind": "event",
        "name": "ended",
        "longname": "event:ended",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Fired when the duration of the media resource is first known or changed\n   *\n   * @event durationchange\n   */",
        "meta": {
            "range": [
                5125,
                5243
            ],
            "filename": "player.js",
            "lineno": 237,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Fired when the duration of the media resource is first known or changed</p>",
        "kind": "event",
        "name": "durationchange",
        "longname": "event:durationchange",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Handle a click on the media element to play/pause\n   *\n   * @param {Object=} event Event object \n   * @method handleTechClick\n   */",
        "meta": {
            "range": [
                5245,
                5385
            ],
            "filename": "player.js",
            "lineno": 243,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Handle a click on the media element to play/pause</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "optional": true,
                "description": "<p>Event object</p>",
                "name": "event"
            }
        ],
        "kind": "function",
        "name": "handleTechClick",
        "longname": "handleTechClick",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Handle a tap on the media element. It will toggle the user\n   * activity state, which hides and shows the controls.\n   *\n   * @method handleTechTap\n   */",
        "meta": {
            "range": [
                5387,
                5549
            ],
            "filename": "player.js",
            "lineno": 250,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Handle a tap on the media element. It will toggle the user\nactivity state, which hides and shows the controls.</p>",
        "kind": "function",
        "name": "handleTechTap",
        "longname": "handleTechTap",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Handle touch to start\n   *\n   * @method handleTechTouchStart\n   */",
        "meta": {
            "range": [
                5551,
                5626
            ],
            "filename": "player.js",
            "lineno": 257,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Handle touch to start</p>",
        "kind": "function",
        "name": "handleTechTouchStart",
        "longname": "handleTechTouchStart",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Handle touch to move\n   *\n   * @method handleTechTouchMove\n   */",
        "meta": {
            "range": [
                5628,
                5701
            ],
            "filename": "player.js",
            "lineno": 263,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Handle touch to move</p>",
        "kind": "function",
        "name": "handleTechTouchMove",
        "longname": "handleTechTouchMove",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Handle touch to end\n   *\n   * @method handleTechTouchEnd\n   */",
        "meta": {
            "range": [
                5703,
                5774
            ],
            "filename": "player.js",
            "lineno": 269,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Handle touch to end</p>",
        "kind": "function",
        "name": "handleTechTouchEnd",
        "longname": "handleTechTouchEnd",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Update the duration of the player using the tech\n   *\n   * @private\n   * @method updateDuration\n   */",
        "meta": {
            "range": [
                5776,
                5886
            ],
            "filename": "player.js",
            "lineno": 275,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Update the duration of the player using the tech</p>",
        "access": "private",
        "kind": "function",
        "name": "updateDuration",
        "longname": "updateDuration",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Fired when the player switches in or out of fullscreen mode\n   *\n   * @event fullscreenchange\n   */",
        "meta": {
            "range": [
                5888,
                5996
            ],
            "filename": "player.js",
            "lineno": 282,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Fired when the player switches in or out of fullscreen mode</p>",
        "kind": "event",
        "name": "fullscreenchange",
        "longname": "event:fullscreenchange",
        "scope": "global"
    },
    {
        "comment": "/**\n   * native click events on the SWF aren't triggered on IE11, Win8.1RT\n   * use stageclick events triggered from inside the SWF instead\n   *\n   * @private\n   * @method handleStageClick\n   */",
        "meta": {
            "range": [
                5998,
                6192
            ],
            "filename": "player.js",
            "lineno": 288,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>native click events on the SWF aren't triggered on IE11, Win8.1RT\nuse stageclick events triggered from inside the SWF instead</p>",
        "access": "private",
        "kind": "function",
        "name": "handleStageClick",
        "longname": "handleStageClick",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Handle Tech Fullscreen Change\n  *\n  * @method handleTechFullscreenChange\n  */",
        "meta": {
            "range": [
                6194,
                6279
            ],
            "filename": "player.js",
            "lineno": 296,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Handle Tech Fullscreen Change</p>",
        "kind": "function",
        "name": "handleTechFullscreenChange",
        "longname": "handleTechFullscreenChange",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Fires when an error occurred during the loading of an audio/video\n   *\n   * @event error\n   */",
        "meta": {
            "range": [
                6281,
                6384
            ],
            "filename": "player.js",
            "lineno": 302,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Fires when an error occurred during the loading of an audio/video</p>",
        "kind": "event",
        "name": "error",
        "longname": "event:error",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Fires when the browser is intentionally not getting media data\n   *\n   * @event suspend\n   */",
        "meta": {
            "range": [
                6386,
                6488
            ],
            "filename": "player.js",
            "lineno": 308,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Fires when the browser is intentionally not getting media data</p>",
        "kind": "event",
        "name": "suspend",
        "longname": "event:suspend",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Fires when the loading of an audio/video is aborted\n   *\n   * @event abort\n   */",
        "meta": {
            "range": [
                6490,
                6579
            ],
            "filename": "player.js",
            "lineno": 314,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Fires when the loading of an audio/video is aborted</p>",
        "kind": "event",
        "name": "abort",
        "longname": "event:abort",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Fires when the current playlist is empty\n   *\n   * @event emptied\n   */",
        "meta": {
            "range": [
                6581,
                6661
            ],
            "filename": "player.js",
            "lineno": 320,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Fires when the current playlist is empty</p>",
        "kind": "event",
        "name": "emptied",
        "longname": "event:emptied",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Fires when the browser is trying to get media data, but data is not available\n   *\n   * @event stalled\n   */",
        "meta": {
            "range": [
                6663,
                6780
            ],
            "filename": "player.js",
            "lineno": 326,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Fires when the browser is trying to get media data, but data is not available</p>",
        "kind": "event",
        "name": "stalled",
        "longname": "event:stalled",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Fires when the browser has loaded meta data for the audio/video\n   *\n   * @event loadedmetadata\n   */",
        "meta": {
            "range": [
                6782,
                6892
            ],
            "filename": "player.js",
            "lineno": 332,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Fires when the browser has loaded meta data for the audio/video</p>",
        "kind": "event",
        "name": "loadedmetadata",
        "longname": "event:loadedmetadata",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Fires when the browser has loaded the current frame of the audio/video\n   *\n   * @event loaddata\n   */",
        "meta": {
            "range": [
                6894,
                7005
            ],
            "filename": "player.js",
            "lineno": 338,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Fires when the browser has loaded the current frame of the audio/video</p>",
        "kind": "event",
        "name": "loaddata",
        "longname": "event:loaddata",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Fires when the current playback position has changed\n   *\n   * @event timeupdate\n   */",
        "meta": {
            "range": [
                7007,
                7102
            ],
            "filename": "player.js",
            "lineno": 344,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Fires when the current playback position has changed</p>",
        "kind": "event",
        "name": "timeupdate",
        "longname": "event:timeupdate",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Fires when the playing speed of the audio/video is changed\n   *\n   * @event ratechange\n   */",
        "meta": {
            "range": [
                7104,
                7205
            ],
            "filename": "player.js",
            "lineno": 350,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Fires when the playing speed of the audio/video is changed</p>",
        "kind": "event",
        "name": "ratechange",
        "longname": "event:ratechange",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Fires when the volume has been changed\n   *\n   * @event volumechange\n   */",
        "meta": {
            "range": [
                7207,
                7290
            ],
            "filename": "player.js",
            "lineno": 356,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Fires when the volume has been changed</p>",
        "kind": "event",
        "name": "volumechange",
        "longname": "event:volumechange",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Fires when the text track has been changed\n   *\n   * @event texttrackchange\n   */",
        "meta": {
            "range": [
                7292,
                7382
            ],
            "filename": "player.js",
            "lineno": 362,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Fires when the text track has been changed</p>",
        "kind": "event",
        "name": "texttrackchange",
        "longname": "event:texttrackchange",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Get object for cached values.\n   *\n   * @return {Object} \n   * @method getCache\n   */",
        "meta": {
            "range": [
                7384,
                7478
            ],
            "filename": "player.js",
            "lineno": 368,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Get object for cached values.</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "getCache",
        "longname": "getCache",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Pass values to the playback tech\n  *\n  * @param {String=} method Method \n  * @param {Object=} arg Argument \n  * @method techCall\n  */",
        "meta": {
            "range": [
                7480,
                7621
            ],
            "filename": "player.js",
            "lineno": 375,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Pass values to the playback tech</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "String"
                    ]
                },
                "optional": true,
                "description": "<p>Method</p>",
                "name": "method"
            },
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "optional": true,
                "description": "<p>Argument</p>",
                "name": "arg"
            }
        ],
        "kind": "function",
        "name": "techCall",
        "longname": "techCall",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Get calls can't wait for the tech, and sometimes don't need to.\n  *\n  * @param {String} method Tech method\n  * @return {Method}\n  * @method techGet\n  */",
        "meta": {
            "range": [
                7623,
                7783
            ],
            "filename": "player.js",
            "lineno": 383,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Get calls can't wait for the tech, and sometimes don't need to.</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "String"
                    ]
                },
                "description": "<p>Tech method</p>",
                "name": "method"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "Method"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "techGet",
        "longname": "techGet",
        "scope": "global"
    },
    {
        "comment": "/**\n   * start media playback\n   *\n   *     myPlayer.play();\n   *\n   * @return {Player} self\n   * @method play\n   */",
        "meta": {
            "range": [
                7785,
                7901
            ],
            "filename": "player.js",
            "lineno": 391,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>start media playback</p>\n<pre class=\"prettyprint source\"><code>myPlayer.play();</code></pre>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Player"
                    ]
                },
                "description": "<p>self</p>"
            }
        ],
        "kind": "function",
        "name": "play",
        "longname": "play",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Pause the video playback\n   *\n   *     myPlayer.pause();\n   *\n   * @return {Player} self\n   * @method pause\n   */",
        "meta": {
            "range": [
                7903,
                8025
            ],
            "filename": "player.js",
            "lineno": 400,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Pause the video playback</p>\n<pre class=\"prettyprint source\"><code>myPlayer.pause();</code></pre>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Player"
                    ]
                },
                "description": "<p>self</p>"
            }
        ],
        "kind": "function",
        "name": "pause",
        "longname": "pause",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Check if the player is paused\n   *\n   *     var isPaused = myPlayer.paused();\n   *     var isPlaying = !myPlayer.paused();\n   *\n   * @return {Boolean} false if the media is currently playing, or true otherwise\n   * @method paused\n   */",
        "meta": {
            "range": [
                8027,
                8271
            ],
            "filename": "player.js",
            "lineno": 409,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Check if the player is paused</p>\n<pre class=\"prettyprint source\"><code>var isPaused = myPlayer.paused();\nvar isPlaying = !myPlayer.paused();</code></pre>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Boolean"
                    ]
                },
                "description": "<p>false if the media is currently playing, or true otherwise</p>"
            }
        ],
        "kind": "function",
        "name": "paused",
        "longname": "paused",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Returns whether or not the user is \"scrubbing\". Scrubbing is when the user\n  * has clicked the progress bar handle and is dragging it along the progress bar.\n  *\n  * @param  {Boolean} isScrubbing   True/false the user is scrubbing\n  * @return {Boolean}               The scrubbing status when getting\n  * @return {Object}                The player when setting\n  * @method scrubbing\n  */",
        "meta": {
            "range": [
                8273,
                8668
            ],
            "filename": "player.js",
            "lineno": 419,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Returns whether or not the user is &quot;scrubbing&quot;. Scrubbing is when the user\nhas clicked the progress bar handle and is dragging it along the progress bar.</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Boolean"
                    ]
                },
                "description": "<p>True/false the user is scrubbing</p>",
                "name": "isScrubbing"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "Boolean"
                    ]
                },
                "description": "<p>The scrubbing status when getting</p>"
            },
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "description": "<p>The player when setting</p>"
            }
        ],
        "kind": "function",
        "name": "scrubbing",
        "longname": "scrubbing",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Get or set the current time (in seconds)\n   *\n   *     // get\n   *     var whereYouAt = myPlayer.currentTime();\n   *\n   *     // set\n   *     myPlayer.currentTime(120); // 2 minutes into the video\n   *\n   * @param  {Number|String=} seconds The time to seek to\n   * @return {Number}        The time in seconds, when not setting\n   * @return {Player}    self, when the current time is set\n   * @method currentTime\n   */",
        "meta": {
            "range": [
                8670,
                9096
            ],
            "filename": "player.js",
            "lineno": 429,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Get or set the current time (in seconds)</p>\n<pre class=\"prettyprint source\"><code>// get\nvar whereYouAt = myPlayer.currentTime();\n\n// set\nmyPlayer.currentTime(120); // 2 minutes into the video</code></pre>",
        "params": [
            {
                "type": {
                    "names": [
                        "Number",
                        "String"
                    ]
                },
                "description": "<p>The time to seek to</p>",
                "name": "seconds"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "Number"
                    ]
                },
                "description": "<p>The time in seconds, when not setting</p>"
            },
            {
                "type": {
                    "names": [
                        "Player"
                    ]
                },
                "description": "<p>self, when the current time is set</p>"
            }
        ],
        "kind": "function",
        "name": "currentTime",
        "longname": "currentTime",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Get the length in time of the video in seconds\n   *\n   *     var lengthOfVideo = myPlayer.duration();\n   *\n   * **NOTE**: The video must have started loading before the duration can be\n   * known, and in the case of Flash, may not be known until the video starts\n   * playing.\n   *\n   * @param {Number} seconds Duration when setting\n   * @return {Number} The duration of the video in seconds when getting\n   * @method duration\n   */",
        "meta": {
            "range": [
                9098,
                9539
            ],
            "filename": "player.js",
            "lineno": 444,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Get the length in time of the video in seconds</p>\n<pre class=\"prettyprint source\"><code>var lengthOfVideo = myPlayer.duration();</code></pre><p><strong>NOTE</strong>: The video must have started loading before the duration can be\nknown, and in the case of Flash, may not be known until the video starts\nplaying.</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Number"
                    ]
                },
                "description": "<p>Duration when setting</p>",
                "name": "seconds"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "Number"
                    ]
                },
                "description": "<p>The duration of the video in seconds when getting</p>"
            }
        ],
        "kind": "function",
        "name": "duration",
        "longname": "duration",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Calculates how much time is left.\n   *\n   *     var timeLeft = myPlayer.remainingTime();\n   *\n   * Not a native video element function, but useful\n   *\n   * @return {Number} The time remaining in seconds\n   * @method remainingTime\n   */",
        "meta": {
            "range": [
                9541,
                9786
            ],
            "filename": "player.js",
            "lineno": 458,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Calculates how much time is left.</p>\n<pre class=\"prettyprint source\"><code>var timeLeft = myPlayer.remainingTime();</code></pre><p>Not a native video element function, but useful</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Number"
                    ]
                },
                "description": "<p>The time remaining in seconds</p>"
            }
        ],
        "kind": "function",
        "name": "remainingTime",
        "longname": "remainingTime",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Get a TimeRange object with the times of the video that have been downloaded\n   *\n   * If you just want the percent of the video that's been downloaded,\n   * use bufferedPercent.\n   *\n   *     // Number of different ranges of time have been buffered. Usually 1.\n   *     numberOfRanges = bufferedTimeRange.length,\n   *\n   *     // Time in seconds when the first range starts. Usually 0.\n   *     firstRangeStart = bufferedTimeRange.start(0),\n   *\n   *     // Time in seconds when the first range ends\n   *     firstRangeEnd = bufferedTimeRange.end(0),\n   *\n   *     // Length in seconds of the first time range\n   *     firstRangeLength = firstRangeEnd - firstRangeStart;\n   *\n   * @return {Object} A mock TimeRange object (following HTML spec)\n   * @method buffered\n   */",
        "meta": {
            "range": [
                9788,
                10569
            ],
            "filename": "player.js",
            "lineno": 469,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Get a TimeRange object with the times of the video that have been downloaded</p>\n<p>If you just want the percent of the video that's been downloaded,\nuse bufferedPercent.</p>\n<pre class=\"prettyprint source\"><code>// Number of different ranges of time have been buffered. Usually 1.\nnumberOfRanges = bufferedTimeRange.length,\n\n// Time in seconds when the first range starts. Usually 0.\nfirstRangeStart = bufferedTimeRange.start(0),\n\n// Time in seconds when the first range ends\nfirstRangeEnd = bufferedTimeRange.end(0),\n\n// Length in seconds of the first time range\nfirstRangeLength = firstRangeEnd - firstRangeStart;</code></pre>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "description": "<p>A mock TimeRange object (following HTML spec)</p>"
            }
        ],
        "kind": "function",
        "name": "buffered",
        "longname": "buffered",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Get the percent (as a decimal) of the video that's been downloaded\n   *\n   *     var howMuchIsDownloaded = myPlayer.bufferedPercent();\n   *\n   * 0 means none, 1 means all.\n   * (This method isn't in the HTML5 spec, but it's very convenient)\n   *\n   * @return {Number} A decimal between 0 and 1 representing the percent\n   * @method bufferedPercent\n   */",
        "meta": {
            "range": [
                10571,
                10933
            ],
            "filename": "player.js",
            "lineno": 491,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Get the percent (as a decimal) of the video that's been downloaded</p>\n<pre class=\"prettyprint source\"><code>var howMuchIsDownloaded = myPlayer.bufferedPercent();</code></pre><p>0 means none, 1 means all.\n(This method isn't in the HTML5 spec, but it's very convenient)</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Number"
                    ]
                },
                "description": "<p>A decimal between 0 and 1 representing the percent</p>"
            }
        ],
        "kind": "function",
        "name": "bufferedPercent",
        "longname": "bufferedPercent",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Get the ending time of the last buffered time range\n   *\n   * This is used in the progress bar to encapsulate all time ranges.\n   * @return {Number} The end of the last buffered time range\n   * @method bufferedEnd\n   */",
        "meta": {
            "range": [
                10935,
                11163
            ],
            "filename": "player.js",
            "lineno": 503,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Get the ending time of the last buffered time range</p>\n<p>This is used in the progress bar to encapsulate all time ranges.</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Number"
                    ]
                },
                "description": "<p>The end of the last buffered time range</p>"
            }
        ],
        "kind": "function",
        "name": "bufferedEnd",
        "longname": "bufferedEnd",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Get or set the current volume of the media\n   *\n   *     // get\n   *     var howLoudIsIt = myPlayer.volume();\n   *\n   *     // set\n   *     myPlayer.volume(0.5); // Set volume to half\n   *\n   * 0 is off (muted), 1.0 is all the way up, 0.5 is half way.\n   *\n   * @param  {Number} percentAsDecimal The new volume as a decimal percent\n   * @return {Number}              The current volume when getting\n   * @return {Player}              self when setting\n   * @method volume\n   */",
        "meta": {
            "range": [
                11165,
                11651
            ],
            "filename": "player.js",
            "lineno": 511,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Get or set the current volume of the media</p>\n<pre class=\"prettyprint source\"><code>// get\nvar howLoudIsIt = myPlayer.volume();\n\n// set\nmyPlayer.volume(0.5); // Set volume to half</code></pre><p>0 is off (muted), 1.0 is all the way up, 0.5 is half way.</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Number"
                    ]
                },
                "description": "<p>The new volume as a decimal percent</p>",
                "name": "percentAsDecimal"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "Number"
                    ]
                },
                "description": "<p>The current volume when getting</p>"
            },
            {
                "type": {
                    "names": [
                        "Player"
                    ]
                },
                "description": "<p>self when setting</p>"
            }
        ],
        "kind": "function",
        "name": "volume",
        "longname": "volume",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Get the current muted state, or turn mute on or off\n   *\n   *     // get\n   *     var isVolumeMuted = myPlayer.muted();\n   *\n   *     // set\n   *     myPlayer.muted(true); // mute the volume\n   *\n   * @param  {Boolean=} muted True to mute, false to unmute\n   * @return {Boolean} True if mute is on, false if not when getting\n   * @return {Player} self when setting mute\n   * @method muted\n   */",
        "meta": {
            "range": [
                11653,
                12056
            ],
            "filename": "player.js",
            "lineno": 528,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Get the current muted state, or turn mute on or off</p>\n<pre class=\"prettyprint source\"><code>// get\nvar isVolumeMuted = myPlayer.muted();\n\n// set\nmyPlayer.muted(true); // mute the volume</code></pre>",
        "params": [
            {
                "type": {
                    "names": [
                        "Boolean"
                    ]
                },
                "optional": true,
                "description": "<p>True to mute, false to unmute</p>",
                "name": "muted"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "Boolean"
                    ]
                },
                "description": "<p>True if mute is on, false if not when getting</p>"
            },
            {
                "type": {
                    "names": [
                        "Player"
                    ]
                },
                "description": "<p>self when setting mute</p>"
            }
        ],
        "kind": "function",
        "name": "muted",
        "longname": "muted",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Check to see if fullscreen is supported\n  *\n  * @return {Boolean} \n  * @method supportsFullScreen\n  */",
        "meta": {
            "range": [
                12058,
                12168
            ],
            "filename": "player.js",
            "lineno": 543,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Check to see if fullscreen is supported</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Boolean"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "supportsFullScreen",
        "longname": "supportsFullScreen",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Check if the player is in fullscreen mode\n   *\n   *     // get\n   *     var fullscreenOrNot = myPlayer.isFullscreen();\n   *\n   *     // set\n   *     myPlayer.isFullscreen(true); // tell the player it's in fullscreen\n   *\n   * NOTE: As of the latest HTML5 spec, isFullscreen is no longer an official\n   * property and instead document.fullscreenElement is used. But isFullscreen is\n   * still a valuable property for internal player workings.\n   *\n   * @param  {Boolean=} isFS Update the player's fullscreen state\n   * @return {Boolean} true if fullscreen false if not when getting\n   * @return {Player} self when setting\n   * @method isFullscreen\n   */",
        "meta": {
            "range": [
                12170,
                12831
            ],
            "filename": "player.js",
            "lineno": 550,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Check if the player is in fullscreen mode</p>\n<pre class=\"prettyprint source\"><code>// get\nvar fullscreenOrNot = myPlayer.isFullscreen();\n\n// set\nmyPlayer.isFullscreen(true); // tell the player it's in fullscreen</code></pre><p>NOTE: As of the latest HTML5 spec, isFullscreen is no longer an official\nproperty and instead document.fullscreenElement is used. But isFullscreen is\nstill a valuable property for internal player workings.</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Boolean"
                    ]
                },
                "optional": true,
                "description": "<p>Update the player's fullscreen state</p>",
                "name": "isFS"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "Boolean"
                    ]
                },
                "description": "<p>true if fullscreen false if not when getting</p>"
            },
            {
                "type": {
                    "names": [
                        "Player"
                    ]
                },
                "description": "<p>self when setting</p>"
            }
        ],
        "kind": "function",
        "name": "isFullscreen",
        "longname": "isFullscreen",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Old naming for isFullscreen()\n   *\n   * @param  {Boolean=} isFS Update the player's fullscreen state\n   * @return {Boolean} true if fullscreen false if not when getting\n   * @return {Player} self when setting\n   * @deprecated\n   * @method isFullScreen\n   */",
        "meta": {
            "range": [
                12833,
                13099
            ],
            "filename": "player.js",
            "lineno": 569,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Old naming for isFullscreen()</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Boolean"
                    ]
                },
                "optional": true,
                "description": "<p>Update the player's fullscreen state</p>",
                "name": "isFS"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "Boolean"
                    ]
                },
                "description": "<p>true if fullscreen false if not when getting</p>"
            },
            {
                "type": {
                    "names": [
                        "Player"
                    ]
                },
                "description": "<p>self when setting</p>"
            }
        ],
        "deprecated": true,
        "kind": "function",
        "name": "isFullScreen",
        "longname": "isFullScreen",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Increase the size of the video to full screen\n   *\n   *     myPlayer.requestFullscreen();\n   *\n   * In some browsers, full screen is not supported natively, so it enters\n   * \"full window mode\", where the video fills the browser window.\n   * In browsers and devices that support native full screen, sometimes the\n   * browser's default controls will be shown, and not the Video.js custom skin.\n   * This includes most mobile devices (iOS, Android) and older versions of\n   * Safari.\n   *\n   * @return {Player} self\n   * @method requestFullscreen\n   */",
        "meta": {
            "range": [
                13101,
                13661
            ],
            "filename": "player.js",
            "lineno": 579,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Increase the size of the video to full screen</p>\n<pre class=\"prettyprint source\"><code>myPlayer.requestFullscreen();</code></pre><p>In some browsers, full screen is not supported natively, so it enters\n&quot;full window mode&quot;, where the video fills the browser window.\nIn browsers and devices that support native full screen, sometimes the\nbrowser's default controls will be shown, and not the Video.js custom skin.\nThis includes most mobile devices (iOS, Android) and older versions of\nSafari.</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Player"
                    ]
                },
                "description": "<p>self</p>"
            }
        ],
        "kind": "function",
        "name": "requestFullscreen",
        "longname": "requestFullscreen",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Old naming for requestFullscreen\n   *\n   * @return {Boolean} true if fullscreen false if not when getting\n   * @deprecated\n   * @method requestFullScreen\n   */",
        "meta": {
            "range": [
                13663,
                13831
            ],
            "filename": "player.js",
            "lineno": 595,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Old naming for requestFullscreen</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Boolean"
                    ]
                },
                "description": "<p>true if fullscreen false if not when getting</p>"
            }
        ],
        "deprecated": true,
        "kind": "function",
        "name": "requestFullScreen",
        "longname": "requestFullScreen",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Return the video to its normal size after having been in full screen mode\n   *\n   *     myPlayer.exitFullscreen();\n   *\n   * @return {Player} self\n   * @method exitFullscreen\n   */",
        "meta": {
            "range": [
                13833,
                14022
            ],
            "filename": "player.js",
            "lineno": 603,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Return the video to its normal size after having been in full screen mode</p>\n<pre class=\"prettyprint source\"><code>myPlayer.exitFullscreen();</code></pre>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Player"
                    ]
                },
                "description": "<p>self</p>"
            }
        ],
        "kind": "function",
        "name": "exitFullscreen",
        "longname": "exitFullscreen",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Old naming for exitFullscreen\n   *\n   * @return {Player} self\n   * @deprecated\n   * @method cancelFullScreen\n   */",
        "meta": {
            "range": [
                14024,
                14147
            ],
            "filename": "player.js",
            "lineno": 612,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Old naming for exitFullscreen</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Player"
                    ]
                },
                "description": "<p>self</p>"
            }
        ],
        "deprecated": true,
        "kind": "function",
        "name": "cancelFullScreen",
        "longname": "cancelFullScreen",
        "scope": "global"
    },
    {
        "comment": "/**\n  *  When fullscreen isn't supported we can stretch the video container to as wide as the browser will let us.\n  *\n  * @method enterFullWindow\n  */",
        "meta": {
            "range": [
                14149,
                14300
            ],
            "filename": "player.js",
            "lineno": 620,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>When fullscreen isn't supported we can stretch the video container to as wide as the browser will let us.</p>",
        "kind": "function",
        "name": "enterFullWindow",
        "longname": "enterFullWindow",
        "scope": "global"
    },
    {
        "comment": "/**\n  *  Check for call to either exit full window or full screen on ESC key\n  *\n  * @param {String} event Event to check for key press\n  * @method fullWindowOnEscKey\n  */",
        "meta": {
            "range": [
                14302,
                14473
            ],
            "filename": "player.js",
            "lineno": 626,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Check for call to either exit full window or full screen on ESC key</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "String"
                    ]
                },
                "description": "<p>Event to check for key press</p>",
                "name": "event"
            }
        ],
        "kind": "function",
        "name": "fullWindowOnEscKey",
        "longname": "fullWindowOnEscKey",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Exit full window \n  *\n  * @method exitFullWindow\n  */",
        "meta": {
            "range": [
                14475,
                14536
            ],
            "filename": "player.js",
            "lineno": 633,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Exit full window</p>",
        "kind": "function",
        "name": "exitFullWindow",
        "longname": "exitFullWindow",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Select source based on tech order\n  *\n  * @param {Array} sources The sources for a media asset\n  * @return {Object|Boolean} Object of source and tech order, otherwise false\n  * @method selectSource\n  */",
        "meta": {
            "range": [
                14538,
                14748
            ],
            "filename": "player.js",
            "lineno": 639,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Select source based on tech order</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Array"
                    ]
                },
                "description": "<p>The sources for a media asset</p>",
                "name": "sources"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "Object",
                        "Boolean"
                    ]
                },
                "description": "<p>Object of source and tech order, otherwise false</p>"
            }
        ],
        "kind": "function",
        "name": "selectSource",
        "longname": "selectSource",
        "scope": "global"
    },
    {
        "comment": "/**\n   * The source function updates the video source\n   *\n   * There are three types of variables you can pass as the argument.\n   *\n   * **URL String**: A URL to the the video file. Use this method if you are sure\n   * the current playback technology (HTML5/Flash) can support the source you\n   * provide. Currently only MP4 files can be used in both HTML5 and Flash.\n   *\n   *     myPlayer.src(\"http://www.example.com/path/to/video.mp4\");\n   *\n   * **Source Object (or element):** A javascript object containing information\n   * about the source file. Use this method if you want the player to determine if\n   * it can support the file using the type information.\n   *\n   *     myPlayer.src({ type: \"video/mp4\", src: \"http://www.example.com/path/to/video.mp4\" });\n   *\n   * **Array of Source Objects:** To provide multiple versions of the source so\n   * that it can be played using HTML5 across browsers you can use an array of\n   * source objects. Video.js will detect which version is supported and load that\n   * file.\n   *\n   *     myPlayer.src([\n   *       { type: \"video/mp4\", src: \"http://www.example.com/path/to/video.mp4\" },\n   *       { type: \"video/webm\", src: \"http://www.example.com/path/to/video.webm\" },\n   *       { type: \"video/ogg\", src: \"http://www.example.com/path/to/video.ogv\" }\n   *     ]);\n   *\n   * @param  {String|Object|Array=} source The source URL, object, or array of sources\n   * @return {String} The current video source when getting\n   * @return {String} The player when setting\n   * @method src\n   */",
        "meta": {
            "range": [
                14750,
                16287
            ],
            "filename": "player.js",
            "lineno": 647,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>The source function updates the video source</p>\n<p>There are three types of variables you can pass as the argument.</p>\n<p><strong>URL String</strong>: A URL to the the video file. Use this method if you are sure\nthe current playback technology (HTML5/Flash) can support the source you\nprovide. Currently only MP4 files can be used in both HTML5 and Flash.</p>\n<pre class=\"prettyprint source\"><code>myPlayer.src(&quot;http://www.example.com/path/to/video.mp4&quot;);</code></pre><p><strong>Source Object (or element):</strong> A javascript object containing information\nabout the source file. Use this method if you want the player to determine if\nit can support the file using the type information.</p>\n<pre class=\"prettyprint source\"><code>myPlayer.src({ type: &quot;video/mp4&quot;, src: &quot;http://www.example.com/path/to/video.mp4&quot; });</code></pre><p><strong>Array of Source Objects:</strong> To provide multiple versions of the source so\nthat it can be played using HTML5 across browsers you can use an array of\nsource objects. Video.js will detect which version is supported and load that\nfile.</p>\n<pre class=\"prettyprint source\"><code>myPlayer.src([\n  { type: &quot;video/mp4&quot;, src: &quot;http://www.example.com/path/to/video.mp4&quot; },\n  { type: &quot;video/webm&quot;, src: &quot;http://www.example.com/path/to/video.webm&quot; },\n  { type: &quot;video/ogg&quot;, src: &quot;http://www.example.com/path/to/video.ogv&quot; }\n]);</code></pre>",
        "params": [
            {
                "type": {
                    "names": [
                        "String",
                        "Object",
                        "Array"
                    ]
                },
                "description": "<p>The source URL, object, or array of sources</p>",
                "name": "source"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "String"
                    ]
                },
                "description": "<p>The current video source when getting</p>"
            },
            {
                "type": {
                    "names": [
                        "String"
                    ]
                },
                "description": "<p>The player when setting</p>"
            }
        ],
        "kind": "function",
        "name": "src",
        "longname": "src",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Handle an array of source objects\n   *\n   * @param  {Array} sources Array of source objects\n   * @private\n   * @method sourceList_\n   */",
        "meta": {
            "range": [
                16289,
                16434
            ],
            "filename": "player.js",
            "lineno": 681,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Handle an array of source objects</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Array"
                    ]
                },
                "description": "<p>Array of source objects</p>",
                "name": "sources"
            }
        ],
        "access": "private",
        "kind": "function",
        "name": "sourceList_",
        "longname": "sourceList_",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Begin loading the src data.\n   *\n   * @return {Player} Returns the player\n   * @method load\n   */",
        "meta": {
            "range": [
                16436,
                16542
            ],
            "filename": "player.js",
            "lineno": 689,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Begin loading the src data.</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Player"
                    ]
                },
                "description": "<p>Returns the player</p>"
            }
        ],
        "kind": "function",
        "name": "load",
        "longname": "load",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Returns the fully qualified URL of the current source value e.g. http://mysite.com/video.mp4\n   * Can be used in conjuction with `currentType` to assist in rebuilding the current source object.\n   *\n   * @return {String} The current source\n   * @method currentSrc\n   */",
        "meta": {
            "range": [
                16544,
                16822
            ],
            "filename": "player.js",
            "lineno": 696,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Returns the fully qualified URL of the current source value e.g. http://mysite.com/video.mp4\nCan be used in conjuction with <code>currentType</code> to assist in rebuilding the current source object.</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "String"
                    ]
                },
                "description": "<p>The current source</p>"
            }
        ],
        "kind": "function",
        "name": "currentSrc",
        "longname": "currentSrc",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Get the current source type e.g. video/mp4\n   * This can allow you rebuild the current source object so that you could load the same\n   * source and tech later\n   *\n   * @return {String} The source MIME type\n   * @method currentType\n   */",
        "meta": {
            "range": [
                16824,
                17071
            ],
            "filename": "player.js",
            "lineno": 704,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Get the current source type e.g. video/mp4\nThis can allow you rebuild the current source object so that you could load the same\nsource and tech later</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "String"
                    ]
                },
                "description": "<p>The source MIME type</p>"
            }
        ],
        "kind": "function",
        "name": "currentType",
        "longname": "currentType",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Get or set the preload attribute\n   *\n   * @param {Boolean} value Boolean to determine if preload should be used\n   * @return {String} The preload attribute value when getting\n   * @return {Player} Returns the player when setting\n   * @method preload\n   */",
        "meta": {
            "range": [
                17073,
                17338
            ],
            "filename": "player.js",
            "lineno": 713,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Get or set the preload attribute</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Boolean"
                    ]
                },
                "description": "<p>Boolean to determine if preload should be used</p>",
                "name": "value"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "String"
                    ]
                },
                "description": "<p>The preload attribute value when getting</p>"
            },
            {
                "type": {
                    "names": [
                        "Player"
                    ]
                },
                "description": "<p>Returns the player when setting</p>"
            }
        ],
        "kind": "function",
        "name": "preload",
        "longname": "preload",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Get or set the autoplay attribute.\n   *\n   * @param {Boolean} value Boolean to determine if preload should be used\n   * @return {String} The autoplay attribute value when getting\n   * @return {Player} Returns the player when setting\n   * @method autoplay\n   */",
        "meta": {
            "range": [
                17340,
                17609
            ],
            "filename": "player.js",
            "lineno": 722,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Get or set the autoplay attribute.</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Boolean"
                    ]
                },
                "description": "<p>Boolean to determine if preload should be used</p>",
                "name": "value"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "String"
                    ]
                },
                "description": "<p>The autoplay attribute value when getting</p>"
            },
            {
                "type": {
                    "names": [
                        "Player"
                    ]
                },
                "description": "<p>Returns the player when setting</p>"
            }
        ],
        "kind": "function",
        "name": "autoplay",
        "longname": "autoplay",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Get or set the loop attribute on the video element.\n   *\n   * @param {Boolean} value Boolean to determine if preload should be used\n   * @return {String} The loop attribute value when getting\n   * @return {Player} Returns the player when setting\n   * @method loop\n   */",
        "meta": {
            "range": [
                17611,
                17889
            ],
            "filename": "player.js",
            "lineno": 731,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Get or set the loop attribute on the video element.</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Boolean"
                    ]
                },
                "description": "<p>Boolean to determine if preload should be used</p>",
                "name": "value"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "String"
                    ]
                },
                "description": "<p>The loop attribute value when getting</p>"
            },
            {
                "type": {
                    "names": [
                        "Player"
                    ]
                },
                "description": "<p>Returns the player when setting</p>"
            }
        ],
        "kind": "function",
        "name": "loop",
        "longname": "loop",
        "scope": "global"
    },
    {
        "comment": "/**\n   * get or set the poster image source url\n   *\n   * ##### EXAMPLE:\n   *\n   *     // getting\n   *     var currentPoster = myPlayer.poster();\n   *\n   *     // setting\n   *     myPlayer.poster('http://example.com/myImage.jpg');\n   *\n   * @param  {String=} src Poster image source URL\n   * @return {String} poster URL when getting\n   * @return {Player} self when setting\n   * @method poster\n   */",
        "meta": {
            "range": [
                17891,
                18289
            ],
            "filename": "player.js",
            "lineno": 740,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>get or set the poster image source url</p>\n<h5>EXAMPLE:</h5><pre class=\"prettyprint source\"><code>// getting\nvar currentPoster = myPlayer.poster();\n\n// setting\nmyPlayer.poster('http://example.com/myImage.jpg');</code></pre>",
        "params": [
            {
                "type": {
                    "names": [
                        "String"
                    ]
                },
                "optional": true,
                "description": "<p>Poster image source URL</p>",
                "name": "src"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "String"
                    ]
                },
                "description": "<p>poster URL when getting</p>"
            },
            {
                "type": {
                    "names": [
                        "Player"
                    ]
                },
                "description": "<p>self when setting</p>"
            }
        ],
        "kind": "function",
        "name": "poster",
        "longname": "poster",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Get or set whether or not the controls are showing.\n   *\n   * @param  {Boolean} bool Set controls to showing or not\n   * @return {Boolean}    Controls are showing\n   * @method controls\n   */",
        "meta": {
            "range": [
                18291,
                18490
            ],
            "filename": "player.js",
            "lineno": 757,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Get or set whether or not the controls are showing.</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Boolean"
                    ]
                },
                "description": "<p>Set controls to showing or not</p>",
                "name": "bool"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "Boolean"
                    ]
                },
                "description": "<p>Controls are showing</p>"
            }
        ],
        "kind": "function",
        "name": "controls",
        "longname": "controls",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Toggle native controls on/off. Native controls are the controls built into\n   * devices (e.g. default iPhone controls), Flash, or other techs\n   * (e.g. Vimeo Controls)\n   *\n   * **This should only be set by the current tech, because only the tech knows\n   * if it can support native controls**\n   *\n   * @param  {Boolean} bool    True signals that native controls are on\n   * @return {Player}      Returns the player\n   * @private\n   * @method usingNativeControls\n   */",
        "meta": {
            "range": [
                18492,
                18971
            ],
            "filename": "player.js",
            "lineno": 765,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Toggle native controls on/off. Native controls are the controls built into\ndevices (e.g. default iPhone controls), Flash, or other techs\n(e.g. Vimeo Controls)</p>\n<p><strong>This should only be set by the current tech, because only the tech knows\nif it can support native controls</strong></p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Boolean"
                    ]
                },
                "description": "<p>True signals that native controls are on</p>",
                "name": "bool"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "Player"
                    ]
                },
                "description": "<p>Returns the player</p>"
            }
        ],
        "access": "private",
        "kind": "function",
        "name": "usingNativeControls",
        "longname": "usingNativeControls",
        "scope": "global"
    },
    {
        "comment": "/**\n           * player is using the native device controls\n           *\n           * @event usingnativecontrols\n           * @memberof Player\n           * @instance\n           * @private\n           */",
        "meta": {
            "range": [
                18973,
                19174
            ],
            "filename": "player.js",
            "lineno": 779,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>player is using the native device controls</p>",
        "kind": "event",
        "name": "usingnativecontrols",
        "memberof": "Player",
        "scope": "instance",
        "access": "private",
        "longname": "Player#event:usingnativecontrols"
    },
    {
        "comment": "/**\n           * player is using the custom HTML controls\n           *\n           * @event usingcustomcontrols\n           * @memberof Player\n           * @instance\n           * @private\n           */",
        "meta": {
            "range": [
                19176,
                19375
            ],
            "filename": "player.js",
            "lineno": 788,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>player is using the custom HTML controls</p>",
        "kind": "event",
        "name": "usingcustomcontrols",
        "memberof": "Player",
        "scope": "instance",
        "access": "private",
        "longname": "Player#event:usingcustomcontrols"
    },
    {
        "comment": "/**\n   * Set or get the current MediaError\n   * @param  {*} err A MediaError or a String/Number to be turned into a MediaError\n   * @return {MediaError|null}     when getting\n   * @return {Player}              when setting\n   * @method error\n   */",
        "meta": {
            "range": [
                19377,
                19624
            ],
            "filename": "player.js",
            "lineno": 797,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Set or get the current MediaError</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "*"
                    ]
                },
                "description": "<p>A MediaError or a String/Number to be turned into a MediaError</p>",
                "name": "err"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "MediaError",
                        "null"
                    ]
                },
                "description": "<p>when getting</p>"
            },
            {
                "type": {
                    "names": [
                        "Player"
                    ]
                },
                "description": "<p>when setting</p>"
            }
        ],
        "kind": "function",
        "name": "error",
        "longname": "error",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Returns whether or not the player is in the \"ended\" state.\n   *\n   * @return {Boolean} True if the player is in the ended state, false if not.\n   * @method ended\n   */",
        "meta": {
            "range": [
                19626,
                19802
            ],
            "filename": "player.js",
            "lineno": 805,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Returns whether or not the player is in the &quot;ended&quot; state.</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Boolean"
                    ]
                },
                "description": "<p>True if the player is in the ended state, false if not.</p>"
            }
        ],
        "kind": "function",
        "name": "ended",
        "longname": "ended",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Returns whether or not the player is in the \"seeking\" state.\n   *\n   * @return {Boolean} True if the player is in the seeking state, false if not.\n   * @method seeking\n   */",
        "meta": {
            "range": [
                19804,
                19986
            ],
            "filename": "player.js",
            "lineno": 812,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Returns whether or not the player is in the &quot;seeking&quot; state.</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Boolean"
                    ]
                },
                "description": "<p>True if the player is in the seeking state, false if not.</p>"
            }
        ],
        "kind": "function",
        "name": "seeking",
        "longname": "seeking",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Returns the TimeRanges of the media that are currently available\n   * for seeking to.\n   *\n   * @return {TimeRanges} the seekable intervals of the media timeline\n   * @method seekable\n   */",
        "meta": {
            "range": [
                19988,
                20186
            ],
            "filename": "player.js",
            "lineno": 819,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Returns the TimeRanges of the media that are currently available\nfor seeking to.</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "TimeRanges"
                    ]
                },
                "description": "<p>the seekable intervals of the media timeline</p>"
            }
        ],
        "kind": "function",
        "name": "seekable",
        "longname": "seekable",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Report user activity \n  *\n  * @param {Object} event Event object\n  * @method reportUserActivity\n  */",
        "meta": {
            "range": [
                20188,
                20296
            ],
            "filename": "player.js",
            "lineno": 827,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Report user activity</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "description": "<p>Event object</p>",
                "name": "event"
            }
        ],
        "kind": "function",
        "name": "reportUserActivity",
        "longname": "reportUserActivity",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Get/set if user is active\n  *\n  * @param {Boolean} bool Value when setting\n  * @return {Boolean} Value if user is active user when getting\n  * @method userActive\n  */",
        "meta": {
            "range": [
                20298,
                20472
            ],
            "filename": "player.js",
            "lineno": 834,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Get/set if user is active</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Boolean"
                    ]
                },
                "description": "<p>Value when setting</p>",
                "name": "bool"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "Boolean"
                    ]
                },
                "description": "<p>Value if user is active user when getting</p>"
            }
        ],
        "kind": "function",
        "name": "userActive",
        "longname": "userActive",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Listen for user activity based on timeout value\n  *\n  * @method listenForUserActivity\n  */",
        "meta": {
            "range": [
                20474,
                20572
            ],
            "filename": "player.js",
            "lineno": 842,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Listen for user activity based on timeout value</p>",
        "kind": "function",
        "name": "listenForUserActivity",
        "longname": "listenForUserActivity",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Gets or sets the current playback rate.  A playback rate of\n   * 1.0 represents normal speed and 0.5 would indicate half-speed\n   * playback, for instance.\n   * @see https://html.spec.whatwg.org/multipage/embedded-content.html#dom-media-playbackrate\n   *\n   * @param  {Number} rate    New playback rate to set.\n   * @return {Number}         Returns the new playback rate when setting\n   * @return {Number}         Returns the current playback rate when getting\n   * @method playbackRate\n   */",
        "meta": {
            "range": [
                20574,
                21075
            ],
            "filename": "player.js",
            "lineno": 848,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Gets or sets the current playback rate.  A playback rate of\n1.0 represents normal speed and 0.5 would indicate half-speed\nplayback, for instance.</p>",
        "see": [
            "https://html.spec.whatwg.org/multipage/embedded-content.html#dom-media-playbackrate"
        ],
        "params": [
            {
                "type": {
                    "names": [
                        "Number"
                    ]
                },
                "description": "<p>New playback rate to set.</p>",
                "name": "rate"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "Number"
                    ]
                },
                "description": "<p>Returns the new playback rate when setting</p>"
            },
            {
                "type": {
                    "names": [
                        "Number"
                    ]
                },
                "description": "<p>Returns the current playback rate when getting</p>"
            }
        ],
        "kind": "function",
        "name": "playbackRate",
        "longname": "playbackRate",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Gets or sets the audio flag\n   *\n   * @param  {Boolean} bool    True signals that this is an audio player.\n   * @return {Boolean}         Returns true if player is audio, false if not when getting\n   * @return {Player}      Returns the player if setting\n   * @private\n   * @method isAudio\n   */",
        "meta": {
            "range": [
                21077,
                21380
            ],
            "filename": "player.js",
            "lineno": 860,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Gets or sets the audio flag</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Boolean"
                    ]
                },
                "description": "<p>True signals that this is an audio player.</p>",
                "name": "bool"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "Boolean"
                    ]
                },
                "description": "<p>Returns true if player is audio, false if not when getting</p>"
            },
            {
                "type": {
                    "names": [
                        "Player"
                    ]
                },
                "description": "<p>Returns the player if setting</p>"
            }
        ],
        "access": "private",
        "kind": "function",
        "name": "isAudio",
        "longname": "isAudio",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Returns the current state of network activity for the element, from\n   * the codes in the list below.\n   * - NETWORK_EMPTY (numeric value 0)\n   *   The element has not yet been initialised. All attributes are in\n   *   their initial states.\n   * - NETWORK_IDLE (numeric value 1)\n   *   The element's resource selection algorithm is active and has\n   *   selected a resource, but it is not actually using the network at\n   *   this time.\n   * - NETWORK_LOADING (numeric value 2)\n   *   The user agent is actively trying to download data.\n   * - NETWORK_NO_SOURCE (numeric value 3)\n   *   The element's resource selection algorithm is active, but it has\n   *   not yet found a resource to use.\n   *\n   * @see https://html.spec.whatwg.org/multipage/embedded-content.html#network-states\n   * @return {Number} the current network activity state\n   * @method networkState\n   */",
        "meta": {
            "range": [
                21382,
                22262
            ],
            "filename": "player.js",
            "lineno": 870,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Returns the current state of network activity for the element, from\nthe codes in the list below.</p>\n<ul>\n<li>NETWORK_EMPTY (numeric value 0)\nThe element has not yet been initialised. All attributes are in\ntheir initial states.</li>\n<li>NETWORK_IDLE (numeric value 1)\nThe element's resource selection algorithm is active and has\nselected a resource, but it is not actually using the network at\nthis time.</li>\n<li>NETWORK_LOADING (numeric value 2)\nThe user agent is actively trying to download data.</li>\n<li>NETWORK_NO_SOURCE (numeric value 3)\nThe element's resource selection algorithm is active, but it has\nnot yet found a resource to use.</li>\n</ul>",
        "see": [
            "https://html.spec.whatwg.org/multipage/embedded-content.html#network-states"
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "Number"
                    ]
                },
                "description": "<p>the current network activity state</p>"
            }
        ],
        "kind": "function",
        "name": "networkState",
        "longname": "networkState",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Returns a value that expresses the current state of the element\n   * with respect to rendering the current playback position, from the\n   * codes in the list below.\n   * - HAVE_NOTHING (numeric value 0)\n   *   No information regarding the media resource is available.\n   * - HAVE_METADATA (numeric value 1)\n   *   Enough of the resource has been obtained that the duration of the\n   *   resource is available.\n   * - HAVE_CURRENT_DATA (numeric value 2)\n   *   Data for the immediate current playback position is available.\n   * - HAVE_FUTURE_DATA (numeric value 3)\n   *   Data for the immediate current playback position is available, as\n   *   well as enough data for the user agent to advance the current\n   *   playback position in the direction of playback.\n   * - HAVE_ENOUGH_DATA (numeric value 4)\n   *   The user agent estimates that enough data is available for\n   *   playback to proceed uninterrupted.\n   *\n   * @see https://html.spec.whatwg.org/multipage/embedded-content.html#dom-media-readystate\n   * @return {Number} the current playback rendering state\n   * @method readyState\n   */",
        "meta": {
            "range": [
                22264,
                23370
            ],
            "filename": "player.js",
            "lineno": 891,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Returns a value that expresses the current state of the element\nwith respect to rendering the current playback position, from the\ncodes in the list below.</p>\n<ul>\n<li>HAVE_NOTHING (numeric value 0)\nNo information regarding the media resource is available.</li>\n<li>HAVE_METADATA (numeric value 1)\nEnough of the resource has been obtained that the duration of the\nresource is available.</li>\n<li>HAVE_CURRENT_DATA (numeric value 2)\nData for the immediate current playback position is available.</li>\n<li>HAVE_FUTURE_DATA (numeric value 3)\nData for the immediate current playback position is available, as\nwell as enough data for the user agent to advance the current\nplayback position in the direction of playback.</li>\n<li>HAVE_ENOUGH_DATA (numeric value 4)\nThe user agent estimates that enough data is available for\nplayback to proceed uninterrupted.</li>\n</ul>",
        "see": [
            "https://html.spec.whatwg.org/multipage/embedded-content.html#dom-media-readystate"
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "Number"
                    ]
                },
                "description": "<p>the current playback rendering state</p>"
            }
        ],
        "kind": "function",
        "name": "readyState",
        "longname": "readyState",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Get an array of associated text tracks. captions, subtitles, chapters, descriptions\n   * http://www.w3.org/html/wg/drafts/html/master/embedded-content-0.html#dom-media-texttracks\n   *\n   * @return {Array}           Array of track objects\n   * @method textTracks\n   */",
        "meta": {
            "range": [
                23372,
                23648
            ],
            "filename": "player.js",
            "lineno": 915,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Get an array of associated text tracks. captions, subtitles, chapters, descriptions\nhttp://www.w3.org/html/wg/drafts/html/master/embedded-content-0.html#dom-media-texttracks</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Array"
                    ]
                },
                "description": "<p>Array of track objects</p>"
            }
        ],
        "kind": "function",
        "name": "textTracks",
        "longname": "textTracks",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Get an array of remote text tracks\n  *\n  * @return {Array}\n  * @method remoteTextTracks\n  */",
        "meta": {
            "range": [
                23650,
                23750
            ],
            "filename": "player.js",
            "lineno": 923,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Get an array of remote text tracks</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Array"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "remoteTextTracks",
        "longname": "remoteTextTracks",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Add a text track\n   * In addition to the W3C settings we allow adding additional info through options.\n   * http://www.w3.org/html/wg/drafts/html/master/embedded-content-0.html#dom-media-addtexttrack\n   * @param {String}  kind        Captions, subtitles, chapters, descriptions, or metadata\n   * @param {String=} label       Optional label\n   * @param {String=} language    Optional language\n   * @method addTextTrack\n   */",
        "meta": {
            "range": [
                23752,
                24184
            ],
            "filename": "player.js",
            "lineno": 930,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Add a text track\nIn addition to the W3C settings we allow adding additional info through options.\nhttp://www.w3.org/html/wg/drafts/html/master/embedded-content-0.html#dom-media-addtexttrack</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "String"
                    ]
                },
                "description": "<p>Captions, subtitles, chapters, descriptions, or metadata</p>",
                "name": "kind"
            },
            {
                "type": {
                    "names": [
                        "String"
                    ]
                },
                "optional": true,
                "description": "<p>Optional label</p>",
                "name": "label"
            },
            {
                "type": {
                    "names": [
                        "String"
                    ]
                },
                "optional": true,
                "description": "<p>Optional language</p>",
                "name": "language"
            }
        ],
        "kind": "function",
        "name": "addTextTrack",
        "longname": "addTextTrack",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Add a remote text track\n   *\n   * @param {Object} options    Options for remote text track\n   * @method addRemoteTextTrack\n   */",
        "meta": {
            "range": [
                24186,
                24323
            ],
            "filename": "player.js",
            "lineno": 940,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Add a remote text track</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "description": "<p>Options for remote text track</p>",
                "name": "options"
            }
        ],
        "kind": "function",
        "name": "addRemoteTextTrack",
        "longname": "addRemoteTextTrack",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Remove a remote text track\n   *\n   * @param {Object} track    Remote text track to remove\n   * @method removeRemoteTextTrack\n   */",
        "meta": {
            "range": [
                24325,
                24464
            ],
            "filename": "player.js",
            "lineno": 947,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Remove a remote text track</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "description": "<p>Remote text track to remove</p>",
                "name": "track"
            }
        ],
        "kind": "function",
        "name": "removeRemoteTextTrack",
        "longname": "removeRemoteTextTrack",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Get video width\n   *\n   * @return {Number} Video width\n   * @method videoWidth\n   */",
        "meta": {
            "range": [
                24466,
                24559
            ],
            "filename": "player.js",
            "lineno": 954,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Get video width</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Number"
                    ]
                },
                "description": "<p>Video width</p>"
            }
        ],
        "kind": "function",
        "name": "videoWidth",
        "longname": "videoWidth",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Get video height\n   *\n   * @return {Number} Video height\n   * @method videoHeight\n   */",
        "meta": {
            "range": [
                24561,
                24657
            ],
            "filename": "player.js",
            "lineno": 961,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Get video height</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Number"
                    ]
                },
                "description": "<p>Video height</p>"
            }
        ],
        "kind": "function",
        "name": "videoHeight",
        "longname": "videoHeight",
        "scope": "global"
    },
    {
        "comment": "/**\n   * The player's language code\n   *\n   * NOTE: The language should be set in the player options if you want the\n   * the controls to be built with a specific language. Changing the lanugage\n   * later will not update controls text.\n   *\n   * @param {String} code  The locale string\n   * @return {String}      The locale string when getting\n   * @return {Player}      self when setting\n   * @method language\n   */",
        "meta": {
            "range": [
                24659,
                25076
            ],
            "filename": "player.js",
            "lineno": 968,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>The player's language code</p>\n<p>NOTE: The language should be set in the player options if you want the\nthe controls to be built with a specific language. Changing the lanugage\nlater will not update controls text.</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "String"
                    ]
                },
                "description": "<p>The locale string</p>",
                "name": "code"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "String"
                    ]
                },
                "description": "<p>The locale string when getting</p>"
            },
            {
                "type": {
                    "names": [
                        "Player"
                    ]
                },
                "description": "<p>self when setting</p>"
            }
        ],
        "kind": "function",
        "name": "language",
        "longname": "language",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Get the player's language dictionary\n   * Merge every time, because a newly added plugin might call videojs.addLanguage() at any time\n   * Languages specified directly in the player options have precedence\n   *\n   * @return {Array} Array of languages\n   * @method languages\n   */",
        "meta": {
            "range": [
                25078,
                25366
            ],
            "filename": "player.js",
            "lineno": 981,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Get the player's language dictionary\nMerge every time, because a newly added plugin might call videojs.addLanguage() at any time\nLanguages specified directly in the player options have precedence</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Array"
                    ]
                },
                "description": "<p>Array of languages</p>"
            }
        ],
        "kind": "function",
        "name": "languages",
        "longname": "languages",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Converts track info to JSON\n   *\n   * @return {Object} JSON object of options\n   * @method toJSON\n   */",
        "meta": {
            "range": [
                25368,
                25480
            ],
            "filename": "player.js",
            "lineno": 990,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Converts track info to JSON</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "description": "<p>JSON object of options</p>"
            }
        ],
        "kind": "function",
        "name": "toJSON",
        "longname": "toJSON",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Gets tag settings\n  *\n  * @param {Element} tag The player tag\n  * @return {Array} An array of sources and track objects\n  * @static\n  * @method getTagSettings\n  */",
        "meta": {
            "range": [
                25482,
                25653
            ],
            "filename": "player.js",
            "lineno": 997,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Gets tag settings</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Element"
                    ]
                },
                "description": "<p>The player tag</p>",
                "name": "tag"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "Array"
                    ]
                },
                "description": "<p>An array of sources and track objects</p>"
            }
        ],
        "scope": "static",
        "kind": "function",
        "name": "getTagSettings",
        "longname": "getTagSettings"
    },
    {
        "comment": "/**\n * Fired when the player has initial duration and dimension information\n *\n * @event loadedmetadata\n */",
        "meta": {
            "range": [
                25655,
                25762
            ],
            "filename": "player.js",
            "lineno": 1006,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Fired when the player has initial duration and dimension information</p>",
        "kind": "event",
        "name": "loadedmetadata",
        "longname": "event:loadedmetadata",
        "scope": "global"
    },
    {
        "comment": "/**\n * Fired when the player has downloaded data at the current playback position\n *\n * @event loadeddata\n */",
        "meta": {
            "range": [
                25764,
                25873
            ],
            "filename": "player.js",
            "lineno": 1012,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Fired when the player has downloaded data at the current playback position</p>",
        "kind": "event",
        "name": "loadeddata",
        "longname": "event:loadeddata",
        "scope": "global"
    },
    {
        "comment": "/**\n * Fired when the player has finished downloading the source data\n *\n * @event loadedalldata\n */",
        "meta": {
            "range": [
                25875,
                25975
            ],
            "filename": "player.js",
            "lineno": 1018,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Fired when the player has finished downloading the source data</p>",
        "kind": "event",
        "name": "loadedalldata",
        "longname": "event:loadedalldata",
        "scope": "global"
    },
    {
        "comment": "/**\n * Fired when the user is active, e.g. moves the mouse over the player\n *\n * @event useractive\n */",
        "meta": {
            "range": [
                25977,
                26079
            ],
            "filename": "player.js",
            "lineno": 1024,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Fired when the user is active, e.g. moves the mouse over the player</p>",
        "kind": "event",
        "name": "useractive",
        "longname": "event:useractive",
        "scope": "global"
    },
    {
        "comment": "/**\n * Fired when the user is inactive, e.g. a short delay after the last mouse move or control interaction\n *\n * @event userinactive\n */",
        "meta": {
            "range": [
                26081,
                26218
            ],
            "filename": "player.js",
            "lineno": 1030,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Fired when the user is inactive, e.g. a short delay after the last mouse move or control interaction</p>",
        "kind": "event",
        "name": "userinactive",
        "longname": "event:userinactive",
        "scope": "global"
    },
    {
        "comment": "/**\n * Fired when the current playback position has changed *\n * During playback this is fired every 15-250 milliseconds, depending on the\n * playback technology in use.\n *\n * @event timeupdate\n */",
        "meta": {
            "range": [
                26220,
                26417
            ],
            "filename": "player.js",
            "lineno": 1036,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Fired when the current playback position has changed *\nDuring playback this is fired every 15-250 milliseconds, depending on the\nplayback technology in use.</p>",
        "kind": "event",
        "name": "timeupdate",
        "longname": "event:timeupdate",
        "scope": "global"
    },
    {
        "comment": "/**\n * Fired when the volume changes\n *\n * @event volumechange\n */",
        "meta": {
            "range": [
                26419,
                26485
            ],
            "filename": "player.js",
            "lineno": 1044,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Fired when the volume changes</p>",
        "kind": "event",
        "name": "volumechange",
        "longname": "event:volumechange",
        "scope": "global"
    },
    {
        "comment": "/**\n * Fired when an error occurs\n *\n * @event error\n */",
        "meta": {
            "range": [
                26487,
                26543
            ],
            "filename": "player.js",
            "lineno": 1050,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Fired when an error occurs</p>",
        "kind": "event",
        "name": "error",
        "longname": "event:error",
        "scope": "global"
    },
    {
        "comment": "/**\n * The method for registering a video.js plugin\n *\n * @param  {String} name The name of the plugin\n * @param  {Function} init The function that is run when the player inits\n * @method plugin\n */",
        "meta": {
            "range": [
                0,
                198
            ],
            "filename": "plugins.js",
            "lineno": 1,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>The method for registering a video.js plugin</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "String"
                    ]
                },
                "description": "<p>The name of the plugin</p>",
                "name": "name"
            },
            {
                "type": {
                    "names": [
                        "function"
                    ]
                },
                "description": "<p>The function that is run when the player inits</p>",
                "name": "init"
            }
        ],
        "kind": "function",
        "name": "plugin",
        "longname": "plugin",
        "scope": "global"
    },
    {
        "comment": "/**\n * The component that handles showing the poster image.\n *\n * @param {Player|Object} player\n * @param {Object=} options\n * @extends Button\n * @class PosterImage\n */",
        "meta": {
            "range": [
                0,
                168
            ],
            "filename": "poster-image.js",
            "lineno": 1,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>The component that handles showing the poster image.</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Player",
                        "Object"
                    ]
                },
                "name": "player"
            },
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "optional": true,
                "name": "options"
            }
        ],
        "augments": [
            "Button"
        ],
        "kind": "class",
        "name": "PosterImage",
        "longname": "PosterImage",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Clean up the poster image\n   *\n   * @method dispose\n   */",
        "meta": {
            "range": [
                170,
                236
            ],
            "filename": "poster-image.js",
            "lineno": 10,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Clean up the poster image</p>",
        "kind": "function",
        "name": "dispose",
        "longname": "dispose",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Create the poster's image element\n  *\n  * @return {Element}\n  * @method createEl\n  */",
        "meta": {
            "range": [
                238,
                331
            ],
            "filename": "poster-image.js",
            "lineno": 16,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Create the poster's image element</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Element"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "createEl",
        "longname": "createEl",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Event handler for updates to the player's poster source\n   *\n   * @method update\n   */",
        "meta": {
            "range": [
                333,
                428
            ],
            "filename": "poster-image.js",
            "lineno": 23,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Event handler for updates to the player's poster source</p>",
        "kind": "function",
        "name": "update",
        "longname": "update",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Set the poster source depending on the display method\n  *\n  * @param {String} url The URL to the poster source\n  * @method setSrc\n  */",
        "meta": {
            "range": [
                430,
                572
            ],
            "filename": "poster-image.js",
            "lineno": 29,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Set the poster source depending on the display method</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "String"
                    ]
                },
                "description": "<p>The URL to the poster source</p>",
                "name": "url"
            }
        ],
        "kind": "function",
        "name": "setSrc",
        "longname": "setSrc",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Event handler for clicks on the poster image\n   * \n   * @method handleClick\n   */",
        "meta": {
            "range": [
                574,
                664
            ],
            "filename": "poster-image.js",
            "lineno": 36,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Event handler for clicks on the poster image</p>",
        "kind": "function",
        "name": "handleClick",
        "longname": "handleClick",
        "scope": "global"
    },
    {
        "comment": "/**\n * @fileoverview Functions for automatically setting up a player\n * based on the data-setup attribute of the video tag\n */",
        "meta": {
            "range": [
                0,
                126
            ],
            "filename": "setup.js",
            "lineno": 1,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "name": "setup.js",
        "kind": "file",
        "description": "<p>Functions for automatically setting up a player\nbased on the data-setup attribute of the video tag</p>",
        "preserveName": true,
        "longname": "setup.js",
        "scope": "global"
    },
    {
        "comment": "/**\n * The base functionality for sliders like the volume bar and seek bar\n *\n * @param {Player|Object} player\n * @param {Object=} options\n * @extends Component\n * @class Slider\n */",
        "meta": {
            "range": [
                0,
                181
            ],
            "filename": "slider.js",
            "lineno": 1,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/slider",
            "code": {}
        },
        "description": "<p>The base functionality for sliders like the volume bar and seek bar</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Player",
                        "Object"
                    ]
                },
                "name": "player"
            },
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "optional": true,
                "name": "options"
            }
        ],
        "augments": [
            "Component"
        ],
        "kind": "class",
        "name": "Slider",
        "longname": "Slider",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Create the component's DOM element\n  *\n  * @param {String} type Type of element to create\n  * @param {Object=} props List of properties in Object form \n  * @return {Element}\n  * @method createEl\n  */",
        "meta": {
            "range": [
                183,
                390
            ],
            "filename": "slider.js",
            "lineno": 10,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/slider",
            "code": {}
        },
        "description": "<p>Create the component's DOM element</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "String"
                    ]
                },
                "description": "<p>Type of element to create</p>",
                "name": "type"
            },
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "optional": true,
                "description": "<p>List of properties in Object form</p>",
                "name": "props"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "Element"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "createEl",
        "longname": "createEl",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Handle mouse down on slider\n  *\n  * @param {Object} event Mouse down event object\n  * @method handleMouseDown\n  */",
        "meta": {
            "range": [
                392,
                514
            ],
            "filename": "slider.js",
            "lineno": 19,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/slider",
            "code": {}
        },
        "description": "<p>Handle mouse down on slider</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "description": "<p>Mouse down event object</p>",
                "name": "event"
            }
        ],
        "kind": "function",
        "name": "handleMouseDown",
        "longname": "handleMouseDown",
        "scope": "global"
    },
    {
        "comment": "/**\n  * To be overridden by a subclass\n  *\n  * @method handleMouseMove\n  */",
        "meta": {
            "range": [
                516,
                591
            ],
            "filename": "slider.js",
            "lineno": 26,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/slider",
            "code": {}
        },
        "description": "<p>To be overridden by a subclass</p>",
        "kind": "function",
        "name": "handleMouseMove",
        "longname": "handleMouseMove",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Handle mouse up on Slider \n  *\n  * @method handleMouseUp\n  */",
        "meta": {
            "range": [
                593,
                662
            ],
            "filename": "slider.js",
            "lineno": 32,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/slider",
            "code": {}
        },
        "description": "<p>Handle mouse up on Slider</p>",
        "kind": "function",
        "name": "handleMouseUp",
        "longname": "handleMouseUp",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Update slider\n  *\n  * @method update\n  */",
        "meta": {
            "range": [
                664,
                713
            ],
            "filename": "slider.js",
            "lineno": 38,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/slider",
            "code": {}
        },
        "description": "<p>Update slider</p>",
        "kind": "function",
        "name": "update",
        "longname": "update",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Calculate distance for slider\n  *\n  * @param {Object} event Event object\n  * @method calculateDistance\n  */",
        "meta": {
            "range": [
                715,
                830
            ],
            "filename": "slider.js",
            "lineno": 44,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/slider",
            "code": {}
        },
        "description": "<p>Calculate distance for slider</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "description": "<p>Event object</p>",
                "name": "event"
            }
        ],
        "kind": "function",
        "name": "calculateDistance",
        "longname": "calculateDistance",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Handle on focus for slider\n  *\n  * @method handleFocus\n  */",
        "meta": {
            "range": [
                832,
                899
            ],
            "filename": "slider.js",
            "lineno": 51,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/slider",
            "code": {}
        },
        "description": "<p>Handle on focus for slider</p>",
        "kind": "function",
        "name": "handleFocus",
        "longname": "handleFocus",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Handle key press for slider\n  *\n  * @param {Object} event Event object\n  * @method handleKeyPress\n  */",
        "meta": {
            "range": [
                901,
                1011
            ],
            "filename": "slider.js",
            "lineno": 57,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/slider",
            "code": {}
        },
        "description": "<p>Handle key press for slider</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "description": "<p>Event object</p>",
                "name": "event"
            }
        ],
        "kind": "function",
        "name": "handleKeyPress",
        "longname": "handleKeyPress",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Handle on blur for slider\n  *\n  * @method handleBlur\n  */",
        "meta": {
            "range": [
                1013,
                1078
            ],
            "filename": "slider.js",
            "lineno": 64,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/slider",
            "code": {}
        },
        "description": "<p>Handle on blur for slider</p>",
        "kind": "function",
        "name": "handleBlur",
        "longname": "handleBlur",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Listener for click events on slider, used to prevent clicks\n   *   from bubbling up to parent elements like button menus.\n  *\n  * @param {Object} event Event object\n  * @method handleClick\n  */",
        "meta": {
            "range": [
                1080,
                1282
            ],
            "filename": "slider.js",
            "lineno": 70,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/slider",
            "code": {}
        },
        "description": "<p>Listener for click events on slider, used to prevent clicks\n  from bubbling up to parent elements like button menus.</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "description": "<p>Event object</p>",
                "name": "event"
            }
        ],
        "kind": "function",
        "name": "handleClick",
        "longname": "handleClick",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Get/set if slider is horizontal for vertical\n  *\n  * @param {Boolean} bool True if slider is vertical, false is horizontal\n  * @return {Boolean} True if slider is vertical, false is horizontal\n  * @method vertical\n  */",
        "meta": {
            "range": [
                1284,
                1510
            ],
            "filename": "slider.js",
            "lineno": 78,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/slider",
            "code": {}
        },
        "description": "<p>Get/set if slider is horizontal for vertical</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Boolean"
                    ]
                },
                "description": "<p>True if slider is vertical, false is horizontal</p>",
                "name": "bool"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "Boolean"
                    ]
                },
                "description": "<p>True if slider is vertical, false is horizontal</p>"
            }
        ],
        "kind": "function",
        "name": "vertical",
        "longname": "vertical",
        "scope": "global"
    },
    {
        "comment": "/**\n * @fileoverview VideoJS-SWF - Custom Flash Player with HTML5-ish API\n * https://github.com/zencoder/video-js-swf\n * Not using setupTriggers. Using global onEvent func to distribute events\n */",
        "meta": {
            "range": [
                0,
                196
            ],
            "filename": "flash.js",
            "lineno": 1,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "name": "tech/flash.js",
        "kind": "file",
        "description": "<p>VideoJS-SWF - Custom Flash Player with HTML5-ish API\nhttps://github.com/zencoder/video-js-swf\nNot using setupTriggers. Using global onEvent func to distribute events</p>",
        "preserveName": true,
        "longname": "tech/flash.js",
        "scope": "global"
    },
    {
        "comment": "/**\n * Flash Media Controller - Wrapper for fallback SWF API\n *\n * @param {Object=} options Object of option names and values\n * @param {Function=} ready Ready callback function\n * @extends Tech\n * @class Flash\n */",
        "meta": {
            "range": [
                198,
                412
            ],
            "filename": "flash.js",
            "lineno": 7,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Flash Media Controller - Wrapper for fallback SWF API</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "optional": true,
                "description": "<p>Object of option names and values</p>",
                "name": "options"
            },
            {
                "type": {
                    "names": [
                        "function"
                    ]
                },
                "optional": true,
                "description": "<p>Ready callback function</p>",
                "name": "ready"
            }
        ],
        "augments": [
            "Tech"
        ],
        "kind": "class",
        "name": "Flash",
        "longname": "Flash",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Create the component's DOM element\n  *\n  * @return {Element}\n  * @method createEl\n  */",
        "meta": {
            "range": [
                414,
                508
            ],
            "filename": "flash.js",
            "lineno": 16,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Create the component's DOM element</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Element"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "createEl",
        "longname": "createEl",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Play for flash tech\n  *\n  * @method play\n  */",
        "meta": {
            "range": [
                510,
                563
            ],
            "filename": "flash.js",
            "lineno": 23,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Play for flash tech</p>",
        "kind": "function",
        "name": "play",
        "longname": "play",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Pause for flash tech\n  *\n  * @method pause\n  */",
        "meta": {
            "range": [
                565,
                620
            ],
            "filename": "flash.js",
            "lineno": 29,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Pause for flash tech</p>",
        "kind": "function",
        "name": "pause",
        "longname": "pause",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Get/set video\n  *\n  * @param {Object=} src Source object \n  * @return {Object} \n  * @method src\n  */",
        "meta": {
            "range": [
                622,
                730
            ],
            "filename": "flash.js",
            "lineno": 35,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Get/set video</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "optional": true,
                "description": "<p>Source object</p>",
                "name": "src"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "src",
        "longname": "src",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Set video\n  *\n  * @param {Object=} src Source object \n  * @deprecated\n  * @method setSrc\n  */",
        "meta": {
            "range": [
                732,
                833
            ],
            "filename": "flash.js",
            "lineno": 43,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Set video</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "optional": true,
                "description": "<p>Source object</p>",
                "name": "src"
            }
        ],
        "deprecated": true,
        "kind": "function",
        "name": "setSrc",
        "longname": "setSrc",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Set current time\n  *\n  * @param {Number} time Current time of video \n  * @method setCurrentTime\n  */",
        "meta": {
            "range": [
                835,
                943
            ],
            "filename": "flash.js",
            "lineno": 51,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Set current time</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Number"
                    ]
                },
                "description": "<p>Current time of video</p>",
                "name": "time"
            }
        ],
        "kind": "function",
        "name": "setCurrentTime",
        "longname": "setCurrentTime",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Get current time\n  *\n  * @param {Number=} time Current time of video \n  * @return {Number} Current time\n  * @method currentTime\n  */",
        "meta": {
            "range": [
                945,
                1085
            ],
            "filename": "flash.js",
            "lineno": 58,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Get current time</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Number"
                    ]
                },
                "optional": true,
                "description": "<p>Current time of video</p>",
                "name": "time"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "Number"
                    ]
                },
                "description": "<p>Current time</p>"
            }
        ],
        "kind": "function",
        "name": "currentTime",
        "longname": "currentTime",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Get current source\n  *\n  * @method currentSrc\n  */",
        "meta": {
            "range": [
                1087,
                1145
            ],
            "filename": "flash.js",
            "lineno": 66,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Get current source</p>",
        "kind": "function",
        "name": "currentSrc",
        "longname": "currentSrc",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Load media into player\n  *\n  * @method load\n  */",
        "meta": {
            "range": [
                1147,
                1203
            ],
            "filename": "flash.js",
            "lineno": 72,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Load media into player</p>",
        "kind": "function",
        "name": "load",
        "longname": "load",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Get poster\n  *\n  * @method poster\n  */",
        "meta": {
            "range": [
                1205,
                1251
            ],
            "filename": "flash.js",
            "lineno": 78,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Get poster</p>",
        "kind": "function",
        "name": "poster",
        "longname": "poster",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Poster images are not handled by the Flash tech so make this a no-op\n  *\n  * @method setPoster\n  */",
        "meta": {
            "range": [
                1253,
                1360
            ],
            "filename": "flash.js",
            "lineno": 84,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Poster images are not handled by the Flash tech so make this a no-op</p>",
        "kind": "function",
        "name": "setPoster",
        "longname": "setPoster",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Determine if can seek in media\n  *\n  * @return {TimeRangeObject}\n  * @method seekable\n  */",
        "meta": {
            "range": [
                1362,
                1460
            ],
            "filename": "flash.js",
            "lineno": 90,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Determine if can seek in media</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "TimeRangeObject"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "seekable",
        "longname": "seekable",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Get buffered time range\n  *\n  * @return {TimeRangeObject} \n  * @method buffered\n  */",
        "meta": {
            "range": [
                1462,
                1554
            ],
            "filename": "flash.js",
            "lineno": 97,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Get buffered time range</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "TimeRangeObject"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "buffered",
        "longname": "buffered",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Get fullscreen support - \n  * Flash does not allow fullscreen through javascript\n  * so always returns false\n  *\n  * @return {Boolean} false \n  * @method supportsFullScreen\n  */",
        "meta": {
            "range": [
                1556,
                1741
            ],
            "filename": "flash.js",
            "lineno": 104,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Get fullscreen support - \nFlash does not allow fullscreen through javascript\nso always returns false</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Boolean"
                    ]
                },
                "description": "<p>false</p>"
            }
        ],
        "kind": "function",
        "name": "supportsFullScreen",
        "longname": "supportsFullScreen",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Request to enter fullscreen\n  * Flash does not allow fullscreen through javascript\n  * so always returns false\n  *\n  * @return {Boolean} false \n  * @method enterFullScreen\n  */",
        "meta": {
            "range": [
                1743,
                1927
            ],
            "filename": "flash.js",
            "lineno": 113,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Request to enter fullscreen\nFlash does not allow fullscreen through javascript\nso always returns false</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Boolean"
                    ]
                },
                "description": "<p>false</p>"
            }
        ],
        "kind": "function",
        "name": "enterFullScreen",
        "longname": "enterFullScreen",
        "scope": "global"
    },
    {
        "comment": "/**\n * @fileoverview HTML5 Media Controller - Wrapper for HTML5 Media API\n */",
        "meta": {
            "range": [
                0,
                77
            ],
            "filename": "html5.js",
            "lineno": 1,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "name": "tech/html5.js",
        "kind": "file",
        "description": "<p>HTML5 Media Controller - Wrapper for HTML5 Media API</p>",
        "preserveName": true,
        "longname": "tech/html5.js",
        "scope": "global"
    },
    {
        "comment": "/**\n * HTML5 Media Controller - Wrapper for HTML5 Media API\n * @param {Object=} options Object of option names and values\n * @param {Function=} ready Ready callback function\n * @extends Tech\n * @class Html5\n */",
        "meta": {
            "range": [
                79,
                289
            ],
            "filename": "html5.js",
            "lineno": 5,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>HTML5 Media Controller - Wrapper for HTML5 Media API</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "optional": true,
                "description": "<p>Object of option names and values</p>",
                "name": "options"
            },
            {
                "type": {
                    "names": [
                        "function"
                    ]
                },
                "optional": true,
                "description": "<p>Ready callback function</p>",
                "name": "ready"
            }
        ],
        "augments": [
            "Tech"
        ],
        "kind": "class",
        "name": "Html5",
        "longname": "Html5",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Dispose of html5 media element\n  *\n  * @method dispose\n  */",
        "meta": {
            "range": [
                291,
                358
            ],
            "filename": "html5.js",
            "lineno": 13,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Dispose of html5 media element</p>",
        "kind": "function",
        "name": "dispose",
        "longname": "dispose",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Create the component's DOM element\n  *\n  * @return {Element}\n  * @method createEl\n  */",
        "meta": {
            "range": [
                360,
                454
            ],
            "filename": "html5.js",
            "lineno": 19,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Create the component's DOM element</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Element"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "createEl",
        "longname": "createEl",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Hide captions from text track\n  *\n  * @method hideCaptions\n  */",
        "meta": {
            "range": [
                456,
                527
            ],
            "filename": "html5.js",
            "lineno": 26,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Hide captions from text track</p>",
        "kind": "function",
        "name": "hideCaptions",
        "longname": "hideCaptions",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Play for html5 tech\n  *\n  * @method play\n  */",
        "meta": {
            "range": [
                529,
                582
            ],
            "filename": "html5.js",
            "lineno": 32,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Play for html5 tech</p>",
        "kind": "function",
        "name": "play",
        "longname": "play",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Pause for html5 tech\n  *\n  * @method pause\n  */",
        "meta": {
            "range": [
                584,
                639
            ],
            "filename": "html5.js",
            "lineno": 38,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Pause for html5 tech</p>",
        "kind": "function",
        "name": "pause",
        "longname": "pause",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Paused for html5 tech\n  *\n  * @return {Boolean} \n  * @method paused\n  */",
        "meta": {
            "range": [
                641,
                721
            ],
            "filename": "html5.js",
            "lineno": 44,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Paused for html5 tech</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Boolean"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "paused",
        "longname": "paused",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Get current time\n  *\n  * @return {Number} \n  * @method currentTime\n  */",
        "meta": {
            "range": [
                723,
                802
            ],
            "filename": "html5.js",
            "lineno": 51,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Get current time</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Number"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "currentTime",
        "longname": "currentTime",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Set current time\n  *\n  * @param {Number} seconds Current time of video \n  * @method setCurrentTime\n  */",
        "meta": {
            "range": [
                804,
                915
            ],
            "filename": "html5.js",
            "lineno": 58,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Set current time</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Number"
                    ]
                },
                "description": "<p>Current time of video</p>",
                "name": "seconds"
            }
        ],
        "kind": "function",
        "name": "setCurrentTime",
        "longname": "setCurrentTime",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Get duration\n  *\n  * @return {Number}\n  * @method duration\n  */",
        "meta": {
            "range": [
                917,
                988
            ],
            "filename": "html5.js",
            "lineno": 65,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Get duration</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Number"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "duration",
        "longname": "duration",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Get a TimeRange object that represents the intersection\n  * of the time ranges for which the user agent has all\n  * relevant media\n  *\n  * @return {TimeRangeObject}\n  * @method buffered\n  */",
        "meta": {
            "range": [
                990,
                1188
            ],
            "filename": "html5.js",
            "lineno": 72,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Get a TimeRange object that represents the intersection\nof the time ranges for which the user agent has all\nrelevant media</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "TimeRangeObject"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "buffered",
        "longname": "buffered",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Get volume level \n  *\n  * @return {Number}\n  * @method volume\n  */",
        "meta": {
            "range": [
                1190,
                1264
            ],
            "filename": "html5.js",
            "lineno": 81,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Get volume level</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Number"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "volume",
        "longname": "volume",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Set volume level \n  *\n  * @param {Number} percentAsDecimal Volume percent as a decimal\n  * @method setVolume\n  */",
        "meta": {
            "range": [
                1266,
                1387
            ],
            "filename": "html5.js",
            "lineno": 88,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Set volume level</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Number"
                    ]
                },
                "description": "<p>Volume percent as a decimal</p>",
                "name": "percentAsDecimal"
            }
        ],
        "kind": "function",
        "name": "setVolume",
        "longname": "setVolume",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Get if muted \n  *\n  * @return {Boolean}\n  * @method muted\n  */",
        "meta": {
            "range": [
                1389,
                1459
            ],
            "filename": "html5.js",
            "lineno": 95,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Get if muted</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Boolean"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "muted",
        "longname": "muted",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Set muted \n  *\n  * @param {Boolean} If player is to be muted or note\n  * @method setMuted\n  */",
        "meta": {
            "range": [
                1461,
                1563
            ],
            "filename": "html5.js",
            "lineno": 102,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Set muted</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Boolean"
                    ]
                },
                "description": "<p>player is to be muted or note</p>",
                "name": "If"
            }
        ],
        "kind": "function",
        "name": "setMuted",
        "longname": "setMuted",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Get player width \n  *\n  * @return {Number}\n  * @method width\n  */",
        "meta": {
            "range": [
                1565,
                1638
            ],
            "filename": "html5.js",
            "lineno": 109,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Get player width</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Number"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "width",
        "longname": "width",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Get player height \n  *\n  * @return {Number}\n  * @method height\n  */",
        "meta": {
            "range": [
                1640,
                1715
            ],
            "filename": "html5.js",
            "lineno": 116,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Get player height</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Number"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "height",
        "longname": "height",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Get if there is fullscreen support \n  *\n  * @return {Boolean} \n  * @method supportsFullScreen\n  */",
        "meta": {
            "range": [
                1717,
                1823
            ],
            "filename": "html5.js",
            "lineno": 123,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Get if there is fullscreen support</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Boolean"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "supportsFullScreen",
        "longname": "supportsFullScreen",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Request to enter fullscreen\n  *\n  * @method enterFullScreen\n  */",
        "meta": {
            "range": [
                1825,
                1897
            ],
            "filename": "html5.js",
            "lineno": 130,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Request to enter fullscreen</p>",
        "kind": "function",
        "name": "enterFullScreen",
        "longname": "enterFullScreen",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Request to exit fullscreen\n  *\n  * @method exitFullScreen\n  */",
        "meta": {
            "range": [
                1899,
                1969
            ],
            "filename": "html5.js",
            "lineno": 136,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Request to exit fullscreen</p>",
        "kind": "function",
        "name": "exitFullScreen",
        "longname": "exitFullScreen",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Get/set video\n  *\n  * @param {Object=} src Source object \n  * @return {Object} \n  * @method src\n  */",
        "meta": {
            "range": [
                1971,
                2079
            ],
            "filename": "html5.js",
            "lineno": 142,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Get/set video</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "optional": true,
                "description": "<p>Source object</p>",
                "name": "src"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "src",
        "longname": "src",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Set video\n  *\n  * @param {Object} src Source object \n  * @deprecated\n  * @method setSrc\n  */",
        "meta": {
            "range": [
                2081,
                2181
            ],
            "filename": "html5.js",
            "lineno": 150,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Set video</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "description": "<p>Source object</p>",
                "name": "src"
            }
        ],
        "deprecated": true,
        "kind": "function",
        "name": "setSrc",
        "longname": "setSrc",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Load media into player\n  *\n  * @method load\n  */",
        "meta": {
            "range": [
                2183,
                2239
            ],
            "filename": "html5.js",
            "lineno": 158,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Load media into player</p>",
        "kind": "function",
        "name": "load",
        "longname": "load",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Get current source \n  *\n  * @return {Object} \n  * @method currentSrc\n  */",
        "meta": {
            "range": [
                2241,
                2322
            ],
            "filename": "html5.js",
            "lineno": 164,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Get current source</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "currentSrc",
        "longname": "currentSrc",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Get poster \n  *\n  * @return {String} \n  * @method poster\n  */",
        "meta": {
            "range": [
                2324,
                2393
            ],
            "filename": "html5.js",
            "lineno": 171,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Get poster</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "String"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "poster",
        "longname": "poster",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Get preload attribute \n  *\n  * @return {String} \n  * @method preload\n  */",
        "meta": {
            "range": [
                2482,
                2563
            ],
            "filename": "html5.js",
            "lineno": 185,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Get preload attribute</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "String"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "preload",
        "longname": "preload",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Set preload attribute \n  *\n  * @param {String} val Value for preload attribute \n  * @method setPreload\n  */",
        "meta": {
            "range": [
                2565,
                2680
            ],
            "filename": "html5.js",
            "lineno": 192,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Set preload attribute</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "String"
                    ]
                },
                "description": "<p>Value for preload attribute</p>",
                "name": "val"
            }
        ],
        "kind": "function",
        "name": "setPreload",
        "longname": "setPreload",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Get autoplay attribute \n  *\n  * @return {String} \n  * @method autoplay\n  */",
        "meta": {
            "range": [
                2682,
                2765
            ],
            "filename": "html5.js",
            "lineno": 199,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Get autoplay attribute</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "String"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "autoplay",
        "longname": "autoplay",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Set autoplay attribute \n  *\n  * @param {String} val Value for preload attribute \n  * @method setAutoplay\n  */",
        "meta": {
            "range": [
                2767,
                2884
            ],
            "filename": "html5.js",
            "lineno": 206,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Set autoplay attribute</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "String"
                    ]
                },
                "description": "<p>Value for preload attribute</p>",
                "name": "val"
            }
        ],
        "kind": "function",
        "name": "setAutoplay",
        "longname": "setAutoplay",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Get controls attribute \n  *\n  * @return {String} \n  * @method controls\n  */",
        "meta": {
            "range": [
                2886,
                2969
            ],
            "filename": "html5.js",
            "lineno": 213,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Get controls attribute</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "String"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "controls",
        "longname": "controls",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Set controls attribute \n  *\n  * @param {String} val Value for controls attribute \n  * @method setControls\n  */",
        "meta": {
            "range": [
                2971,
                3089
            ],
            "filename": "html5.js",
            "lineno": 220,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Set controls attribute</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "String"
                    ]
                },
                "description": "<p>Value for controls attribute</p>",
                "name": "val"
            }
        ],
        "kind": "function",
        "name": "setControls",
        "longname": "setControls",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Get loop attribute \n  *\n  * @return {String} \n  * @method loop\n  */",
        "meta": {
            "range": [
                3091,
                3166
            ],
            "filename": "html5.js",
            "lineno": 227,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Get loop attribute</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "String"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "loop",
        "longname": "loop",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Set loop attribute \n  *\n  * @param {String} val Value for loop attribute \n  * @method setLoop\n  */",
        "meta": {
            "range": [
                3168,
                3274
            ],
            "filename": "html5.js",
            "lineno": 234,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Set loop attribute</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "String"
                    ]
                },
                "description": "<p>Value for loop attribute</p>",
                "name": "val"
            }
        ],
        "kind": "function",
        "name": "setLoop",
        "longname": "setLoop",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Get error value \n  *\n  * @return {String} \n  * @method error\n  */",
        "meta": {
            "range": [
                3276,
                3349
            ],
            "filename": "html5.js",
            "lineno": 241,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Get error value</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "String"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "error",
        "longname": "error",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Get whether or not the player is in the \"seeking\" state\n  *\n  * @return {Boolean} \n  * @method seeking\n  */",
        "meta": {
            "range": [
                3351,
                3466
            ],
            "filename": "html5.js",
            "lineno": 248,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Get whether or not the player is in the &quot;seeking&quot; state</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Boolean"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "seeking",
        "longname": "seeking",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Get a TimeRanges object that represents the \n  * ranges of the media resource to which it is possible \n  * for the user agent to seek. \n  *\n  * @return {TimeRangeObject} \n  * @method seekable\n  */",
        "meta": {
            "range": [
                3468,
                3672
            ],
            "filename": "html5.js",
            "lineno": 255,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Get a TimeRanges object that represents the \nranges of the media resource to which it is possible \nfor the user agent to seek.</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "TimeRangeObject"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "seekable",
        "longname": "seekable",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Get if video ended \n  *\n  * @return {Boolean} \n  * @method ended\n  */",
        "meta": {
            "range": [
                3674,
                3751
            ],
            "filename": "html5.js",
            "lineno": 264,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Get if video ended</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Boolean"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "ended",
        "longname": "ended",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Get the value of the muted content attribute\n  * This attribute has no dynamic effect, it only \n  * controls the default state of the element\n  *\n  * @return {Boolean} \n  * @method defaultMuted\n  */",
        "meta": {
            "range": [
                3753,
                3959
            ],
            "filename": "html5.js",
            "lineno": 271,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Get the value of the muted content attribute\nThis attribute has no dynamic effect, it only \ncontrols the default state of the element</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Boolean"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "defaultMuted",
        "longname": "defaultMuted",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Get desired speed at which the media resource is to play \n  *\n  * @return {Number}\n  * @method playbackRate\n  */",
        "meta": {
            "range": [
                3961,
                4081
            ],
            "filename": "html5.js",
            "lineno": 280,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Get desired speed at which the media resource is to play</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Number"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "playbackRate",
        "longname": "playbackRate",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Set desired speed at which the media resource is to play \n  *\n  * @param {Number} val Speed at which the media resource is to play\n  * @method setPlaybackRate\n  */",
        "meta": {
            "range": [
                4083,
                4254
            ],
            "filename": "html5.js",
            "lineno": 287,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Set desired speed at which the media resource is to play</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Number"
                    ]
                },
                "description": "<p>Speed at which the media resource is to play</p>",
                "name": "val"
            }
        ],
        "kind": "function",
        "name": "setPlaybackRate",
        "longname": "setPlaybackRate",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Get the current state of network activity for the element, from\n  * the list below\n  * NETWORK_EMPTY (numeric value 0)\n  * NETWORK_IDLE (numeric value 1)\n  * NETWORK_LOADING (numeric value 2)\n  * NETWORK_NO_SOURCE (numeric value 3)\n  *\n  * @return {Number}\n  * @method networkState\n  */",
        "meta": {
            "range": [
                4256,
                4550
            ],
            "filename": "html5.js",
            "lineno": 294,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Get the current state of network activity for the element, from\nthe list below\nNETWORK_EMPTY (numeric value 0)\nNETWORK_IDLE (numeric value 1)\nNETWORK_LOADING (numeric value 2)\nNETWORK_NO_SOURCE (numeric value 3)</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Number"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "networkState",
        "longname": "networkState",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Get a value that expresses the current state of the element \n  * with respect to rendering the current playback position, from \n  * the codes in the list below\n  * HAVE_NOTHING (numeric value 0)\n  * HAVE_METADATA (numeric value 1)\n  * HAVE_CURRENT_DATA (numeric value 2)\n  * HAVE_FUTURE_DATA (numeric value 3)\n  * HAVE_ENOUGH_DATA (numeric value 4)\n  * \n  * @return {Number}\n  * @method readyState\n  */",
        "meta": {
            "range": [
                4552,
                4962
            ],
            "filename": "html5.js",
            "lineno": 306,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Get a value that expresses the current state of the element \nwith respect to rendering the current playback position, from \nthe codes in the list below\nHAVE_NOTHING (numeric value 0)\nHAVE_METADATA (numeric value 1)\nHAVE_CURRENT_DATA (numeric value 2)\nHAVE_FUTURE_DATA (numeric value 3)\nHAVE_ENOUGH_DATA (numeric value 4)</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Number"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "readyState",
        "longname": "readyState",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Get width of video \n  *\n  * @return {Number}\n  * @method videoWidth\n  */",
        "meta": {
            "range": [
                4964,
                5044
            ],
            "filename": "html5.js",
            "lineno": 320,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Get width of video</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Number"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "videoWidth",
        "longname": "videoWidth",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Get height of video \n  *\n  * @return {Number}\n  * @method videoHeight\n  */",
        "meta": {
            "range": [
                5046,
                5128
            ],
            "filename": "html5.js",
            "lineno": 327,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Get height of video</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Number"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "videoHeight",
        "longname": "videoHeight",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Get text tracks \n  *\n  * @return {TextTrackList} \n  * @method textTracks\n  */",
        "meta": {
            "range": [
                5130,
                5215
            ],
            "filename": "html5.js",
            "lineno": 334,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Get text tracks</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "TextTrackList"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "textTracks",
        "longname": "textTracks",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Creates and returns a text track object \n  *\n  * @param {String} kind Text track kind (subtitles, captions, descriptions\n  *                                       chapters and metadata)\n  * @param {String=} label Label to identify the text track\n  * @param {String=} language Two letter language abbreviation\n  * @return {TextTrackObject}\n  * @method addTextTrack\n  */",
        "meta": {
            "range": [
                5217,
                5593
            ],
            "filename": "html5.js",
            "lineno": 341,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Creates and returns a text track object</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "String"
                    ]
                },
                "description": "<p>Text track kind (subtitles, captions, descriptions\n                                      chapters and metadata)</p>",
                "name": "kind"
            },
            {
                "type": {
                    "names": [
                        "String"
                    ]
                },
                "optional": true,
                "description": "<p>Label to identify the text track</p>",
                "name": "label"
            },
            {
                "type": {
                    "names": [
                        "String"
                    ]
                },
                "optional": true,
                "description": "<p>Two letter language abbreviation</p>",
                "name": "language"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "TextTrackObject"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "addTextTrack",
        "longname": "addTextTrack",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Creates and returns a remote text track object \n  *\n  * @param {Object} options The object should contain values for\n  * kind, language, label and src (location of the WebVTT file)\n  * @return {TextTrackObject}\n  * @method addRemoteTextTrack\n  */",
        "meta": {
            "range": [
                5595,
                5849
            ],
            "filename": "html5.js",
            "lineno": 352,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Creates and returns a remote text track object</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "description": "<p>The object should contain values for\nkind, language, label and src (location of the WebVTT file)</p>",
                "name": "options"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "TextTrackObject"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "addRemoteTextTrack",
        "longname": "addRemoteTextTrack",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Remove remote text track from TextTrackList object \n  *\n  * @param {TextTrackObject} track Texttrack object to remove\n  * @method removeRemoteTextTrack\n  */",
        "meta": {
            "range": [
                5851,
                6015
            ],
            "filename": "html5.js",
            "lineno": 361,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Remove remote text track from TextTrackList object</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "TextTrackObject"
                    ]
                },
                "description": "<p>Texttrack object to remove</p>",
                "name": "track"
            }
        ],
        "kind": "function",
        "name": "removeRemoteTextTrack",
        "longname": "removeRemoteTextTrack",
        "scope": "global"
    },
    {
        "comment": "/**\n * The Media Loader is the component that decides which playback technology to load\n * when the player is initialized.\n *\n * @param {Object} player  Main Player\n * @param {Object=} options Object of option names and values\n * @param {Function=} ready    Ready callback function\n * @extends Component\n * @class MediaLoader\n */",
        "meta": {
            "range": [
                0,
                329
            ],
            "filename": "loader.js",
            "lineno": 1,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>The Media Loader is the component that decides which playback technology to load\nwhen the player is initialized.</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "description": "<p>Main Player</p>",
                "name": "player"
            },
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "optional": true,
                "description": "<p>Object of option names and values</p>",
                "name": "options"
            },
            {
                "type": {
                    "names": [
                        "function"
                    ]
                },
                "optional": true,
                "description": "<p>Ready callback function</p>",
                "name": "ready"
            }
        ],
        "augments": [
            "Component"
        ],
        "kind": "class",
        "name": "MediaLoader",
        "longname": "MediaLoader",
        "scope": "global"
    },
    {
        "comment": "/**\n * @fileoverview Media Technology Controller - Base class for media playback\n * technology controllers like Flash and HTML5\n */",
        "meta": {
            "range": [
                0,
                131
            ],
            "filename": "tech.js",
            "lineno": 1,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "name": "tech/tech.js",
        "kind": "file",
        "description": "<p>Media Technology Controller - Base class for media playback\ntechnology controllers like Flash and HTML5</p>",
        "preserveName": true,
        "longname": "tech/tech.js",
        "scope": "global"
    },
    {
        "comment": "/**\n * Base class for media (HTML5 Video, Flash) controllers\n *\n * @param {Object=} options Options object\n * @param {Function=} ready Ready callback function\n * @extends Component\n * @class Tech\n */",
        "meta": {
            "range": [
                133,
                332
            ],
            "filename": "tech.js",
            "lineno": 6,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Base class for media (HTML5 Video, Flash) controllers</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "optional": true,
                "description": "<p>Options object</p>",
                "name": "options"
            },
            {
                "type": {
                    "names": [
                        "function"
                    ]
                },
                "optional": true,
                "description": "<p>Ready callback function</p>",
                "name": "ready"
            }
        ],
        "augments": [
            "Component"
        ],
        "kind": "class",
        "name": "Tech",
        "longname": "Tech",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Set up click and touch listeners for the playback element\n   * On desktops, a click on the video itself will toggle playback,\n   * on a mobile device a click on the video toggles controls.\n   * (toggling controls is done by toggling the user state between active and\n   * inactive)\n   *\n   * A tap can signal that a user has become active, or has become inactive\n   * e.g. a quick tap on an iPhone movie should reveal the controls. Another\n   * quick tap should hide them again (signaling the user is in an inactive\n   * viewing state)\n   *\n   * In addition to this, we still want the user to be considered inactive after\n   * a few seconds of inactivity.\n   *\n   * Note: the only part of iOS interaction we can't mimic with this setup\n   * is a touch and hold on the video element counting as activity in order to\n   * keep the controls showing, but that shouldn't be an issue. A touch and hold on\n   * any controls will still keep the user active\n   *\n   * @method initControlsListeners\n   */",
        "meta": {
            "range": [
                334,
                1337
            ],
            "filename": "tech.js",
            "lineno": 15,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Set up click and touch listeners for the playback element\nOn desktops, a click on the video itself will toggle playback,\non a mobile device a click on the video toggles controls.\n(toggling controls is done by toggling the user state between active and\ninactive)</p>\n<p>A tap can signal that a user has become active, or has become inactive\ne.g. a quick tap on an iPhone movie should reveal the controls. Another\nquick tap should hide them again (signaling the user is in an inactive\nviewing state)</p>\n<p>In addition to this, we still want the user to be considered inactive after\na few seconds of inactivity.</p>\n<p>Note: the only part of iOS interaction we can't mimic with this setup\nis a touch and hold on the video element counting as activity in order to\nkeep the controls showing, but that shouldn't be an issue. A touch and hold on\nany controls will still keep the user active</p>",
        "kind": "function",
        "name": "initControlsListeners",
        "longname": "initControlsListeners",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Turn on progress events \n  *\n  * @method manualProgressOn\n  */",
        "meta": {
            "range": [
                1339,
                1409
            ],
            "filename": "tech.js",
            "lineno": 38,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Turn on progress events</p>",
        "kind": "function",
        "name": "manualProgressOn",
        "longname": "manualProgressOn",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Turn off progress events \n  *\n  * @method manualProgressOff\n  */",
        "meta": {
            "range": [
                1411,
                1483
            ],
            "filename": "tech.js",
            "lineno": 44,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Turn off progress events</p>",
        "kind": "function",
        "name": "manualProgressOff",
        "longname": "manualProgressOff",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Track progress \n  *\n  * @method trackProgress\n  */",
        "meta": {
            "range": [
                1485,
                1543
            ],
            "filename": "tech.js",
            "lineno": 50,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Track progress</p>",
        "kind": "function",
        "name": "trackProgress",
        "longname": "trackProgress",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Update duration \n  *\n  * @method onDurationChange\n  */",
        "meta": {
            "range": [
                1545,
                1607
            ],
            "filename": "tech.js",
            "lineno": 56,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Update duration</p>",
        "kind": "function",
        "name": "onDurationChange",
        "longname": "onDurationChange",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Create and get TimeRange object for buffering \n  *\n  * @return {TimeRangeObject}\n  * @method buffered\n  */",
        "meta": {
            "range": [
                1609,
                1723
            ],
            "filename": "tech.js",
            "lineno": 62,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Create and get TimeRange object for buffering</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "TimeRangeObject"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "buffered",
        "longname": "buffered",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Get buffered percent\n  *\n  * @return {Number}\n  * @method bufferedPercent\n  */",
        "meta": {
            "range": [
                1725,
                1811
            ],
            "filename": "tech.js",
            "lineno": 69,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Get buffered percent</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Number"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "bufferedPercent",
        "longname": "bufferedPercent",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Stops tracking progress by clearing progress interval \n  *\n  * @method stopTrackingProgress\n  */",
        "meta": {
            "range": [
                1813,
                1917
            ],
            "filename": "tech.js",
            "lineno": 76,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Stops tracking progress by clearing progress interval</p>",
        "kind": "function",
        "name": "stopTrackingProgress",
        "longname": "stopTrackingProgress",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Set event listeners for on play and pause and tracking current time\n  *\n  * @method manualTimeUpdatesOn\n  */",
        "meta": {
            "range": [
                1919,
                2035
            ],
            "filename": "tech.js",
            "lineno": 82,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Set event listeners for on play and pause and tracking current time</p>",
        "kind": "function",
        "name": "manualTimeUpdatesOn",
        "longname": "manualTimeUpdatesOn",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Remove event listeners for on play and pause and tracking current time\n  *\n  * @method manualTimeUpdatesOff\n  */",
        "meta": {
            "range": [
                2037,
                2157
            ],
            "filename": "tech.js",
            "lineno": 88,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Remove event listeners for on play and pause and tracking current time</p>",
        "kind": "function",
        "name": "manualTimeUpdatesOff",
        "longname": "manualTimeUpdatesOff",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Tracks current time\n  *\n  * @method trackCurrentTime\n  */",
        "meta": {
            "range": [
                2159,
                2224
            ],
            "filename": "tech.js",
            "lineno": 94,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Tracks current time</p>",
        "kind": "function",
        "name": "trackCurrentTime",
        "longname": "trackCurrentTime",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Turn off play progress tracking (when paused or dragging)\n  *\n  * @method stopTrackingCurrentTime\n  */",
        "meta": {
            "range": [
                2226,
                2336
            ],
            "filename": "tech.js",
            "lineno": 100,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Turn off play progress tracking (when paused or dragging)</p>",
        "kind": "function",
        "name": "stopTrackingCurrentTime",
        "longname": "stopTrackingCurrentTime",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Turn off any manual progress or timeupdate tracking\n  *\n  * @method dispose\n  */",
        "meta": {
            "range": [
                2338,
                2426
            ],
            "filename": "tech.js",
            "lineno": 106,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Turn off any manual progress or timeupdate tracking</p>",
        "kind": "function",
        "name": "dispose",
        "longname": "dispose",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Set current time \n  *\n  * @method setCurrentTime\n  */",
        "meta": {
            "range": [
                2428,
                2489
            ],
            "filename": "tech.js",
            "lineno": 112,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Set current time</p>",
        "kind": "function",
        "name": "setCurrentTime",
        "longname": "setCurrentTime",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Initialize texttrack listeners \n  *\n  * @method initTextTrackListeners\n  */",
        "meta": {
            "range": [
                2491,
                2574
            ],
            "filename": "tech.js",
            "lineno": 118,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Initialize texttrack listeners</p>",
        "kind": "function",
        "name": "initTextTrackListeners",
        "longname": "initTextTrackListeners",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Emulate texttracks \n  *\n  * @method emulateTextTracks\n  */",
        "meta": {
            "range": [
                2576,
                2642
            ],
            "filename": "tech.js",
            "lineno": 124,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Emulate texttracks</p>",
        "kind": "function",
        "name": "emulateTextTracks",
        "longname": "emulateTextTracks",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Get texttracks \n  *\n  * @returns {TextTrackList}\n  * @method textTracks\n  */",
        "meta": {
            "range": [
                2644,
                2728
            ],
            "filename": "tech.js",
            "lineno": 130,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Get texttracks</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "TextTrackList"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "textTracks",
        "longname": "textTracks",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Get remote texttracks \n  *\n  * @returns {TextTrackList}\n  * @method remoteTextTracks\n  */",
        "meta": {
            "range": [
                2730,
                2827
            ],
            "filename": "tech.js",
            "lineno": 137,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Get remote texttracks</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "TextTrackList"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "remoteTextTracks",
        "longname": "remoteTextTracks",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Creates and returns a remote text track object \n  *\n  * @param {String} kind Text track kind (subtitles, captions, descriptions\n  *                                       chapters and metadata)\n  * @param {String=} label Label to identify the text track\n  * @param {String=} language Two letter language abbreviation\n  * @return {TextTrackObject}\n  * @method addTextTrack\n  */",
        "meta": {
            "range": [
                2829,
                3212
            ],
            "filename": "tech.js",
            "lineno": 144,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Creates and returns a remote text track object</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "String"
                    ]
                },
                "description": "<p>Text track kind (subtitles, captions, descriptions\n                                      chapters and metadata)</p>",
                "name": "kind"
            },
            {
                "type": {
                    "names": [
                        "String"
                    ]
                },
                "optional": true,
                "description": "<p>Label to identify the text track</p>",
                "name": "label"
            },
            {
                "type": {
                    "names": [
                        "String"
                    ]
                },
                "optional": true,
                "description": "<p>Two letter language abbreviation</p>",
                "name": "language"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "TextTrackObject"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "addTextTrack",
        "longname": "addTextTrack",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Creates and returns a remote text track object \n  *\n  * @param {Object} options The object should contain values for\n  * kind, language, label and src (location of the WebVTT file)\n  * @return {TextTrackObject}\n  * @method addRemoteTextTrack\n  */",
        "meta": {
            "range": [
                3214,
                3468
            ],
            "filename": "tech.js",
            "lineno": 155,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Creates and returns a remote text track object</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "description": "<p>The object should contain values for\nkind, language, label and src (location of the WebVTT file)</p>",
                "name": "options"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "TextTrackObject"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "addRemoteTextTrack",
        "longname": "addRemoteTextTrack",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Remove remote texttrack \n  *\n  * @param {TextTrackObject} track Texttrack to remove\n  * @method removeRemoteTextTrack\n  */",
        "meta": {
            "range": [
                3470,
                3600
            ],
            "filename": "tech.js",
            "lineno": 164,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Remove remote texttrack</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "TextTrackObject"
                    ]
                },
                "description": "<p>Texttrack to remove</p>",
                "name": "track"
            }
        ],
        "kind": "function",
        "name": "removeRemoteTextTrack",
        "longname": "removeRemoteTextTrack",
        "scope": "global"
    },
    {
        "comment": "/**\n   * Provide a default setPoster method for techs\n   * Poster support for techs should be optional, so we don't want techs to\n   * break if they don't have a way to set a poster.\n   *\n   * @method setPoster\n   */",
        "meta": {
            "range": [
                3602,
                3818
            ],
            "filename": "tech.js",
            "lineno": 171,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech",
            "code": {}
        },
        "description": "<p>Provide a default setPoster method for techs\nPoster support for techs should be optional, so we don't want techs to\nbreak if they don't have a way to set a poster.</p>",
        "kind": "function",
        "name": "setPoster",
        "longname": "setPoster",
        "scope": "global"
    },
    {
        "comment": "/**\n * The component for displaying text track cues\n *\n * @param {Object} player  Main Player\n * @param {Object=} options Object of option names and values\n * @param {Function=} ready    Ready callback function\n * @extends Component\n * @class TextTrackDisplay\n */",
        "meta": {
            "range": [
                0,
                263
            ],
            "filename": "text-track-display.js",
            "lineno": 1,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tracks",
            "code": {}
        },
        "description": "<p>The component for displaying text track cues</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "description": "<p>Main Player</p>",
                "name": "player"
            },
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "optional": true,
                "description": "<p>Object of option names and values</p>",
                "name": "options"
            },
            {
                "type": {
                    "names": [
                        "function"
                    ]
                },
                "optional": true,
                "description": "<p>Ready callback function</p>",
                "name": "ready"
            }
        ],
        "augments": [
            "Component"
        ],
        "kind": "class",
        "name": "TextTrackDisplay",
        "longname": "TextTrackDisplay",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Toggle display texttracks \n  *\n  * @method toggleDisplay\n  */",
        "meta": {
            "range": [
                265,
                334
            ],
            "filename": "text-track-display.js",
            "lineno": 11,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tracks",
            "code": {}
        },
        "description": "<p>Toggle display texttracks</p>",
        "kind": "function",
        "name": "toggleDisplay",
        "longname": "toggleDisplay",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Create the component's DOM element\n  *\n  * @return {Element}\n  * @method createEl\n  */",
        "meta": {
            "range": [
                336,
                430
            ],
            "filename": "text-track-display.js",
            "lineno": 17,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tracks",
            "code": {}
        },
        "description": "<p>Create the component's DOM element</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Element"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "createEl",
        "longname": "createEl",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Clear display texttracks \n  *\n  * @method clearDisplay\n  */",
        "meta": {
            "range": [
                432,
                499
            ],
            "filename": "text-track-display.js",
            "lineno": 24,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tracks",
            "code": {}
        },
        "description": "<p>Clear display texttracks</p>",
        "kind": "function",
        "name": "clearDisplay",
        "longname": "clearDisplay",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Update display texttracks \n  *\n  * @method updateDisplay\n  */",
        "meta": {
            "range": [
                501,
                570
            ],
            "filename": "text-track-display.js",
            "lineno": 30,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tracks",
            "code": {}
        },
        "description": "<p>Update display texttracks</p>",
        "kind": "function",
        "name": "updateDisplay",
        "longname": "updateDisplay",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Add texttrack to texttrack list \n  *\n  * @param {TextTrackObject} track Texttrack object to be added to list\n  * @method updateForTrack\n  */",
        "meta": {
            "range": [
                572,
                720
            ],
            "filename": "text-track-display.js",
            "lineno": 36,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tracks",
            "code": {}
        },
        "description": "<p>Add texttrack to texttrack list</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "TextTrackObject"
                    ]
                },
                "description": "<p>Texttrack object to be added to list</p>",
                "name": "track"
            }
        ],
        "kind": "function",
        "name": "updateForTrack",
        "longname": "updateForTrack",
        "scope": "global"
    },
    {
        "comment": "/**\n* Add cue HTML to display\n*\n* @param {Number} color Hex number for color, like #f0e\n* @param {Number} opacity Value for opacity,0.0 - 1.0\n* @return {RGBAColor} In the form 'rgba(255, 0, 0, 0.3)'\n* @method constructColor\n*/",
        "meta": {
            "range": [
                722,
                948
            ],
            "filename": "text-track-display.js",
            "lineno": 43,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tracks",
            "code": {}
        },
        "description": "<p>Add cue HTML to display</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Number"
                    ]
                },
                "description": "<p>Hex number for color, like #f0e</p>",
                "name": "color"
            },
            {
                "type": {
                    "names": [
                        "Number"
                    ]
                },
                "description": "<p>Value for opacity,0.0 - 1.0</p>",
                "name": "opacity"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "RGBAColor"
                    ]
                },
                "description": "<p>In the form 'rgba(255, 0, 0, 0.3)'</p>"
            }
        ],
        "kind": "function",
        "name": "constructColor",
        "longname": "constructColor",
        "scope": "global"
    },
    {
        "comment": "/**\n* Try to update style\n* Some style changes will throw an error, particularly in IE8. Those should be noops.\n*\n* @param {Element} el The element to be styles\n* @param {CSSProperty} style The CSS property to be styled\n* @param {CSSStyle} rule The actual style to be applied to the property\n* @method tryUpdateStyle\n*/",
        "meta": {
            "range": [
                950,
                1269
            ],
            "filename": "text-track-display.js",
            "lineno": 52,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tracks",
            "code": {}
        },
        "description": "<p>Try to update style\nSome style changes will throw an error, particularly in IE8. Those should be noops.</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Element"
                    ]
                },
                "description": "<p>The element to be styles</p>",
                "name": "el"
            },
            {
                "type": {
                    "names": [
                        "CSSProperty"
                    ]
                },
                "description": "<p>The CSS property to be styled</p>",
                "name": "style"
            },
            {
                "type": {
                    "names": [
                        "CSSStyle"
                    ]
                },
                "description": "<p>The actual style to be applied to the property</p>",
                "name": "rule"
            }
        ],
        "kind": "function",
        "name": "tryUpdateStyle",
        "longname": "tryUpdateStyle",
        "scope": "global"
    },
    {
        "comment": "/**\n * Manipulate settings of texttracks\n *\n * @param {Object} player  Main Player\n * @param {Object=} options Object of option names and values\n * @extends Component\n * @class TextTrackSettings\n */",
        "meta": {
            "range": [
                0,
                198
            ],
            "filename": "text-track-settings.js",
            "lineno": 1,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tracks",
            "code": {}
        },
        "description": "<p>Manipulate settings of texttracks</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "description": "<p>Main Player</p>",
                "name": "player"
            },
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "optional": true,
                "description": "<p>Object of option names and values</p>",
                "name": "options"
            }
        ],
        "augments": [
            "Component"
        ],
        "kind": "class",
        "name": "TextTrackSettings",
        "longname": "TextTrackSettings",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Create the component's DOM element\n  *\n  * @return {Element}\n  * @method createEl\n  */",
        "meta": {
            "range": [
                200,
                294
            ],
            "filename": "text-track-settings.js",
            "lineno": 10,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tracks",
            "code": {}
        },
        "description": "<p>Create the component's DOM element</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Element"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "createEl",
        "longname": "createEl",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Get texttrack settings \n  * Settings are\n  * .vjs-edge-style\n  * .vjs-font-family\n  * .vjs-fg-color\n  * .vjs-text-opacity\n  * .vjs-bg-color\n  * .vjs-bg-opacity\n  * .window-color\n  * .vjs-window-opacity \n  *\n  * @return {Object} \n  * @method getValues\n  */",
        "meta": {
            "range": [
                296,
                559
            ],
            "filename": "text-track-settings.js",
            "lineno": 17,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tracks",
            "code": {}
        },
        "description": "<p>Get texttrack settings \nSettings are\n.vjs-edge-style\n.vjs-font-family\n.vjs-fg-color\n.vjs-text-opacity\n.vjs-bg-color\n.vjs-bg-opacity\n.window-color\n.vjs-window-opacity</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "getValues",
        "longname": "getValues",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Set texttrack settings \n  * Settings are\n  * .vjs-edge-style\n  * .vjs-font-family\n  * .vjs-fg-color\n  * .vjs-text-opacity\n  * .vjs-bg-color\n  * .vjs-bg-opacity\n  * .window-color\n  * .vjs-window-opacity \n  *\n  * @param {Object} values Object with texttrack setting values\n  * @method setValues\n  */",
        "meta": {
            "range": [
                561,
                866
            ],
            "filename": "text-track-settings.js",
            "lineno": 33,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tracks",
            "code": {}
        },
        "description": "<p>Set texttrack settings \nSettings are\n.vjs-edge-style\n.vjs-font-family\n.vjs-fg-color\n.vjs-text-opacity\n.vjs-bg-color\n.vjs-bg-opacity\n.window-color\n.vjs-window-opacity</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "description": "<p>Object with texttrack setting values</p>",
                "name": "values"
            }
        ],
        "kind": "function",
        "name": "setValues",
        "longname": "setValues",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Restore texttrack settings \n  *\n  * @method restoreSettings\n  */",
        "meta": {
            "range": [
                868,
                940
            ],
            "filename": "text-track-settings.js",
            "lineno": 49,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tracks",
            "code": {}
        },
        "description": "<p>Restore texttrack settings</p>",
        "kind": "function",
        "name": "restoreSettings",
        "longname": "restoreSettings",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Save texttrack settings to local storage \n  *\n  * @method saveSettings\n  */",
        "meta": {
            "range": [
                942,
                1025
            ],
            "filename": "text-track-settings.js",
            "lineno": 55,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tracks",
            "code": {}
        },
        "description": "<p>Save texttrack settings to local storage</p>",
        "kind": "function",
        "name": "saveSettings",
        "longname": "saveSettings",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Update display of texttrack settings  \n  *\n  * @method updateDisplay\n  */",
        "meta": {
            "range": [
                1027,
                1108
            ],
            "filename": "text-track-settings.js",
            "lineno": 61,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tracks",
            "code": {}
        },
        "description": "<p>Update display of texttrack settings</p>",
        "kind": "function",
        "name": "updateDisplay",
        "longname": "updateDisplay",
        "scope": "global"
    },
    {
        "comment": "/**\n * Compute how much your video has been buffered\n * @param  {Object} Buffered object\n * @param  {Number} Total duration\n * @return {Number} Percent buffered of the total duration\n * @private\n * @function bufferedPercent\n */",
        "meta": {
            "range": [
                0,
                227
            ],
            "filename": "buffer.js",
            "lineno": 1,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/utils",
            "code": {}
        },
        "description": "<p>Compute how much your video has been buffered</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "description": "<p>object</p>",
                "name": "Buffered"
            },
            {
                "type": {
                    "names": [
                        "Number"
                    ]
                },
                "description": "<p>duration</p>",
                "name": "Total"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "Number"
                    ]
                },
                "description": "<p>Percent buffered of the total duration</p>"
            }
        ],
        "access": "private",
        "kind": "function",
        "name": "bufferedPercent",
        "longname": "bufferedPercent",
        "scope": "global"
    },
    {
        "comment": "/**\n * Shorthand for document.getElementById()\n * Also allows for CSS (jQuery) ID syntax. But nothing other than IDs.\n *\n * @param  {String} id  Element ID\n * @return {Element}    Element with supplied ID\n * @function getEl\n */",
        "meta": {
            "range": [
                0,
                227
            ],
            "filename": "dom.js",
            "lineno": 1,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/utils",
            "code": {}
        },
        "description": "<p>Shorthand for document.getElementById()\nAlso allows for CSS (jQuery) ID syntax. But nothing other than IDs.</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "String"
                    ]
                },
                "description": "<p>Element ID</p>",
                "name": "id"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "Element"
                    ]
                },
                "description": "<p>Element with supplied ID</p>"
            }
        ],
        "kind": "function",
        "name": "getEl",
        "longname": "getEl",
        "scope": "global"
    },
    {
        "comment": "/**\n * Creates an element and applies properties.\n *\n * @param  {String=} tagName    Name of tag to be created.\n * @param  {Object=} properties Element properties to be applied.\n * @return {Element}\n * @function createEl\n */",
        "meta": {
            "range": [
                229,
                453
            ],
            "filename": "dom.js",
            "lineno": 10,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/utils",
            "code": {}
        },
        "description": "<p>Creates an element and applies properties.</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "String"
                    ]
                },
                "optional": true,
                "description": "<p>Name of tag to be created.</p>",
                "name": "tagName"
            },
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "optional": true,
                "description": "<p>Element properties to be applied.</p>",
                "name": "properties"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "Element"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "createEl",
        "longname": "createEl",
        "scope": "global"
    },
    {
        "comment": "/**\n * Insert an element as the first child node of another\n * \n * @param  {Element} child   Element to insert\n * @param  {Element} parent Element to insert child into\n * @private\n * @function insertElFirst\n */",
        "meta": {
            "range": [
                455,
                665
            ],
            "filename": "dom.js",
            "lineno": 19,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/utils",
            "code": {}
        },
        "description": "<p>Insert an element as the first child node of another</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Element"
                    ]
                },
                "description": "<p>Element to insert</p>",
                "name": "child"
            },
            {
                "type": {
                    "names": [
                        "Element"
                    ]
                },
                "description": "<p>Element to insert child into</p>",
                "name": "parent"
            }
        ],
        "access": "private",
        "kind": "function",
        "name": "insertElFirst",
        "longname": "insertElFirst",
        "scope": "global"
    },
    {
        "comment": "/**\n * Returns the cache object where data for an element is stored\n *\n * @param  {Element} el Element to store data for.\n * @return {Object}\n * @function getElData\n */",
        "meta": {
            "range": [
                933,
                1101
            ],
            "filename": "dom.js",
            "lineno": 37,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/utils",
            "code": {}
        },
        "description": "<p>Returns the cache object where data for an element is stored</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Element"
                    ]
                },
                "description": "<p>Element to store data for.</p>",
                "name": "el"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "getElData",
        "longname": "getElData",
        "scope": "global"
    },
    {
        "comment": "/**\n * Returns whether or not an element has cached data\n *\n * @param  {Element} el A dom element\n * @return {Boolean}\n * @private\n * @function hasElData\n */",
        "meta": {
            "range": [
                1103,
                1260
            ],
            "filename": "dom.js",
            "lineno": 45,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/utils",
            "code": {}
        },
        "description": "<p>Returns whether or not an element has cached data</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Element"
                    ]
                },
                "description": "<p>A dom element</p>",
                "name": "el"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "Boolean"
                    ]
                }
            }
        ],
        "access": "private",
        "kind": "function",
        "name": "hasElData",
        "longname": "hasElData",
        "scope": "global"
    },
    {
        "comment": "/**\n * Delete data for the element from the cache and the guid attr from getElementById\n *\n * @param  {Element} el Remove data for an element\n * @private\n * @function removeElData\n */",
        "meta": {
            "range": [
                1262,
                1445
            ],
            "filename": "dom.js",
            "lineno": 54,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/utils",
            "code": {}
        },
        "description": "<p>Delete data for the element from the cache and the guid attr from getElementById</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Element"
                    ]
                },
                "description": "<p>Remove data for an element</p>",
                "name": "el"
            }
        ],
        "access": "private",
        "kind": "function",
        "name": "removeElData",
        "longname": "removeElData",
        "scope": "global"
    },
    {
        "comment": "/**\n * Check if an element has a CSS class\n *\n * @param {Element} element Element to check\n * @param {String} classToCheck Classname to check\n * @function hasElClass\n */",
        "meta": {
            "range": [
                1447,
                1616
            ],
            "filename": "dom.js",
            "lineno": 62,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/utils",
            "code": {}
        },
        "description": "<p>Check if an element has a CSS class</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Element"
                    ]
                },
                "description": "<p>Element to check</p>",
                "name": "element"
            },
            {
                "type": {
                    "names": [
                        "String"
                    ]
                },
                "description": "<p>Classname to check</p>",
                "name": "classToCheck"
            }
        ],
        "kind": "function",
        "name": "hasElClass",
        "longname": "hasElClass",
        "scope": "global"
    },
    {
        "comment": "/**\n * Add a CSS class name to an element\n *\n * @param {Element} element    Element to add class name to\n * @param {String} classToAdd Classname to add\n * @function addElClass\n */",
        "meta": {
            "range": [
                1618,
                1797
            ],
            "filename": "dom.js",
            "lineno": 70,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/utils",
            "code": {}
        },
        "description": "<p>Add a CSS class name to an element</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Element"
                    ]
                },
                "description": "<p>Element to add class name to</p>",
                "name": "element"
            },
            {
                "type": {
                    "names": [
                        "String"
                    ]
                },
                "description": "<p>Classname to add</p>",
                "name": "classToAdd"
            }
        ],
        "kind": "function",
        "name": "addElClass",
        "longname": "addElClass",
        "scope": "global"
    },
    {
        "comment": "/**\n * Remove a CSS class name from an element\n *\n * @param {Element} element    Element to remove from class name\n * @param {String} classToRemove Classname to remove\n * @function removeElClass\n */",
        "meta": {
            "range": [
                1799,
                1997
            ],
            "filename": "dom.js",
            "lineno": 78,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/utils",
            "code": {}
        },
        "description": "<p>Remove a CSS class name from an element</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Element"
                    ]
                },
                "description": "<p>Element to remove from class name</p>",
                "name": "element"
            },
            {
                "type": {
                    "names": [
                        "String"
                    ]
                },
                "description": "<p>Classname to remove</p>",
                "name": "classToRemove"
            }
        ],
        "kind": "function",
        "name": "removeElClass",
        "longname": "removeElClass",
        "scope": "global"
    },
    {
        "comment": "/**\n * Apply attributes to an HTML element.\n *\n * @param  {Element} el         Target element.\n * @param  {Object=} attributes Element attributes to be applied.\n * @private\n * @function setElAttributes\n */",
        "meta": {
            "range": [
                1999,
                2204
            ],
            "filename": "dom.js",
            "lineno": 86,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/utils",
            "code": {}
        },
        "description": "<p>Apply attributes to an HTML element.</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Element"
                    ]
                },
                "description": "<p>Target element.</p>",
                "name": "el"
            },
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "optional": true,
                "description": "<p>Element attributes to be applied.</p>",
                "name": "attributes"
            }
        ],
        "access": "private",
        "kind": "function",
        "name": "setElAttributes",
        "longname": "setElAttributes",
        "scope": "global"
    },
    {
        "comment": "/**\n * Get an element's attribute values, as defined on the HTML tag\n * Attributes are not the same as properties. They're defined on the tag\n * or with setAttribute (which shouldn't be used with HTML)\n * This will return true or false for boolean attributes.\n *\n * @param  {Element} tag Element from which to get tag attributes\n * @return {Object}\n * @private\n * @function getElAttributes\n */",
        "meta": {
            "range": [
                2206,
                2599
            ],
            "filename": "dom.js",
            "lineno": 95,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/utils",
            "code": {}
        },
        "description": "<p>Get an element's attribute values, as defined on the HTML tag\nAttributes are not the same as properties. They're defined on the tag\nor with setAttribute (which shouldn't be used with HTML)\nThis will return true or false for boolean attributes.</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Element"
                    ]
                },
                "description": "<p>Element from which to get tag attributes</p>",
                "name": "tag"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                }
            }
        ],
        "access": "private",
        "kind": "function",
        "name": "getElAttributes",
        "longname": "getElAttributes",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Attempt to block the ability to select text while dragging controls\n  *\n  * @return {Boolean} \n  * @method blockTextSelection\n  */",
        "meta": {
            "range": [
                2601,
                2739
            ],
            "filename": "dom.js",
            "lineno": 107,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/utils",
            "code": {}
        },
        "description": "<p>Attempt to block the ability to select text while dragging controls</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Boolean"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "blockTextSelection",
        "longname": "blockTextSelection",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Turn off text selection blocking\n  *\n  * @return {Boolean} \n  * @method unblockTextSelection\n  */",
        "meta": {
            "range": [
                2741,
                2846
            ],
            "filename": "dom.js",
            "lineno": 114,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/utils",
            "code": {}
        },
        "description": "<p>Turn off text selection blocking</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Boolean"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "unblockTextSelection",
        "longname": "unblockTextSelection",
        "scope": "global"
    },
    {
        "comment": "/**\n  * Offset Left\n  * getBoundingClientRect technique from \n  * John Resig http://ejohn.org/blog/getboundingclientrect-is-awesome/\n  *\n  * @param {Element} el Element from which to get offset\n  * @return {Object=} \n  * @method findElPosition\n  */",
        "meta": {
            "range": [
                2848,
                3096
            ],
            "filename": "dom.js",
            "lineno": 121,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/utils",
            "code": {}
        },
        "description": "<p>Offset Left\ngetBoundingClientRect technique from \nJohn Resig http://ejohn.org/blog/getboundingclientrect-is-awesome/</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Element"
                    ]
                },
                "description": "<p>Element from which to get offset</p>",
                "name": "el"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "optional": true
            }
        ],
        "kind": "function",
        "name": "findElPosition",
        "longname": "findElPosition",
        "scope": "global"
    },
    {
        "comment": "/**\n * @fileoverview Event System (John Resig - Secrets of a JS Ninja http://jsninja.com/)\n * (Original book version wasn't completely usable, so fixed some things and made Closure Compiler compatible)\n * This should work very similarly to jQuery's events, however it's based off the book version which isn't as\n * robust as jquery's, so there's probably some differences.\n */",
        "meta": {
            "range": [
                0,
                376
            ],
            "filename": "events.js",
            "lineno": 1,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/utils",
            "code": {}
        },
        "name": "utils/events.js",
        "kind": "file",
        "description": "<p>Event System (John Resig - Secrets of a JS Ninja http://jsninja.com/)\n(Original book version wasn't completely usable, so fixed some things and made Closure Compiler compatible)\nThis should work very similarly to jQuery's events, however it's based off the book version which isn't as\nrobust as jquery's, so there's probably some differences.</p>",
        "preserveName": true,
        "longname": "utils/events.js",
        "scope": "global"
    },
    {
        "comment": "/**\n * Add an event listener to element\n * It stores the handler function in a separate cache object\n * and adds a generic handler to the element's event,\n * along with a unique id (guid) to the element.\n * \n * @param  {Element|Object}   elem Element or object to bind listeners to\n * @param  {String|Array}   type Type of event to bind to.\n * @param  {Function} fn   Event listener.\n * @method on\n */",
        "meta": {
            "range": [
                378,
                779
            ],
            "filename": "events.js",
            "lineno": 8,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/utils",
            "code": {}
        },
        "description": "<p>Add an event listener to element\nIt stores the handler function in a separate cache object\nand adds a generic handler to the element's event,\nalong with a unique id (guid) to the element.</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Element",
                        "Object"
                    ]
                },
                "description": "<p>Element or object to bind listeners to</p>",
                "name": "elem"
            },
            {
                "type": {
                    "names": [
                        "String",
                        "Array"
                    ]
                },
                "description": "<p>Type of event to bind to.</p>",
                "name": "type"
            },
            {
                "type": {
                    "names": [
                        "function"
                    ]
                },
                "description": "<p>Event listener.</p>",
                "name": "fn"
            }
        ],
        "kind": "function",
        "name": "on",
        "longname": "on",
        "scope": "global"
    },
    {
        "comment": "/**\n * Removes event listeners from an element\n *\n * @param  {Element|Object}   elem Object to remove listeners from\n * @param  {String|Array=}   type Type of listener to remove. Don't include to remove all events from element.\n * @param  {Function} fn   Specific listener to remove. Don't include to remove listeners for an event type.\n * @method off\n */",
        "meta": {
            "range": [
                781,
                1136
            ],
            "filename": "events.js",
            "lineno": 20,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/utils",
            "code": {}
        },
        "description": "<p>Removes event listeners from an element</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Element",
                        "Object"
                    ]
                },
                "description": "<p>Object to remove listeners from</p>",
                "name": "elem"
            },
            {
                "type": {
                    "names": [
                        "String",
                        "Array"
                    ]
                },
                "description": "<p>Type of listener to remove. Don't include to remove all events from element.</p>",
                "name": "type"
            },
            {
                "type": {
                    "names": [
                        "function"
                    ]
                },
                "description": "<p>Specific listener to remove. Don't include to remove listeners for an event type.</p>",
                "name": "fn"
            }
        ],
        "kind": "function",
        "name": "off",
        "longname": "off",
        "scope": "global"
    },
    {
        "comment": "/**\n * Trigger an event for an element\n *\n * @param  {Element|Object}      elem  Element to trigger an event on\n * @param  {Event|Object|String} event A string (the type) or an event object with a type attribute\n * @param  {Object} [hash] data hash to pass along with the event\n * @return {Boolean=} Returned only if default was prevented\n * @method trigger\n */",
        "meta": {
            "range": [
                1138,
                1499
            ],
            "filename": "events.js",
            "lineno": 29,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/utils",
            "code": {}
        },
        "description": "<p>Trigger an event for an element</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Element",
                        "Object"
                    ]
                },
                "description": "<p>Element to trigger an event on</p>",
                "name": "elem"
            },
            {
                "type": {
                    "names": [
                        "Event",
                        "Object",
                        "String"
                    ]
                },
                "description": "<p>A string (the type) or an event object with a type attribute</p>",
                "name": "event"
            },
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "optional": true,
                "description": "<p>data hash to pass along with the event</p>",
                "name": "hash"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "Boolean"
                    ]
                },
                "optional": true,
                "description": "<p>Returned only if default was prevented</p>"
            }
        ],
        "kind": "function",
        "name": "trigger",
        "longname": "trigger",
        "scope": "global"
    },
    {
        "comment": "/**\n * Trigger a listener only once for an event\n *\n * @param  {Element|Object}   elem Element or object to\n * @param  {String|Array}   type Name/type of event\n * @param  {Function} fn Event handler function\n * @method one\n */",
        "meta": {
            "range": [
                1501,
                1727
            ],
            "filename": "events.js",
            "lineno": 39,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/utils",
            "code": {}
        },
        "description": "<p>Trigger a listener only once for an event</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Element",
                        "Object"
                    ]
                },
                "description": "<p>Element or object to</p>",
                "name": "elem"
            },
            {
                "type": {
                    "names": [
                        "String",
                        "Array"
                    ]
                },
                "description": "<p>Name/type of event</p>",
                "name": "type"
            },
            {
                "type": {
                    "names": [
                        "function"
                    ]
                },
                "description": "<p>Event handler function</p>",
                "name": "fn"
            }
        ],
        "kind": "function",
        "name": "one",
        "longname": "one",
        "scope": "global"
    },
    {
        "comment": "/**\n * Fix a native event to have standard property values\n * \n * @param  {Object} event Event object to fix\n * @return {Object}\n * @private\n * @method fixEvent\n */",
        "meta": {
            "range": [
                1729,
                1893
            ],
            "filename": "events.js",
            "lineno": 48,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/utils",
            "code": {}
        },
        "description": "<p>Fix a native event to have standard property values</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "description": "<p>Event object to fix</p>",
                "name": "event"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                }
            }
        ],
        "access": "private",
        "kind": "function",
        "name": "fixEvent",
        "longname": "fixEvent",
        "scope": "global"
    },
    {
        "comment": "/**\n * Clean up the listener cache and dispatchers\n *\n * @param  {Element|Object} elem Element to clean up\n * @param  {String} type Type of event to clean up\n * @private\n * @method _cleanUpEvents\n */",
        "meta": {
            "range": [
                1895,
                2094
            ],
            "filename": "events.js",
            "lineno": 57,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/utils",
            "code": {}
        },
        "description": "<p>Clean up the listener cache and dispatchers</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Element",
                        "Object"
                    ]
                },
                "description": "<p>Element to clean up</p>",
                "name": "elem"
            },
            {
                "type": {
                    "names": [
                        "String"
                    ]
                },
                "description": "<p>Type of event to clean up</p>",
                "name": "type"
            }
        ],
        "access": "private",
        "kind": "function",
        "name": "_cleanUpEvents",
        "longname": "_cleanUpEvents",
        "scope": "global"
    },
    {
        "comment": "/**\n * Loops through an array of event types and calls the requested method for each type.\n *\n * @param  {Function} fn   The event method we want to use.\n * @param  {Element|Object} elem Element or object to bind listeners to\n * @param  {String}   type Type of event to bind to.\n * @param  {Function} callback   Event listener.\n * @private\n * @function _handleMultipleEvents\n */",
        "meta": {
            "range": [
                2096,
                2474
            ],
            "filename": "events.js",
            "lineno": 66,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/utils",
            "code": {}
        },
        "description": "<p>Loops through an array of event types and calls the requested method for each type.</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "function"
                    ]
                },
                "description": "<p>The event method we want to use.</p>",
                "name": "fn"
            },
            {
                "type": {
                    "names": [
                        "Element",
                        "Object"
                    ]
                },
                "description": "<p>Element or object to bind listeners to</p>",
                "name": "elem"
            },
            {
                "type": {
                    "names": [
                        "String"
                    ]
                },
                "description": "<p>Type of event to bind to.</p>",
                "name": "type"
            },
            {
                "type": {
                    "names": [
                        "function"
                    ]
                },
                "description": "<p>Event listener.</p>",
                "name": "callback"
            }
        ],
        "access": "private",
        "kind": "function",
        "name": "_handleMultipleEvents",
        "longname": "_handleMultipleEvents",
        "scope": "global"
    },
    {
        "comment": "/**\n * Bind (a.k.a proxy or Context). A simple method for changing the context of a function\n   It also stores a unique id on the function so it can be easily removed from events\n   *\n * @param  {*}   context The object to bind as scope\n * @param  {Function} fn      The function to be bound to a scope\n * @param  {Number=}   uid     An optional unique ID for the function to be set\n * @return {Function}\n * @private\n * @method bind\n */",
        "meta": {
            "range": [
                0,
                436
            ],
            "filename": "fn.js",
            "lineno": 1,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/utils",
            "code": {}
        },
        "description": "<p>Bind (a.k.a proxy or Context). A simple method for changing the context of a function\n   It also stores a unique id on the function so it can be easily removed from events</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "*"
                    ]
                },
                "description": "<p>The object to bind as scope</p>",
                "name": "context"
            },
            {
                "type": {
                    "names": [
                        "function"
                    ]
                },
                "description": "<p>The function to be bound to a scope</p>",
                "name": "fn"
            },
            {
                "type": {
                    "names": [
                        "Number"
                    ]
                },
                "optional": true,
                "description": "<p>An optional unique ID for the function to be set</p>",
                "name": "uid"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "function"
                    ]
                }
            }
        ],
        "access": "private",
        "kind": "function",
        "name": "bind",
        "longname": "bind",
        "scope": "global"
    },
    {
        "comment": "/**\n * Format seconds as a time string, H:MM:SS or M:SS\n * Supplying a guide (in seconds) will force a number of leading zeros\n * to cover the length of the guide\n *\n * @param  {Number} seconds Number of seconds to be turned into a string\n * @param  {Number} guide   Number (in seconds) to model the string after\n * @return {String}         Time formatted as H:MM:SS or M:SS\n * @private\n * @function formatTime\n */",
        "meta": {
            "range": [
                0,
                414
            ],
            "filename": "format-time.js",
            "lineno": 1,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/utils",
            "code": {}
        },
        "description": "<p>Format seconds as a time string, H:MM:SS or M:SS\nSupplying a guide (in seconds) will force a number of leading zeros\nto cover the length of the guide</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Number"
                    ]
                },
                "description": "<p>Number of seconds to be turned into a string</p>",
                "name": "seconds"
            },
            {
                "type": {
                    "names": [
                        "Number"
                    ]
                },
                "description": "<p>Number (in seconds) to model the string after</p>",
                "name": "guide"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "String"
                    ]
                },
                "description": "<p>Time formatted as H:MM:SS or M:SS</p>"
            }
        ],
        "access": "private",
        "kind": "function",
        "name": "formatTime",
        "longname": "formatTime",
        "scope": "global"
    },
    {
        "comment": "/**\n * Get the next unique ID\n *\n * @return {String} \n * @function newGUID\n */",
        "meta": {
            "range": [
                79,
                157
            ],
            "filename": "guid.js",
            "lineno": 7,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/utils",
            "code": {}
        },
        "description": "<p>Get the next unique ID</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "String"
                    ]
                }
            }
        ],
        "kind": "function",
        "name": "newGUID",
        "longname": "newGUID",
        "scope": "global"
    },
    {
        "comment": "/**\n * Log messages to the console and history based on the type of message\n *\n * @param  {String} type The type of message, or `null` for `log`\n * @param  {Object} args The args to be passed to the log\n * @private\n * @method _logType\n */",
        "meta": {
            "range": [
                161,
                399
            ],
            "filename": "log.js",
            "lineno": 18,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/utils",
            "code": {}
        },
        "description": "<p>Log messages to the console and history based on the type of message</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "String"
                    ]
                },
                "description": "<p>The type of message, or <code>null</code> for <code>log</code></p>",
                "name": "type"
            },
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "description": "<p>The args to be passed to the log</p>",
                "name": "args"
            }
        ],
        "access": "private",
        "kind": "function",
        "name": "_logType",
        "longname": "_logType",
        "scope": "global"
    },
    {
        "comment": "/**\n * Merge two options objects, recursively merging **only** plain object\n * properties.  Previously `deepMerge`.\n *\n * @param  {Object} object    The destination object\n * @param  {...Object} source One or more objects to merge into the first\n *\n * @returns {Object}          The updated first object\n * @function mergeOptions\n */",
        "meta": {
            "range": [
                0,
                333
            ],
            "filename": "merge-options.js",
            "lineno": 1,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/utils",
            "code": {}
        },
        "description": "<p>Merge two options objects, recursively merging <strong>only</strong> plain object\nproperties.  Previously <code>deepMerge</code>.</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "description": "<p>The destination object</p>",
                "name": "object"
            },
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "variable": true,
                "description": "<p>One or more objects to merge into the first</p>",
                "name": "source"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "description": "<p>The updated first object</p>"
            }
        ],
        "kind": "function",
        "name": "mergeOptions",
        "longname": "mergeOptions",
        "scope": "global"
    },
    {
        "comment": "/**\n * Should round off a number to a decimal place\n *\n * @param  {Number} num Number to round\n * @param  {Number} dec Number of decimal places to round to\n * @return {Number}     Rounded number\n * @private\n * @method roundFloat\n */",
        "meta": {
            "range": [
                0,
                232
            ],
            "filename": "round-float.js",
            "lineno": 1,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/utils",
            "code": {}
        },
        "description": "<p>Should round off a number to a decimal place</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Number"
                    ]
                },
                "description": "<p>Number to round</p>",
                "name": "num"
            },
            {
                "type": {
                    "names": [
                        "Number"
                    ]
                },
                "description": "<p>Number of decimal places to round to</p>",
                "name": "dec"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "Number"
                    ]
                },
                "description": "<p>Rounded number</p>"
            }
        ],
        "access": "private",
        "kind": "function",
        "name": "roundFloat",
        "longname": "roundFloat",
        "scope": "global"
    },
    {
        "comment": "/**\n * Should create a fake TimeRange object\n * Mimics an HTML5 time range instance, which has functions that\n * return the start and end times for a range\n * TimeRanges are returned by the buffered() method\n *\n * @param  {Number} start Start time in seconds\n * @param  {Number} end   End time in seconds\n * @return {Object}       Fake TimeRange object\n * @private\n * @method createTimeRange\n */",
        "meta": {
            "range": [
                0,
                395
            ],
            "filename": "time-ranges.js",
            "lineno": 1,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/utils",
            "code": {}
        },
        "description": "<p>Should create a fake TimeRange object\nMimics an HTML5 time range instance, which has functions that\nreturn the start and end times for a range\nTimeRanges are returned by the buffered() method</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Number"
                    ]
                },
                "description": "<p>Start time in seconds</p>",
                "name": "start"
            },
            {
                "type": {
                    "names": [
                        "Number"
                    ]
                },
                "description": "<p>End time in seconds</p>",
                "name": "end"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "description": "<p>Fake TimeRange object</p>"
            }
        ],
        "access": "private",
        "kind": "function",
        "name": "createTimeRange",
        "longname": "createTimeRange",
        "scope": "global"
    },
    {
        "comment": "/**\n * Uppercase the first letter of a string\n *\n * @param  {String} string String to be uppercased\n * @return {String}\n * @private\n * @method toTitleCase\n */",
        "meta": {
            "range": [
                0,
                158
            ],
            "filename": "to-title-case.js",
            "lineno": 1,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/utils",
            "code": {}
        },
        "description": "<p>Uppercase the first letter of a string</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "String"
                    ]
                },
                "description": "<p>String to be uppercased</p>",
                "name": "string"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "String"
                    ]
                }
            }
        ],
        "access": "private",
        "kind": "function",
        "name": "toTitleCase",
        "longname": "toTitleCase",
        "scope": "global"
    },
    {
        "comment": "/**\n * Resolve and parse the elements of a URL\n *\n * @param  {String} url The url to parse\n * @return {Object}     An object of url details\n * @method parseUrl\n */",
        "meta": {
            "range": [
                0,
                163
            ],
            "filename": "url.js",
            "lineno": 1,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/utils",
            "code": {}
        },
        "description": "<p>Resolve and parse the elements of a URL</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "String"
                    ]
                },
                "description": "<p>The url to parse</p>",
                "name": "url"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "description": "<p>An object of url details</p>"
            }
        ],
        "kind": "function",
        "name": "parseUrl",
        "longname": "parseUrl",
        "scope": "global"
    },
    {
        "comment": "/**\n * Get absolute version of relative URL. Used to tell flash correct URL.\n * http://stackoverflow.com/questions/470832/getting-an-absolute-url-from-a-relative-one-ie6-issue\n *\n * @param  {String} url URL to make absolute\n * @return {String}     Absolute URL\n * @private\n * @method getAbsoluteURL\n */",
        "meta": {
            "range": [
                165,
                467
            ],
            "filename": "url.js",
            "lineno": 9,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/utils",
            "code": {}
        },
        "description": "<p>Get absolute version of relative URL. Used to tell flash correct URL.\nhttp://stackoverflow.com/questions/470832/getting-an-absolute-url-from-a-relative-one-ie6-issue</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "String"
                    ]
                },
                "description": "<p>URL to make absolute</p>",
                "name": "url"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "String"
                    ]
                },
                "description": "<p>Absolute URL</p>"
            }
        ],
        "access": "private",
        "kind": "function",
        "name": "getAbsoluteURL",
        "longname": "getAbsoluteURL",
        "scope": "global"
    },
    {
        "comment": "/**\n * Returns the extension of the passed file name. It will return an empty string if you pass an invalid path\n *\n * @param {String}    path    The fileName path like '/path/to/file.mp4'\n * @returns {String}          The extension in lower case or an empty string if no extension could be found.\n * @method getFileExtension\n */",
        "meta": {
            "range": [
                469,
                798
            ],
            "filename": "url.js",
            "lineno": 19,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/utils",
            "code": {}
        },
        "description": "<p>Returns the extension of the passed file name. It will return an empty string if you pass an invalid path</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "String"
                    ]
                },
                "description": "<p>The fileName path like '/path/to/file.mp4'</p>",
                "name": "path"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "String"
                    ]
                },
                "description": "<p>The extension in lower case or an empty string if no extension could be found.</p>"
            }
        ],
        "kind": "function",
        "name": "getFileExtension",
        "longname": "getFileExtension",
        "scope": "global"
    },
    {
        "comment": "/**\n * Doubles as the main function for users to create a player instance and also\n * the main library object.\n *\n * The `videojs` function can be used to initialize or retrieve a player.\n *\n *     var myPlayer = videojs('my_video_id');\n *\n * @param  {String|Element} id      Video element or video element ID\n * @param  {Object=} options        Optional options object for config/settings\n * @param  {Function=} ready        Optional ready callback\n * @return {Player}                 A player instance\n * @method videojs\n */",
        "meta": {
            "range": [
                0,
                526
            ],
            "filename": "video.js",
            "lineno": 1,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Doubles as the main function for users to create a player instance and also\nthe main library object.</p>\n<p>The <code>videojs</code> function can be used to initialize or retrieve a player.</p>\n<pre class=\"prettyprint source\"><code>var myPlayer = videojs('my_video_id');</code></pre>",
        "params": [
            {
                "type": {
                    "names": [
                        "String",
                        "Element"
                    ]
                },
                "description": "<p>Video element or video element ID</p>",
                "name": "id"
            },
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "optional": true,
                "description": "<p>Optional options object for config/settings</p>",
                "name": "options"
            },
            {
                "type": {
                    "names": [
                        "function"
                    ]
                },
                "optional": true,
                "description": "<p>Optional ready callback</p>",
                "name": "ready"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "Player"
                    ]
                },
                "description": "<p>A player instance</p>"
            }
        ],
        "kind": "function",
        "name": "videojs",
        "longname": "videojs",
        "scope": "global"
    },
    {
        "comment": "/**\n * Set options that will apply to every player\n *\n *     videojs.setGlobalOptions({\n *       autoplay: true\n *     });\n *     // -> all players will autoplay by default\n *\n * NOTE: This will do a deep merge with the new options,\n * not overwrite the entire global options object.\n *\n * @return {Object} The updated global options object\n * @method setGlobalOptions\n */",
        "meta": {
            "range": [
                528,
                900
            ],
            "filename": "video.js",
            "lineno": 16,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Set options that will apply to every player</p>\n<pre class=\"prettyprint source\"><code>videojs.setGlobalOptions({\n  autoplay: true\n});\n// -> all players will autoplay by default</code></pre><p>NOTE: This will do a deep merge with the new options,\nnot overwrite the entire global options object.</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "description": "<p>The updated global options object</p>"
            }
        ],
        "kind": "function",
        "name": "setGlobalOptions",
        "longname": "setGlobalOptions",
        "scope": "global"
    },
    {
        "comment": "/**\n * Get an object with the currently created players, keyed by player ID\n *\n * @return {Object} The created players\n * @method getPlayers\n */",
        "meta": {
            "range": [
                902,
                1046
            ],
            "filename": "video.js",
            "lineno": 31,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Get an object with the currently created players, keyed by player ID</p>",
        "returns": [
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "description": "<p>The created players</p>"
            }
        ],
        "kind": "function",
        "name": "getPlayers",
        "longname": "getPlayers",
        "scope": "global"
    },
    {
        "comment": "/**\n * Simple http request for retrieving external files (e.g. text tracks)\n *\n * ##### Example\n *\n *     // using url string\n *     videojs.xhr('http://example.com/myfile.vtt', function(error, response, responseBody){});\n *\n *     // or options block\n *     videojs.xhr({\n *       uri: 'http://example.com/myfile.vtt',\n *       method: 'GET',\n *       responseType: 'text'\n *     }, function(error, response, responseBody){\n *       if (error) {\n *         // log the error\n *       } else {\n *         // successful, do something with the response\n *       }\n *     });\n *\n *\n * API is modeled after the Raynos/xhr, which we hope to use after\n * getting browserify implemented.\n * https://github.com/Raynos/xhr/blob/master/index.js\n *\n * @param  {Object|String}  options   Options block or URL string\n * @param  {Function}       callback  The callback function\n * @return {Object}                  The request\n * @method xhr\n */",
        "meta": {
            "range": [
                0,
                930
            ],
            "filename": "xhr.js",
            "lineno": 1,
            "path": "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src",
            "code": {}
        },
        "description": "<p>Simple http request for retrieving external files (e.g. text tracks)</p>\n<h5>Example</h5><pre class=\"prettyprint source\"><code>// using url string\nvideojs.xhr('http://example.com/myfile.vtt', function(error, response, responseBody){});\n\n// or options block\nvideojs.xhr({\n  uri: 'http://example.com/myfile.vtt',\n  method: 'GET',\n  responseType: 'text'\n}, function(error, response, responseBody){\n  if (error) {\n    // log the error\n  } else {\n    // successful, do something with the response\n  }\n});</code></pre><p>API is modeled after the Raynos/xhr, which we hope to use after\ngetting browserify implemented.\nhttps://github.com/Raynos/xhr/blob/master/index.js</p>",
        "params": [
            {
                "type": {
                    "names": [
                        "Object",
                        "String"
                    ]
                },
                "description": "<p>Options block or URL string</p>",
                "name": "options"
            },
            {
                "type": {
                    "names": [
                        "function"
                    ]
                },
                "description": "<p>The callback function</p>",
                "name": "callback"
            }
        ],
        "returns": [
            {
                "type": {
                    "names": [
                        "Object"
                    ]
                },
                "description": "<p>The request</p>"
            }
        ],
        "kind": "function",
        "name": "xhr",
        "longname": "xhr",
        "scope": "global"
    },
    {
        "kind": "package",
        "longname": "package:undefined",
        "files": [
            "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/base-styles.js",
            "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/big-play-button.js",
            "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/button.js",
            "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/component.js",
            "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/control-bar.js",
            "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/fullscreen-toggle.js",
            "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/live-display.js",
            "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/mute-toggle.js",
            "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/play-toggle.js",
            "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/playback-rate-menu/playback-rate-menu-button.js",
            "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/playback-rate-menu/playback-rate-menu-item.js",
            "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/progress-control/load-progress-bar.js",
            "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/progress-control/play-progress-bar.js",
            "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/progress-control/progress-control.js",
            "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/progress-control/seek-bar.js",
            "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/spacer-controls/custom-control-spacer.js",
            "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/spacer-controls/spacer.js",
            "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/text-track-controls/caption-settings-menu-item.js",
            "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/text-track-controls/captions-button.js",
            "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/text-track-controls/chapters-button.js",
            "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/text-track-controls/chapters-track-menu-item.js",
            "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/text-track-controls/off-text-track-menu-item.js",
            "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/text-track-controls/subtitles-button.js",
            "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/text-track-controls/text-track-button.js",
            "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/text-track-controls/text-track-menu-item.js",
            "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/time-controls/current-time-display.js",
            "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/time-controls/duration-display.js",
            "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/time-controls/remaining-time-display.js",
            "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/time-controls/time-divider.js",
            "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/volume-control/volume-bar.js",
            "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/volume-control/volume-control.js",
            "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/volume-control/volume-level.js",
            "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/control-bar/volume-menu-button.js",
            "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/error-display.js",
            "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/event-emitter.js",
            "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/extends.js",
            "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/fullscreen-api.js",
            "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/global-options.js",
            "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/loading-spinner.js",
            "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/media-error.js",
            "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/menu/menu-button.js",
            "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/menu/menu-item.js",
            "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/menu/menu.js",
            "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/player.js",
            "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/plugins.js",
            "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/poster-image.js",
            "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/setup.js",
            "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/slider/slider.js",
            "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech/flash-rtmp.js",
            "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech/flash.js",
            "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech/html5.js",
            "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech/loader.js",
            "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tech/tech.js",
            "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tracks/text-track-cue-list.js",
            "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tracks/text-track-display.js",
            "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tracks/text-track-enums.js",
            "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tracks/text-track-list.js",
            "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tracks/text-track-settings.js",
            "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/tracks/text-track.js",
            "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/utils/browser.js",
            "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/utils/buffer.js",
            "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/utils/dom.js",
            "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/utils/events.js",
            "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/utils/fn.js",
            "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/utils/format-time.js",
            "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/utils/guid.js",
            "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/utils/log.js",
            "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/utils/merge-options.js",
            "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/utils/round-float.js",
            "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/utils/time-ranges.js",
            "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/utils/to-title-case.js",
            "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/utils/url.js",
            "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/video.js",
            "/Users/mboles/git/BCL-LearningSamples/grunt-shell/videojs-src/xhr.js"
        ]
    }
]

;