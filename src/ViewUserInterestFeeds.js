import React from "react";
import CardCourse from "./CardCourse.js";
import CardUserInterestFeed from "./CardUserInterestFeed.js";

class ViewUserInterestFeeds extends React.Component {
    render() {
        var theseProps = {
            userInterestFeeds: this.props.parentState.user.userInterestFeeds,
        };

        const userInterestFeedsCards = theseProps.userInterestFeeds.map(
            userInterestFeed => {
                userInterestFeed.title = userInterestFeed.feedName;

                return (
                    <CardUserInterestFeed
                        type='userInterestFeed'
                        resource={userInterestFeed}
                        handleClick={this.props.handleClick}
                    />
                );
            }
        );

        return (
            <div className="entry-content clear">
                <h2>User Interest Feeds</h2>
                <p>Add any of these URLs to your RSS client to be notified about new releases.</p>
                <div className="card-container">{userInterestFeedsCards}</div>
            </div>
        );
    }
}

export default ViewUserInterestFeeds;
