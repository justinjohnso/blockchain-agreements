import styles from '../styles/Home.module.css';
import { useAccount } from '../hooks/useAccount';

export default function SignatureRequests({signatureRequests, signAgreement}) {
    const web3 = useAccount();

    function renderSignatures() {
        return signatureRequests.map(request => (
            request.isSigned ? 
            <p className={styles.card}>
            <h2>{request.name} (SIGNED)</h2>
            <p>{request.content}</p>
        </p>
        :
            <a onClick={() => signAgreement(web3, request.id)} className={styles.card}>
                <h2>{request.name} &rarr;</h2>
                <p>{request.content}</p>
            </a>
        ))
    }
    return (
    <div className={styles.grid}>
        {renderSignatures()}
    </div>
  )
}
