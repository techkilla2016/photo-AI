import Link from 'next/link'
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Result = ({ result, setResult }) => {
    return (
        <div className='center_main py-5 '>
            <h1 className='text-center'>Your Photoshots is here</h1>
            <Container className='px-5'>
                <Row className='justify-content-center align-items-center'>
                    <Col lg={8} md={6} sm={12} xs={12}>
                        <div className="finalImag">
                            <img src={result} alt="" />
                        </div>
                        <Row className="justify-content-between">
                            <Col lg={5} sm={12} className='d-flex justify-content-center py-2'>
                                <button className='btn btn-dark fs-2 start-btn' onClick={() => setResult('')}>Re-generate</button>
                            </Col>
                            <Col lg={5} sm={12} className='d-flex justify-content-center py-2'>
                                <a href={result} download="Image" className='btn btn-dark fs-2 start-btn' >Download Image</a>
                            </Col>
                        </Row>
                    </Col>
                </Row>

            </Container>
        </div>
    )
}

export default Result