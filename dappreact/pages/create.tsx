import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useAccount } from '../hooks/useAccount';
import { useState } from 'react';
import { initiateAgreement } from '../utils/actions';
import Link from 'next/link';

export default function Create() {
  const [name, setName] = useState('');
  const [copy, setCopy] = useState('');
  const [address, setAddress] = useState('');
  const web3 = useAccount();

  function handleSubmit() {
      if (name === '' || copy === '' || address === '') {
          alert('All fields must be filled in')
      } else {
        initiateAgreement(web3, name, copy, address);
      }
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Create signature requests</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          HelloSign: Unchained
        </h1>

        <p className={styles.description}>
          Create a signature request
        </p>
        <Link href='/'>Home</Link>
        <label style={{marginBottom: '8px'}}>Request name</label>
        <input onChange={(e) => setName(e.target.value)} style={{width: '100%', marginBottom: '16px'}}/>
        <label style={{marginBottom: '8px'}}>Message</label>
        <textarea onChange={(e) => setCopy(e.target.value)} style={{width: '100%', height: '96px', marginBottom: '16px'}}/>
        <label style={{marginBottom: '8px'}}>Recipient address</label>
        <input onChange={(e) => setAddress(e.target.value)} style={{width: '100%', marginBottom: '16px'}}/>
        <button onClick={() => handleSubmit()}>Submit</button>
      </main>

      <footer className={styles.footer}>
          <span><b>Address:</b> {web3?.account[0]}</span> <br />
          <span>Created by Justin Johnson, Akanksha Mehrotra, Kate Hueter, Ragav Khator, Andrew DaRe, Joanie Martinez and Ishmael Riles</span>
      </footer>
    </div>
  )
}
