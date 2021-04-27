import React from "react";
import CardContainer from "./CardContainer.js";

class ViewCirculation extends React.Component {
    render() {
        var requestHeaderContent = (
            <div>
            <h2>Interlibrary Loan</h2>
            <p className="bridge-no-results">We are not currently importing your Interlibrary Loan account information into myLibrary (though
                we plan to do that soon!).  In the meantime, you can view your account information here:{" "}
                <a
                    className="ill-link carleton"
                    href="https://apps.carleton.edu/campus/library/ill/"
                >
                    Interlibrary Loan Requests
                </a>
                <a
                    className="ill-link stolaf"
                    href="https://ezproxy.stolaf.edu/login?url=https://stolaf.illiad.oclc.org/illiad/illiad.dll"
                >
                    Interlibrary Loan Requests
                </a>
            </p>
            </div>
        );

        return (
            <div className="entry-content clear">
                <p className="bridge-info">
                    For renewals, request cancellations, and more options,
                    please visit{" "}
                    <a
                        className="catalyst-link carleton"
                        href="https://bridge.primo.exlibrisgroup.com/discovery/login?vid=01BRC_INST:CCO&lang=en"
                    >
                        your account page in Catalyst
                    </a>
                    <a
                        className="catalyst-link stolaf"
                        href="https://bridge.primo.exlibrisgroup.com/discovery/login?vid=01BRC_INST:SOC&lang=en"
                    >
                        your account page in Catalyst
                    </a>
                </p>

                <CardContainer
                    userData={this.props.parentState.circulationData}
                    type="loans"
                    header="Checkouts"
                    handleClick={this.props.handleClick}
                />
                <CardContainer
                    userData={this.props.parentState.circulationData}
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
