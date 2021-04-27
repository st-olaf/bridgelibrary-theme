import React from "react";
import Card from "./Card.js";

class CardResource extends Card {
    render() {
        var description = this.props.resource.resourceData.description,
            prefixUrl =
                (this.props.type === "resources"
                    ? "/courses/" + this.props.courseSlug
                    : "") +
                (this.props.type === "primoFavorites"
                    ? "/primo-favorites/"
                    : "/resources/");

        return (
            <Card
                userId={this.props.userId}
                userFavorites={this.props.userFavorites}
                resource={this.props.resource}
                externalUrl={this.props.resource.resourceData.url}
                handleClick={this.props.handleClick}
                type={this.props.type}
                prefixUrl={prefixUrl}
                description={description}
                {...this.props}
            />
        );
    }
}

export default CardResource;
