import React from "react"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import TextToSpeechForm from "./form"
import SoundPlayer from "./soundplayer"
import Error from "./error"

class TextToSpeech extends React.Component {

    render() {

        return (
            <Row>
                <Col lg={8}>
                    <TextToSpeechForm  />
                </Col>
                <Col lg={4} className="mt-3 mt-sm-0 mt-md-3">
                    <Error />
                    <SoundPlayer />
                </Col>
            </Row>
        )
    }
}

export default TextToSpeech;