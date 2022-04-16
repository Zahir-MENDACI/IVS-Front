import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { Alert, Backdrop, Button, CircularProgress, Snackbar } from '@mui/material';
import { deleteRequest, getRequest } from "../../utils/utils"

export const OrganizationsList = () => {

  const [listOrganizations, setListOrganizations] = useState([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  console.log(listOrganizations)

  useEffect(() => {
    getListOrganizations()
  }, []);

  const getListOrganizations = () => {
    getRequest(`organizations`)
      .then(async (res) => {
        let listOrganizationResult = res.data
          await listOrganizationResult.map((orga, index) => {
            getRequest(`organizations/${orga.id}?nb_persons`)
            .then((result)=> {
              console.log(listOrganizationResult[index])
              listOrganizationResult[index].nb_persons = result.data
              setListOrganizations(listOrganizationResult)
            })
          })
      })
  }

  const deleteOrganization = (organization) => {
    setIsLoading(true)
    deleteRequest(`organizations/${organization.id}`)
      .then(() => {
        window.location.reload(false)
      }).catch((e) => {
        setOpen(true)
      }).finally(() => {
        setIsLoading(false)
      })
  }


  const handleClose = () => {
    setOpen(false);
  };

  let navigate = useNavigate();
  const columns = [
    { field: 'id', headerName: 'Id', width: 50 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'nb_persons', headerName: 'Nb Persons', width: 200 },
    {
      field: "show",
      headerName: "Show",
      sortable: false,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking
          navigate(`/organizations/${params.id}`)
        };

        return <Button onClick={onClick}>Show</Button>;
      }
    },
    {
      field: "edit",
      headerName: "Edit",
      sortable: false,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking
          navigate(`/organizations/${params.id}/edit`)
        };

        return <Button onClick={onClick}>Edit</Button>;
      }
    },
    {
      field: "delete",
      headerName: "Delete",
      sortable: false,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking
          deleteOrganization(params)
        };

        return <Button onClick={onClick}>Delete</Button>;
      }
    },
    {
      field: "buildings",
      headerName: "Buildings",
      sortable: false,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking
          navigate(`/organizations/${params.id}/buildings`)
        };

        return <Button onClick={onClick}>Buildings</Button>;
      }
    },
  ];

  return (
    <div>
      <h1>Organizations</h1>

      <Button onClick={() => navigate(`/organizations/create`)}>Create new organization</Button>

      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={listOrganizations}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[10]}
        // checkboxSelection
        />
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          An error has occured <br />
          Check if building donc have children rooms and retry
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