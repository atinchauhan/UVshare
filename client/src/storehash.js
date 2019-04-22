import Web3 from 'web3';
const address = '0x19fAb6b99F3bCB56eb547B7a9E00F3b3a86d508E';
const abi=[
    {
      "constant": false,
      "inputs": [
        {
          "name": "x",
          "type": "string"
        }
      ],
      "name": "set",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
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
      "type": "function"
    }
  ];
  //export default new Web3.eth.Contract(abi, address);