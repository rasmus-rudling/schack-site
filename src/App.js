import React , { useEffect, useState } from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams,
    useHistory,
    Redirect
} from "react-router-dom";

// --- EGNA KOMPONENTER ---
import Signup from './Signup/signup.js';
import Login from './Login/login.js';
import Homepage from './Homepage/homepage';

function App() {

    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Signup />
                </Route>

                <Route exact path="/signup">
                    <Signup />
                </Route>

                <Route exact path="/login">
                    <Login />
                </Route>

                <Route exact path="/homepage">
                    <Homepage />
                </Route>
            </Switch>
        </Router>
    )

    
}

export default App;