import React from 'react';
import {
    Route,
    BrowserRouter as Router,
    Routes as Switch,
    Navigate
} from 'react-router-dom'
import { BuildingsList, BuildingsCreate, BuildingsEdit, BuildingsShow } from '../pages/buildings';
import { OrganizationsList, OrganizationsCreate, OrganizationsShow, OrganizationsEdit } from '../pages/organizations';
import { RoomsCreate, RoomsEdit, RoomsList, RoomsShow } from '../pages/rooms';
import NavBar from "../components/NavBar"

const Routes = () => {
    return (
        <Router>
            <NavBar/>
            <Switch>

                    <Route exact={"true"} path="/" element={<Navigate to="/organizations"/>}></Route>

                {/* Buildings routes */}
                    <Route exact={"true"} path="/organizations/:orgaId/buildings" element={<BuildingsList />}></Route>
                    <Route exact={"true"} path="/organizations/:orgaId/buildings/create" element={<BuildingsCreate />}></Route>
                    <Route exact={"true"} path="/organizations/:orgaId/buildings/:id" element={<BuildingsShow />}></Route>
                    <Route exact={"true"} path="/organizations/:orgaId/buildings/:id/edit" element={<BuildingsEdit />}></Route>

                {/* Rooms routes */}
                    <Route exact={"true"} path="/organizations/:orgaId/buildings/:buildId/rooms" element={<RoomsList />}></Route>
                    <Route exact={"true"} path="/organizations/:orgaId/buildings/:buildId/rooms/create" element={<RoomsCreate />}></Route>
                    <Route exact={"true"} path="/organizations/:orgaId/buildings/:buildId/rooms/:id" element={<RoomsShow />}></Route>
                    <Route exact={"true"} path="/organizations/:orgaId/buildings/:buildId/rooms/:id/edit" element={<RoomsEdit />}></Route>

                {/* Townhalls routes */}
                    <Route exact={"true"} path="/organizations" element={<OrganizationsList />}></Route>
                    <Route exact={"true"} path="/organizations/create" element={<OrganizationsCreate />}></Route>
                    <Route exact={"true"} path="/organizations/:id" element={<OrganizationsShow />}></Route>
                    <Route exact={"true"} path="/organizations/:id/edit" element={<OrganizationsEdit />}></Route>

            </Switch>
        </Router>
    );
};

export default Routes;