import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./utils/getWeb3";
import Web3 from 'web3';
import {Link} from "react-router-dom";
import ipfs from './ipfs';

import "./App.css";
var hash=[];
const abiDecoder = require('abi-decoder');
const test=[
    {
      "constant": false,
      "inputs": [
        {
          "name": "x",
          "type": "string"
        },
        {
          "name": "y",
          "type": "bool"
        }
      ],
      "name": "set",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0xba0ff22c"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "get",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x6d4ce63c"
    }
  ];

abiDecoder.addABI(test);





class A extends Component {


state = { ipfsHash:' ',web3: null, accounts: null, contract: null ,buffer:null, ethAddress:'',
      transactionHash:'',
      txReceipt: '',vid:false};



  componentDidMount = async () => {
    try {
 
      const web3 = await getWeb3();

      
      const accounts = await web3.eth.getAccounts();

      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );
        this.simpleStorageInstance=instance;

        this.captureFile = this.captureFile.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
        var num=0;
       await web3.eth.getBlockNumber(function(error, result){ 
          if (!error)
            console.log("block number => "+result);
            num=result;
     
            
        });

     var j=0;
        for(var i=0;i<=num;i++){

         // let children=[];
          var block =await web3.eth.getBlock(i, true);
          if (block != null && block.transactions != null){
            block.transactions.forEach( function(e) {
                const testData=e.input;
                 
                const decodedData=abiDecoder.decodeMethod(testData);
                console.log(decodedData);
              
                 if(decodedData!=null){
                  //console.log(decodedData.params[0].value);
                 // vhash[k]=decodedData.params[0].value;
                  hash[j]=decodedData.params[0].value;
                  j++;
                 }
            })
          } 
          else{
            console.log("null");
          }
        }
        console.log('hash '+ hash);
        this.setState({ web3:web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };


 


  runExample = async () => {
    const { accounts, contract } = this.state;


   
    const response= this.simpleStorageInstance.methods.get.call(accounts[0]);
   


    this.setState({ ipfsHash: response });
  };
   

    captureFile=(event)=>{
    
    event.preventDefault();
    const file=event.target.files[0]
        const  fileType = file['type'];
   const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
if (!validImageTypes.includes(fileType)) {
    this.setState({ vid: true });
}
else
{this.setState({ ipfsHash: false });}
    const reader=new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend=()=>{
      this.setState({buffer: Buffer(reader.result)})
      console.log('buffer',this.state.buffer)
    }

  }
      /*onClick = async () => {
          try{
                  this.setState({blockNumber:"waiting.."});
                  this.setState({gasUsed:"waiting..."});
                 // const receipt = this.state.web3.eth.getTransactionReceipt(this.state.transactionHash) .then(console.log);
          await this.state.web3.eth.getTransactionReceipt(this.state.transactionHash, (err, txReceipt)=>{

                    this.setState({txReceipt});
                    console.log(err,txReceipt);
            
                   
                  });


                }

          catch(error){
                console.log(error);
              }
              <p onClick = {this.onClick}> Get Transaction Receipt </p>
          }*/




 onSubmit=async(event)=> {


    event.preventDefault();
    const accounts = await this.state.web3.eth.getAccounts();
          const ethAddress= 0x6c31548970C7f70bb03910c6db9dC1ac563237e0;
      this.setState({ethAddress});

    await ipfs.files.add(this.state.buffer, (error, result) => {
      if(error) {
        console.error(error)
        return
      }



            this.setState({ipfsHash:result[0].hash });
         console.log('ifpsHash', this.state.ipfsHash);
         console.log('isvideo', this.state.vid);
          
          this.simpleStorageInstance.methods.set(result[0].hash,this.state.vid).send({from:this.state.accounts[0]},(error, transactionHash) => {
          console.log(transactionHash);

          this.setState({transactionHash});
        });
      })
    };





  render() {
    var hashList = hash.map(function(name){

                       // return <li><img src={`https://ipfs.io/ipfs/${name}`} width={500} height={300} mode='fit' alt=""/></li>;
                        return <div className="content-grid"><video width="200" height="200" controls>
                          <source src={`https://ipfs.io/ipfs/${name}`}  type="video/mp4"/>
                          <source src={`https://ipfs.io/ipfs/${name}`}  type="video/ogg"/>
                          Your browser does not support the video tag.
                        </video></div>;
                        });


                      


    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
    <div>
     <div className="App">{hashList}</div>
      <div className="App">
              
  
        
       
        <form  onSubmit={this.onSubmit}>
         <input type ='file'  onChange={this.captureFile}/>
         <input type ='submit' />
          
         </form>
  



      </div>
      </div>
    );
  }
}

export default A;
