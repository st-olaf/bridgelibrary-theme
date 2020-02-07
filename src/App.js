import React from "react";
import ViewHome from "./ViewHome.js";
import ViewCourse from "./ViewCourse";
import ViewResource from "./ViewResource";
import ViewLibrarian from "./ViewLibrarian";
import ViewCirculation from "./ViewCirculation";
import ViewLoan from "./ViewLoan";
import ViewRequest from "./ViewRequest";
import ViewFee from "./ViewFee";
import ViewSupport from "./ViewSupport";
import Sidebar from "./Sidebar.js";
import Spinner from "./Spinner.js";
import { GET_COURSES, GET_RESOURCES, GET_LIBRARIANS } from "./FetchData.js";

class App extends React.Component {
    constructor(props) {
        super(props);

        /**
         * Normalize circulation data
         */
        var circulationData = this.props.data.users.edges[0].node.userData
            .circulationData;

        if ("string" === typeof circulationData) {
            circulationData = JSON.parse(circulationData);

            // Convert loan_id to id.
            if (
                typeof circulationData.loans !== "undefined" &&
                circulationData.loans !== null
            ) {
                circulationData.loans = circulationData.loans.map(loan => {
                    loan.id = loan.loan_id;
                    loan.slug = "loans/" + loan.loan_id;
                    return loan;
                });
            }

            this.props.data.users.edges[0].node.userData.circulationData = circulationData;
        }

        this.state = {
            user: this.props.data.users.edges[0].node,
            userData: this.props.data.users.edges[0].node.userData,
            view: this.props.view,
            currentView: this.props.currentView,
            currentObject: this.getCurrentObject(
                this.props.view,
                this.props.data.users.edges[0].node.userData
            ),
            data: this.props.data.users.edges[0].node.userData,
            loading: false,
            error: null,
            fetchedData: {
                courses: this.props.data.users.edges[0].node.userData.courses
                    ? this.props.data.users.edges[0].node.userData.courses.slice(
                          0
                      )
                    : [],
                resources: [
                    this.props.data.users.edges[0].node.userData.courses
                        ? this.allResources()
                        : []
                ],
                librarians: this.props.data.users.edges[0].node.userData
                    .librarians
                    ? this.props.data.users.edges[0].node.userData.librarians.slice(
                          0
                      )
                    : []
            }
        };

        this.handleClick = this.handleClick.bind(this);
        this.getObjectId = this.getObjectId.bind(this);
        this.getCurrentObject = this.getCurrentObject.bind(this);
        this.getObjectTitle = this.getObjectTitle.bind(this);
        this.fetchData = this.fetchData.bind(this);
        this.getUrlSlug = this.getUrlSlug.bind(this);
        this.handleHistory = this.handleHistory.bind(this);
        this.allResources = this.allResources.bind(this);

        window.onpopstate = this.handleHistory;
    }

    allResources() {
        var courseResources = [];
        this.props.data.users.edges[0].node.userData.courses.forEach(course => {
            if (null !== course.courseData.relatedCoursesResources) {
                course.courseData.relatedCoursesResources.forEach(resource =>
                    courseResources.push(resource)
                );
            }
        });
        return courseResources;
    }

    handleHistory() {
        var slugInfo = this.getUrlSlug();
        this.handleClick(slugInfo.slug, slugInfo.type);
    }

    getObjectId(id, data) {
        if (id === "undefined") {
            return id;
        }

        const url = window.location.href.split("/");
        const slug = url.pop() || url.pop();

        var courseID = data.userData.courses.find(course => {
            return course.slug === slug;
        });
        return courseID.id;
    }

    getUrlSlug() {
        var path = window.location.pathname;
        var urlPath = path.split("/");
        var slug = urlPath.pop() || urlPath.pop();
        var type = urlPath.pop();
        return {
            slug: slug,
            type: type
        };
    }

    fetchData() {
        var slugdata = this.getUrlSlug();
        var fetchQuery;
        switch (slugdata.type) {
            case "courses":
                fetchQuery = GET_COURSES;
                break;
            case "resources":
                fetchQuery = GET_RESOURCES;
                break;
            case "librarians":
                fetchQuery = GET_LIBRARIANS;
                break;
            default:
                fetchQuery = "";
        }
        this.setState({ loading: true, error: null });

        console.log('fetchData called');

        let response = fetch(
            "https://" + process.env.REACT_APP_API_DOMAIN + "/graphql",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    query: fetchQuery,
                    variables: {
                        slug: slugdata.slug
                    }
                })
            }
        ).then(response => response.json());

        response.then(responseAsJson => {
            if (responseAsJson.errors) {
                this.setState({
                    loading: false,
                    error: responseAsJson.errors[0],
                    data: responseAsJson.data
                });
                return;
            }

            var mergedData = this.state.fetchedData;
            switch (slugdata.type) {
                case "courses":
                    var newCourse = {};
                    if (responseAsJson.data.courses.edges.length === 0) {
                        newCourse = { title: "Course Not Found" };
                    } else {
                        newCourse = responseAsJson.data.courses.edges[0].node;
                    }
                    mergedData.courses.push(newCourse);
                    this.setState({
                        loading: false,
                        error: null,
                        data: responseAsJson.data,
                        currentObject: newCourse,
                        fetchedData: mergedData
                    });
                    break;

                case "resources":
                    var newResource = {};
                    if (responseAsJson.data.resources.edges.length === 0) {
                        newResource = { title: "Resource Not Found" };
                    } else {
                        newResource =
                            responseAsJson.data.resources.edges[0].node;
                    }
                    mergedData.resources.push(newResource);
                    this.setState({
                        loading: false,
                        error: null,
                        data: responseAsJson.data,
                        currentObject: newResource,
                        fetchedData: mergedData
                    });
                    break;

                case "librarians":
                    var newLibrarian = {};
                    if (responseAsJson.data.librarians.edges.length === 0) {
                        newLibrarian = { title: "Librarian Not Found" };
                    } else {
                        newLibrarian =
                            responseAsJson.data.librarians.edges[0].node;
                    }
                    mergedData.librarians.push(newLibrarian);
                    this.setState({
                        loading: false,
                        error: null,
                        data: responseAsJson.data,
                        currentObject: newLibrarian,
                        fetchedData: mergedData
                    });
                    break;

                default:
                    fetchQuery = "";
            }
        });
    }

    getCurrentObject(type, data = [], urlSlug = "") {
        if (0 === data.length && !this.props.error) {
            data = this.state.userData;
        }

        var url = window.location.href.split("/");

        if (0 === urlSlug.length) {
            urlSlug = url.pop() || url.pop();
        }

        // Handle resources nested under courses.
        if ("resources" === type) {
            var courseSlug = url[4];
        }

        switch (type) {
            case "courses":
                var fetchedStateCourse;
                if ("undefined" !== typeof this.state) {
                    data = this.state.fetchedData;
                }
                if (data.courses) {
                    fetchedStateCourse = data.courses.find(course => {
                        return course.slug === urlSlug;
                    });
                }

                if (typeof fetchedStateCourse !== "undefined") {
                    return fetchedStateCourse;
                }
                return {
                    status: 404,
                    title: "Course Not Found"
                };

            case "resources":
                var fetchedCourse;
                if ("undefined" !== typeof this.state) {
                    data = this.state.fetchedData;
                }
                if (data.courses) {
                    fetchedStateCourse = data.courses.find(course => {
                        return course.slug === urlSlug;
                    });
                }
                if (typeof fetchedCourse !== "undefined") {
                    var coreResource =
                        null !== fetchedCourse.courseData.coreResources &&
                        fetchedCourse.courseData.coreResources.find(
                            resource => {
                                return resource.slug === urlSlug;
                            }
                        );
                    var relatedCoursesResource =
                        null !==
                            fetchedCourse.courseData.relatedCoursesResources &&
                        fetchedCourse.courseData.relatedCoursesResources.find(
                            resource => {
                                return resource.slug === urlSlug;
                            }
                        );
                    if (
                        "undefined" !== typeof coreResource &&
                        false !== coreResource
                    ) {
                        return coreResource;
                    }
                    if (
                        "undefined" !== typeof relatedCoursesResource &&
                        false !== relatedCoursesResource
                    ) {
                        return relatedCoursesResource;
                    }
                }
                return {
                    status: 404,
                    title: "Resource Not Found"
                };

            case "primoFavorites":
                return data.primoFavorites.find(favorite => {
                    return favorite.slug === urlSlug;
                });

            case "librarians":
                var fetchedStateLibrarian;
                if ("undefined" !== typeof this.state) {
                    data = this.state.fetchedData;
                }
                if (data.librarians) {
                    fetchedStateLibrarian = data.librarians.find(librarian => {
                        return librarian.slug === urlSlug;
                    });
                }
                if (typeof fetchedStateLibrarian !== "undefined") {
                    return fetchedStateLibrarian;
                }
                return {
                    status: 404,
                    title: "Librarian Not Found"
                };

            case "circulation":
                return {
                    title: ""
                };

            case "loans":
                return data.circulationData.loans.find(loan => {
                    return loan.id === urlSlug;
                });

            case "requests":
                return data.circulationData.requests.find(request => {
                    return request.id === urlSlug;
                });

            case "fees":
                return data.circulationData.fees.find(fee => {
                    return fee.id === urlSlug;
                });
            case "support":
                return {
                    title: "Support"
                };
            case "error":
                return {
                    title: "Error"
                };
            case "home":
            default:
                return {
                    title: "Home"
                };
        }
    }

    getObjectTitle(object) {
        switch (this.state.view) {
            case "courses":
                if (
                    object !== null &&
                    "undefined" !== typeof object.courseData
                ) {
                    var splitCode = object.courseData.courseCode.split("|");
                    var courseTitle =
                        splitCode[1] + " " + splitCode[2] + ": " + object.title;
                    return courseTitle;
                } else {
                    return object.title;
                }
            default:
                return object.title;
        }
    }

    /**
     * Handle navigation.
     *
     * @param {string} id GraphQL object ID.
     */
    handleClick(slug = "", type = "home") {
        this.setState({
            view: type,
            currentObject: this.getCurrentObject(type, [], slug)
        });
    }

    componentDidMount() {
        if (
            typeof this.state.currentObject === "undefined" ||
            null === this.state.data ||
            404 === this.state.currentObject.status
        ) {
            this.fetchData();
        }
    }

    render() {
        if (this.state.loading) {
            return <Spinner />;
        }
        var currentView;

        if ("home" === this.state.view) {
            currentView = (
                <ViewHome
                    parentState={this.state}
                    handleClick={this.handleClick}
                    error={this.props.error}
                    errorMessage={this.props.errorMessage}
                />
            );
        } else if ("courses" === this.state.view) {
            currentView = (
                <ViewCourse
                    parentState={this.state}
                    handleClick={this.handleClick}
                />
            );
        } else if ("librarians" === this.state.view) {
            currentView = (
                <ViewLibrarian
                    parentState={this.state}
                    handleClick={this.handleClick}
                />
            );
        } else if (
            "resources" === this.state.view ||
            "primoFavorites" === this.state.view
        ) {
            currentView = (
                <ViewResource
                    parentState={this.state}
                    handleClick={this.handleClick}
                />
            );
        } else if ("circulation" === this.state.view) {
            currentView = (
                <ViewCirculation
                    parentState={this.state}
                    handleClick={this.handleClick}
                />
            );
        } else if ("loans" === this.state.view) {
            currentView = (
                <ViewLoan
                    parentState={this.state}
                    handleClick={this.handleClick}
                />
            );
        } else if ("requests" === this.state.view) {
            currentView = (
                <ViewRequest
                    parentState={this.state}
                    handleClick={this.handleClick}
                />
            );
        } else if ("fees" === this.state.view) {
            currentView = (
                <ViewFee
                    parentState={this.state}
                    handleClick={this.handleClick}
                />
            );
        } else if ("support" === this.state.view) {
            currentView = (
                <ViewSupport
                    parentState={this.state}
                    handleClick={this.handleClick}
                />
            );
        }

        return (
            <>
                <Sidebar
                    view={this.state.view}
                    parentState={this.state}
                    handleClick={this.handleClick}
                    error={this.props.error}
                />

                <div id="primary" className="content-area primary">
                    <main id="main" className="site-main" role="main">
                        <article
                            itemType="https://schema.org/CreativeWork"
                            itemScope="itemscope"
                            className="page type-page status-publish ast-article-single"
                        >
                            <header className="entry-header ast-no-thumbnail ast-no-meta">
                                <h1
                                    className="entry-title"
                                    itemProp="headline"
                                    dangerouslySetInnerHTML={{
                                        __html: this.getObjectTitle(
                                            this.state.currentObject
                                        )
                                    }}
                                />
                            </header>

                            {currentView}
                        </article>
                    </main>
                </div>
            </>
        );
    }
}

export default App;
