import { NextPage } from "next";
import Layout from '../components/layout'
import styled from 'styled-components'
import Head from "next/head";

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
    return(
        <Layout pageTitle="Upload">
            <Head>
                <title>File Uploader</title>
                <meta name="description" content="file uploader"></meta>                
            </Head>
            <main>

                    <StyledHeading><h1 className="titles">Upload Your Files</h1></StyledHeading>
                <div className="container">
                        <form action="">
                            <input minLength="3" name="username" id="username" type="text" placeholder='Username' required></input><br/>
                            <input className="choose-file-btn" name="file" type="file"></input>
                        </form>
                </div>        
                
                <style jsx>{`
                    .titles{
                        padding-left: 50rem;
                    }
                    .container{
                        display: flex;
                        justify-content: center;
                        align-items: center;                       
                    }
                    .choose-file-btn{
                        padding-top: 8rem;
                        padding-right: 50rem;
                        padding-left: 1rem;
                        border: solid white 1px;
                        padding-bottom: 2rem;
                    }
                
                `}</style>
            </main>
            
        </Layout>
    )
}