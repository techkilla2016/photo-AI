import Link from 'next/link'
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Home = () => {
  return (
    <div className='center_main py-5 '>
      <h1 className='text-center py-4'>AI-Enhanced Photoshots</h1>
      <Container className='px-5'>
        <Row className='px-5'>
          <Col lg={3} md={6} sm={12} className='flex-column d-flex'>
            <img src="/assets/assets-02.png" alt="" className='my-3' />
            <img src="/assets/assets-05.png" alt="" className='my-3' />
          </Col>
          <Col lg={3} md={6} sm={12} className='flex-column d-flex'>
            <img src="/assets/assets-01.png" alt="" className='my-3' />
            <img src="/assets/assets-06.png" alt="" className='my-3' />
          </Col>
          <Col lg={3} md={6} sm={12} className='flex-column d-flex'>
            <img src="/assets/assets-03.png" alt="" className='my-3' />
            <img src="/assets/assets-07.png" alt="" className='my-3' />
          </Col>
          <Col lg={3} md={6} sm={12} className='flex-column d-flex'>
            <img src="/assets/assets-04.png" alt="" className='my-3' />
          </Col>
        </Row>
        <div className="d-flex py-5 mt-4">
          <Link href='/start' className='btn btn-dark fs-2 start-btn'>Start Now</Link>
        </div>
      </Container>
    </div>
  )
}

export default Home
