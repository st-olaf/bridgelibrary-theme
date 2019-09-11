import React from 'react';
import Card from './Card.js';

class CardCourse extends Card {
	render() {
		function formatDate(date) {
			var format = {
					month: 'long',
					day: 'numeric',
					year: 'numeric',
				},
				y = date.substr(0,4),
				m = date.substr(4,2),
				d = date.substr(6,2);
			date = new Date(y,m,d);
			return date.toLocaleDateString(undefined, format);
		}

		const meta = [
			{
				type: 'Start Date',
				value: formatDate(this.props.resource.courseData.startDate),
			},
			{
				type: 'End Date',
				value: formatDate(this.props.resource.courseData.endDate),
			},
		];

		return <Card meta={meta} prefixUrl="/courses/" {...this.props} />
	}
}

export default CardCourse;
