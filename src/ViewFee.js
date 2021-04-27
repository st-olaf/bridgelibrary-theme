import React from "react";
import Meta from "./Meta.js";

class ViewFee extends React.Component {
    render() {
        var fee = this.props.parentState.circulationData.fees.find(
                fee => {
                    return (fee.id = this.props.parentState.currentObject.id);
                }
            ),
            meta = [
                {
                    type: "Fee Type",
                    value: fee.type.value
                },
                {
                    type: "Amount",
                    value: fee.original_amount
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

export default ViewFee;
