import React, { Component, PureComponent } from "react";
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { AddTransactionForm } from "../components/AddTransactionForm";
import { StoreContext } from "../context/StoreContext";
import _ from "lodash";

interface Values {
  id: number;
  currency: string;
  amount: string;
  paymentType: string;
}

interface EditTransaction {
  currency: string;
  amt: string;
  paymentType: string;
}

class TransactionLogs extends Component<{}, any> {
  static contextType = StoreContext;

  constructor(props: any) {
    super(props)
  
    this.state = {
       isOpen: false,
       selectedLog: null
    }
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }
  

  deleteTransaction = (index: number) => {
    let logs = [...this.context.store.data];
    logs.splice(index, 1);
    this.context.setStore({ data: logs });
  }

  updateTransaction = (data: Values) => {
    console.log("Update this transaciton ", data);
    this.setState({
      selectedLog: data
    });
    this.toggle();
  }

  handleEditTransaction = async (formVal: EditTransaction) => {
    if(this.state.selectedLog){
      let index = await _.findIndex(this.context.store.data, (o: any) => { return o.id === this.state.selectedLog.id});
      let copyArr = [...this.context.store.data];
      copyArr.splice(index, 1);
      this.context.setStore({ data: copyArr});
      let updatedTransaction = {
        id: this.context.store.data.length,
        amount: +formVal.amt,
        currency: formVal.currency,
        paymentType: formVal.paymentType
      };
      let transactions = copyArr.concat(updatedTransaction);
      this.context.setStore({ data: transactions });
      this.toggle();
    }
  }

  closeEditModal = () => {
    this.toggle();
    this.setState({
      selectedLog: null
    })
  }

  public render(): JSX.Element {
    return (
      <div className="container mt-5">
        <Table hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Currency</th>
              <th>Amount</th>
              <th>Payment Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.context.store.data.map(
              (transaction: Values, index: number) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{transaction.currency}</td>
                    <td>{transaction.amount}</td>
                    <td>{transaction.paymentType}</td>
                    <td>
                      <Button
                        color="warning"
                        type="button"
                        className="mr-3"
                        onClick={() => this.updateTransaction(transaction)}
                      >
                        Edit
                      </Button>
                      <Button
                        color="danger"
                        type="button"
                        onClick={() => this.deleteTransaction(index)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              }
            )}

            {this.context.store.data.length === 0 && (
              <tr>
                <td scope="row" colSpan={5} className="text-center">
                  No Data Found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        <Modal isOpen={this.state.isOpen} toggle={this.toggle} className="modal-lg">
        <ModalHeader toggle={this.toggle}>Edit Transaction</ModalHeader>
        <ModalBody>
          <AddTransactionForm data={this.state.selectedLog} onFormSubmit={this.handleEditTransaction} />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.closeEditModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
      </div>
    );
  }
}

export { TransactionLogs };
