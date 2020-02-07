import React from "react";
import Meta from "./Meta.js";

class ViewLibrarian extends React.Component {
    // TODO: add phoot.

    render() {
        let librarianData = this.props.parentState.currentObject.librarianData;
        let meta = [];

        if (librarianData) {
            meta = [
                {
                    type: "Academic Departments",
                    value: librarianData.academicDepartment.reduce(
                        (departmentString, department) => {
                            // Handle first value.
                            if ("object" === typeof departmentString) {
                                departmentString = departmentString.name;
                            }

                            return departmentString + ", " + department.name;
                        }
                    )
                }
            ];

            if (
                librarianData.librarianUserId &&
                librarianData.librarianUserId.userData
            ) {
                let userData = librarianData.librarianUserId.userData;

                meta.push(
                    {
                        type: "Email Address",
                        value: userData.librarian.emailAddress
                    },
                    {
                        type: "Phone Number",
                        value: userData.librarian.phoneNumber
                    },
                    {
                        type: "Office Location",
                        value: userData.librarian.officeLocation
                    },
                    {
                        type: "Website",
                        value: userData.librarian.website
                    },
                    {
                        type: "Photo",
                        value: userData.librarian.picture
                    }
                );
            }
        }

        return (
            <div className="entry-content clear">
                <ul>
                    {meta.length > 0 &&
                        meta.map((meta, i) => <Meta key={i} meta={meta} />)}
                </ul>
            </div>
        );
    }
}

export default ViewLibrarian;
