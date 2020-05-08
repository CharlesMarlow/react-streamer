import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Formik, Field, Form as FormikForm } from 'formik';
import { Input, Form, Button, Icon } from 'semantic-ui-react';
import { toggleModal, editExperiment } from '../../../shared/actions';

import './ExperimentForm.css';

class ExperimentForm extends Component {
  renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div classNameName="ui error message">
          <div classNameName="header">{error}</div>
        </div>
      );
    }
  };

  render() {
    const { experiment, toggleModal, editExperiment } = this.props;
    const initialValues = {
      experimentName: experiment.name || '',
    };
    return (
      <Fragment>
        <Formik
          validateOnChange={true}
          initialValues={initialValues}
          onSubmit={(formValues, { setSubmitting }) => {
            setTimeout(() => {
              editExperiment(experiment.id, formValues);
              setSubmitting(false);
              toggleModal(false);
            }, 100);
          }}
        >
          {({ errors, isSubmitting }) => (
            <FormikForm className="form-wrapper">
              <div className={'inputs'}>
                <Form.Field>
                  <label>Name: </label>
                  <Field
                    placeholder="Experiment Name"
                    name="experimentName"
                    type="input"
                    as={Input}
                  />
                </Form.Field>
              </div>
              <div className={'actions'}>
                <Button
                  type="button"
                  color="red"
                  inverted
                  onClick={() => toggleModal(false)}
                >
                  <Icon name="remove" /> Cancel
                </Button>
                <Button
                  color="green"
                  inverted
                  disabled={isSubmitting}
                  type="submit"
                >
                  <Icon name="checkmark" /> Save
                </Button>
              </div>
            </FormikForm>
          )}
        </Formik>
      </Fragment>
    );
  }
}

export default connect(null, { toggleModal, editExperiment })(ExperimentForm);
