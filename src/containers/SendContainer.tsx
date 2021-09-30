import { useContext, useState, useMemo } from "react";
import AppContext from "../context/background/AppContext";
import TransactionList from "../components/TransactionList";
import TransactionSend from "../components/TransactionSend/TransactionSend";
import TransactionSuccess from "../components/TransactionSuccess/TransactionSuccess";
import moment from 'moment';
import './SendContainer.scss';

const LandingContainer = (): JSX.Element | null => {
    const { state, addTransaction } = useContext(AppContext);
    const [page, setPage] = useState<string>('list');    
    const account = useMemo(() => {
        return {
            publicAddress: state.publicAddress,
            accountBalance: state.accountBalance,
            ethPrice: state.ethPrice
        }
    }, [state]);

    const onSendTransaction = () => {
        setPage('send');
    }

    const onCancelTransaction = () => {
        setPage('list');
    }

    const onCompleteTransaction = () => {
        setPage('list');
    }

    const handleSendTransaction = (payload: any) => {
        const transaction = {
            id: state.transactions.length,
            from: state.publicAddress,
            to: payload.recipient,
            value: Number(payload.amount),
            date: moment().format('MM-DD-YYYY hh:mm')
        };
        addTransaction(transaction);
        setPage('done');
    }

    return (
        <div className="send-container">
            <h2 className="pb-2 border-bottom text-center">Send Ether</h2>           
            
            <div className="send-container-content">
                {page === 'list' && 
                    <TransactionList account={account} transactions={state.transactions} onSend={onSendTransaction} />
                }
                {page === 'send' && 
                    <TransactionSend onNext={handleSendTransaction} onCancel={onCancelTransaction} />
                }
                {page === 'done' &&
                    <TransactionSuccess onComplete={onCompleteTransaction} />
                }
            </div>           
        </div>
    )
}

export default LandingContainer;