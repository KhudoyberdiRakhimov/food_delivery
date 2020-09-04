import React, { useState, Fragment } from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import FormLabel from '@material-ui/core/FormLabel'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'

function CheckBox(props) {
  
  const [Checked, setChecked] = useState([])

  const { list, handleFilters, ...rest } = props
  
   const handleToggle = (value) => {
     const currentIndex = Checked.indexOf(value)
     const newChecked = [...Checked]

     if (currentIndex === -1) {
       newChecked.push(value)
     } else {
       newChecked.splice(currentIndex, 1)
     }

     setChecked(newChecked)
     handleFilters(newChecked)
     //update this checked information into Parent Component
   }

  const renderCheckboxList = () => list && list.map((value, index) => (
    <FormControlLabel
      key={value._id}
      control={
        <Checkbox
          checked={Checked.indexOf(value._id) === -1 ? false : true}
          onChange={() => handleToggle(value._id)}
        />
      }
      label={value.name}
    />
  ))
  return (
    <FormControl component='fieldset' fullWidth={true} variant='outlined'>
      <FormLabel component='legend'>Category</FormLabel>
      <FormGroup>
        <Grid>{renderCheckboxList()}</Grid>
      </FormGroup>
    </FormControl>
  );
  }

export default CheckBox