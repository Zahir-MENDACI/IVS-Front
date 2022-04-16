import { Alert, Backdrop, Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, Snackbar, Stack, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom"
import { getRequest, postRequest } from '../../utils/utils';

export const BuildingsCreate = () => {
    const [name, setName] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [organization, setOrganization] = useState("");
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    let navigate = useNavigate();
    const {orgaId} = useParams()

    const addBuilding = async (e) => {
        setIsLoading(true)
        e.preventDefault()
        postRequest(`organizations/${orgaId}/buildings`, {
            "name": name,
            "zipcode": zipcode,
        })
        .then(() => {
            navigate(`/organizations/${orgaId}/buildings`)
        }).catch((e) => {
            setOpen(true)
          }).finally(()=>{
            setIsLoading(false)
          })
    }

    useEffect(() => {
        getOrganization()
    }, []);

    const getOrganization = () => {
        getRequest(`organizations/${orgaId}`)
            .then((res) => {
                console.log(res.data)
                setOrganization(res.data)
            })
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <h1>Buildings</h1>

            <form onSubmit={addBuilding}>
                <Stack direction="column" spacing={3}>
                    <TextField
                        required
                        id="standard-required"
                        label="Organization"
                        variant="standard"
                        value={organization.name}
                        disabled
                    />
                    <TextField
                        required
                        id="standard-required"
                        label="Name"
                        variant="standard"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        required
                        id="standard-required"
                        label="Zipcode"
                        variant="standard"
                        value={zipcode}
                        onChange={(e) => setZipcode(e.target.value)}
                    />
                    <Button type='submit' variant="contained">Add Building</Button>
                </Stack>
            </form >

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    An error has occured
                </Alert>
            </Snackbar>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div >
    );

    // [ "Richard", "Mata", "Coates", "Mckinney", "Newton", "Tyson", "Winters", "Hancock", "Meyer", "Sharpe", "Kirkland", "Dolan", "Sinclair", "Childs", "Prentice", "Valenzuela", "Lott", "Wallis", "Anthony", "Hawkins", "Lane", "Wormald", "Matthams", "Irving", "Mcintosh", "Velazquez", "Pham", "Bull", "Yoder", "Ashley", "Mooney", "Mcgrath", "Nava", "Wilkinson", "Burks", "Friedman", "Rasmussen", "Haynes", "Larson", "Madden"]

    // ["Wallace", "Ahmet", "Elisha", "Kenan", "Ayaan", "Huey", "Claudia", "Diya", "Christie", "Etienne", "Zidan", "Regan", "Yasir", "Lamar", "Emir ", "Raymond", "Filip", "Jareth", "Henley", "Macey", "Krzysztof", "Macauley", "Konnor", "Tanner", "Lachlan", "Ariya", "Elmer", "Mikey", "Thiago", "Mahir", "Giorgio", "Hareem ", "Miles", "Stefan", "Dimitri", "Indigo", "Belle", "Zakariya", "Rowan", "Brennan"]
};