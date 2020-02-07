import React from "react";
import Card from "./Card.js";

class CardLoan extends Card {
    formatDate(date) {
        var format = {
            month: "long",
            day: "numeric",
            year: "numeric"
        };
        date = new Date(date);
        return date.toLocaleDateString(undefined, format);
    }

    render() {
        const meta = [
            {
                type: "Due Date",
                value: this.formatDate(this.props.resource.due_date),
                className: "important"
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

export default CardLoan;
