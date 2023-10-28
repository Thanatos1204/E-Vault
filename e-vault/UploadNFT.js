const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
require('dotenv').config();
const { FileNameFromPath } = require('./name-splitter');

const JWT = process.env.PINATA_JWT;
async function uploadFileToIPFS(file){
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxBodyLength: "Infinity",
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          'Authorization': `Bearer ${JWT}`
        }
      });
      console.log(res.data.IpfsHash)
      return res.data.IpfsHash;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

const main = async (username) => {
 


  // Upload the image
  const imageFilePath = `img/${username}.jpg`;
  const imageFile = fs.createReadStream(imageFilePath);
  const imageIpfsHash = await uploadFileToIPFS(imageFile);
  const fetchimage = await `https://azure-attractive-ladybug-812.mypinata.cloud/ipfs/${imageIpfsHash}?_gl=1*1joboqc*_ga*MTU5MzA4NzAxMy4xNjk1MTAwNTAw*_ga_5RMPXG14TE*MTY5ODQ0ODc5NC4xNS4wLjE2OTg0NDg3OTQuNjAuMC4w1`;
  const fileNameWithExtension = FileNameFromPath(imageFilePath);
  console.log('Image IPFS name:', fileNameWithExtension);
  
  if (imageIpfsHash) {
    // Create and upload metadata JSON with the image IPFS hash
    const metadata = {
      name: 'NFT Name',
      description: 'NFT Description',
      image: `ipfs://${imageIpfsHash}`, // Link to the uploaded image
    };
    
    const metadataFilePath = `${fileNameWithExtension}.json`;
    fs.writeFileSync(metadataFilePath, JSON.stringify(metadata, null, 2));
    
    const metadataFile = fs.createReadStream(metadataFilePath);
    await uploadFileToIPFS(metadataFile);
    console.log('Files are uploaded to IPFS named',fileNameWithExtension)
    // Clean up temporary metadata file
    fs.unlinkSync(metadataFilePath);

    return (`ipfs://${imageIpfsHash}/?filename=${fileNameWithExtension}.json`, fetchimage);
  }
}

module.exports = main
