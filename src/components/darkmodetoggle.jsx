import React from "react"
import Button from "react-bootstrap/Button"

import darkModeSvg from "../assets/dark_mode_white_24dp.svg"
import lightModeSvg from "../assets/light_mode_black_24dp.svg"

import "../styles/darkmodetoggle.css"

export default function Intro() {

    const [darkMode, setDarkMode] = React.useState(false);

    React.useEffect(() => {
        const json = localStorage.getItem("site-dark-mode");
        const currentMode = JSON.parse(json);
        if (currentMode) {
            setDarkMode(true);
        } else {
            setDarkMode(false);
        }
    }, []);

    React.useEffect(() => {
        if (darkMode) {
            document.body.classList.add("dark-theme");
            document.body.classList.remove("light-theme");
        } else {
            document.body.classList.add("light-theme");
            document.body.classList.remove("dark-theme");
        }
        const json = JSON.stringify(darkMode);
        localStorage.setItem("site-dark-mode", json);
    }, [darkMode]);

    return <Button variant={darkMode ? "light" : "dark"} className="btn-darkmode" onClick={() => setDarkMode(!darkMode)}>
        <img src={darkMode ? lightModeSvg : darkModeSvg} alt="Theme toggle" />
    </Button>
}