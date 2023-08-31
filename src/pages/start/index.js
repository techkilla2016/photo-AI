import Link from 'next/link'
import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { BsFolderFill } from 'react-icons/bs'
import { BiPlusMedical } from 'react-icons/bi'
import axios from 'axios'
import Capture from '@/components'
import Result from '@/components/Result'
const Home = () => {
    const [isUpload, setIsUpload] = useState(false)
    const [isLoad, setIsLoad] = useState(false)
    const [imgFile, setImgFile] = useState('')
    const [files, setFiles] = useState()
    const [select, setSelect] = useState()
    const [result, setResult] = useState('')
    // select image from computer 
    const changeFile = event => {
        const file = event.target.files[0]
        setFiles(file)
    }

    // upload Image file 
    const uploadFile = () => {
        const reader = new FileReader();
        reader.readAsDataURL(files);
        reader.onload = function () {
            const base64String = reader.result;
            setImgFile(base64String);
        };
    }

    // select Template 
    const handleStart = () => {
        console.log(imgFile.split(',')[0])
        if (imgFile) {
            setIsUpload(true)
        }
    }


    const handleSelect = (pyload) => {
        setSelect(pyload)
    }

    const handleGenrate = async () => {
        setIsLoad(true)
        try {
            const res = await axios.post('https://71dc-103-17-110-126.ngrok-free.app/rec', {
                image: imgFile.split(',')[1],
                choice: select
            })
            setResult('data:image/jpeg;base64,' + res.data?.result)
            setIsLoad(false)
        } catch (error) {
            console.log(error?.message)
            setIsLoad(false)
        }
    }

    return (
        !result ? <>
            {
                isLoad && <div className="isLoad">
                    <div class="spinner-border text-light" role="status">
                    </div>
                </div>
            }

            {
                isUpload ? <>
                    <div className='center_main py-5 '>
                        <h1 className='text-center py-4'>Seclect the avatar to Genrate the image</h1>
                        <Container className='px-5'>
                            <Row className='justify-content-center align-items-center'>
                                <Col lg={3} md={8} sm={12} xs={12}>
                                    <div className="preview">
                                        <img src={imgFile} alt="" className='my-3' />
                                    </div>
                                </Col>
                                <Col lg={2} md={4} sm={12} xs={12} className='fontPlus justify-content-center align-items-center d-flex'>
                                    <BiPlusMedical />
                                </Col>
                                <Col lg={7} md={12} sm={12} xs={12}>
                                    <Row>
                                        <Col>
                                            <div className={`genrate my-3 ${select === '1' ? 'selectImg' : ''}`}>
                                                <img src="/model/1.png" alt="" onClick={() => handleSelect('1')} />
                                            </div>
                                            <div className={`genrate my-3 ${select === '2' ? 'selectImg' : ''}`}>
                                                <img src="/model/2.png" alt="" onClick={() => handleSelect('2')} />
                                            </div>
                                        </Col>
                                        <Col className='mt-5'>
                                            <div className={`genrate my-3 ${select === '3' ? 'selectImg' : ''}`}>
                                                <img src="/model/3.png" alt="" onClick={() => handleSelect('3')} />
                                            </div>
                                            <div className={`genrate my-3 ${select === '4' ? 'selectImg' : ''}`}>
                                                <img src="/model/4.png" alt="" onClick={() => handleSelect('4')} />
                                            </div>
                                        </Col>
                                        <Col>
                                            <div className={`genrate my-3 ${select === '5' ? 'selectImg' : ''}`}>
                                                <img src="/model/5.png" alt="" onClick={() => handleSelect('5')} />
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <div className="d-flex py-5">
                                <button className='btn btn-dark fs-2 start-btn' onClick={handleGenrate}>Genrate Image</button>
                            </div>
                        </Container>
                    </div>
                </> : <>
                    <div className='center_main py-5 '>
                        <h1 className='text-center py-4'>Seclect the avatar to Genrate the image</h1>
                        <Container className='px-5'>
                            <Row>
                                <Col lg={7} className='my-4'>
                                    <div className="card p-4">
                                        <div className="imgDemo">
                                            <Capture setImgFile={setImgFile} />
                                        </div>
                                    </div>
                                </Col>
                                <Col className='my-4'>
                                    <div className="card p-4 drop">
                                        <h2 className='text-center'>Uplaod your photo</h2>
                                        <p className="text-center">Files uplaod JPG, PNG & HEIC</p>
                                        <input id='file' type="file" accept='image/*' className='d-none' onChange={changeFile} />
                                        {
                                            imgFile ? <label htmlFor='file' className="drag ">
                                                <img src={imgFile} alt="" />
                                            </label> : <label htmlFor='file' className="drag p-4">
                                                <BsFolderFill />
                                            </label>
                                        }
                                    </div>
                                    <div className="d-flex justify-content-center py-3">
                                        {files && <button className='btn btn-dark fs-2 upload-btn' onClick={uploadFile}>Upload</button>}
                                    </div>
                                </Col>
                            </Row>
                            <div className="d-flex py-5">
                                <button className='btn btn-dark fs-2 start-btn' onClick={handleStart} >Start Now</button>
                            </div>
                        </Container>
                    </div>
                </>
            }
        </> : <>
            <Result result={result} setResult={setResult} />
        </>
    )
}

export default Home