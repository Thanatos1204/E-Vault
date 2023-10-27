import Layout from '../components/layout'
import Link from 'next/link'
import Image from 'next/image';
import styled from 'styled-components'
import bgui from '../public/group4.png';
import { login, onAuthStateChanged } from '../src/lib/firebase/auth';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import gencert from "../../E-certificate req/Certifcate/CertificateGenerator";

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

export default function Certificategen(){

    return(
        <Layout pageTitle="Signup" >
            <Link href="/"><span className='homeButton'>Home</span></Link><br/>    
            <Image
                src={bgui}
                layout='fill'
                objectFit='cover'
                quality={100}
                style={{
                    zIndex: -3,
                }}
                ></Image>
         <div className='form-container'> 
                <h2 className='formTitle'><StyledHeading>Certificate Generator</StyledHeading></h2>
                <form action='/api/signup' className='form-content' method='POST'>
                    <input minLength="3" name="username" id="username" type="text" placeholder='Enter Your Name'  required></input><br/>                                       
                    <input type="submit" className='sbmt-btn' onClick={gencert} value="Generate"/>
                </form>
            </div>
            <style jsx>{`
                .form-container{
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    z-index: 3;                    
                    font-family: 'Outfit', sans-serif;                      
                }
                .homeButton{
                    background-color: rgb(255, 255, 255);
                    color: rgb(0, 0, 0);
                    border-radius: 10px;
                    padding: 1em 1em;
                    
                }
                .formTitle{
                    padding: 3rem 0rem;                    
                }
                .form-content{
                    font-size: 2rem;
                }
                .form-content>input{
                    padding: 0.6em 0.6em;
                    background-color: black;
                    color: white;
                    margin: 1px;
                }
                .sbmt-btn{
                    padding:0.6rem 2rem;
                    margin-top: 10px;
                    border-radius: 10px;
                    border: solid white 1px;
                    margin-left: 100px !important;
                }
            `}</style>

        </Layout>        
    );
}