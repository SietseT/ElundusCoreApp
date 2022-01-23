import React from "react"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Image from "react-bootstrap/Image"

import monkaW from "../assets/monkaw_sm.png"

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

    return <button onClick={() => setDarkMode(!darkMode)}>Toggle Dark Mode</button>
}