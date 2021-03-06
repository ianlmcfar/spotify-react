import React, { Component } from 'react';

class WatchClickOutside extends Component {
	constructor(props) {
	  super(props);
	  this.handleClick = this.handleClick.bind(this);
	}
  	
	componentWillMount() {
	  document.body.addEventListener('click', this.handleClick);
	}
  	
	componentWillUnmount() {
	  //remove all events to avoid memory leaks
	  document.body.removeEventListener('click', this.handleClick);
	}
  	
	handleClick(event) {
	  console.log('clicked')
	  const {container} = this.refs; // get container that we'll wait to be clicked outside
	  const {onClickOutside} = this.props; // get click outside callback
	  const {target} = event; // get direct click event target
  	
	  // if there is no proper callback - no point of checking
	  if (typeof onClickOutside !== 'function') {
	    return;
	  }
  	
	  // if target is container - container was not clicked outside
	  // if container contains clicked target - click was not outside of it
	  if (target !== container && !container.contains(target)) {
		  console.log('clicked_outside')
	    onClickOutside(event); // clicked outside - fire callback
	  }
	}
  	
	render() {
	  return (
	    <div ref="container">
	      {this.props.children}
	    </div>
	  );
	}
}
export default WatchClickOutside;