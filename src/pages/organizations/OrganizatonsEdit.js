import { Alert, Backdrop, Button, CircularProgress, Snackbar, Stack, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRequest, putRequest } from '../../utils/utils';

export const OrganizationsEdit = () => {
    const [name, setName] = useState("");
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    let navigate = useNavigate();

    const { id } = useParams()

    const GetOrganization = async () => {
        await getRequest(`organizations/${id}`)
            .then(async res => {
                const organization = res.data
                setName(organization.name)
            })
    }

    const updateOrganization = async (e) => {
        setIsLoading(true)
        e.preventDefault()
        await putRequest(`organizations/${id}`, {
            "id": id,
            "name": name,
        })
            .then(() => {
                navigate("/organizations")
            }).catch((e) => {
                setOpen(true)
            }).finally(()=>{
                setIsLoading(false)
              })
    }

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        GetOrganization()
    }, []);

    return (
        <div>
            <h1>Organization Edit</h1>

            <form onSubmit={updateOrganization}>
                <Stack direction="column" spacing={3}>
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
                    <Button type='submit' variant="contained">Update organization</Button>
                </Stack>
            </form>
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