import React from 'react';
import CardResource from './CardResource.js';
import CardLibrarian from './CardLibrarian.js';
import Meta from './Meta.js';

class ViewCourse extends React.Component {
	render() {
		function formatDate(date) {
			var format = {
					month: 'long',
					day: 'numeric',
					year: 'numeric',
				},
				y = date.substr(0,4),
				m = date.substr(4,2),
				d = date.substr(6,2);
			date = new Date(y,m,d);
			return date.toLocaleDateString(undefined, format);
		}
		function groupResources(resources, resourceTypes, withoutType) {
			resources.forEach((resource) => 
			{ 
				if (resource.resourceData.resourceType.length > 0) {
					var typeName = "";
					resource.resourceData.resourceType.forEach((type) => 
						{
							typeName = type.name;
							if (type.ancestors !== null ) {
								type.ancestors.forEach((ancestor) => {typeName = ancestor.name + ": "  + typeName})
							}
							if (typeof resourceTypes[typeName] === "undefined") {
								resourceTypes[typeName] = [resource]
							} else {
								resourceTypes[typeName].push(resource)
							}
						}
					)
				} else if (resource.resourceData.resourceType.length === 0) {
					withoutType.push(resource)
				}
			});
		}
		var resourcesCheck = false;
		var resourceTypes = {};
		var coreResourceTypes = {};
		var coreResourcesWithoutType = [];
		var relatedResourcesWithoutType = [];
		var course = this.props.parentState.currentObject,
			courseData = this.props.parentState.currentObject.courseData,
			resourceCards = [],
			coreResourceCards = [],
			librarianCards = [],
			meta =[];
		if ('undefined' !== typeof courseData && null !== courseData) {
			meta = [
				{
					type: 'Start Date',
					value: formatDate(courseData.startDate),
				},
				{
					type: 'End Date',
					value: formatDate(courseData.endDate),
				},
				{
					type: 'Academic Department',
					value: courseData.academicDepartment['0'].name,
				},
				{
					type: 'Course Number',
					value: courseData.courseNumber,
				},
				{
					type: 'Description',
					value: courseData.description,
				},
			];

			if (null !== courseData.relatedCoursesResources && courseData.relatedCoursesResources.length > 0) {
				resourcesCheck = true;
				groupResources(courseData.relatedCoursesResources, resourceTypes, relatedResourcesWithoutType);
				resourceCards =  relatedResourcesWithoutType.map((resource) => {
					return <CardResource key={resource.id} courseSlug={course.slug} resource={resource} handleClick={this.props.handleClick} type="resources"/>
				})
			} else {
				resourcesCheck = false;
				resourceCards = []
			}

			if (null !== courseData.coreResources && courseData.coreResources.length > 0) {
				groupResources(courseData.coreResources, coreResourceTypes, coreResourcesWithoutType);
				coreResourceCards = coreResourcesWithoutType.map((resource) => {
					return <CardResource key={resource.id} courseSlug={course.slug} resource={resource} handleClick={this.props.handleClick} type="resources"/>
				})
			} else {
				coreResourceCards = []
			}

			if (this.props.parentState.userData.librarians && this.props.parentState.userData.librarians.length > 0) {
				librarianCards = this.props.parentState.userData.librarians.map((librarian) => {
					var departments = librarian.librarianData.academicDepartment.find((dept) => {
						return dept.name === courseData.academicDepartment[0].name;
					});
					if ('undefined' !== typeof departments) {
						return <CardLibrarian key={librarian.id} resource={librarian} handleClick={this.props.handleClick} type="librarians"/>
					}
					return []
				}).filter((librarian) => {
					return (librarian.length > 0 || Object.keys(librarian).length > 0);
				})
			}
		}

		if (0 === librarianCards.length) {
			librarianCards = []
		}
		function printTypes(types, click) {
			var output = [];
			for (var key in types) {
				output.push(
					<div key={key + "wrapper"}>
						<h3>{key}</h3>
						<div className="card-container">
						{types[key].map((resource) => {
						return <CardResource key={resource.id} courseSlug={course.slug} resource={resource} handleClick={click} type="resources"/>
						})}
						</div>
					</div>
				)
			}
			return output
		}
		return (
			<div className="entry-content clear">


				{(librarianCards.length > 0) ? <h2>Librarians</h2> : <div></div>}
				<div className="card-container">
					{librarianCards}
				</div>
				{(courseData.coreResources.length > 0) ? <h2>Core Resources</h2> : <div></div>}
				{printTypes(coreResourceTypes, this.props.handleClick)}
				<div className="card-container">
					{coreResourceCards}
				</div>
				{(courseData.relatedCoursesResources.length > 0) ? <h2>Related Resources</h2> : <div></div>}

				{printTypes(resourceTypes, this.props.handleClick)}
				{ (!resourcesCheck) ? <div className="card-container">{resourceCards}</div> : 
					<div>
						{(resourceCards.length > 0) ? <h3>Other Resources</h3> : <div></div>}
						<div className="card-container">
							{resourceCards}
						</div>
					</div>
					}
				
			</div>
		)
	}
}

export default ViewCourse;
