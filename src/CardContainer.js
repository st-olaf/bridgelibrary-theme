import React from 'react';
import Card from './Card.js';
import CardCourse from './CardCourse.js';
import CardResource from './CardResource.js';
import CardLibrarian from './CardLibrarian.js';
import CardLoan from './CardLoan.js';
import CardRequest from './CardRequest.js';
import CardFee from './CardFee.js';
import LastUpdated from './LastUpdated.js';
import ButtonShowAll from './ButtonShowAll.js';
import { BrowserRouter as Link } from 'react-router-dom';

class CardContainer extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			userData: ((this.props.userData === null) ? null : this.props.userData[this.props.type]),
			dataType: this.props.type,
			cacheDate: ((this.props.userData === null) ? null : this.props.userData[this.props.type+'CacheUpdated']),
			numToShow: 6,
		};

		this.handleButtonClick = this.handleButtonClick.bind(this);
	}

	handleButtonClick(number) {
		this.setState({
			numToShow: number
		})
	}

	render() {
		var headerContent,
			footerContent;

		if ('undefined' !== typeof this.props.headerContent) {
			headerContent = this.props.headerContent;
		}

		if ('undefined' !== typeof this.props.footerContent) {
			footerContent = this.props.footerContent;
		}

		if (this.state.userData === undefined || null === this.state.userData || 0 === this.state.userData.length) {
			return (
				<div>
					<h3>{this.props.header}</h3>
					<p>You have no {this.props.header.toLowerCase()} to display. Please <Link to="/support/">contact support</Link> if you think  you should have some.</p>
					{headerContent}
					{footerContent}
				</div>
			)
		}

		var resources = this.state.userData;
		if (typeof this.state.numToShow === 'number') {
			resources = this.state.userData.slice(0, this.state.numToShow);
		}

		var resourceData = [];
		for (var i=0; i < resources.length; i++) {
			var card = null,
				theseProps = {
					key: resources[i].id,
					resource: resources[i],
					handleClick: this.props.handleClick,
					type: this.props.type,
				};

			switch (this.state.dataType) {
				case 'courses':
					card = <CardCourse {...theseProps} />
					break;
				case 'resources':
				case 'primoFavorites':
					card = <CardResource {...theseProps} />
					break;
				case 'librarians':
					card = <CardLibrarian {...theseProps} />
					break;
				case 'loans':
					card = <CardLoan {...theseProps} />
					break;
				case 'requests':
					card = <CardRequest {...theseProps} />
					break;
				case 'fees':
					card = <CardFee {...theseProps} />
					break;
				default:
					card = <Card {...theseProps} />
					break;
			}

			resourceData.push(card);
		}

		return (
			<div>
				<h2>{this.props.header}</h2>
				<LastUpdated date={this.state.cacheDate} />
				{headerContent}
				<div className="card-container">
					{resourceData}
				</div>
				<ButtonShowAll numberOfResources={this.state.userData.length} numToShow={this.state.numToShow} handleButtonClick={this.handleButtonClick}/>
				{footerContent}
			</div>
		)
	}
}

export default CardContainer;
