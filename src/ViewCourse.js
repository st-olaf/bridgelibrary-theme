import React from "react";
import CardResource from "./CardResource.js";
import CardLibrarian from "./CardLibrarian.js";
import Meta from "./Meta.js";

function formatDate(date) {
    var format = {
            month: "long",
            day: "numeric",
            year: "numeric"
        },
        y = date.substr(0, 4),
        m = date.substr(4, 2),
        d = date.substr(6, 2);
    date = new Date(y, m, d);
    return date.toLocaleDateString(undefined, format);
}

function groupResources(resources, resourceTypes, withoutType) {
    resources.forEach(resource => {
        if (null !== resource.resourceData.resourceType && resource.resourceData.resourceType.length > 0) {
            var typeName = "";
            resource.resourceData.resourceType.forEach(type => {
                typeName = type.name;
                if (type.ancestors !== null) {
                    type.ancestors.forEach(ancestor => {
                        typeName = ancestor.name + ": " + typeName;
                    });
                }
                if (typeof resourceTypes[typeName] === "undefined") {
                    resourceTypes[typeName] = [resource];
                } else {
                    resourceTypes[typeName].push(resource);
                }
            });
        } else {
            withoutType.push(resource);
        }
    });
}

class ViewCourse extends React.Component {
    render() {


        var resourcesCheck = false;
        var resourceTypes = {};
        var coreResourceTypes = {};
        var coreResourcesWithoutType = [];
        var relatedResourcesWithoutType = [];
        var course = this.props.parentState.currentObject,
            courseData = this.props.parentState.currentObject.courseData,
            resourceCards = [],
            coreResourceCards = [],
            librarians = [],
            librarianCards = [],
            meta = [];

        if ("undefined" !== typeof courseData && null !== courseData) {
            meta = [
                {
                    type: "Start Date",
                    value: formatDate(courseData.startDate)
                },
                {
                    type: "End Date",
                    value: formatDate(courseData.endDate)
                },
                {
                    type: "Academic Department",
                    value: courseData.academicDepartment["0"].name
                },
                {
                    type: "Course Number",
                    value: courseData.courseNumber
                },
                {
                    type: "Description",
                    value: courseData.description
                }
            ];

            if (
                null !== courseData.relatedCoursesResources &&
                courseData.relatedCoursesResources.length > 0
            ) {
                resourcesCheck = true;
                groupResources(
                    courseData.relatedCoursesResources,
                    resourceTypes,
                    relatedResourcesWithoutType
                );
                resourceCards = relatedResourcesWithoutType.map(resource => {
                    return (
                        <CardResource
                            key={resource.id}
                            courseSlug={course.slug}
                            resource={resource}
                            userId={this.props.parentState.user.id}
                            userFavorites={this.props.parentState.userData.userFavorites}
                            handleClick={this.props.handleClick}
                            type="resources"
                        />
                    );
                });
            } else {
                resourcesCheck = false;
                resourceCards = [];
            }

            if (
                null !== courseData.coreResources &&
                courseData.coreResources.length > 0
            ) {
                groupResources(
                    courseData.coreResources,
                    coreResourceTypes,
                    coreResourcesWithoutType
                );
                coreResourceCards = coreResourcesWithoutType.map(resource => {
                    return (
                        <CardResource
                            key={resource.id}
                            courseSlug={course.slug}
                            resource={resource}
                            userId={this.props.parentState.user.id}
                            userFavorites={this.props.parentState.userData.userFavorites}
                            handleClick={this.props.handleClick}
                            type="resources"
                        />
                    );
                });
            } else {
                coreResourceCards = [];
            }

            if (courseData.librarians && courseData.librarians.length > 0) {
                librarians = courseData.librarians;
            } else if (
                this.props.parentState.userData.librarians &&
                this.props.parentState.userData.librarians.length > 0
            ) {
                librarians = this.props.parentState.userData.librarians.filter(librarian => {
                    console.log({
                        name: librarian.title,
                        courseDepartment: courseData.academicDepartment[0].name,
                    });

                    var departments = librarian.librarianData.academicDepartment.filter(dept => {
                        return dept.name === courseData.academicDepartment[0].name;
                    });

                    return departments.length > 0;
                });
            }

            librarianCards = librarians.map(librarian => {
                return (
                    <CardLibrarian
                        key={librarian.id}
                        resource={librarian}
                        userId={this.props.parentState.user.id}
                        userFavorites={this.props.parentState.userData.userFavorites}
                        handleClick={this.props.handleClick}
                        type="librarians"
                    />
                );
            });
        }

        if (0 === librarianCards.length) {
            librarianCards = [];
        }

        console.log(this.props);

        return (
            <div className="entry-content clear">
                {librarianCards.length > 0 ? <h2>Librarians</h2> : <div></div>}
                <div className="card-container">{librarianCards}</div>

                {printTypes(coreResourceTypes, this.props.handleClick, course, this.props.parentState.user.id, this.props.parentState.userData.userFavorites)}

                <div className="card-container">{coreResourceCards}</div>

                {printTypes(resourceTypes, this.props.handleClick, course, this.props.parentState.user.id, this.props.parentState.userData.userFavorites)}

                {!resourcesCheck ? (
                    <div className="card-container">{resourceCards}</div>
                ) : (
                    <div>
                        {resourceCards.length > 0 ? (
                            <h3>Other Resources</h3>
                        ) : (
                            <div></div>
                        )}
                        <div className="card-container">{resourceCards}</div>
                    </div>
                )}
            </div>
        );
    }
}

function printTypes(types, click, course, userId, userFavorites) {
    return Object.keys(types).map(key => (
        <div key={key + "wrapper"}>
            <h3 dangerouslySetInnerHTML={{ __html: key }}></h3>

            <div className="card-container">
                {types[key].map(resource => {
                    return (
                        <CardResource
                            key={resource.id}
                            courseSlug={course.slug}
                            resource={resource}
                            userId={userId}
                            userFavorites={userFavorites}
                            handleClick={click}
                            type="resources"
                        />
                    );
                })}
            </div>
        </div>
    ));
}

export default ViewCourse;
