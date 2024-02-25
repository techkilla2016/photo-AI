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
    const { name } = event.target
    if (name !== 'model') {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        const base64String = reader.result;
        setCaptureFile(base64String);
      };
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        const base64String = reader.result;
        setUploadFile(base64String);
      };
    }
    setFiles(file)
  }

  // upload Image file 
  const uploadFile = () => {

  }


  const handleEnhance = (encodedImage) => {

    setResult(`data:image/webp;base64,${encodedImage}`)
    setIsLoad(false)

    // const API_KEY = 'wxjv437sjsyiv6u77';
    // const formData = new FormData();
    // formData.append('sync', '1');
    // formData.append('image_base64', encodedImage);
    // formData.append('type', 'face');

    // axios.post('https://techhk.aoscdn.com/api/tasks/visual/scale', formData, {
    //   headers: {
    //     'X-API-KEY': API_KEY,
    //   },
    // }).then(response => {
    //   console.log(response.data?.data?.image);
    //   setResult(response.data?.data?.image)

    //   setIsLoad(false)
    // }).catch(error => {
    //   console.log(error)
    // });
  }


  const handleGenrate = async () => {
    const api = 'https://e9d8-103-17-110-127.ngrok-free.app/rec';
    setIsLoad(true)
    try {
      const res = await axios.post(api, {
        image: captureFile.split(',')[1],
        choice: UploadFile.split(',')[1],
      })
      handleEnhance(res.data?.result)
    } catch (error) {
      console.log(error)
      alert("Something Wrong")
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
              {/* <Col lg={7} className='my-4'>
                <div className="card p-4">
                  <div className="imgDemo">
                    <Capture setUploadFile={setCaptureFile} />
                  </div>
                </div>
              </Col> */}
              <Col className='my-4'>
                <div className="card p-4 drop">
                  <h2 className='text-center'>Uplaod model photo</h2>
                  <p className="text-center">Files uplaod JPG, PNG & HEIC</p>
                  <input id='file' type="file" name="model" accept='image/*' className='d-none' onChange={changeFile} />
                  {
                    UploadFile ? <label htmlFor='file' className="drag ">
                      <img src={UploadFile} alt="" />
                    </label> : <label htmlFor='file' className="drag p-4">
                      <BsFolderFill />
                    </label>
                  }
                </div>
                {/* <div className="d-flex justify-content-center py-3">
                  {files && <button className='btn btn-dark fs-2 upload-btn' onClick={uploadFile}>Upload</button>}
                </div> */}
              </Col>

              <Col className='my-4'>
                <div className="card p-4 drop">
                  <h2 className='text-center'>Uplaod your photo</h2>
                  <p className="text-center">Files uplaod JPG, PNG & HEIC</p>
                  <input id='file1' type="file" name="" accept='image/*' className='d-none' onChange={changeFile} />
                  {
                    captureFile ? <label htmlFor='file1' className="drag ">
                      <img src={captureFile} alt="" />
                    </label> : <label htmlFor='file1' className="drag p-4">
                      <BsFolderFill />
                    </label>
                  }
                </div>
                {/* <div className="d-flex justify-content-center py-3">
                  {files && <button className='btn btn-dark fs-2 upload-btn' onClick={uploadFile}>Upload</button>}
                </div> */}
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
