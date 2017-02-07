import React from 'react'
import ReactDOM from 'react-dom'

import { AppContainer } from 'react-hot-loader';

const CLASS_ATTRIBUTE_NAME = 'data-react-class';
const PROPS_ATTRIBUTE_NAME = 'data-react-props';

var WebpackerReact = {
  eventsRegistered: false,
  registeredComponents : {},

  render: function(node, component) {
    var propsJson = node.getAttribute(PROPS_ATTRIBUTE_NAME);
    var props = propsJson && JSON.parse(propsJson);

    ReactDOM.render(React.createElement(AppContainer, {}, React.createElement(component, props)), node);
  },
  renderOnHMR: function(component) {
    console.log("renderOnHMR:", component.version);
    var name = component.name;
    this.registeredComponents[name] = component;

    var toMount = document.querySelectorAll(`[${CLASS_ATTRIBUTE_NAME}=${name}]`)
    for (var i = 0; i < toMount.length; ++i) {
      var node = toMount[i];

      this.render(node, component);
    }
  },
  register: function(component) {
    var name = component.name;

    if(this.registeredComponents[name]) {
      console.warn('webpacker-react: Cant register component, another one with this name is already registered: ' + name);
      return false;
    }

    this.registeredComponents[name] = component;
    return true;
  },
  addEventEventhandlers: function() {
    var registeredComponents = this.registeredComponents;

    if(this.eventsRegistered == true) {
      console.warn("webpacker-react: events have already been registered");
      return false;
    }

    document.addEventListener("DOMContentLoaded", () => {
      var toMount = document.querySelectorAll('[' + CLASS_ATTRIBUTE_NAME + ']')

      for (var i = 0; i < toMount.length; ++i) {
        var node = toMount[i];
        var className = node.getAttribute(CLASS_ATTRIBUTE_NAME);
        var component = registeredComponents[className];

        if(component) {
          this.render(node, component)
        } else {
          console.error('webpacker-react: cant render a component that has not been registered: ' + className)
        }
      }
    });

    this.eventsRegistered = true;
    return true;
  }
};

WebpackerReact.addEventEventhandlers();

export default WebpackerReact;
