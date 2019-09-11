import React from 'react';

class LastUpdated extends React.Component {
	constructor(props) {
		super(props)

		this.formatDate = this.formatDate.bind(this);

		var formattedDate;
		if ('undefined' === typeof this.props.date) {
			formattedDate = false;
		} else {
			// Reminder: JS includes microseconds in timestamp, PHP does not.
			const date = new Date(Number(this.props.date + '000'));
			formattedDate = this.formatDate(date);
		}

		this.state = {
			date: formattedDate,
		}
	}

	formatDate(date) {
		var format = {
			month: 'long',
			day: 'numeric',
			year: 'numeric',
		};
		date = new Date(date);
		return date.toLocaleDateString(undefined, format);
	}

    render() {
		if (! this.state.date) {
			return false;
		}

        return (<p className="meta">Last updated {this.state.date}</p>)
    }
}

export default LastUpdated;
