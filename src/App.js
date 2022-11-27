import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import DataTable from './Components/DataTable';
import { Box, TextField } from '@mui/material';
import Loader from './Components/Loader';
// import noData from './assets/No_data.png'

function App() {
  const [members, setMembers] = useState(null);
  const [filteredMembers, setFilteredMembers] = useState(null);
  const [searchString, setSearchString] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchMembers = async () => {
    setLoading(true);
    try {

      let response = await axios.get("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json")
      setLoading(false);
      setIsError(false);
      setMembers(response.data.map((row) => ({ ...row, isChecked: false })));

    } catch (e) {
      setLoading(false)
      setIsError(true);
    }

  }

  useEffect(() => {
    fetchMembers()
  }, [])

  useEffect(() => {
    if (searchString?.length > 0) {
      setFilteredMembers(members?.filter(member => {
        if (member.name?.toLowerCase().includes(searchString.toLowerCase())
          || member.email?.toLowerCase().includes(searchString.toLowerCase())
          || member.role?.toLowerCase().includes(searchString.toLowerCase())
        ) {
          return member;
        }
      }))
    }
    else {
      setFilteredMembers(members)
    }
  }, [searchString, members]);

  const handleCheck = (id) => {
    let tempMembers = [...members]
    tempMembers.forEach(member => {
      if (member.id === id) {
        member.isChecked = !member.isChecked;
      }
    })
    setMembers(tempMembers)
  }

  const handleDelete = (id) => {
    let tempMembers = [...members]
    tempMembers = tempMembers.filter(member => member.id !== id)
    setMembers(tempMembers)
  }

  const handleDeleteSelected = () => {
    let tempMembers = [...members]
    tempMembers = tempMembers.filter(member => !member.isChecked)
    setMembers(tempMembers)
  }

  const handleEdit = (row) => {
    let tempMembers = [...members]
    tempMembers = tempMembers.map(member => {
      if (member.id === row.id) {
        return Object.assign(member, row)
      }
      return member
    })
    setMembers(tempMembers)
  }

  return (
    <Box margin={'1rem'} padding='1rem'>
      <TextField
        size='small'
        fullWidth
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
        placeholder="Search by name, email or role" />
      {
        isLoading ?
          (<Loader />)
          : isError ?
            <Box>
              Unable to fetch data at the moment
            </Box>
            : filteredMembers && <DataTable
              members={filteredMembers}
              onCheck={handleCheck}
              onDelete={handleDelete}
              onDeleteSelected={handleDeleteSelected}
              onEdit={handleEdit}
            />
      }
    </Box>
  );
}

export default App;
