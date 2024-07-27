import React, { Component } from 'react'

export default class TestT extends Component {
    constructor(){
      console.log("test")
      super();
    }
    componentDidCatch(){
      console.log("test2");
    }
  render() {
    return (
      <div>
        helo hii
      </div>
    )
  }
}
