import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ApolloProvider } from "@apollo/client";
import App from "./App.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { USER_QUERY } from "./Graphql.js";
import Spinner from "./Spinner.js";
import Error from "./Error.js";
import { useQuery } from "@apollo/client";

const httpLink = createHttpLink({
    uri: "https://" + process.env.REACT_APP_API_DOMAIN + "/graphql",
});

const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            'Authorization': 'Bearer '+window.graphqlQuery.variables.token,
        }
    }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

function DelayedQuery({ currentData, updateKey }) {
    const { loading } = useQuery(USER_QUERY, {
        variables: {
            email: window.graphqlQuery.variables.email,
        },
        pollInterval: 10000
    });
    if (loading) return <p>Loading ...</p>;
    return null;
}

function AppWrapper() {
    const [key, setKey] = useState(false);
    const { loading, error, data } = useQuery(USER_QUERY, {
        variables: {
            email: window.graphqlQuery.variables.email,
        }
    });

    if (loading) return <Spinner />;

    var errorMessage = '',
    	queryError = false;

	if (error) {
		queryError = true;
		errorMessage = error.message;
	} else if (0 === data.users.nodes.length) {
        queryError = true;
        errorMessage = "User not found: " + window.graphqlQuery.variables.email;
    } else if (data.users.nodes[0].userData.courses === null || 0 === data.users.nodes[0].userData.courses.length) {
        queryError = true;
        errorMessage = "You have no courses.";
	}

    if (error || queryError) {
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
                        <Error message={errorMessage} />
                    </article>
                </main>
            </div>
        );
    }

    return (
        <Router>
            <DelayedQuery
                currentData={data.users.nodes[0].userData}
                updateKey={setKey}
            />

            <Routes>

                <Route
                    exact
                    path="/"
                    element={
                        <App
                            key={key ? 1 : Date.now()}
                            // {...props}
                            data={data}
                            view={"home"}
                            error={queryError}
                            errorMessage={errorMessage}
                        />
                    }
                />
                <Route
                    exact
                    path="/courses/:slug"
                    element={
                        <App
                            key={key ? 1 : Date.now()}
                            // {...props}
                            view={"courses"}
                            data={data}
                            error={queryError}
                            errorMessage={errorMessage}
                        />
                    }
                />
                <Route
                    exact
                    path="/courses/:course/resources/:slug"
                    element={
                        <App
                            key={key ? 1 : Date.now()}
                            // {...props}
                            view={"resources"}
                            data={data}
                            error={queryError}
                            errorMessage={errorMessage}
                        />
                    }
                />
                <Route
                    exact
                    path="/primo-favorites/:slug"
                    element={
                        <App
                            key={key ? 1 : Date.now()}
                            // {...props}
                            view={queryError ? "error" : "primoFavorites"}
                            data={data}
                            error={queryError}
                            errorMessage={errorMessage}
                        />
                    }
                />
                <Route
                    exact
                    path="/librarians/:slug"
                    element={
                        <App
                            key={key ? 1 : Date.now()}
                            // {...props}
                            view={"librarians"}
                            data={data}
                            error={queryError}
                            errorMessage={errorMessage}
                        />
                    }
                />
                <Route
                    exact
                    path="/circulation-data/"
                    element={
                        <App
                            key={key ? 1 : Date.now()}
                            // {...props}
                            view={"circulation"}
                            data={data}
                            error={queryError}
                            errorMessage={errorMessage}
                        />
                    }
                />
                <Route
                    exact
                    path="/circulation-data/loans/:id"
                    element={
                        <App
                            key={key ? 1 : Date.now()}
                            // {...props}
                            view={"loans"}
                            data={data}
                            error={queryError}
                            errorMessage={errorMessage}
                        />
                    }
                />
                <Route
                    exact
                    path="/circulation-data/requests/:id"
                    element={
                        <App
                            key={key ? 1 : Date.now()}
                            // {...props}
                            view={"requests"}
                            data={data}
                            error={queryError}
                            errorMessage={errorMessage}
                        />
                    }
                />
                <Route
                    exact
                    path="/circulation-data/fees/:id"
                    element={
                        <App
                            key={key ? 1 : Date.now()}
                            // {...props}
                            view={"fees"}
                            data={data}
                            error={queryError}
                            errorMessage={errorMessage}
                        />
                    }
                />
                <Route
                    exact
                    path="/support/"
                    element={
                        <App
                            key={key ? 1 : Date.now()}
                            // {...props}
                            view={queryError ? "error" : "support"}
                            data={data}
                            error={queryError}
                            errorMessage={errorMessage}
                        />
                    }
                />
                <Route
                    exact
                    path="/user-interest-feeds/"
                    element={
                        <App
                            key={key ? 1 : Date.now()}
                            // {...props}
                            view={"user-interest-feeds"}
                            data={data}
                            error={queryError}
                            errorMessage={errorMessage}
                        />
                    }
                />
            </Routes>
        </Router>
    );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <ApolloProvider client={client}>
        <AppWrapper />
    </ApolloProvider>
);
