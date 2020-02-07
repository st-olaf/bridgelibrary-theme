import React from "react";

class Spinner extends React.Component {
    render() {
        return (
            <div className="spinner-container">
                <div className="spinner">
                    <span className="spinner-inner-1"></span>
                    <span className="spinner-inner-2"></span>
                    <span className="spinner-inner-3"></span>
                </div>
            </div>
        );
    }
}

export default Spinner;
