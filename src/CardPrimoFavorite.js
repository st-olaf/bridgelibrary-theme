import React from "react";
import Card from "./Card.js";

class CardPrimoFavorite extends Card {
    render() {
        return (
            <Card
                resource={this.props.resource}
                handleClick={this.props.handleClick}
            />
        );
    }
}

export default CardPrimoFavorite;
