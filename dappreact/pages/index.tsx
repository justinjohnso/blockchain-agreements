import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useAccount } from '../hooks/useAccount';
import { useEffect, useState } from 'react';
import { signAgreement, fetchSignatureRequests } from '../utils/actions';
import SignatureRequests from '../components/signatureRequests';
import Link from 'next/link';

export default function Home() {
  const [signatures, setSignatures] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const web3 = useAccount();

  // @ts-ignore
  useEffect(async () => {
    if (isLoading) {
      handleLoad()
    }
  }, [web3, isLoading]);

  async function handleLoad() {
    const signaturesFromChain = await fetchSignatureRequests(web3);
    if (signaturesFromChain !== 'error') {
      setSignatures((signaturesFromChain as any));
      setIsLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>HelloSign: Unchained</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          HelloSign: Unchained
        </h1>

        <p className={styles.description}>
          Smart eSignatures, powered by Ethereum
        </p>
        <div style={{marginBottom: '32px'}}>
        <Link href='/create'>Create a request</Link> |
        <Link href='/sent'> Sent requests</Link>
        </div>
        <div className={styles.grid}>
          {signatures.length === 0 ? <h2>No requests.</h2> : <SignatureRequests signatureRequests={signatures} signAgreement={signAgreement} isSent={false} />}     
        </div>
      </main>

      <footer className={styles.footer}>
          <span><b>Your Blockchain Address:</b> {web3?.account[0]}</span> <br />
          <span>Created by Justin Johnson, Akanksha Mehrotra, Kate Hueter, Ragav Khator, Andrew DaRe, Joanie Martinez and Ishmael Riles</span>
      </footer>
    </div>
  )
}
