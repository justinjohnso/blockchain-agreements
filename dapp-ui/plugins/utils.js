import DocAgreementsABI from './docagreementsABI'
const Web3 = require('web3')

let metamaskWeb3 = new Web3('http://localhost:8545')
let account = null
let docagreementsContract
let docagreementsContractAddress = '' // Paste Contract address here

export function web3() {
  return metamaskWeb3
}

export const accountAddress = () => {
  return account
}

export async function setProvider() {
  if (window.ethereum)
  {
    metamaskWeb3 = new Web3(ethereum);
    try{
    // Request account access if needed
    await ethereum.enable();
    }
    catch (error){
    // User denied account access...
    }
  }
  else if (window.web3){
      metamaskWeb3 = new Web3(web3.currentProvider);
  }
  account = await metamaskWeb3.eth.getAccounts()
}


function getDocAgreementContract() {
  docagreementsContract = docagreementsContract || new metamaskWeb3.eth.Contract(DocAgreementsABI.abi, docagreementsContractAddress)
  return docagreementsContract
}


export async function publishDocument(name, content, signer) {
  const prop = await getDocAgreementContract().methods.publishDocument(name, content, signer).send(
    {from: account[0]
  })
  alert('Document Posted Successfully')
}

export async function signDocument(docId) {
  const prop = await getDocAgreementContract().methods.signDocument(docId).send(
    {from: account[0]})
  alert('Document Signed Successfully')
}

// unsure how to get this to work
// export async function isDocumentSigned() {
//   const prop = await getDocAgreementContract().methods.signDocument(docId).send(
//     {from: account[0]})
//     alert('Document Signed Successfully')
// }
