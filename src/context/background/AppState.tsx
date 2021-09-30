import React, { useEffect, useReducer } from 'react';
import AppContext from './AppContext';
import AppReducer, { IAppState, initAppState } from './AppReducer';
import Actions from '../contextActions';
import { Transaction, TransactionsService } from '../../services/TransactionsService';

const transactionService = new TransactionsService({transactions: initAppState.transactions});

const AppState = (props: any) => {
  const [state, dispatch] = useReducer(AppReducer, initAppState);

  useEffect(() => {
    transactionService.getListOfTransactions()
      .then(transactions => {
        setTransactions(transactions);
      })
  }, []);

  // Set app state
  const setState = (newState: IAppState) => {
    dispatch({
      type: Actions.SET_STATE,
      payload: newState,
    });
  };

  // Set app state
  const setTransactions = (transactions: Transaction[]) => {
    dispatch({
      type: Actions.SET_TRANSACTIONS,
      payload: transactions,
    });
  };
  
  // TODO: Complete the addTransaction method
  const addTransaction = (transaction: Transaction) => {
    transactionService.addTransaction(transaction)
      .then(() => {
        setTransactions([...state.transactions, transaction]);
      });
  }

  return (
    <AppContext.Provider
      value={{
        state,
        setState,
        addTransaction,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
