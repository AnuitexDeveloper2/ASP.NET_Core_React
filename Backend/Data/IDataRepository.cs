using System;
using System.Collections.Generic;
using QandA.Data.Models;

using System.Linq;
using System.Threading.Tasks;

namespace QandA.Data
{
    interface IDataRepository
    {
        IEnumerable<QuestionGetManyResponse> GetQuestions();
        IEnumerable<QuestionGetManyResponse>
        GetQuestionsBySearch(string search);
        IEnumerable<QuestionGetManyResponse>
        GetUnansweredQuestions();
        QuestionGetSingleResponse
        GetQuestion(int questionId);
        bool QuestionExists(int questionId);
        AnswerGetResponse GetAnswer(int answerId);
    }
}
