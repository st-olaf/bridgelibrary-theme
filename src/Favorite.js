import React from "react";
import { ADD_USER_FAVORITE, REMOVE_USER_FAVORITE } from "./Graphql.js";
import { useMutation } from "@apollo/client";

function Favorite(props) {

    const [addFavorite] = useMutation(ADD_USER_FAVORITE);
    const [removeFavorite] = useMutation(REMOVE_USER_FAVORITE);

    return (
        <div
            className="favorite"
        >
            <div
                title="Mark as Favorite"
                onClick={e => {
                    e.preventDefault();
                    var result;

                    if (props.isFavorite) {
                        result = removeFavorite({
                            variables: {
                                userId: props.userId,
                                favoriteId: props.resourceId,
                            },
                        });

                        result.then((message) => {
                            props.updateFavorites(message.data.removeUserFavorite.favorites);
                        });

                    } else {
                        result = addFavorite({
                            variables: {
                                userId: props.userId,
                                favoriteId: props.resourceId,
                            },
                        });

                        result.then((message) => {
                            props.updateFavorites(message.data.addUserFavorite.favorites);
                        });

                    }
                }}
            >
                <div className="dashicons dashicons-heart"></div>
            </div>
        </div>
    );
}

export default Favorite;
