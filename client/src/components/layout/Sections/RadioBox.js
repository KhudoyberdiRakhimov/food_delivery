import React, { useState, Fragment } from 'react'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import Grid from '@material-ui/core/Grid'

function RadioBox(props) {
  const [Value, setValue] = useState('0')

  const { list, handleFilters, ...rest } = props
  
  const renderRadioBox = () =>
    list &&
    list.map((value) => (
      <FormControlLabel
        key={value._id}
        value={`${value._id}`}
        control={<Radio />}
        label={value.name}
      />
    ))

  const handleChange = (event) => {
    setValue(event.target.value)
    handleFilters(event.target.value)
    console.log(Value)
  }

  return (
    <FormControl fullWidth={true} variant='outlined' component='fieldset'>
      <FormLabel component='legend'>Price</FormLabel>
      <RadioGroup
        aria-label='Price'
        name='Price'
        value={Value}
        onChange={(event) => handleChange(event)}>
        <Grid>{renderRadioBox()}</Grid>
      </RadioGroup>
    </FormControl>
  )
}

export default RadioBox
