import React from "react"
import { connect } from "react-redux"
//import loadable from '@loadable/component'

import Card from "react-bootstrap/Card"

import PlyrComponent from "../plyrcomponent"

import DownloadVoice from "./downloadvoice"
//import ShareVoice from "./sharevoice"

//const PlyrComponent = loadable(() => import("../plyrcomponent"))

class SoundPlayer extends React.Component {
    render() {
        if (this.props.voiceBlobUrl === '') {
            return null;
        }

        let sources = {
            type: 'audio',
            sources: [
                {
                    src: this.props.voiceBlobUrl,
                    type: 'audio/mpeg',
                }
            ],
        }

        let options = {
            controls: ['play', 'progress', 'duration'],
            blankVideo: ''
        };

        return (
            <Card>
                <Card.Header>Result</Card.Header>
                <Card.Body>
                    <PlyrComponent sources={sources} options={options} />
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
