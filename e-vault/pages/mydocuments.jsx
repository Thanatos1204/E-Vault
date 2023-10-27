import { NextPage } from "next";
import Link from "next/link";
import Layout from '../components/layout'
import { getFirestore } from "firebase/firestore";
import Router from "next/router";
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
import { collection,getDocs,doc } from "firebase/firestore";
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

export default function Mydocuments(){

    const [userData, setUserData] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        const firestore = getFirestore();
        const userCollectionRef = collection(firestore, 'users'); // Only the collection name
  
        try {
          const querySnapshot = await getDocs(userCollectionRef);
          const userDataArray = querySnapshot.docs.map(doc => doc.data());
          setUserData(userDataArray);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
  
      fetchData();
    }, []);
    console.log(userData);
    return (
        <Layout pageTitle="MyDocuments" >
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

            <div>
                <p className="container-table upper">Name:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Age:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Income:</p>
                {userData &&
                    userData.map((user, index) => (
                    <div key={index} className="container-table">
                        {user.Name && <p> {user.Name}</p>}
                        {user.Age && <p> {user.Age}</p>}
                        {user.Income && <p> {user.Income}</p>}
                    </div>
                    ))}
            </div>
            <style jsx>{`
                .upper{
                    
                }
                .container-table{
                    display: flex;
                    color: black;
                    justify-content: center;
                    align-items: center;
                    background-color: white;
                    width: 50%;
                    margin: auto;
                    
                }
                .container-table>p{
                    font-size: 1.3rem;
                    border: solid black 2px;
                    text-align: center;
                    padding: 0.6em 0.6em;
                    margin: 1rem;
                }
                
                `}</style>
         </Layout>       
        )
}