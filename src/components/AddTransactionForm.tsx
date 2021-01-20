import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, FormGroup, Label, Input, Form } from "reactstrap";

interface Values {
  currency: string;
  amt: string;
  paymentType: string;
}

export const AddTransactionForm = (props: any) => {
  const formik = useFormik({
    initialValues: {
      currency: props.data ? props.data.currency: '',
      amt: props.data ? props.data.amount : '',
      paymentType: props.data ? props.data.paymentType : '',
    },
    validationSchema: Yup.object({
      currency: Yup.string().required("Please select the currency"),
      amt: Yup.string().required("Please enter the amount"),
      paymentType: Yup.string().required("Please select the Payment Type"),
    }),
    onSubmit: (values: Values) => {
      props.onFormSubmit(values);
      formik.resetForm();
    },
  });
  return (
    <div className="card p-3 mt-5">
      <Form className="row p-0 m-0" onSubmit={formik.handleSubmit}>
        <FormGroup className="col-sm-3">
          <Label for="currency">Currency</Label>
          <Input
            type="select"
            name="currency"
            id="currency"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.currency}
          >
            <option value="" disabled>Select Currency</option>
            <option>AUD</option>
            <option>INR</option>
            <option>USD</option>
          </Input>
          {formik.errors.currency && formik.touched.currency ? (
            <p className="text-danger">Please select the currency</p>
          ) : (
            ""
          )}
        </FormGroup>
        <FormGroup className="col-sm-3">
          <Label for="amt">Amount</Label>
          <Input
            type="number"
            name="amt"
            id="amt"
            placeholder="Amount"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.amt}
          />
          {formik.errors.amt && formik.touched.amt ? (
            <p className="text-danger">Please enter the amount</p>
          ) : (
            ""
          )}
        </FormGroup>
        <FormGroup className="col-sm-3">
          <Label for="paymentType">Payment Type</Label>
          <Input
            type="select"
            name="paymentType"
            id="paymentType"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.paymentType}
          >
            <option value="" disabled>Select Payment Type</option>
            <option>Debit</option>
            <option>Credit</option>
          </Input>
          {formik.errors.paymentType && formik.touched.paymentType ? (
            <p className="text-danger">Please select the payment type</p>
          ) : (
            ""
          )}
        </FormGroup>
        <div className="col-sm-2 text-center pt-4">
          <Button type="submit" color="primary" className="mt-1">
            {props.data ? 'Edit' : 'Add Transaction'}
          </Button>
        </div>
      </Form>
    </div>
  );
};
