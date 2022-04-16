import { Alert, Backdrop, Button, CircularProgress, Snackbar, Stack, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postRequest } from '../../utils/utils';

export const OrganizationsCreate = () => {

    let navigate = useNavigate();

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const addOrganization = async (e) => {
        setIsLoading(true)
        e.preventDefault()
        await postRequest(`organizations`, {
            "name": name,
            "address": address
        }).then((result) => {
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

    return (
        <div>
            <h1>Organizations</h1>

            <form onSubmit={addOrganization}>

                <Stack direction="column" spacing={3}>
                    <TextField
                        required
                        id="standard-required"
                        label="Name"
                        variant="standard"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Button type='submit' variant="contained">Add organization</Button>
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