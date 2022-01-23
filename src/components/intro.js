import React from "react"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Image from "react-bootstrap/Image"

import DarkModeToggle from "./darkmodetoggle"

import monkaW from "../assets/monkaw_sm.png"

export default function Intro() {
    return (
        <>
            <Row>
                <Col>
                    <p>Use this simple tool to simulate StreamElements text-to-speech (TTS) voice messages for Twitch. Hear how a donation for your favorite streamer sounds like!</p>
                    <div className="d-flex">
                        <div className="flex-grow-1">
                            <span className="lead d-none d-sm-block">Chat we forgot <Image src={monkaW} alt="monkaW" /></span>
                        </div>
                        <div>
                            <DarkModeToggle />
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    )
}