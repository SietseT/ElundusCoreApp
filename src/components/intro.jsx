import React from "react"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Image from "react-bootstrap/Image"

import DarkModeToggle from "./darkmodetoggle"

import monkaW from "../assets/monkaw_sm.png"

export default function Intro() {

    const showAlert = React.useMemo(() => {
        const now = new Date();
        const alertDate = new Date("2026-07-01T00:00:00Z");
        return now >= alertDate;
    }, []);

    return (
        <>
            <Row>
                <Col>
                    {showAlert && (
                        <div className="alert alert-warning" role="alert">
                            This version is no longer supported and will not be automatically updated.
                            Please download the <a href="#" className="alert-link">latest version</a> from GitHub.
                        </div>
                    )}
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