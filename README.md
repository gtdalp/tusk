# TUSK

A lightweight viritual-dom with a friendly interface.

[![Join the chat at https://gitter.im/DylanPiercey/tusk](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/DylanPiercey/tusk?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![npm](https://img.shields.io/npm/dm/tusk.svg)](https://www.npmjs.com/package/tusk)

# Why
Many virtual-dom implementations are bulky and are not optimized for immutable data or server side rendering.
Currently this is experimental and should not be used in production.

* Lightweight.
* Minimal API.
* Designed for immutable data.
* No extra "data-react-id" attributes.
* No random span's inserted into DOM.
* Supports JSX.

# Installation

#### Npm
```console
npm install tusk
```

# Example

```javascript
/** @jsx tusk */
let tusk = require('tusk');
// Using immstruct for example, feel free to replace with immutable.js or others.
let immstruct = require('immstruct');
// Define some initial state for the app.
let struct = immstruct({ i : 0 });

function MyCounter (props, children) {
    let { message, cursor } = props;

    // Define handlers.
    let handleClick = (e)=> cursor.update((state)=> state.set("i", state.get("i") + 1));

    // Render the component.
    return (
        <button onClick={ handleClick }>
            { message } : { cursor.get('i') }
        </button>
    );
}

function render () {
    tusk.render(document.body,
        <MyCounter message="Times clicked" cursor={ struct.cursor() }/>
    )
}

// Initial render
render()

// We can use the render function to re-render when the state changes.
struct.on("next-animation-frame", render)

// We can also render into a string (Usually for the server).
let HTML = String(<MyCounter type="Times clicked" cursor={ struct.cursor() }/>);
// -> "<button>Times clicked : 0</button>"
```

# API
+ **render(HTMLEntity, node)** : Bootstrap or update a virtual `node` inside of an `HTML Entity`.

```javascript
tusk.render(document.body, <div>Hello World</div>);
// -> document.body.innerHTML === "<div>Hello World</div>"
```

+ **with(context, renderer)** : Gives all components inside a render function some external `context`.


```javascript
// renderer must be a function that returns a virtual node.
function MyComponent (props, children, context) {
    <div>External data: { context }</div>
}

String(tusk.with(1, ()=> <MyComponent/>));
//-> "<div>External Data: 1</div>"
```

+ **createElement(type, props, children...)** : Create a virtual node/component.

```javascript
// Automatically called when using JSX.
let vNode = tusk.createElement("div", { editable: true }, "Hello World");
// Or call tusk directly
let vNode = tusk("div", { editable: true }, "Hello World");

// Render to string on the server.
vNode.toString(); // '<div editable="true">Hello World</div>';

/**
 * @params type can also be a function (shown in example above).
 */
```

---

# Advanced Performance
In React and many other virtual doms "shouldUpdate" is a common theme for performance.
Tusk **does not** feature shouldUpdate and opts for a more performant, simpler, and well known approach: **memoization**.

Basically Tusk will never re-render when given the same node twice, meaning the following will only render once.
Tusk will also intelegently cloneNodes if memoized nodes are inserted in multiple places throughout the document.

```javascript
let _ = require("lodash");
let i = 0;

let MyDiv = _.memoize(function () {
    console.log(++i);
    return (
        <div>Hello World</div>
    );
});

// creates and renders myDiv.
tusk.render(document.getElementById("component1"), <MyDiv/>);
i; // -> 1

// noop.
tusk.render(document.getElementById("component1"), <MyDiv/>);
i; // -> 1

// Uses #cloneNode on the previously rendered element. (Much faster than creating it).
tusk.render(document.getElementById("component2"), <MyDiv/>);
i; // -> 1
```

### Contributions

* Use gulp to run tests.

Please feel free to create a PR!
