import React from "react"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

export default function Footer() {
    return (
        <Row>
            <Col>
                <h3>Need help?</h3>
                <p>
                    Check out this <a href="https://www.reddit.com/r/xqcow/comments/bmjfng/all_brian_tts_characters_from_amazon_polly_used/" target="_blank" rel="noopener noreferrer">reddit post</a> with some examples.
                There's a  <a href="https://gist.github.com/TETYYS/f1aa16b18fb619fc6c0f13ba4f9ae70d" target="_blank" rel="noopener noreferrer">list of characters</a> which explains how Brian pronounces most characters.
                </p>                
            </Col>
        </Row>
    )
}