import React from "react"

import Container from "react-bootstrap/Container"

export default function Layout({ children }) {

    return (
        <>
            <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
            integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
            crossOrigin="anonymous"
            />

            <Container className="mt-4 container__main" fluid>
                <main role="main" className="container-fluid">
                    <Container>
                        {children}
                    </Container>
                </main>
            </Container>
        </>
    )
}