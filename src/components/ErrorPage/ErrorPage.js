import React from 'react'
import "./ErrorPage.css"
import Header from "../Header/Header";

const ErrorPage = () => {
    return (
        <div>
            <Header/>
            <div id="mainError">
                <div className="fof">
                    <h1>Oops.. something went wrong :( </h1>
                    <a href="/home" style={{color: "#000"}}><u> <strong><p>Proceed to Home >></p></strong></u> </a>
                </div>

            </div>
        </div>
    )
};

export default ErrorPage
