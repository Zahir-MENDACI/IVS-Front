import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Alert, Backdrop, Button, CircularProgress, Snackbar, Stack, TextField } from '@mui/material';
import { getRequest, putRequest } from "../../utils/utils"

const RoomsEdit = () => {
    const [name, setName] = useState("");
    const [nb_persons, setNbPersons] = useState("");
    const [organization, setOrganization] = useState("");
    const [building, setBuilding] = useState("");
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    let navigate = useNavigate();

    const { orgaId, buildId, id } = useParams()

    const getRoom = async () => {
        getRequest(`organizations/${orgaId}/buildings/${buildId}/rooms/${id}`)
            .then(async res => {
                const roomData = res.data
                setName(roomData.name)
                setNbPersons(roomData.nb_persons)
            })
    }

    const updateRoom = async (e) => {
        setIsLoading(true)
        e.preventDefault()
        putRequest(`organizations/${orgaId}/buildings/${buildId}/rooms/${id}`, {
            "name": name,
            "nb_persons": nb_persons,
        })
            .then((result) => {
                navigate(`/organizations/${orgaId}/buildings/${buildId}/rooms`)
            }).catch((e) => {
                setOpen(true)
            }).finally(() => {
                setIsLoading(false)
            })
    }

    useEffect(() => {
        getRoom()
        getBuilding()
        getOrganization()
    }, []);

    const handleClose = () => {
        setOpen(false);
    };

    const getOrganization = () => {
        getRequest(`organizations/${orgaId}`)
            .then((res) => {
                setOrganization(res.data.name)
            })
    }
    const getBuilding = () => {
        getRequest(`organizations/${orgaId}/buildings/${buildId}`)
            .then((res) => {
                console.log(res.data)
                setBuilding(res.data.name)
            })
    }

    return (
        <div>
            <h1>Rooms</h1>

            <form onSubmit={updateRoom}>
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
                        id="building"
                        variant="standard"
                        label="Building"
                        value={building}
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
                        label="NbPersons"
                        variant="standard"
                        value={nb_persons}
                        onChange={(e) => setNbPersons(e.target.value)}
                    />
                    <Button type='submit' variant="contained">Add Room</Button>
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

export default RoomsEdit;