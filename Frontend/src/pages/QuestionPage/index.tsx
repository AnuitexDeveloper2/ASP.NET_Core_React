/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, Fragment, useState } from 'react';
import { Page } from '../../components/PageTitle';
import { RouteComponentProps } from 'react-router-dom';
import {
  mapQuestionFromServer,
  QuestionDataFromServer,
  QuestionData,
  postAnswer,
  getQuestion,
  deleteQuestion,
  putQuestion,
} from '../../components/QuestionList/QuestionsData';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import Modal from 'react-modal';
import { gray3, gray6 } from '../../Styles';
import { AnswerList } from '../../components/AmswerList';
import { Field } from '../../components/Field/Field';
import { Form, Values, SubmitResult } from '../../components/Form/Form';
import { required, minLength } from '../../shared/validator';
import { connect } from 'react-redux';
import { AppState } from '../../redux/reducers/rootReducer';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { getQuestionActionCretaor } from '../../redux/actions/getQuestion';
import {
  HubConnectionBuilder,
  HubConnectionState,
  HubConnection,
} from '@microsoft/signalr';
import { PageTitle } from '../../components/PageTitle/PageTitle';
import { useAuth } from '../../components/Auth/Auth';
import { CloseIcon } from '../../components/images/user';
interface RouteParams {
  questionId: string;
}

interface Props extends RouteComponentProps {
  question: QuestionData | undefined;
  getQuestion: (id: string) => Promise<void>;
}

const QuestionPage: React.FC<Props> = ({ location, history }) => {
  const [question, setQuestion] = useState<QuestionData | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id') || '';
  const { isAuthenticated, user } = useAuth();
  let isOwner = false;
  const setUpSignalRConnection = async (questionId: number) => {
    const connection = new HubConnectionBuilder()
      .withUrl('http://localhost:49522/questionshub')
      .withAutomaticReconnect()
      .build();
    connection.on('Message', (message: string) => {
      console.log('Message', message);
    });
    connection.on('ReceiveQuestion', (newQuestion: QuestionDataFromServer) => {
      console.log('ReceiveQuestion', newQuestion);
      setQuestion(mapQuestionFromServer(newQuestion));
    });
    try {
      await connection.start();
    } catch (err) {
      console.log(err);
    }
    if (connection.state === HubConnectionState.Connected) {
      connection.invoke('SubscribeQuestion', questionId).catch((err: Error) => {
        return console.error(err.toString());
      });
    }
    return connection;
  };

  const removeQuestion = async () => {
    deleteQuestion(id);
    history.push('/');
  };

  const openEditModal = () => {
    setIsEdit(!isEdit);
  };

  const cleanUpSignalRConnection = async (
    questionId: number,
    connection: HubConnection,
  ) => {
    if (connection.state === HubConnectionState.Connected) {
      try {
        await connection.invoke('UnsubscribeQuestion', questionId);
      } catch (err) {
        return console.error(err.toString());
      }
      connection.off('Message');
      connection.off('ReceiveQuestion');
      connection.stop();
    } else {
      connection.off('Message');
      connection.off('ReceiveQuestion');
      connection.stop();
    }
  };

  useEffect(() => {
    const doGetQuestion = async (id: string) => {
      const foundQuestion = await getQuestion(id);
      if (foundQuestion !== null) {
        setQuestion(foundQuestion);
      }
    };
    let connection: HubConnection;
    setUpSignalRConnection(parseInt(id)).then((con) => {
      connection = con;
    });
    doGetQuestion(id);
    return function cleanUp() {
      if (id) {
        const questionId = Number(id);
        cleanUpSignalRConnection(questionId, connection);
      }
    };
  }, [id]);

  const handlerEdit = async (values: Values) => {
    const str = "“Warning: react-modal: App element is not defined. Please use `Modal.setAppElement(el)` or set `appElement={el}`”"
    console.log(str.length)
    const questionId = parseInt(id);
    const result = await putQuestion({
      title: values.title,
      content: values.content,
      questionId: questionId,
    });
    if (result) {
      return await { success: true };
    }
    return await { success: false }
  };

  const handleSubmit = async (values: Values) => {
    const result = await postAnswer({
      questionId: question!.questionId,
      content: values.content,
      userName: 'user?.name',
      created: new Date(),
    });
    return { success: result ? true : false };
  };
  if (question !== undefined) {
    if (user !== undefined) {
      const userId = user.sub;
      if (userId === question?.userId) {
        isOwner = true;
      }
    }
    let submitResult: SubmitResult | undefined;
    return (
      <Page>
        <div
          css={css`
            background-color: white;
            padding: 15px 20px 20px 20px;
            border-radius: 4px;
            border: 1px solid ${gray6};
            box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.16);
          `}
        >
          <PageTitle>
            <div
              css={css`
                font-size: 19px;
                font-weight: bold;
                margin: 10px 0px 5px;
              `}
            >
              {question === null ? '' : question.title}
            </div>
          </PageTitle>
          {question !== null && (
            <Fragment>
              <p
                css={css`
                  margin-top: 0px;
                  background-color: white;
                  font-size: 16px;
                `}
              >
                {question.content}
              </p>
              <div
                css={css`
                  font-size: 12px;
                  font-style: italic;
                  color: ${gray3};
                `}
              >
                {`Asked by ${question.userName} on
                ${question.created.toLocaleDateString()}
                ${question.created.toLocaleTimeString()}`}
              </div>
              <AnswerList data={question.answers} />
              <div>
                {isOwner && (
                  <div>
                    <button
                      onClick={openEditModal}
                      css={css`
                        background-color: rgb(240, 193, 149);
                        border-color: rgb(240, 146, 59);
                        border-radius: 5px;
                        border-style: solid;
                        color: white;
                        color: white;
                        cursor: pointer;
                        :hover {
                          background-color: rgb(240, 146, 59);
                        }
                      `}
                    >
                      Edit question
                    </button>{' '}
                    <button
                      onClick={removeQuestion}
                      css={css`
                        background-color: rgb(231, 178, 178);
                        border-color: red;
                        border-radius: 5px;
                        border-style: solid;
                        color: white;
                        color: white;
                        cursor: pointer;
                        :hover {
                          background-color: rgb(240, 92, 92);
                        }
                      `}
                    >
                      Delete question
                    </button>
                  </div>
                )}
              </div>
              <div
                css={css`
                  margin-top: 20px;
                `}
              >
                {isAuthenticated && (
                  <Form
                    onSubmit={handleSubmit}
                    failureMessage="There was a problem with your answer"
                    successMessage="Your answer was successfully submitted"
                    validationRules={{
                      content: [
                        { validator: required },
                        { validator: minLength, arg: 10 },
                      ],
                    }}
                    submitCaption="Submit Your Answer"
                  >
                    <Field name="content" label="Your Answer" type="TextArea" />
                  </Form>
                )}
              </div>
            </Fragment>
          )}
        </div>

        <Modal
          isOpen={isEdit}
          ariaHideApp={false}
          css={css`
            margin: 50px;
            display: contents;
            border-radius: 10px;
          `}
        >
          <Page title="Edit question">
            <span onClick={openEditModal}>
              <CloseIcon />
            </span>
            <Form
              onSubmit={handlerEdit}
              submitResult={submitResult}
              failureMessage="There was a problem with edit question"
              successMessage="Your question was successfully edited"
              validationRules={{
                title: [
                  { validator: required },
                  { validator: minLength, arg: 10 },
                ],
                content: [
                  { validator: required },
                  { validator: minLength, arg: 10 },
                ],
              }}
              submitCaption="Submit your edit question"
            >
              <Field
                name="title"
                label="Title"
                defaultValue={question?.title}
              ></Field>
              <Field
                name="content"
                label="Content"
                type="TextArea"
                defaultValue={question?.content}
              ></Field>
            </Form>
          </Page>
        </Modal>
      </Page>
    );
  }
  return (
    <div
      css={css`
        margin-top: 100px;
        text-align: center;
      `}
    >
      Loading...
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    question: state.questions.postedResult,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    getQuestion: (id: string) => dispatch(getQuestionActionCretaor(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionPage);
