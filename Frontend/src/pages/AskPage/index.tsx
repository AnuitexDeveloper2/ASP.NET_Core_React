import React from 'react';
import { Page } from '../../components/PageTitle';
import { Form } from '../../components/Form/Form';
import { Field } from '../../components/Field/Field';
import { required, minLength } from '../../shared/validator';

const AskPage = () => {
  return (
    <Page title="Ask Page">
      <Form
        validationRules={{
          title: [{ validator: required }, { validator: minLength, arg: 10 }],
          content: [{ validator: required }, { validator: minLength, arg: 50 }],
        }}
        submitCaption="Submit your question"
      >
        <Field name="title" label="Title"></Field>
        <Field name="content" label="Content" type="TextArea"></Field>
      </Form>
    </Page>
  );
};

export default AskPage;
