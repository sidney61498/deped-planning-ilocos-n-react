import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

//plugins
import jwt_decode from "jwt-decode";

// actions
import { logoutUser } from "./actions/authActions";

// components
import Login from "./components/auth/Login";
import PrivateRoute from "./components/common/PrivateRoute";

//utils
import setAuthToken from "./utils/setAuthToken";
import Home from "./components/Home";

if (localStorage.auth) {
    setAuthToken(localStorage.auth);
    const decoded = jwt_decode(localStorage.auth);

    store.dispatch(setCurrentUser(decoded));

    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
        // Logout user
        store.dispatch(logoutUser());
        // Clear current Profile
        store.dispatch(clearCurrentProfile());
        // Redirect to login
        //window.location.href = "/login";
    }
}

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <div className="container">
                            <Route exact path="/" component={Home} />
                            <Route exact path="/login" component={Login} />
                        </div>
                    </div>
                </Router>
            </Provider>
        );
    }
}
