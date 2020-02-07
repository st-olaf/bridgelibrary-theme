import React, { useState } from "react";
import { render } from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-components";
import App from "./App.js";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { USER_QUERY } from "./Graphql.js";
import Spinner from "./Spinner.js";
import Error from "./Error.js";
import { useQuery } from "@apollo/react-hooks";

const client = new ApolloClient({
    uri: "https://" + process.env.REACT_APP_API_DOMAIN + "/graphql"
});

function DelayedQuery({ currentData, updateKey }) {
    const { loading } = useQuery(USER_QUERY, {
        variables: { email: window.graphqlQuery.variables.email },
        pollInterval: 10000
    });
    if (loading) return <p>Loading ...</p>;
    return null;
}

function AppWrapper() {
    const [key, setKey] = useState(false);
    const { loading, error, data } = useQuery(USER_QUERY, {
        variables: { email: window.graphqlQuery.variables.email }
    });

    if (loading) return <Spinner />;

    var errorMessage = "";
    var queryError = false;

    if (error) {
        return (
            <div id="primary" className="content-area primary">
                <main id="main" className="site-main" role="main">
                    <article
                        itemType="https://schema.org/CreativeWork"
                        itemScope="itemscope"
                        className="page type-page status-publish ast-article-single"
                    >
                        <header className="entry-header ast-no-thumbnail ast-no-meta">
                            <h1 className="entry-title" itemProp="headline">
                                Error
                            </h1>
                        </header>
                        <Error message={error.message} />
                    </article>
                </main>
            </div>
        );
    }

    if (!error && 0 === data.users.edges.length) {
        queryError = true;
        errorMessage = "User not found: " + window.graphqlQuery.variables.email;
    }

    if (
        !error &&
        (data.users.edges[0].node.userData.courses === null ||
            0 === data.users.edges[0].node.userData.courses.length)
    ) {
        queryError = true;
        errorMessage = "You have no courses.";
    }

    return (
        <Router>
            <DelayedQuery
                currentData={data.users.edges[0].node.userData}
                updateKey={setKey}
            />

            <Route
                exact
                path="/"
                render={props => (
                    <App
                        key={key ? 1 : Date.now()}
                        {...props}
                        data={data}
                        view={"home"}
                        error={queryError}
                        errorMessage={errorMessage}
                    />
                )}
            />
            <Route
                exact
                path="/courses/:slug"
                render={props => (
                    <App
                        key={key ? 1 : Date.now()}
                        {...props}
                        view={"courses"}
                        data={data}
                        error={queryError}
                        errorMessage={errorMessage}
                    />
                )}
            />
            <Route
                exact
                path="/courses/:course/resources/:slug"
                render={props => (
                    <App
                        key={key ? 1 : Date.now()}
                        {...props}
                        view={"resources"}
                        data={data}
                        error={queryError}
                        errorMessage={errorMessage}
                    />
                )}
            />
            <Route
                exact
                path="/primo-favorites/:slug"
                render={props => (
                    <App
                        key={key ? 1 : Date.now()}
                        {...props}
                        view={queryError ? "error" : "primoFavorites"}
                        data={data}
                        error={queryError}
                        errorMessage={errorMessage}
                    />
                )}
            />
            <Route
                exact
                path="/librarians/:slug"
                render={props => (
                    <App
                        key={key ? 1 : Date.now()}
                        {...props}
                        view={"librarians"}
                        data={data}
                        error={queryError}
                        errorMessage={errorMessage}
                    />
                )}
            />
            <Route
                exact
                path="/circulation-data/"
                render={props => (
                    <App
                        key={key ? 1 : Date.now()}
                        {...props}
                        view={"circulation"}
                        data={data}
                        error={queryError}
                        errorMessage={errorMessage}
                    />
                )}
            />
            <Route
                exact
                path="/circulation-data/loans/:id"
                render={props => (
                    <App
                        key={key ? 1 : Date.now()}
                        {...props}
                        view={"loans"}
                        data={data}
                        error={queryError}
                        errorMessage={errorMessage}
                    />
                )}
            />
            <Route
                exact
                path="/circulation-data/requests/:id"
                render={props => (
                    <App
                        key={key ? 1 : Date.now()}
                        {...props}
                        view={"requests"}
                        data={data}
                        error={queryError}
                        errorMessage={errorMessage}
                    />
                )}
            />
            <Route
                exact
                path="/circulation-data/fees/:id"
                render={props => (
                    <App
                        key={key ? 1 : Date.now()}
                        {...props}
                        view={"fees"}
                        data={data}
                        error={queryError}
                        errorMessage={errorMessage}
                    />
                )}
            />
            <Route
                exact
                path="/support/"
                render={props => (
                    <App
                        key={key ? 1 : Date.now()}
                        {...props}
                        view={queryError ? "error" : "support"}
                        data={data}
                        error={queryError}
                        errorMessage={errorMessage}
                    />
                )}
            />
        </Router>
    );
}

render(
    <ApolloProvider client={client}>
        <AppWrapper />
    </ApolloProvider>,
    document.getElementById("root")
);
