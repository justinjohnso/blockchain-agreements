import styles from '../styles/Home.module.css';
import { useAccount } from '../hooks/useAccount';

export default function SignatureRequests({signatureRequests, signAgreement, isSent}: any) {
    const web3 = useAccount();

    function renderSignatures() {
        return signatureRequests.map((request: any) => (
            request.isSigned ? 
            <div className={styles.card} key={request.id}>
                <h2>{request.name} <em>(SIGNED)</em></h2>
                <span><b>Sent by:</b><br />{request.owner}</span><br/>
                <span><b>Copy:</b><br />{request.content}</span>
            </div>
        :
            <a onClick={() => signAgreement(web3, request.id)} className={styles.card} key={request.id}>
                <h2>{request.name} &rarr;</h2>
                <span ><b>Sent by:</b><br />{request.owner}</span><br/>
                <span><b>Copy:</b><br />{request.content}</span>
            </a>
        ))
    }

    function renderSentSignatures() {
        return signatureRequests.map((request: any) => (
            <div className={styles.card} key={request.id}>
                <h2>{request.name} {request.isSigned && <em>(SIGNED)</em>}</h2>
                <span><b>Sent to:</b><br />{request.signer}</span><br/>
                <span><b>Copy:</b><br />{request.content}</span>
            </div>
        ))
    }
    return (
    <div className={styles.grid}>
        {isSent ? renderSentSignatures() : renderSignatures()}
    </div>
  )
}
