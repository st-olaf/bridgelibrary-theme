import React from "react";
import CardContainer from "./CardContainer.js";

class ViewCirculation extends React.Component {
    render() {
        var requestHeaderContent = (
            <p>
                <a
                    className="button carleton"
                    href="https://apps.carleton.edu/campus/library/ill/"
                >
                    Interlibrary Loan
                </a>
                <a
                    className="button stolaf"
                    href="https://ezproxy.stolaf.edu/login?url=https://stolaf.illiad.oclc.org/illiad/illiad.dll"
                >
                    Interlibrary Loan
                </a>
            </p>
        );

        return (
            <div className="entry-content clear">
                <p className="bridge-info">
                    For renewals, request cancellations, and more options,
                    please visit your account page in Catalyst:{" "}
                    <a
                        className="catalyst-link carleton"
                        href="https://bridge.primo.exlibrisgroup.com/discovery/login?vid=01BRC_INST:CCO&lang=en"
                    >
                        My Account
                    </a>
                    <a
                        className="catalyst-link stolaf"
                        href="https://bridge.primo.exlibrisgroup.com/discovery/login?vid=01BRC_INST:SOC&lang=en"
                    >
                        My Account
                    </a>
                </p>

                <CardContainer
                    userData={this.props.parentState.userData.circulationData}
                    type="loans"
                    header="Checkouts"
                    handleClick={this.props.handleClick}
                />
                <CardContainer
                    userData={this.props.parentState.userData.circulationData}
                    type="requests"
                    header="Requests"
                    handleClick={this.props.handleClick}
                    headerContent={requestHeaderContent}
                />

            </div>
        );
    }
}

export default ViewCirculation;
