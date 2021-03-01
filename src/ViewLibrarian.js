import React from "react";
import Meta from "./Meta.js";

class ViewLibrarian extends React.Component {
    // TODO: add photo.

    render() {

        return (
            <div className="entry-content clear">
                {null !== this.props.parentState.currentObject.librarianData.librarianUserId.userData.librarian.picture ?
                    (<img src={this.props.parentState.currentObject.librarianData.librarianUserId.userData.librarian.picture.sourceUrl} alt={this.props.parentState.currentObject.title} />)
                    : (<img src={this.props.parentState.currentObject.librarianData.librarianUserId.userData.pictureUrl} alt={this.props.parentState.currentObject.title} />)}
                <p><a href={this.props.parentState.currentObject.librarianData.librarianUserId.userData.librarian.website}>See Full Profile</a></p>
                <p>{this.props.parentState.currentObject.librarianData.librarianUserId.userData.librarian.officeLocation}</p>
                <p>{this.props.parentState.currentObject.librarianData.librarianUserId.userData.librarian.phoneNumber}</p>
                <p><a href={"mailto:" + this.props.parentState.currentObject.librarianData.librarianUserId.userData.librarian.emailAddress}>{this.props.parentState.currentObject.librarianData.librarianUserId.userData.librarian.emailAddress}</a>
                </p>

            </div>
        );
    }
}

export default ViewLibrarian;
