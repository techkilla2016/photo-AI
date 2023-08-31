import Link from 'next/link'
import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { BsFolderFill } from 'react-icons/bs'
import { BiPlusMedical } from 'react-icons/bi'
import axios from 'axios'
import Capture from '@/components'
import Result from '@/components/Result'
const Home = () => {
  const [isLoad, setIsLoad] = useState(false)


  const [UploadFile, setUploadFile] = useState('')
  const [captureFile, setCaptureFile] = useState('')

  const [files, setFiles] = useState()
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
      setUploadFile(base64String);
    };
  }

  // select Template 
  const handleStart = () => {
    console.log(UploadFile.split(',')[0])
    if (UploadFile) {
      // setIsUpload(true)
    }
  }


  const handleGenrate = async () => {
    setIsLoad(true)
    try {
      const res = await axios.post('https://71dc-103-17-110-126.ngrok-free.app/rec', {
        image: captureFile.split(',')[1],
        choice:  UploadFile.split(',')[1],
      })
      setResult('data:image/jpeg;base64,' + res.data?.result)
      setIsLoad(false)
    } catch (error) {
      console.log(error?.message)
      setIsLoad(false)
    }
  }

  return (
    <>

      {
        isLoad && <div className="isLoad">
          <div class="spinner-border text-light" role="status">
          </div>
        </div>
      }
      {
        !result ? <div className='center_main py-5 '>
          <h1 className='text-center py-4'>Seclect the avatar to Genrate the image</h1>
          <Container className='px-5'>
            <Row>
              <Col lg={7} className='my-4'>
                <div className="card p-4">
                  <div className="imgDemo">
                    <Capture setUploadFile={setCaptureFile} />
                  </div>
                </div>
              </Col>
              <Col className='my-4'>
                <div className="card p-4 drop">
                  <h2 className='text-center'>Uplaod your photo</h2>
                  <p className="text-center">Files uplaod JPG, PNG & HEIC</p>
                  <input id='file' type="file" accept='image/*' className='d-none' onChange={changeFile} />
                  {
                    UploadFile ? <label htmlFor='file' className="drag ">
                      <img src={UploadFile} alt="" />
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
              <button className='btn btn-dark fs-2 start-btn' onClick={handleGenrate} >Genrate AI</button>
            </div>
          </Container>
        </div> : <Result result={result} setResult={setResult} />
      }
    </>



    // !result ? <>
    //   

    //   {
    //     isUpload ? <>
    //     </> : <>

    //     </>
    //   }
    // </> : <>
    //   
    // </>
  )
}

export default Home