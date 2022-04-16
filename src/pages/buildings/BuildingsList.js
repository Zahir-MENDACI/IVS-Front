import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Alert, Backdrop, Button, CircularProgress, Snackbar } from '@mui/material';
import { deleteRequest, getRequest } from '../../utils/utils';

export const BuildingsList = (props) => {
  const [listBuildings, setListBuildings] = useState([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const search = useLocation().search;
  const {orgaId} = useParams()

  let navigate = useNavigate();

  const columns = [
    { field: 'id', headerName: 'id', width: 50 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'zipcode', headerName: 'Zipcode', width: 200 },
    { field: 'nb_persons', headerName: 'Nb Persons', width: 200 },
    {
      field: "show",
      headerName: "Show",
      sortable: false,
      renderCell: (params) => {
        console.log(params)
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking
          navigate(`/organizations/${orgaId}/buildings/${params.id}`)
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
          navigate(`/organizations/${orgaId}/buildings/${params.id}/edit`)
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
          deleteBuilding(params)
        };

        return <Button onClick={onClick}>Delete</Button>;
      }
    },
    {
      field: "rooms",
      headerName: "Rooms",
      sortable: false,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking
          navigate(`/organizations/${orgaId}/buildings/${params.id}/rooms`)
        };

        return <Button onClick={onClick}>Rooms</Button>;
      }
    },
  ];


  useEffect(() => {
    getListBuildings()
  }, []);

  const getListBuildings = () => {
      getRequest(`organizations/${orgaId}/buildings`)
        .then((res) => {
          let listBuildingResult = res.data
          listBuildingResult.map((build, index) => {
            getRequest(`organizations/${orgaId}/buildings/${build.id}?nb_persons`)
            .then((result)=> {
              console.log(listBuildingResult[index])
              listBuildingResult[index].nb_persons = result.data
              setListBuildings(listBuildingResult)
            })
          })
        })
  }

  const deleteBuilding = (building) => {
    setIsLoading(true)
    deleteRequest(`organizations/${orgaId}/buildings/${building.id}`)
      .then((res) => {
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

  const urlCreateBuilding = `/organizations/${orgaId}/buildings/create`

  return (
    <div style={{ height: 400, width: '100%' }}>
      <h1>Buildings</h1>

      <Button onClick={() => navigate(urlCreateBuilding)}>Create new Building</Button>
      {console.log(listBuildings)}
      <DataGrid
        rows={listBuildings}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[10]}
      // checkboxSelection
      />

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          An error has occured <br/>
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