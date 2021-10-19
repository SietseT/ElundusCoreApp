import React from "react"
import { connect } from "react-redux"

import Card from "react-bootstrap/Card"

import Audioplayer from './audioplayer';

import DownloadVoice from "./downloadvoice"

class SoundPlayer extends React.Component {
    render() {
        if (this.props.voiceBlobUrl === '') {
            return null;
        }

        return (
            <Card>
                <Card.Header>Result</Card.Header>
                <Card.Body>
                <Audioplayer src={this.props.voiceBlobUrl} />
                    {/* <ShareVoice /> */}
                    <DownloadVoice voiceBlobUrl={this.props.voiceBlobUrl} />
                </Card.Body>
            </Card>
        )
    }
}

export default connect((state, props) => {
    return {
        voiceBlobUrl: state.voiceBlobUrl,
        voiceBlob: state.voiceBlob,
    };
})(SoundPlayer);
