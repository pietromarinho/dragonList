import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import DragonsForm from './pages/DragonsForm';
import DragonsList from './pages/DragonsList';

function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={DragonsList}></Route>
            <Route path="/dragon-form/:id?" component={DragonsForm}></Route>
        </BrowserRouter>
    )
}

export default Routes;