import React from 'react';
import Meta from './Meta.js';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class Card extends React.Component {
	render() {
		function resourceCheck (props) {
			if (props.type === "resources" || props.type === "primoFavorites") {
				return (
					<a href={props.externalUrl}>{props.resource.title}</a>
				)
			} else {
				return (
					<Link to={props.prefixUrl + props.resource.slug} onClick={(e) => props.handleClick(props.resource.slug, props.type)}>{props.resource.title}</Link>
				)
			}
		}
		const className = 'card ' + this.props.type.replace(/s/, "");

		return (
			<div className={className}>
				{this.props.resource.title && <h3 className="title">{resourceCheck(this.props)}</h3>}
				{(this.props.type === "resources" || this.props.type === "primoFavorites") ? <div></div> : 
				( this.props.meta &&  <ul className="meta">
					{this.props.meta.map((meta, i) => <Meta key={i} meta={meta} />)}
					</ul>)}
				{this.props.description && <p className="description">{this.props.description}</p>}
			</div>
		)
	}
}

export default Card;
