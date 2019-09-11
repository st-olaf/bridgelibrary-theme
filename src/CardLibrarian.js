import React from 'react';
import Card from './Card.js';

class CardLibrarian extends Card {
	render() {
		return <Card resource={this.props.resource} handleClick={this.props.handleClick} type={this.props.type} prefixUrl="/librarians/"/>
	}
}

export default CardLibrarian;
