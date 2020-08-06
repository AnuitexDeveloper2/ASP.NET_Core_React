import React from 'react';
import { Page } from '../../components/PageTitle';
import { Form, Values } from '../../components/Form/Form';
import { postQuestion } from '../../components/QuestionList/QuestionsData';
import { Field } from '../../components/Field/Field';
import { required, minLength } from '../../shared/validator';

const AskPage = () => {
  const handlerSubmit = async (values: Values) => {
    const question = await postQuestion({
      title: values.title,
      content: values.content,
      userName: 'Fred',
      created: new Date(),
    });
    return { success: question ? true : false };
  };
  return (
    <Page title="Ask Page">
      <Form
        onSubmit={handlerSubmit}
        failureMessage="There was a problem with your question"
        successMessage="Your question was successfully submitted"
        validationRules={{
          title: [{ validator: required }, { validator: minLength, arg: 10 }],
          content: [{ validator: required }, { validator: minLength, arg: 10 }],
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
