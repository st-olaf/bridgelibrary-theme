import React from "react";

class ButtonShowAll extends React.Component {
    render() {
        if (
            typeof this.props.numToShow === "number" &&
            this.props.numberOfResources < this.props.numToShow
        ) {
            return false;
        }
        return (
            <div>
                {this.props.numToShow === "all" && (
                    <button onClick={e => this.props.handleButtonClick(6)}>
                        Collapse
                    </button>
                )}
                {this.props.numToShow <= 6 && (
                    <button onClick={e => this.props.handleButtonClick("all")}>
                        Expand
                    </button>
                )}
            </div>
        );
    }
}

export default ButtonShowAll;
