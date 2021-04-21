import React from "react";
import Card from "./Card.js";

class CardUserInterestFeed extends Card {
    render() {
        const meta = [];

        return (
            <Card
                resource={this.props.resource}
                meta={meta}
                extraContent={
                    <div>
                        <p className="contains-button">
                            <a href={this.props.resource.subscribeUrl} className="button">
                                <span class="dashicons dashicons-rss"></span>
                                View Feed
                            </a>
                        </p>
                        <h4>Recent Items</h4>
                        {this.props.resource.recentItems.map(item => {
                            return <div>
                                <h5><a href={item.link} target="_blank" rel="noopener noreferrer">{item.title}</a></h5>
                                <p>{item.description}</p>
                            </div>
                        })}
                    </div>
                }
                type={this.props.type}
            />
        );
    }
}

export default CardUserInterestFeed;
