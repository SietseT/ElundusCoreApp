import React from "react"
import { connect } from "react-redux"

import Alert from "react-bootstrap/Alert"

class Error extends React.Component {

    render() {
        if(this.props.error == null) {
            return null;
        }

        let errorTitle = this.props.error.error;
        let message = '';

        if(this.props.error.details != null) {
            message = this.props.error.details[0].message;
        } else {
            message = this.props.error.message;
        }

        message = {__html: message};

        return (
            <Alert variant="danger">
                <Alert.Heading>{errorTitle}</Alert.Heading>
                <p dangerouslySetInnerHTML={message} />
            </Alert>
        )
    }
}

export default connect((state, props) => {
    return {
        error: state.error
    };
})(Error);