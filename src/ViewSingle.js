import React from "react";
import CardCourse from "./CardCourse.js";
import CardResource from "./CardResource.js";

class ViewCourse extends React.Component {
    render() {
        var theseProps = {
            handleClick: this.props.handleClick,
            resource: this.props.parentState.userData.courses.find(course => {
                return course.id === this.props.parentState.objectId;
            })
        };

        const resourceCards = theseProps.resource.courseData.relatedCoursesResources.map(
            resource => {
                return (
                    <CardResource
                        resource={resource}
                        handleClick={this.props.handleClick}
                    />
                );
            }
        );

        return (
            <div className="entry-content clear">
                <div className="card-container">
                    <CardCourse {...theseProps} />
                </div>
                <h2>Resources</h2>
                <div className="card-container">{resourceCards}</div>
            </div>
        );
    }
}

export default ViewCourse;
