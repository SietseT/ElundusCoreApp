import React from "react"

import Layout from "./components/layout"
import Intro from "./components/intro"
import Footer from "./components/footer"
import TextToSpeech from "./components/tts/texttospeech"
import DarkModeToggle from "./components/darkmodetoggle"

import "./styles/theme.css";

export default function App() {   

    return (
        <Layout>
            <DarkModeToggle />
            <Intro />
            <hr className="my-2 my-sm-4" />
            <TextToSpeech />
            <hr className="my-4" />
            <Footer />
        </Layout>
    )
}
