import React from "react";
import PropTypes from "prop-types";
import { Formik, Form as FormikForm } from "formik";



const Form = (props) => {
  const {
    initialValues,
    enableReinitialize,
    onSubmit,
    children,
    onReset,
    id,
  } = props;
  return (
    <Formik
      id={id || children}
      initialValues={initialValues}
      enableReinitialize={enableReinitialize}
      onSubmit={(values) => onSubmit(values)}
      onReset={onReset}
    >
      {() => <FormikForm>{children}</FormikForm>}
    </Formik>
  );
}

Form.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
};

export default Form;
