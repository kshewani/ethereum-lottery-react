// import Web3 from 'web3';

// const web3 = new Web3(window.web3.currentProvider);

// export default web3;


import Web3 from "web3";
 
window.ethereum.request({ method: "eth_requestAccounts" });
 
const web3 = new Web3(window.ethereum);
console.log('test');
export default web3;


// import Web3 from 'web3';
// //const Web3 = require("web3");
// const ethEnabled = async () => {
//   if (window.ethereum) {
//     await window.ethereum.send('eth_requestAccounts');
//     window.web3 = new Web3(window.ethereum);
//     return true;
//   }
//   return false;
// }

// const web3 = ethEnabled

// export default web3;