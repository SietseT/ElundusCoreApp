import React from "react"

import Card from "react-bootstrap/Card"
import Tooltip from "react-bootstrap/Tooltip"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"

class DownloadVoice extends React.Component {

    renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            A new tab will open in your browser. You can then save the file by right-clicking the sound player and choose "Save as.."
        </Tooltip>
    );

    render() {
        return (
            <OverlayTrigger
                placement="bottom"
                delay={{ show: 100, hide: 200 }}
                overlay={this.renderTooltip}>
                <Card.Link className="mt-2 btn btn-outline-primary btn-block" href={this.props.voiceBlobUrl} download target="_blank">Download</Card.Link>
            </OverlayTrigger>
        );
    }
}

export default DownloadVoice;