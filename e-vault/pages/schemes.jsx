import React, { useState, useEffect } from "react";
import Link from "next/link";
import { NextPage } from "next";
import Layout from '../components/layout'
import Image from 'next/image';
import styled from 'styled-components'
import Head from "next/head";
import bgui from '../public/group4.png';
import { useRouter } from "next/router";
import { ChangeEvent, MouseEvent } from "react";

import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { signOut } from "../src/lib/firebase/auth";
import { onAuthStateChanged } from "../src/lib/firebase/auth";
import { db } from '../src/lib/firebase/config'
import { collection,getDoc,doc } from "firebase/firestore";
import { updatefile } from "../src/lib/firebase/auth";
import uploadFileToStorage from '../src/lib/firebase/auth';
export default function SchemePage() {

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

    const indianStates = [
      {
        stateName: "Maharashtra",
        schemes: [
          {
            schemeName: "Mahatma Jyotirao Phule Shetkari Karj Mukti Yojana",
            schemeLink: "https://agri.maharashtra.gov.in/",
          },
          // Add more schemes for Maharashtra if available
        ],
      },
      {
        stateName: "Madhya Pradesh",
        schemes: [
          {
            schemeName: "Kisan Kalyan Yojana",
            schemeLink: "https://mpkrishi.mp.gov.in/",
          },
          // Add more schemes for Madhya Pradesh if available
        ],
      },
      {
        stateName: "Gujarat",
        schemes: [
          {
            schemeName: "Mukhyamantri Kisan Sahay Yojana",
            schemeLink: "https://ikhedut.gujarat.gov.in/",
          },
          // Add more schemes for Gujarat if available
        ],
      },
      {
        stateName: "Rajasthan",
        schemes: [
          {
            schemeName: "Mukhyamantri Kisan Mitra Yojana",
            schemeLink: "https://agriculture.rajasthan.gov.in/content/raj/agriculture/department-of-agriculture/hi/schemes/hon'ble-chief-minister-farmer-friend-scheme.html",
          },
          // Add more schemes for Rajasthan if available
        ],
      },
      {
        stateName: "Uttar Pradesh",
        schemes: [
          {
            schemeName: "Kisan Rin Mochan Yojana",
            schemeLink: "https://upagripardarshi.gov.in/kisan-mitra",
          },
          // Add more schemes for Uttar Pradesh if available
        ],
      },
      {
        stateName: "Tamil Nadu",
        schemes: [
          {
            schemeName: "Uzhavan (Farmer) Smart Card Scheme",
            schemeLink: "https://www.tn.gov.in/scheme/data_view/79534",
          },
          // Add more schemes for Tamil Nadu if available
        ],
      },
      {
        stateName: "Kerala",
        schemes: [
          {
            schemeName: "Krishi Bhavan Schemes",
            schemeLink: "https://www.krishibhavankerala.org/schemes/",
          },
          // Add more schemes for Kerala if available
        ],
      },
      {
        stateName: "Punjab",
        schemes: [
          {
            schemeName: "Mukh Mantri Khet Saini Yojana",
            schemeLink: "http://agripb.gov.in/agri/",
          },
          // Add more schemes for Punjab if available
        ],
      },
      {
        stateName: "West Bengal",
        schemes: [
          {
            schemeName: "Krishak Bandhu Scheme",
            schemeLink: "https://krishakbandhu.net/",
          },
          // Add more schemes for West Bengal if available
        ],
      },
      {
        stateName: "Telangana",
        schemes: [
          {
            schemeName: "Rythu Bandhu Scheme",
            schemeLink: "https://rythubandhu.telangana.gov.in/",
          },
          // Add more schemes for Telangana if available
        ],
      },
      // Add more states with their respective schemes
    ];
    

  // const filteredData = userData.filter(user => {
  //   const userState = user.State;
  //   return indianStates.some(state => state.stateName === userState);
  // });
  
      return (
        <div>
      {indianStates.map((state, index) => (
        <div key={index} className="container">
          <h2>{state.stateName}</h2>
          <ul>
            {state.schemes && state.schemes.map((scheme, i) => (
              <li key={i}>
                <a href={scheme.schemeLink} target="_blank" rel="noreferrer">Scheme: {scheme.schemeName}</a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    

      
    
 
      <style jsx>{`
        .container{
          color: white;
          font-size: 1rem;          
        }
        
        `}</style>
    </div>
  );
        
      
}
