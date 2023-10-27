import { NextPage } from "next";
import Layout from '../components/layout'
import Image from 'next/image';
import styled from 'styled-components'
import Head from "next/head";
import bgui from '../public/group4.png';
import { useRouter } from "next/router";
import { ChangeEvent, MouseEvent } from "react";
import React, { useState , useEffect } from 'react';
import { signOut } from "../src/lib/firebase/auth";
import { onAuthStateChanged } from "../src/lib/firebase/auth";
import { db } from '../src/lib/firebase/config'
import { collection,getDoc,doc } from "firebase/firestore";
import { updatefile } from "../src/lib/firebase/auth";


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
    const response = await updatefile(formname,formID);
    if(response){
        Router.push("/uploader");            
    }
  }

  useEffect(()=>{
    onAuthStateChanged(async (user) => {
        if(user){
            Router.push("/uploader");
        }
    });
  },[]);

  // useEffect(() => {
  //   const unlisten = onAuthStateChanged(async (authUser) => {
  //     if (authUser) {
  //       try {
  //         const docSnap = await getDoc(doc(db, "user-data", authUser.uid));
  //         setUser(docSnap.data());
  //       } catch (error) {
  //         console.error('Error fetching user data:', error);
  //       }
  //     } else {
  //       Router.push("/");
  //     }
  //   });

  //   return () => {
  //     unlisten(); // Clean up the listener when the component unmounts
  //   };
  // }, [Router,db,user]);
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
                
                  <button className="signout-btn" onClick={signOut}>Sign Out</button>
                    <StyledHeading><h1 className="titles">Upload Your Files</h1></StyledHeading>
                <div className="container">
                        <form action="">
                            <input minLength="3" name="form-name" value={formname} onChange={(event) => setFormname(event.currentTarget.value)} id="form-name" type="text" placeholder='Form-Name' required></input><br/>
                            <input minLength="3" name="form-id" value={formID} onChange={(event) => setFormID(event.currentTarget.value)} id="form-id" type="text" placeholder='Form-ID' required></input><br/>
                            <input className="choose-file-btn" value={file}  name="file" type="file"></input><br/>
                            <input className="upload-files-btn" onClick={handleSubmit} name="upload" type="submit"></input>
                            <input className="upload-files-btn" name="Cancel" type="submit" value="Cancel"></input>
                        </form>
                </div>        
                
                <style jsx>{`
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