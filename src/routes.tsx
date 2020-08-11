import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { isAuthenticated } from './auth';
import DragonsForm from './pages/DragonsForm';
import DragonsList from './pages/DragonsList';

const PrivateRoute: React.FC<any> = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                    <Redirect to={{ pathname: "/", state: { from: props.location } }} />
                )
        }
    />
);

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={DragonsList}></Route>
                {/* <PrivateRoute exact path='/' component={DragonsList}></PrivateRoute> */}
                <PrivateRoute path="/dragon-form/:id?" component={DragonsForm}></PrivateRoute>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;