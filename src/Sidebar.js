import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Sidebar extends React.Component {
    buildWidgets(course) {
        return (
            <CourseWidget
                key={course.id}
                course={course}
                parentState={this.parentState}
                handleClick={this.handleClick}
            />
        );
    }

    render() {
        if (
            !this.props.error &&
            this.props.parentState.userData.courses !== null
        ) {
            var courseWidgets = this.props.parentState.userData.courses.map(
                    this.buildWidgets,
                    {
                        parentState: this.props.parentState,
                        handleClick: this.props.handleClick
                    }
                ),
                widgets = (
                    <li key="courses-header" className="menu-item">
                        <Link to="/">Courses</Link>
                        <ul className="sub-menu">{courseWidgets}</ul>
                    </li>
                );
        }
        var widgetClass = "menu-item";

        if ("home" === this.props.view) {
            widgetClass += " current-menu-item";
        }

        return (
            <div
                itemType="https://schema.org/WPSideBar"
                itemScope="itemscope"
                id="secondary"
                className="widget-area secondary"
                role="complementary"
            >
                <div className="sidebar-main">
                    <aside className="widget widget_nav_menu">
                        <div className="menu-sidebar-container">
                            <ul id="menu-sidebar" className="menu">
                                <li className={widgetClass}>
                                    <Link to="/">Home</Link>
                                </li>
                                {widgets}
                                {this.props.error ||
                                typeof this.props.parentState.userData
                                    .circulationData === "undefined" ||
                                this.props.parentState.userData.circulationData
                                    .length === 0 ? (
                                    <div></div>
                                ) : (
                                    <CirculationWidget {...this.props} />
                                )}
                            </ul>
                        </div>
                    </aside>
                </div>
            </div>
        );
    }
}

class CourseWidget extends React.Component {
    render() {
        var widgetClass = "menu-item";

        if (
            "undefined" !== typeof this.props.parentState.currentObject &&
            this.props.course.id === this.props.parentState.currentObject.id
        ) {
            widgetClass += " current-menu-item";
        }

        function getCourseTitle(course) {
            var splitCode = course.courseData.courseCode.split("|");
            var courseTitle =
                splitCode[1] + " " + splitCode[2] + ": " + course.title;
            return courseTitle;
        }
        return (
            <li className={widgetClass}>
                <Link
                    to={"/courses/" + this.props.course.slug}
                    onClick={e =>
                        this.props.handleClick(
                            this.props.course.slug,
                            "courses"
                        )
                    }
                    dangerouslySetInnerHTML={{
                        __html: getCourseTitle(this.props.course)
                    }}
                ></Link>
            </li>
        );
    }
}

class CirculationWidget extends React.Component {
    render() {
        var widgetClass = "menu-item";

        if ("circulation" === this.props.parentState.view) {
            widgetClass += " current-menu-item";
        }
        return (
            <li className={widgetClass}>
                <Link
                    to={"/circulation-data/"}
                    onClick={e => this.props.handleClick("", "circulation")}
                >
                    Loans and Requests
                </Link>
            </li>
        );
    }
}

export default Sidebar;
