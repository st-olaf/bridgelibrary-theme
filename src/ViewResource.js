import React from 'react';
import Meta from './Meta.js';

class ViewResource extends React.Component {
	render() {
		var resourceData = this.props.parentState.currentObject.resourceData,
			meta = []
			if ('undefined' !== typeof resourceData && null !== resourceData) {
			meta = [
				{
					type: 'URL',
					value: resourceData.url,
				},
				{
					type: 'Author',
					value: resourceData.author,
				},
				{
					type: 'ISBN',
					value: resourceData.isbn,
				},
				{
					type: 'Publication Year',
					value: resourceData.publicationYear,
				},
				{
					type: 'Description',
					value: resourceData.description,
				},
			];
		}

		return (
			<div className="entry-content clear">
				<ul>
					{meta.length > 0 && meta.map((meta, i) => <Meta key={i} meta={meta} />)}
				</ul>
			</div>
		)
	}
}

export default ViewResource;
