import React from "react";

class Error extends React.Component {
    render() {
        return (
			<div>
				<p>Sorry, we can’t load data for your user account. Either you don’t have an account or something else went wrong.</p>
				<p>Error data:</p>
				<pre>
					<code>
						{this.props.message}
					</code>
				</pre>
			</div>
        )
    }
}

export default Error;
