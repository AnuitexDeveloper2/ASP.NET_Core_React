import axios from 'axios';
import { http } from '../../shared/http';
export interface QuestionData {
  questionId: number;
  title: string;
  content: string;
  userName: string;
  created: Date;
  answers: AnswerData[] | null;
}

export interface AnswerData {
  answerId: number;
  content: string;
  userName: string;
  created: Date;
}

export interface PostAnswerData {
  questionId: number;
  content: string;
  userName: string;
  created: Date;
}

export interface QuestionDataFromServer {
  questionId: number;
  title: string;
  content: string;
  userName: string;
  created: string;
  answers: AnswerDataFromServer[];
}
export interface AnswerDataFromServer {
  answerId: number;
  content: string;
  userName: string;
  created: string;
}

export interface PostQuestionData {
  title: string;
  content: string;
  userName: string;
  userId: string;
  created: Date;
}

export const mapQuestionFromServer = (
  question: QuestionDataFromServer,
): QuestionData => ({
  ...question,
  created: new Date(question.created.substr(0, 19)),
  answers: question.answers
    ? question.answers.map((answer) => ({
        ...answer,
        created: new Date(answer.created.substr(0, 19)),
      }))
    : null,
});

export const getUnansweredQuestions = async (): Promise<QuestionData[]> => {
  try {
    const result = await http<undefined, QuestionDataFromServer[]>({
      path: '/questions?includeAnswers=true',
    });
    if (result.parsedBody) {
      return result.parsedBody.map(mapQuestionFromServer);
    } else {
      return [];
    }
  } catch (ex) {
    console.error(ex);
    return [];
  }
};

export const getQuestion = async (
  questionId: string,
): Promise<QuestionData | null> => {
  const id = parseInt(questionId);
  try {
    const result = await http<undefined, QuestionDataFromServer>({
      path: `/questions/getQuestionId?id=${id}`,
    });
    if (result.ok && result.parsedBody) {
      return mapQuestionFromServer(result.parsedBody);
    } else {
      return null;
    }
  } catch (ex) {
    console.error(ex);
    return null;
  }
};

export const searchQuestions = async (
  criteria: string,
): Promise<QuestionData[]> => {
  try {
    const result = await http<undefined, QuestionDataFromServer[]>({
      path: `/questions?search=${criteria}`,
    });
    debugger;
    if (result.ok && result.parsedBody) {
      const test = result.parsedBody.map(mapQuestionFromServer);
      return test;
    } else {
      return [];
    }
  } catch (ex) {
    console.error(ex);
    return [];
  }
};

export const postQuestion = async (
  question: PostQuestionData,
): Promise<QuestionData | undefined> => {
  const newQuestion = await axios.post('https://localhost:44310/questions', {
    content: question.content,
    title: question.title,
    userId: question.userId,
    // userName: question.userName,
  });
  return newQuestion.data;
};

export const postAnswer = async (
  answer: PostAnswerData,
): Promise<AnswerData | undefined> => {
  const request = await axios.post('https://localhost:44310/questions/answer', {
    content: answer.content,
    questionId: answer.questionId,
  });
  return request.data;
};
