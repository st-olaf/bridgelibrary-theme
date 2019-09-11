import React from 'react';
import Meta from './Meta.js';

class ViewLibrarian extends React.Component {
	// TODO: add phoot.
	render() {
		var librarianData = this.props.parentState.currentObject.librarianData,
			meta = []
			if ('undefined' !== typeof librarianData && null !== librarianData) {
				meta = [
					{
						type: 'Academic Departments',
						value: librarianData.academicDepartment.reduce((departmentString, department) => {
							// Handle first value.
							if ('object' === typeof departmentString) {
								departmentString = departmentString.name;
							}

							return departmentString + ', ' + department.name;
						})
					},
				];

			if (null !== librarianData.librarianUserId && 'undefined' !== typeof librarianData.librarianUserId.userData && null !== librarianData.librarianUserId.userData) {
				meta.push(
					{
						type: 'Email Address',
						value: librarianData.librarianUserId.userData.librarian.emailAddress,
					},
					{
						type: 'Phone Number',
						value: librarianData.librarianUserId.userData.librarian.phoneNumber,
					},
					{
						type: 'Office Location',
						value: librarianData.librarianUserId.userData.librarian.officeLocation,
					},
					{
						type: 'Website',
						value: librarianData.librarianUserId.userData.librarian.website,
					},
					{
						type: 'Photo',
						value: librarianData.librarianUserId.userData.librarian.picture,
					},
				)
			}
		}

		return (
			<div className="entry-content clear">
				<ul>
					{meta.length > 0 && meta.map((meta, i) => <Meta key={i} meta={meta} />)}
				</ul>
			</div>
		)
	}
}

export default ViewLibrarian;
