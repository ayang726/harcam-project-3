import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { Auth0Provider } from "./js/react-auth0-wrapper";
import prod_config from "./auth_config.json";
import dev_config from "./auth_config_dev.json"

let config = dev_config
console.log("Logging from React app: " + process.env.NODE_ENV);
console.log('window origin is: ' + window.location.origin);

if (process.env.NODE_ENV === "production")
    config = prod_config;

const onRedirectCallback = appState => {
    window.history.replaceState(
        {},
        document.title,
        appState && appState.targetUrl
            ? appState.targetUrl
            : window.location.pathname
    );
};

ReactDOM.render(
    <Auth0Provider
        domain={config.domain}
        client_id={config.clientId}
        redirect_uri={window.location.origin}
        onRedirectCallback={onRedirectCallback}
    >
        <App />
    </Auth0Provider>,
    document.getElementById("root")
);

// ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
