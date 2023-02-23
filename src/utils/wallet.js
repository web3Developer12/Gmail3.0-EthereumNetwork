import { ethers } from "ethers";
const getAuthorizedAccounts= async(stateSetter)=>{
    const {ethereum} = window;
    if(ethereum){
      const accounts = await ethereum.request({method:'eth_accounts'});
      if(accounts.length !== 0){
          stateSetter(accounts[0])
          return accounts[0]
      }

    }
}

const connectAuthorizedAccounts= async(stateSetter)=>{
    const {ethereum} = window;
    if(ethereum){

      const accounts = await ethereum.request({method:'eth_requestAccounts'});
      if(accounts.length !== 0){
          stateSetter(accounts[0])
      }
    }
}

export {getAuthorizedAccounts,connectAuthorizedAccounts}