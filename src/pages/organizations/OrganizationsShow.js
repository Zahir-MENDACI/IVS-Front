import { Stack, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getRequest } from '../../utils/utils';

export const OrganizationsShow = () => {
    const [organization, setOrganization] = useState(false);


    const { id } = useParams()

    console.log(id)

    const GetOrganization = async () => {
        await getRequest(`organizations/${id}`)
            .then(async res => {
                setOrganization(res.data)
            })
    }


    useEffect(() => {
        GetOrganization()
    }, []);


    return (
        <div>
            <h1>Organization Show</h1>

            {
                organization && (
                    <form >
                        <Stack direction="column" spacing={3}>
                            <TextField
                                label="Id"
                                variant="standard"
                                defaultValue={organization.id}
                                inputProps={
                                    { readOnly: true, }
                                }
                            />
                            <TextField
                                label="Name"
                                variant="standard"
                                defaultValue={organization.name}
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