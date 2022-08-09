import React, { useState } from 'react'
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useCreateProductMutation } from '../services/appApi'
import './NewProduct.css'
import axios from "../axios"

const NewProduct = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [images, setImages] = useState([])
  const [imgToRemove, setImgToRemove] = useState(null)
  const navigate = useNavigate()

  const [createProduct, {isError, error, isLoading, isSuccess}] = useCreateProductMutation()

  const handleRemoveImg = (imgObj) => {
    setImgToRemove(imgObj.public_id)
    axios.delete(`/images/${imgObj.public_id}`)
    .then((res) => {
      setImgToRemove(null)
      setImages((prev) => prev.filter((img) => img.public_id !== imgObj.public_id))
    })
    .catch((error) => console.log(error))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!name || !description || !price || !category || !images.length){
      return alert('Please fill out all fields')
    }
    else{
      createProduct({name, description, price, category, images}).then(({data}) => {
        if(data.length > 0) {
          setTimeout(() => {
            navigate('/')
          }, 1500)
        }
      })
    }
  }

  const showWidget = () => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dru5sgyil",
        uploadPreset: "bylx7fzf"
      },
      (error, result) => {
        if(!error && result.event === 'success'){
          setImages((prev) => [...prev, {url: result.info.url, public_id: result.info.public_id}])
        }
      }
    )
    widget.open()
  }

  return (
    <Container>
      <Row>
        <Col md={6} className='new-product__form--container'>
        <Form style={{width: '100%'}} onSubmit={handleSubmit}>
                <h1 className='mt-4'>Create a product</h1>
                {isSuccess && <Alert variant='success'>Product successfully created</Alert>}
                {isError && <Alert variant='danger'>{error.data}</Alert>}
                <Form.Group className='mb-3'>
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control type="text" placeholder='Product name' value={name} required onChange={(e)=>setName(e.target.value)}/>
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label>Product Description</Form.Label>
                    <Form.Control as="textarea" placeholder='Product description' style={{height: '100px'}} value={description} required onChange={(e)=>setDescription(e.target.value)}/>
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" placeholder='Product price' value={price} required onChange={(e)=>setPrice(e.target.value)}/>
                </Form.Group>

                <Form.Group className='mb-3' onChange={(e)=> setCategory(e.target.value)}>
                    <Form.Label>Category</Form.Label>
                    <Form.Select>
                      <option disabled selected>--Select One--</option>
                      <option value="barbells">Barbells</option>
                      <option value="racks">Racks</option>
                      <option value="weights">Weights</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className='mb-3'>
                  <Button type='button' onClick={showWidget}>Upload Images</Button>
                    <div className='images-preview-container'>
                      {images.map((image) => (
                        <div className='image-preview'>
                          <img src={image.url} />
                         {imgToRemove !== image.public_id && <i className='fa fa-times-circle' onClick={()=> handleRemoveImg(image)}></i>}
                        </div>
                      ))}
                    </div>
                </Form.Group>

                <Form.Group className='mb-3'>
                    <Button type='submit' disabled={isLoading || isSuccess}>Create Product</Button>
                </Form.Group>
                
                </Form>
        </Col>
        <Col md={6} className='new-product__image--container'></Col>
      </Row>
    </Container>
  )
}

export default NewProduct