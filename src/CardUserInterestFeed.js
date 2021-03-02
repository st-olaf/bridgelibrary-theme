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
                type={this.props.type}
            />
        );
    }
}

export default CardUserInterestFeed;
