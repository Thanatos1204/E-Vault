import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './_app';
import Image from 'next/image'
import loopImg from '../public/LooperBG.svg'
import { Inter } from 'next/font/google'
import Head from 'next/head';
import styled from 'styled-components'
import Link from 'next/link';
import AuthContextProvider from '../context/AuthContext';


export const StyledHeading = styled.h1`
  font-size: 10rem;
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

export default function Home() {

  // if (typeof window !== 'undefined') {
  //   const root = createRoot(document.getElementById('root'));
  //   root.render(
  //     <AuthContextProvider>
  //       <App />
  //     </AuthContextProvider>
  //   );
  // }

  return (
    <main>

      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Outfit&display=swap" rel="stylesheet"/>
      </Head>
      <section className='buttons'>
        <div className='button-container'>
          <div className='right-regi-btns'>
              <Link href="/schemes">
                <div className='schemes' > View Schemes </div>
              </Link>
          </div>
            <div className='left-regi-btns'>
            <Link href="/signup">
              <div className='signUp' > Sign Up </div>
            </Link>
            <Link href="/login">
              <div className='logIn'> Log In </div>
            </Link>  
            </div>
        </div>    
          
      <style jsx>{`

        .button-container{
          display: flex;
          justify-content: flex-start;
        }

        .right-regi-btns{
          padding-right: 70rem;
          justify-self: center;
          text-align: center;
        }
        .schemes{
          padding:0.6rem 2rem;
          margin-top: 10px;
          border-radius: 10px;
          border: solid white 1px;
          
        }
        .left-regi-btns{
            display:flex;
            justify-content: flex-end;
            justify-self: center;
            text-align: center;            
          }
        .signUp{
          padding:0.6rem 2rem;
          margin-top: 10px;
          border-radius: 10px;
          border: solid white 1px;
        }
        .logIn{        
          padding:0.6rem 2rem;
          margin-top: 10px;
          border-radius: 10px;
          border: solid white 1px;
          margin-left: 10px;
          margin-right: 10px;
        }            
        `}</style>

      </section>
      <section className='hero-section'>
        <div className='hero-container'>
          <div className='title'>
            <StyledHeading>E-Vault</StyledHeading>
          </div>
          <div className='subtitle'>
            <h2>Get Your Files Secured</h2>
          </div>
          <div className='subtext'>
            <p>Our technology performing fast blockchain (120K TPS) and it has guaranteed AI-based data security. Proof of Stake, its consensus algorithm enables unlimited speeds.</p>
          </div>
        </div>

        <style jsx>{`
          .hero-container{
            font-family: 'Outfit', sans-serif;  
            display:flex;
            justify-content:center;
            align-items:center;
            flex-direction:column;
            padding-top: 100px;            
          }
          .title{
            padding-top: 1.5rem;
            padding-bottom: 0;
            font-size: 10rem;
            z-index: -4;
          }
          .subtitle{
            padding:0;
            margin-bottom: 30px;
            font-size: 5rem;
            z-index:-4;
          }
          .subtext{
            padding-top: 1.6rem;
            font-size: 1.2rem;
            font-weight: 300;
          }
          
        `}</style>
      </section>
      <section className='bottom'>
        <div className='looperImg'>
          <div className="opacity_div"></div>
          <Image
            src={loopImg}
            alt="background ui"
            className='backgroundUI'
            width={1550}
            height={1000}
            
          />
          <style jsx>{`
              .looperImg{
                position: absolute;                          
                bottom:0;
                right:0;
                filter: brightness(300%);
                filter: opacity(60%);
                z-index:-3;                
              }
              {/* .opacity_div{
                background:#fff;
                height:200px;
                width:200px;
                position:absolute;
                top:0px;
                left: 0px;                
                opacity:1; 
                visibility: visible;
                z-index: 1;
              }
              .opacity_div:hover{
                visibility: hidden;               
                background: #000;
              } */}
              
          `}</style>          
        </div>
      </section>
      
    </main>
  )
}

