import React, { Component, PureComponent, useState } from "react";
import { Table, Button } from "reactstrap";
import { StoreContext } from "../context/StoreContext";
import _ from "lodash";

interface Values {
  id: number;
  currency: string;
  amount: string;
  paymentType: string;
}

interface Balance {
    type: string,
    totalBalance: number
}

class ViewSummary extends Component<{}, any> {
  static contextType = StoreContext;

  constructor(props: any) {
      super(props)
  
      this.state = {
           data: [],
           logs: []
      }
  }
  
  
  componentDidMount(){
      this.calculateSummary();
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    if(this.context.store.data.length !== prevState.data.length){
        this.setState({
            data: this.context.store.data
        });
        this.calculateSummary();
    }
  }


  calculateSummary = () => {
      let data = this.context.store.data;
      var uniq = _.uniq(_.map(data, 'currency'));
      let logsArr: Array<any> = [];
      uniq.map((value: string, index: number) => {
        let filterArrCredit = _.filter(data, (o) => {return o.currency === value && o.paymentType === "Credit"});
        let filterArrDebit = _.filter(data, (o) => {return o.currency === value && o.paymentType === "Debit"});
        let totalCredit = _.sumBy(filterArrCredit, (o) => { return o.amount; });
        let totalDebit = _.sumBy(filterArrDebit, (o) => { return o.amount; });
        let totalBalance = totalCredit - totalDebit;
        let currencyType = uniq[index];
        logsArr.push({
            type: currencyType,
            totalBalance: totalBalance
        });
      });
      this.setState({
          logs: logsArr
      });
  }

  public render(): JSX.Element {
    return (
      <div className="container-fluid mt-5">
        {
            this.state.logs.map((val: Balance, index: number) => {
                return(<p key={index}>{`Your current ${val.type} balance is ${val.totalBalance}`}</p>)
            })
        }
      </div>
    );
  }
}

export { ViewSummary };
