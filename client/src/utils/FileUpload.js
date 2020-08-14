import React, { useState } from 'react';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import Dropzone from 'react-dropzone';
import axios from 'axios';
function FileUpload(props) {

  const [Images, setImages] = useState([])

  const onDrop = (files) => {

    let formData = new FormData();
    const config = {
      header: { 'content-type': 'multipart/form-data' }
    }
    formData.append("file", files[0])
    //save the Image we chose inside the Node Server 
    axios.post('/api/product/uploadImage', formData, config)
      .then(response => {
        if (response.data.success) {

          setImages([...Images, response.data.image])
          props.refreshFunction([...Images, response.data.image])

        } else {
          alert('Failed to save the Image in Server')
        }
      })
  }


  const onDelete = (image) => {
    const currentIndex = Images.indexOf(image);

    let newImages = [...Images]
    newImages.splice(currentIndex, 1)

    setImages(newImages)
    props.refreshFunction(newImages)
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Dropzone
        onDrop={onDrop}
        multiple={false}
        maxSize={800000000}
      >
        {({ getRootProps, getInputProps }) => (
          <div style={{
            width: '40%', height: '240px', border: '2px solid gray',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}
            {...getRootProps()}
          >
            {/* {console.log('getRootProps', { ...getRootProps() })}
            {console.log('getInputProps', { ...getInputProps() })} */}
            <input {...getInputProps()} />
            <AddPhotoAlternateIcon />
            <h5>Add Image</h5>
          </div>
        )}
      </Dropzone>

      <div style={{ display: 'flex', width: '40%', height: '240px', overflowX: 'scroll' }}>

        {Images.map((image, index) => (
          <div key={index} onClick={() => onDelete(image)}>
            <img style={{ minWidth: '300px', width: '300px', height: '240px' }} src={`http://localhost:5000/${image}`} alt={`productImg-${index}`} />
          </div>
        ))}


      </div>

    </div>
  )
}

export default FileUpload