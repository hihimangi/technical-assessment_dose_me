import React, { Fragment, PureComponent } from "react";
import { StoreContext } from "../../context/StoreContext";
import {AddTransactionForm} from "../../components/AddTransactionForm";
import { TransactionLogs } from "../../components/TransactionLogs";
import { ViewSummary } from "../../components/ViewSummary";

interface Values {
  currency: string;
  amt: string;
  paymentType: string;
}

interface Transaction {
  id: number;
  currency: string;
  amount: string;
  paymentType: string;
}

class Home extends PureComponent {
  static contextType = StoreContext;

  hanleAddTransaction = (formVal: Values) => {
    let newTransaction = {
      id: this.context.store.data.length,
      amount: +formVal.amt,
      currency: formVal.currency,
      paymentType: formVal.paymentType
    };
    let transactions = this.context.store.data.concat(newTransaction);
    this.context.setStore({ data: transactions });
  };

  handleUpdateTransaction = (data: Transaction) => {
    console.log("Transaction Logs: ", data);
  }

  public render(): JSX.Element {
    return (
      <div className="p-3">
        <ViewSummary />
        <AddTransactionForm onFormSubmit={this.hanleAddTransaction}/> 
        <TransactionLogs/>
      </div>
    );
  }
}

export { Home };
