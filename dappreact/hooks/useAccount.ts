import {useState, useEffect} from 'react';
import Web3 from 'web3';

export function useAccount() {
    const [acct, setAcct] = useState<any>(null);

    useEffect(() => {
      async function fetchW3Data() {
        if ((window as any).ethereum) {
          const web3 = new Web3(Web3.givenProvider);
          const account = await web3.eth.getAccounts();
          setAcct({account: account, eth: web3.eth})
        }
      }
      fetchW3Data();
    })

    return acct;
}