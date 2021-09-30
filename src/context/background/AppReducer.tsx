import Actions, { SetStateAction, SetTransactionAction } from '../contextActions';
import { Transaction } from '../../services/TransactionsService';
import defaults from '../../utils/constants';

const foramtTransactions = () => {
  return Object.values(defaults.pastTransactions).map((transaction, index) => {
    return {
      id: index,
      from: defaults.publicAddress,
      to: transaction.recipient,
      value: Number(transaction.amount),
      date: transaction.date
    };
  })
}

export interface IAppState {
  publicAddress: string,
  accountBalance: number,
  ethPrice: number,
  transactions: Array<Transaction>;
}

export const initAppState: IAppState = {
  publicAddress: defaults.publicAddress,
  accountBalance: Number(defaults.accountBalance),
  ethPrice: Number(defaults.ethPrice),
  transactions: foramtTransactions(),
};

type AppAction = SetTransactionAction | SetStateAction;

const appReducer = (
  state: IAppState,
  action: AppAction
): IAppState => {
  switch (action.type) {
    case Actions.SET_STATE:
      return {
        ...state,
        ...action.payload
      }
    case Actions.SET_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload,
      };
    default:
      return state;
  }
};

export default appReducer;
