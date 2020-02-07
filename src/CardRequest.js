import React from "react";
import Card from "./Card.js";

class CardRequest extends Card {
    render() {
        const meta = [
            {
                type: "Due Date",
                value: this.props.resource.due_back_date
            }
        ];
        return (
            <Card
                resource={this.props.resource}
                meta={meta}
                prefixUrl="/circulation-data/"
                handleClick={this.props.handleClick}
                type={this.props.type}
            />
        );
    }
}

export default CardRequest;
