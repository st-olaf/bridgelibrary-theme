import React from 'react';
import CardContainer from './CardContainer.js';
import Error from './Error.js';
import SupportWidget from './SupportWidget.js';

class ViewHome extends React.Component {
	render() {
		if (this.props.error) {
			return <Error message={this.props.errorMessage}/>
		}
		return (
			<div className="entry-content clear">

				<CardContainer
					userData={this.props.parentState.userData}
					type="courses"
					header="Courses"
					handleClick={this.props.handleClick}
				/>

				<CardContainer
					userData={this.props.parentState.userData}
					type="primoFavorites"
					header="Catalyst Favorites"
					handleClick={this.props.handleClick}
				/>
				<SupportWidget institution={this.props.parentState.userData.bridgeLibraryInstitution} />
			</div>
		)
	}
}

export default ViewHome;
