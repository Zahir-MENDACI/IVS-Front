import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Alert, Backdrop, Button, CircularProgress, Snackbar, Stack, TextField } from '@mui/material';
import { getRequest, putRequest } from '../../utils/utils';

export const BuildingsEdit = () => {
    const [name, setName] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [organization, setOrganization] = useState("");
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    let navigate = useNavigate();

    const { id, orgaId } = useParams()

    const GetBuilding = async () => {
        await getRequest(`organizations/${orgaId}/buildings/${id}`)
            .then(async res => {
                const building = res.data
                setName(building.name)
                setZipcode(building.zipcode)
                getRequest(`organizations/${orgaId}`)
                    .then(res => {
                        const organization = res.data
                        setOrganization(organization.name)
                    })
            })
    }

    const updateBuilding = async (e) => {
        setIsLoading(true)
        e.preventDefault()
        await putRequest(`organizations/${orgaId}/buildings/${id}`, {
            "name": name,
            "zipcode": zipcode,
        })
            .then(() => {
                navigate(`/organizations/${orgaId}/buildings`)
            }).catch((e) => {
                setOpen(true)
            }).finally(() => {
                setIsLoading(false)
            })
    }

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        GetBuilding()
    }, []);


    return (
        <div>
            <h1>Building Edit</h1>

            <form onSubmit={updateBuilding}>
                <Stack direction="column" spacing={3}>
                    <TextField
                        required
                        id="organization"
                        variant="standard"
                        label="Organization"
                        value={organization}
                        disabled
                    />
                    <TextField
                        required
                        id="standard-required"
                        label="Id"
                        variant="standard"
                        value={id}
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
                    <Button type='submit' variant="contained">Update Building</Button>
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
        </div>
    );
};