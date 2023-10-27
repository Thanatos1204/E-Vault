import { NextPage } from "next";
import Layout from '../components/layout'
import Image from 'next/image';
import styled from 'styled-components'
import Head from "next/head";
import bgui from '../public/group4.png';
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, MouseEvent } from "react";
import React, { useState , useEffect } from 'react';
import { signOut } from "../src/lib/firebase/auth";
import { onAuthStateChanged } from "../src/lib/firebase/auth";
import { db } from '../src/lib/firebase/config'
import { collection,getDoc,doc } from "firebase/firestore";
import { updatefile } from "../src/lib/firebase/auth";
import uploadFileToStorage from '../src/lib/firebase/auth';

export const StyledHeading = styled.h1`
  font-size: 5rem;  
  background: -webkit-gradient(
    linear,
    left top,
    right top,
    from(#FF00FA),
    to(#95CDFF)
  );
  background: linear-gradient(175deg,#00C2FF,#FF00FA);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
  text-shadow: none;
`;  




export default function Uploader(){

  const Router = useRouter();
  const [user, setUser] = useState(null);
  const [formname,setFormname] = useState("");
  const [formID, setFormID] = useState("");
  const [file, setFile] = useState(null);

  async function handleSubmit(e){
    e.preventDefault();
    const response = await updatefile(file,formname,formID);    
    if(response){
        Router.push("/mydocuments");            
    }
    
  }

  useEffect(()=>{
    onAuthStateChanged(async (user) => {
        if(user){
            Router.push("/uploader");
        }
    });
  },[]);

  async function handleSubmit2(e){
    e.preventDefault();
    Router.push("/mydocuments")
  }

  async function handleSubmit3(e){
    e.preventDefault();
    const response = await signOut();
    Router.push("/");
  }

 
  //   const [file, setFile] = useState(null);
  //   const [previewUrl, setPreviewUrl] = useState(null);

  //   const onFileUploadChange = (e) => {
  //   const fileInput = e.target;

  //   if (!fileInput.files) {
  //     alert("No file was chosen");
  //     return;
  //   }

  //   if (!fileInput.files || fileInput.files.length === 0) {
  //     alert("Files list is empty");
  //     return;
  //   }

  //   const file = fileInput.files[0];
  //   console.log(file);
  //   console.log(file.type)

  //   /** File validation */
  //   if (!file.type.startsWith("image")) {
  //     alert("Please select a valid image");
  //     return;
  //   }
    

  //   /** Setting file state */
  //   setFile(file);
  //   setPreviewUrl(URL.createObjectURL(file));
  //   console.log(previewUrl)
  //   e.currentTarget.type = "text";
  //   e.currentTarget.type = "file";
  // };

  // const onCancelFile = (e) => {
  //   e.preventDefault();
  //   console.log("From onCancelFile");
  // };

  // const onUploadFile = (e) => {
  //   e.preventDefault();
  // };

    return(       

        <Layout pageTitle="Upload">

            <Image
                src={bgui}
                layout='fill'
                objectFit='cover'
                quality={100}
                style={{
                    zIndex: -3,
                }}
                ></Image>
            <Head>
                <title>File Uploader</title>
                <meta name="description" content="file uploader"></meta>                
            </Head>
            <main>

            <div className='signout-btn'>
              <Link href="/schemes">
                <p className='schemes'> View Schemes </p>
              </Link>
            </div>
            <div className='signout-btn'>
              <Link href="/certifcategen">
                <p className='schemes'> Generate Certificates </p>
              </Link>
            </div>
                
                  <button className="signout-btn" onClick={handleSubmit3}>Sign Out</button>
                    <StyledHeading><h1 className="titles">Upload Your Files</h1></StyledHeading>
                <div className="container">
                        <form action="">
                            <input minLength="3" name="form-name" value={formname} onChange={(event) => setFormname(event.currentTarget.value)} id="form-name" type="text" placeholder='Form-Name' required></input><br/>
                            <input minLength="3" name="form-id" value={formID} onChange={(event) => setFormID(event.currentTarget.value)} id="form-id" type="text" placeholder='Form-ID' required></input><br/>
                            <input className="choose-file-btn"  onChange={(event) => setFile(event.currentTarget.files[0])} name="file" type="file"></input><br/>
                            <input className="upload-files-btn" onClick={handleSubmit} name="upload" type="submit"></input>
                            <input className="upload-files-btn" onClick={handleSubmit2} name="view documents" type="submit" value="Show Documents"></input>
                        </form>
                </div>        
                
                <style jsx>{`
                    .schemes{
                        text-align: center;  
                    }
                    .titles{
                        padding-left: 50rem;
                    }
                    .signout-btn{
                        padding:0.6rem 2rem !important;
                        margin-top: 10px !important;
                        border-radius: 10px !important;
                        border: solid white 1px !important;
                        margin-left: 20px !important;
                    }
                    .container{
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-size: 1.3rem;
                        padding-top: 7rem;                       
                    }
                    .container>form>input{
                       margin: 1rem;
                       background-color: black;
                       color: white;
                       padding: 0.5rem;
                    }
                    .choose-file-btn{
                        background-color: transparent !important;
                    }
                    .upload-files-btn{
                        padding:0.6rem 2rem !important;
                        margin-top: 10px !important;
                        border-radius: 10px !important;
                        border: solid white 1px !important;
                        margin-left: 20px !important;
                    }
                
                `}</style>
            </main>
            
        </Layout>
    )
}