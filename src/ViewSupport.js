import React from "react";
import SupportWidget from "./SupportWidget.js";

class ViewSupport extends React.Component {
    render() {
        return (
            <div className="entry-content clear">
                <SupportWidget
                    institution={
                        this.props.parentState.userData.bridgeLibraryInstitution
                    }
                />
            </div>
        );
    }
}

export default ViewSupport;
