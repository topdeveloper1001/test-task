import { Card, ListGroup } from 'react-bootstrap';
import { ArrowUpCircleFill, Gem, StopCircleFill } from 'react-bootstrap-icons';
import { Transaction } from '../../services/TransactionsService';
import './TransactionList.scss';

type Props = {
    account: any
    transactions: Transaction[], 
    onSend: () => void;    
};

const TransactionList = ({account, transactions, onSend}: Props): JSX.Element | null => {
    return (
        <Card className="transaction-list">
            <Card.Header>
                <div className="account-info-wrapper d-flex align-items-center">
                    <StopCircleFill size="30" />
                    <div className="account-info">
                        <strong>Account1</strong>
                        <br />
                        <span>{account.publicAddress}</span>
                    </div>
                </div>
            </Card.Header>
            <Card.Body>
                <div
                    className="account-balance d-flex flex-column align-items-center justify-content-center"
                    onClick={onSend}
                >
                    <p className="fs-1 text-bold">{account.accountBalance} ETH</p>
                    <p>${account.accountBalance * account.ethPrice} USD</p>
                    <p>
                        <ArrowUpCircleFill color="#0d6efd" size="40" />
                    </p>                    
                    <p>Send</p>
                </div>
                <ListGroup as="ul">
                    {transactions.map((transaction, index) => (
                        <ListGroup.Item as="li" className="d-flex align-items-cnetner justify-content-between" key={`transaction-item-${index}`}>
                            <div className="d-flex align-items-center">
                                <Gem size="30" />
                                <div style={{marginLeft: '10px'}}>
                                    <strong>Sent Ether</strong>
                                    <br />
                                    <span>{transaction.date}</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <strong>-{transaction.value} ETH</strong>
                                <br />
                                <span>-${(transaction.value * account.ethPrice).toFixed(2)} USD</span>
                            </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card.Body>
        </Card>
    )
}

export default TransactionList;