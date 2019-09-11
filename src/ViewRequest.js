import React from 'react';
import Meta from './Meta.js';

class ViewRequest extends React.Component {
	render() {
		var request = this.props.parentState.userData.circulationData.requests.find((request) => {
				return request.id = this.props.parentState.currentObject.id
			}),
			meta = [
				{
					type: 'Due Date',
					value: request.due_back_date,
				},
				{
					type: 'Request Type',
					value: request.request_type,
				},
				{
					type: 'Pickup Location Library',
					value: request.pickup_location_library.desc,
				},
				{
					type: 'Pickup Location Circulation Desk',
					value: request.pickup_location_library.desc
				},
				{
					type: 'Booking Start Date',
					value: request.booking_start_date,
				},
				{
					type: 'Booking Start Date',
					value: request.booking_start_date,
				},
				{
					type: 'Booking End Date',
					value: request.booking_end_date,
				},
				{
					type: 'Description',
					value: request.description
				},
			];

		return (
			<div className="entry-content clear">
				<ul>
					{meta.length > 0 && meta.map((meta, i) => <Meta key={i} meta={meta} />)}
				</ul>
			</div>
		)
	}
}

export default ViewRequest;
