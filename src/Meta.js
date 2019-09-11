import React from 'react';

class Meta extends React.Component {
	render() {
		if (null === this.props.meta.value || 'undefined' === typeof this.props.meta.value) {
			return false
		}

		var className = '';
		if ('undefined' !== typeof this.props.meta.className && this.props.meta.className.length > 0) {
			className = this.props.meta.className;
		}

		if ('URL' === this.props.meta.type) {
			this.props.meta.value = <a href={this.props.meta.value} className="button">View</a>
		}

		return (
			<li className={className}>{this.props.meta.type}: {this.props.meta.value}</li>
		)
	}
}

export default Meta;
