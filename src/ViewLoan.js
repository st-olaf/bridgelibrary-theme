import React from "react";
import Meta from "./Meta.js";

class ViewLoan extends React.Component {
    formatDate(date) {
        var format = {
            month: "long",
            day: "numeric",
            year: "numeric"
        };
        date = new Date(date);
        return date.toLocaleDateString(undefined, format);
    }

    render() {
        var loan = this.props.parentState.userData.circulationData.loans.find(
            loan => {
                return loan.id === this.props.parentState.currentObject.id;
            }
        );
        var meta = [
            {
                type: "Due Date",
                value: this.formatDate(loan.due_date),
                className: "important"
            },
            {
                type: "Author",
                value: loan.author
            },
            {
                type: "Status",
                value: loan.loan_status
            },
            {
                type: "Loan Date",
                value: this.formatDate(loan.loan_date)
            },
            {
                type: "Circulation Desk",
                value: loan.circ_desk.desc
            },
            {
                type: "Library",
                value: loan.library.desc
            },
            {
                type: "Description",
                value: loan.description
            },
            {
                type: "URL",
                value:
                    "https://bridge.primo.exlibrisgroup.com/discovery/fulldisplay?docid=alma" +
                    loan.mms_id +
                    "&vid=01BRC_INST:CCO"
            }
        ];

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

export default ViewLoan;
