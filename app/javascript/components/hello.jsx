import React from 'react';

class Hello extends React.Component {
  constructor(props) {
    super(props)
    this.state = {count: 0}
  }

  incrementCount() {
    this.setState({count: this.state.count+5})
  }

  render() {
    return <div>
             Hello, I am {this.props.name} version is {Hello.version} my sate is: {this.state.count}! <button onClick={() => this.incrementCount()}>increment</button>
           </div>
  }
}

Hello.version = 17;

export default Hello;
