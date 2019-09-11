import React from 'react';
import Card from './Card.js';

class CardFee extends Card {
	render() {
		const meta = [
			{
				type: 'Amount',
				value: this.props.resource.original_amount,
			},
		];

		return <Card resource={this.props.resource} meta={meta} prefixUrl="/circulation-data/" handleClick={this.props.handleClick} type={this.props.type} />
	}
}

export default CardFee;
