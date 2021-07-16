import { CONTRACT_ADDRESS } from '../config';
import DocAgreementsABI from "./DocAgreementsABI.json";

export async function initiateAgreement(web3) {
    const docAgreement = new web3.eth.Contract(DocAgreementsABI.abi, CONTRACT_ADDRESS);
    const res = await docAgreement.methods.publishDocument('Andrew1', 'Test stuffy', '0x61eE26E3E837a8EE69d6894e8FB3f65d05976d8a').send({ from: web3.account[0] });
}

export async function signAgreement(web3, docId) {
    const docAgreement = new web3.eth.Contract(DocAgreementsABI.abi, CONTRACT_ADDRESS);
    const res = await docAgreement.methods.signDocument(docId).send({ from: web3.account[0] });
}

export async function fetchSignatureRequests(web3) {
    try {
        const signatures = [];
        const docAgreement = new web3.eth.Contract(DocAgreementsABI.abi, CONTRACT_ADDRESS);
        const docIdCount = await docAgreement.methods.docId().call();
        for (let i=0; i < docIdCount; i++) {
            const signature = await docAgreement.methods.documents(i).call();
            // Verify that signer is same user that is currently signed in
            // Otherwise, do not append to signatures array
            if (signature.signer === web3.account[0]) {
                signatures.push({...signature, id: i});
            }   
        }
        return signatures;
    }
    catch (e) {
        return 'error'
    }
}