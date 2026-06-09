import React from "react"

import Card from "react-bootstrap/Card"
import Tooltip from "react-bootstrap/Tooltip"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"

function DownloadVoice(props) {
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            A new tab will open in your browser. You can then save the file by right-clicking the soundplayer and choose "Save as.."
        </Tooltip>
    );

    return (
        <OverlayTrigger
            placement="bottom"
            delay={{ show: 100, hide: 200 }}
            overlay={renderTooltip}>
            <Card.Link className="mt-2 btn btn-outline-primary btn-block" href={props.voiceBlobUrl} download rel="noreferrer" target="_blank">Download</Card.Link>
        </OverlayTrigger>
    );
}

export default DownloadVoice;