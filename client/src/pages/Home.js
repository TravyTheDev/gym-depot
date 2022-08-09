import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import categories from '../categories'
import { LinkContainer } from 'react-router-bootstrap'
import "./Home.css"
import axios from '../axios'
import { useDispatch, useSelector } from 'react-redux'
import { updateProducts } from '../features/productSlice'
import ProductPreview from '../components/ProductPreview'

const Home = () => {
    const dispatch = useDispatch()
    // I don't know why it's state.product and not state.products when it's "products" in the slice
    //because we called it that in the store for the reducer
    const products = useSelector((state) => state.product)
    const lastProducts = products.slice(-8)

    useEffect(()=> {
        axios.get('/products').then(({data}) => dispatch(updateProducts(data)))
    },[])

  return (
    <div>
        <img src='https://res.cloudinary.com/dru5sgyil/image/upload/v1660050151/top-banner_dmrpwv.png' className='home-banner' />
        <div className='featured-products-container container mt-4'>
            <h2>Last Products</h2>
            {/* last products here */}
            <div className='d-flex justify-content-center flex-wrap'>
            {lastProducts.map((product) => (
                <ProductPreview {...product} />
            ))}
            </div>
            {/* <div>
                <Link to= "/category/all" style={{textAlign: "right", display: "block", textDecoration: "none"}}>See More{'>>'}
                </Link>
            </div> */}
            {/* banner */}
            <div className='sale__banner--container mt-4'>
                <img src='https://res.cloudinary.com/dru5sgyil/image/upload/v1660049298/second-banner_bswzwf.png' />
            </div>
            <div className='recent-products-container container mt-4'>
                <h2>Categories</h2>
                <Row>
                    {categories.map((category) =>(
                        
                        <LinkContainer to={`/category/${category.name.toLowerCase()}`}>
                        <Col md={4}>
                        <div 
                        style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), 
                        url(${category.img})`, gap: '10px'}} 
                        className='category-tile'>
                            {category.name}
                        </div>
                        </Col>
                        </LinkContainer>
                    ))}
                </Row>
            </div>
        </div>
    </div>
  )
}

export default Home