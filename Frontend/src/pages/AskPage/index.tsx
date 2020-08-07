import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Page } from '../../components/PageTitle';
import { Form, Values, SubmitResult } from '../../components/Form/Form';
import { Field } from '../../components/Field/Field';
import { required, minLength } from '../../shared/validator';
import {
  PostQuestionData,
  QuestionData,
} from '../../components/QuestionList/QuestionsData';
import { ThunkDispatch } from 'redux-thunk';
import {
  postQuestionActionCreator,
  clearPostedQuestionActionCreator,
} from '../../redux/actions/postQuestions';
import { AppState } from '../../redux/reducers/rootReducer';
import { AnyAction } from 'redux';

interface Props {
  postQuestion: (question: PostQuestionData) => Promise<void>;
  postedQuestionResult?: QuestionData;
  clearPostedQuestion: () => void;
}

const AskPage: React.FC<Props> = ({
  postQuestion,
  postedQuestionResult,
  clearPostedQuestion,
}) => {
  useEffect(() => {
    return function cleanUp() {
      clearPostedQuestion();
    };
  }, [clearPostedQuestion]);

  const handlerSubmit = async (values: Values) => {
    postQuestion({
      title: values.title,
      content: values.content,
      userName: 'Fred',
      created: new Date(),
    });
    return await { success: true };
  };

  let submitResult: SubmitResult | undefined;
  if (postedQuestionResult) {
    submitResult = { success: postedQuestionResult !== undefined };
  }

  return (
    <Page title="Ask Page">
      <Form
        onSubmit={handlerSubmit}
        submitResult={submitResult}
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

const mapStateToProps = (store: AppState) => {
  return {
    postedQuestionResult: store.questions.postedResult,
  };
};
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    postQuestion: (question: PostQuestionData) =>
      dispatch(postQuestionActionCreator(question)),
    clearPostedQuestion: () => dispatch(clearPostedQuestionActionCreator()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AskPage);
