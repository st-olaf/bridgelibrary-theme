import React from "react";
import Card from "./Card.js";
import CardCourse from "./CardCourse.js";
import CardResource from "./CardResource.js";
import CardLibrarian from "./CardLibrarian.js";
import CardLoan from "./CardLoan.js";
import CardRequest from "./CardRequest.js";
import CardFee from "./CardFee.js";
import LastUpdated from "./LastUpdated.js";
import ButtonShowAll from "./ButtonShowAll.js";
import { BrowserRouter as Link } from "react-router-dom";

class CardContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userData:
                this.props.userData === null
                    ? null
                    : this.props.userData[this.props.type],
            dataType: this.props.type,
            cacheDate:
                this.props.userData === null
                    ? null
                    : this.props.userData[this.props.type + "CacheUpdated"],
            numToShow: 6
        };

        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    handleButtonClick(number) {
        this.setState({
            numToShow: number
        });
    }

    render() {
        var headerContent, footerContent;

        if ("undefined" !== typeof this.props.headerContent) {
            headerContent = this.props.headerContent;
        }

        if ("undefined" !== typeof this.props.footerContent) {
            footerContent = this.props.footerContent;
        }

        if (
            this.state.userData === undefined ||
            null === this.state.userData ||
            0 === this.state.userData.length
        ) {
            if ('userFavorites' === this.props.type) {
                return ''; // Display nothing when a user has no favorites.
            }

            return (
                <div className="bridge-card-container">
                    <h2>{this.props.header}</h2>
                    <p className="bridge-no-results">
                        We didn't find any {this.props.header.toLowerCase()} for your account. Please <a href="https://docs.google.com/forms/d/e/1FAIpQLSe1G0muhWFoVZ_4_AEPzr-ms7Trdk3YWO_cxF62vki9nqP-eQ/viewform?usp=sf_link">submit a feedback form</a> if you think
                        that is an error!
                    </p>
                    {headerContent}
                    {footerContent}
                </div>
            );
        }

        var resources = this.state.userData;
        if (typeof this.state.numToShow === "number") {
            resources = this.state.userData.slice(0, this.state.numToShow);
        }

        var resourceData = [];
        for (var i = 0; i < resources.length; i++) {
            var card = null,
                theseProps = {
                    userId: this.props.userId,
                    userFavorites: this.props.userData.userFavorites,
                    key: resources[i].id,
                    resource: resources[i],
                    handleClick: this.props.handleClick,
                    type: this.props.type,
                };

            switch (this.state.dataType) {
                case "courses":
                    card = <CardCourse {...theseProps} />;
                    break;
                case "resources":
                case "primoFavorites":
                case "userFavorites":
                    card = <CardResource {...theseProps} />;
                    break;
                case "librarians":
                    card = <CardLibrarian {...theseProps} />;
                    break;
                case "loans":
                    card = <CardLoan {...theseProps} />;
                    break;
                case "requests":
                    card = <CardRequest {...theseProps} />;
                    break;
                case "fees":
                    card = <CardFee {...theseProps} />;
                    break;
                default:
                    card = <Card {...theseProps} />;
                    break;
            }

            resourceData.push(card);
        }

        return (
            <div className="bridge-card-container">
                <h2>{this.props.header}</h2>
                <LastUpdated date={this.state.cacheDate} />
                {headerContent}
                <div className="card-container">{resourceData}</div>
                <ButtonShowAll
                    numberOfResources={this.state.userData.length}
                    numToShow={this.state.numToShow}
                    handleButtonClick={this.handleButtonClick}
                />
                {footerContent}
            </div>
        );
    }
}

export default CardContainer;
