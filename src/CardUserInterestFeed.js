import React from "react";
import Card from "./Card.js";

class CardUserInterestFeed extends Card {
    render() {
        const meta = [
            {
                type: "Feed URL",
                value: this.props.resource.subscribeUrl,
            }
        ];

        return (
            <Card
                resource={this.props.resource}
                externalUrl={this.props.resource.subscribeUrl}
                meta={meta}
                extraContent={
                    <div>
                        <h4>Recent Items</h4>
                        {this.props.resource.recentItems.map(item => {
                            return <div>
                                <h5><a href={item.link} target="_blank" rel="nofollow">{item.title}</a></h5>
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
