import React from 'react';
import { useAuth0 } from "../../js/react-auth0-wrapper"

export default function (props) {
    const { loginWithRedirect } = useAuth0()
    return (
        <div className="row">
            <div className="col-lg-12">
                <div className="jumbotron">
                    <h1>Build Inspiring WordClouds, Fast!</h1>
                    <button
                        className="btn btn-warning"
                        onClick={() => loginWithRedirect({})}>
                        Start Here
                    </button>
                </div>
            </div>
        </div>
    );
}