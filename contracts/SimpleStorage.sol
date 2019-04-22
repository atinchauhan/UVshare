pragma solidity ^0.5.0;

contract SimpleStorage {

  string ipfsHash="";
  bool vid=false;

  function set(string memory x, bool y) public {
    ipfsHash= x;
    vid=y;

  }

  function get() public view returns (string memory) {
    return ipfsHash;
  }
}
