import Layout from '../components/layout'
import Link from 'next/link'
import Image from 'next/image';
import { useRouter } from 'next/router';
import styled from 'styled-components'
import bgui from '../public/group4.png';
import { register ,onAuthStateChanged } from '../src/lib/firebase/auth';
import { getAuth } from "firebase/auth";
import React,{ useState,useEffect } from 'react';
import { collection, getDoc, doc } from 'firebase/firestore';
import {signInWithGoogle, signOut } from '../src/lib/firebase/auth'
import { db } from '../src/lib/firebase/config';

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

export default function SignupPage( {} ) {
    const Router = useRouter()
    //const db = firebase.firestore();
    const [uname,setUname] = useState("");
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState(null);
    const[income,setIncome] = useState(null);
    const [state , setState] = useState("");
    const auth = getAuth();
    

      async function handleSubmit(e){
        e.preventDefault();
        const response = await register(uname,email,password,age,income,state);
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
                <h2 className='formTitle'><StyledHeading>Sign up</StyledHeading></h2>
                <form action='/api/signup' className='form-content' method='POST'>
                    <input minLength="3"  value={uname} onChange={(event) => setUname(event.currentTarget.value)} name="username" id="username" type="text" placeholder='Username' required></input><br/>
                    <input maxLength="3" value={age} onChange={(event) => setAge(event.currentTarget.value)} name="age" id="age" type="number" placeholder='Age' required></input><br/>
                    <input value={income} onChange={(event) => setIncome(event.currentTarget.value)} name="income" id="income" type="number" placeholder='Income' required></input><br/>
                    <label for="state">State: </label>
                    <select id="state" name="state" value={state} onChange={(event) => setState(event.currentTarget.value)} >
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                        <option value="Assam">Assam</option>
                        <option value="Bihar">Bihar</option>
                        <option value="Chhattisgarh">Chhattisgarh</option>
                        <option value="Goa">Goa</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Haryana">Haryana</option>
                        <option value="Himachal Pradesh">Himachal Pradesh</option>
                        <option value="Jharkhand">Jharkhand</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Kerala">Kerala</option>
                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                        <option value="Maharashtra" selected>Maharashtra</option>
                        <option value="Manipur">Manipur</option>
                        <option value="Meghalaya">Meghalaya</option>
                        <option value="Mizoram">Mizoram</option>
                        <option value="Nagaland">Nagaland</option>
                        <option value="Odisha">Odisha</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Sikkim">Sikkim</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Telangana">Telangana</option>
                        <option value="Tripura">Tripura</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="Uttarakhand">Uttarakhand</option>
                        <option value="West Bengal">West Bengal</option>
                    </select><br/>
                    <input minLength="3" name="email" id="email" value={email} onChange={(event) => setEmail(event.currentTarget.value)} type="email" placeholder='Email' required></input><br/>
                    <input minLength="5" name="password" id="password" value={password} onChange={(event) => setPassword(event.currentTarget.value)} type="password" placeholder='Password' required></input><br/>
                    <input minLength="5" name="passwordagain" id="passwordagain" type="password" placeholder='Confirm Password' required></input><br/>
                    <input type="submit" onClick={handleSubmit} className='sbmt-btn' value="Sign Up"/>                    
                </form>
                <form>
                    <input type="submit" onClick={signInWithGoogle} className='sbmt-btn' value="Sign Up With Google"/>
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
                .form-content>select{
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
                    margin-left: 140px !important;
                }
            `}</style>
        </Layout>
    );
}

