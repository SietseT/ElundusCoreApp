import React from "react"
import FileSaver from 'file-saver'

import Card from "react-bootstrap/Card"

class DownloadVoice extends React.Component {

    constructor() {
        super();

        this.handleDownload = this.handleDownload.bind(this);
    }

    async handleDownload(event) {
        event.preventDefault();

        FileSaver.saveAs(this.props.voiceBlobUrl, "speech.oga");
    }

    render() {
        return (
            <Card.Link href="#" onClick={this.handleDownload}>Download</Card.Link>
        )
    }
}

export default DownloadVoice;