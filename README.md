# Webpacker-React sample application

This is a very basic Rails application to showcase usage of
[Webpacker-React](https://facebook.github.io/react/).

Please read Webpacker-React documentation for more details.

## Usage

First, clone this repository and install dependancies :

```
$ cd webpacker-react-example
$ bundle
$ ./bin/yarn
```

You then need to run Webpack to compile the javascript code :

```
$ ./bin/webpack
```

Now you can run the Rails app :

```
$ ./bin/rails server
```

Finally open http://localhost:3000/ in your browser.

## Hot module replacement

```
./bin/webpack-dev-server --hot
```

## Contents

### [Hello: Sample React component](app/javascript/components/hello.jsx)

Very basic React component, nothing special.

### [Hello React pack file](app/javascript/packs/hello_react.js)

Packfiles are entrypoints for Webpacker's managed Javascript.
For Webpacker-React to work, you need to `import` your component and register
it for later use in your app.

### [React component rendered from a view](app/views/pages/view_component.html.erb)

Use the `react_component()` method from a view to render a previously registered component.

### [React component rendered from a controller](app/controllers/pages_controller.rb)

You can also use `render react_component: 'Component'` from a controller to render it.

## Development

You are encouraged to use this example application to test any development you make on the
Webpacker-React code base. Please see its [README](https://github.com/renchap/webpacker-react#development) for more details.
