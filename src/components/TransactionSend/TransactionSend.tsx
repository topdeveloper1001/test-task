import { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { X } from 'react-bootstrap-icons';
import { TransactionPayload } from '../../types/TransactionPayload';
import './TransactionSend.scss';

type Props = {
    onNext: (payload: TransactionPayload) => void;
    onCancel: () => void;
};

const TransactionSend = ({ onNext, onCancel }: Props): JSX.Element | null => {
    const [validated, setValidated] = useState(false);
    const [form, setForm] = useState<TransactionPayload>({
        recipient: '',
        amount: ''
    });

    const handleSubmit = (event: any) => {
        const formRef = event.currentTarget;
        if (formRef.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
            
            return;
        }
        
        onNext(form);
    }
    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Card className="transaction-send">
                <Card.Header className="d-flex align-items-center justify-content-between">
                    <h5 className="mb-0">Send Ether</h5>
                    <Button variant="link" onClick={onCancel}><X size="20" /></Button>
                </Card.Header>
                <Card.Body>                
                    <Form.Group>
                        <Form.Label>Add Recipient</Form.Label>
                        <Form.Control type="text" value={form.recipient} onChange={e => setForm({...form, recipient: e.target.value})} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Amount</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            value={form.amount}
                            onChange={e => {
                                const amount = e.target.value;
                                if (!amount || amount.match(/^\d{1,}(\.\d{0,4})?$/)) {
                                    setForm({...form, amount: amount})
                                }                                
                            }}                            
                        />
                    </Form.Group>                
                </Card.Body>
                <Card.Footer className="transaction-send-action">
                    <Button variant="outline-secondary" onClick={onCancel}>Cancel</Button>
                    <Button variant="primary" type="submit">Next</Button>
                </Card.Footer>            
            </Card>
        </Form>
    )
}

export default TransactionSend;