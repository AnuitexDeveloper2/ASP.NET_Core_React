import axios from 'axios';
export interface QuestionData {
  questionId: number;
  title: string;
  content: string;
  userName: string;
  created: Date;
  answers: AnswerData[];
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
  answers: question.answers.map((answer) => ({
    ...answer,
    created: new Date(answer.created.substr(0, 19)),
  })),
});

export const getUnansweredQuestions = async (): Promise<QuestionData[]> => {
  const request = await axios.get(
    `https://localhost:44310/questions?includeAnswers=true`,
  );
  return request.data;
};

export const getQuestion = async (
  questionId: string,
): Promise<QuestionData | null> => {
  const id = parseInt(questionId);
  const results = await axios.get(
    `https://localhost:44310/questions/getQuestionId?id=${id}`,
  );
  return mapQuestionFromServer(results.data);
};

export const searchQuestions = async (
  criteria: string,
): Promise<QuestionData[]> => {
  const foundedQuestions = await axios.get(
    `https://localhost:44310/questions/?search=${criteria}`,
  );
  return foundedQuestions.data;
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
