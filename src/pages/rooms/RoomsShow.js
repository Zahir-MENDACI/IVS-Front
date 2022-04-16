import { Stack, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getRequest } from '../../utils/utils';

const RoomsShow = () => {
    const [room, setRoom] = useState(false);
    const [organization, setOrganization] = useState(false);
    const [building, setBuilding] = useState(false);

    const { orgaId, buildId, id } = useParams()

    const GetRoom = async () => {
        getRequest(`organizations/${orgaId}/buildings/${buildId}/rooms/${id}`)
            .then(async res => {
                setRoom(res.data)
            })
    }

    const getOrganization = () => {
        getRequest(`organizations/${orgaId}`)
            .then((res) => {
                setOrganization(res.data)
            })
    }
    const getBuilding = () => {
        getRequest(`organizations/${orgaId}/buildings/${buildId}`)
            .then((res) => {
                setBuilding(res.data)
            })
    }


    useEffect(() => {
        GetRoom()
    }, []);
    useEffect(() => {
        getOrganization()
        getBuilding()
    }, [room]);


    return (
        <div>
            <h1>Room Show</h1>
            {
                (room && organization && building) && (
                    <form >
                        <Stack direction="column" spacing={3}>
                            <TextField
                                label="Organization"
                                variant="standard"
                                defaultValue={organization.name}
                                inputProps={
                                    { readOnly: true, }
                                }
                            />
                            <TextField
                                label="Building"
                                variant="standard"
                                defaultValue={building.name}
                                inputProps={
                                    { readOnly: true, }
                                }
                            />
                            <TextField
                                label="Name"
                                variant="standard"
                                defaultValue={room.name}
                                inputProps={
                                    { readOnly: true, }
                                }
                            />
                            <TextField
                                label="Nb_Persons"
                                variant="standard"
                                defaultValue={room.nb_persons}
                                inputProps={
                                    { readOnly: true, }
                                }
                            />
                        </Stack>

                    </form>
                )
            }
        </div>
    );
};

export default RoomsShow;