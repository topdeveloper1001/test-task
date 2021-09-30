import { Button, Card } from 'react-bootstrap';
import { ArrowRight, CheckCircle } from 'react-bootstrap-icons';
import './TransactionSuccess.scss';

type Props = {
    onComplete: () => void
}

const TransactionSuccess = ({onComplete}: Props): JSX.Element | null => {
    return (
        <Card className="transction-success">
            <Card.Body className="d-flex flex-column justify-content-between">
                <div className="transaction-success-message">
                    <p>
                        <CheckCircle size="50" color="primary" />
                    </p>                    
                    <h3>Success</h3>
                    <p>You've successfully sent your funds.</p>
                    <Button variant="link" className="text-decoration-none">
                        View on Ethereum
                        <ArrowRight className="ml-2" />
                    </Button>
                </div>
                <Button variant="outline-secondary" onClick={onComplete}>Done</Button>
            </Card.Body>
        </Card>
    )
}

export default TransactionSuccess;