import React from "react";
import Meta from "./Meta.js";
import Favorite from "./Favorite.js";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Card extends React.Component {
    constructor (props) {
        super(props);

        var isFavorite;
        if ('undefined' === typeof props.userFavorites) {
            isFavorite = false;
        } else {
            isFavorite = this.isFavorite(props.userFavorites);
        }

        this.state = {
            isFavorite,
        };

        this.updateFavorites = this.updateFavorites.bind(this);
    }

    updateFavorites(favoriteIds) {
        this.setState({
            isFavorite: this.isFavorite(favoriteIds),
        });
    }

    /**
     * Determine if this object is favorited.
     *
     * @param {Array} favoriteIds Array of object IDs.
     * @returns {Boolean}
     */
    isFavorite(favoriteIds) {
        if (null === favoriteIds) {
            return false;
        }

        return favoriteIds.filter(object => {
            if ('string' === typeof object) {
                return object === this.props.resource.id;
            } else {
                return object.id === this.props.resource.id;
            }
        }).length > 0;
    }

    render() {
        function resourceCheck(props) {
            if (props.type === "resources" || props.type === "primoFavorites") {
                return (
                    <a
                        href={props.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        dangerouslySetInnerHTML={{
                            __html: props.resource.title
                        }}
                    />
                );
            } else if (props.type === 'userInterestFeed') {
                return props.resource.title;
            } else {
                return (
                    <Link
                        to={props.prefixUrl + props.resource.slug}
                        onClick={e =>
                            props.handleClick(props.resource.slug, props.type)
                        }
                        dangerouslySetInnerHTML={{
                            __html: props.resource.title
                        }}
                    />
                );
            }
        }

        var classes = [
            "card",
            this.props.type.replace(/s$/, "")
        ];

        if (this.state.isFavorite) {
            classes.push("favorited");
        } else {
            if (classes.indexOf("favorited") > -1) {
                classes.splice(classes.indexOf("favorited"), 1);
            }
        }

        return (
            <div className={classes.join(" ")}>
                {
                    this.props.type !== 'courses' &&
                    this.props.type !== 'librarians' &&
                    this.props.type !== 'userInterestFeed' &&
                    <Favorite
                        userId={this.props.userId}
                        resourceId={this.props.resource.id}
                        isFavorite={this.state.isFavorite}
                        updateFavorites={this.updateFavorites}
                    />
                }

                {this.props.resource.title && (
                    <h3 className="title">{resourceCheck(this.props)}</h3>
                )}

                {this.props.type === "resources" || this.props.type === "primoFavorites" || this.props.type === "userInterestFeed" ? (
                    <div></div>
                ) : (
                    this.props.meta && (
                        <ul className="meta">
                            {this.props.meta.map((meta, i) => (
                                <Meta key={i} meta={meta} />
                            ))}
                        </ul>
                    )
                )}
                {this.props.description && (
                    <p className="description">{this.props.description}</p>
                )}
                {this.props.extraContent && (
                    <div className="extraContent">{this.props.extraContent}</div>
                )}
            </div>
        );
    }
}

export default Card;
