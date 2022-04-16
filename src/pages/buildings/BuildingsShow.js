import { Stack, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRequest } from '../../utils/utils';

export const BuildingsShow = () => {
    const [organization, setOrganization] = useState(false);
    const [building, setBuilding] = useState(false);

    let navigate = useNavigate();

    const { id, orgaId } = useParams()

    const GetBuilding = async () => {
        getRequest(`organizations/${orgaId}/buildings/${id}`)
            .then(async res => {
                const buildingData = res.data
                setBuilding(buildingData)
                getRequest(`organizations/${orgaId}`)
                    .then(res => {
                        const organizationData = res.data
                        setOrganization(organizationData)
                    })
            })
    }


    useEffect(() => {
        GetBuilding()
    }, []);


    return (
        <div>
            <h1>Building Show</h1>
            {
                (building && organization) && (
                    <form >
                        <Stack direction="column" spacing={3}>
                            <TextField
                                label="Id"
                                variant="standard"
                                defaultValue={id}
                                inputProps={
                                    { readOnly: true, }
                                }
                            />
                            <TextField
                                label="Organization"
                                variant="standard"
                                defaultValue={organization.name}
                                inputProps={
                                    { readOnly: true, }
                                }
                            />
                            <TextField
                                label="Name"
                                variant="standard"
                                defaultValue={building.name}
                                inputProps={
                                    { readOnly: true, }
                                }
                            />
                            <TextField
                                label="Zip Code"
                                variant="standard"
                                defaultValue={building.zipcode}
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