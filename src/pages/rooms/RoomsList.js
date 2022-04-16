import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate, useParams } from 'react-router-dom';
import { Alert, Backdrop, Button, CircularProgress, Snackbar } from '@mui/material';
import { getRequest, deleteRequest } from '../../utils/utils';

const RoomsList = () => {

  const [listRooms, setListRooms] = useState([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { orgaId, buildId } = useParams()
  
  useEffect(() => {
    getListRooms()
  }, []);

  const getListRooms = () => {
    getRequest(`organizations/${orgaId}/buildings/${buildId}/rooms`)
      .then((res) => {
        setListRooms(res.data)
      })
  }

  const deleteRoom = (club) => {
    setIsLoading(true)
    deleteRequest(`organizations/${orgaId}/buildings/${buildId}/rooms/${club.id}`)
      .then(() => {
        window.location.reload(false)
      }).catch((e) => {
        setOpen(true)
      }).finally(() => {
        setIsLoading(false)
      })
  }

  let navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'nb_persons', headerName: 'Nb_Persons', width: 200 },
    {
      field: "show",
      headerName: "Show",
      sortable: false,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking
          navigate(`/organizations/${orgaId}/buildings/${buildId}/rooms/${params.id}`)
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
          navigate(`/organizations/${orgaId}/buildings/${buildId}/rooms/${params.id}/edit`)
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
          deleteRoom(params)
        };

        return <Button onClick={onClick}>Delete</Button>;
      }
    },
  ];

  return (
    <div>
      <h1>Rooms</h1>

      <Button onClick={() => navigate(`/organizations/${orgaId}/buildings/${buildId}/rooms/create`)}>Create new Room</Button>

      <div style={{ height: "90vh", width: '100%' }}>
        <DataGrid
          rows={listRooms}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
        // checkboxSelection
        />
      </div>
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

export default RoomsList;