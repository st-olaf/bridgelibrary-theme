import React from "react";
import CardContainer from "./CardContainer.js";
import Error from "./Error.js";
import SupportWidget from "./SupportWidget.js";

class ViewHome extends React.Component {
    render() {
        if (this.props.error) {
            return <Error message={this.props.errorMessage} />;
        }
        return (
            <div className="entry-content clear">
                <h2>Welcome to myLibrary!</h2>

                <p className="bridge-intro-paragraph">Here you will find all the library content that is specific to
                    you--your library checkouts and requests, resources for your courses, and pinned records you saved
                    in Catalyst.</p>

                <p className="bridge-intro-paragraph">We are currently beta testing the site and encourage you to submit
                    suggestions or problems using the "Feedback" link in the menu at the top of the page.</p>

                <CardContainer
                    userId={this.props.parentState.user.id}
                    userData={this.props.parentState.userData}
                    type="userFavorites"
                    header="Favorite Resources"
                    handleClick={this.props.handleClick}
                />

                <CardContainer
                    userId={this.props.parentState.user.id}
                    userData={this.props.parentState.userData}
                    type="courses"
                    header="Courses"
                    handleClick={this.props.handleClick}
                />

                <CardContainer
                    userId={this.props.parentState.user.id}
                    userData={this.props.parentState.userData}
                    type="primoFavorites"
                    header="Catalyst Favorites"
                    handleClick={this.props.handleClick}
                />
                <SupportWidget
                    institution={
                        this.props.parentState.userData.bridgeLibraryInstitution
                    }
                />
            </div>
        );
    }
}

export default ViewHome;
