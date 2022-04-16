import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import './NavBar.css'

const NavBar = () => {
    const location = useLocation();
    const resources = location.pathname.split("/")
    return (
        <div className='NavBar'>
            <ul>
                {
                    resources.includes("organizations") ? <li><a href={`/organizations`}>Organizations</a> </li> : null
                }
                {
                     resources.includes("buildings") ? <li> <a href={`/organizations/${resources[2]}/buildings`}>Buildings</a></li> : null
                }
                {
                     resources.includes("rooms") ? <li> <a href={`/organizations/${resources[2]}/buildings/${resources[4]}/rooms`}>Rooms</a></li> : null
                }
            </ul>
        </div>
    );
};

export default NavBar;