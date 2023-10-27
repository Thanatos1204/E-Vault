import Layout from '../components/layout'
import Link from 'next/link'
import Image from 'next/image';
import styled from 'styled-components'
import bgui from '../public/group4.png';
import { login, onAuthStateChanged } from '../src/lib/firebase/auth';
import { useState } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

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

export default function Login( {username} ) {
    const Router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e){
        e.preventDefault();
        const response = await login(email,password);
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

    return (
        <Layout pageTitle="Login" >
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
                <h2 className='formTitle'><StyledHeading>Log In</StyledHeading></h2>
                <form action='/api/signup' className='form-content' method='POST'>
                    <input minLength="3" name="username" id="username" type="text" placeholder='Username' required></input><br/>
                    <input minLength="3" name="email" id="email" value={email} onChange={(event) => setEmail(event.currentTarget.value)} type="email" placeholder='Email' required></input><br/>
                    <input minLength="5" name="password" id="password" value={password} onChange={(event) => setPassword(event.currentTarget.value)} type="password" placeholder='Password' required></input><br/>                    
                    <input type="submit" className='sbmt-btn' onClick={handleSubmit} value="Log In"/>
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
                    margin-left: 145px !important;
                }
            `}</style>
        </Layout>
    );
}

