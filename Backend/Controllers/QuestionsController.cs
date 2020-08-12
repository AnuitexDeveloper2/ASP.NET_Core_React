using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QandA.Data;
using QandA.Data.Models;

namespace QandA.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class QuestionsController : ControllerBase
    {
        private readonly IDataRepository _dataRepository;

        public QuestionsController(IDataRepository dataRepository)
        {
            _dataRepository = dataRepository;
        }


        [HttpGet]
        public IEnumerable<QuestionGetManyResponse> GetQuestions(string search)
        {
            if (string.IsNullOrEmpty(search))
            {
                return _dataRepository.GetQuestions();
            }
            else
            {
                return _dataRepository.GetQuestionsBySearch(search);
            }
        }

        [HttpGet("unanswered")]
        public IEnumerable<QuestionGetManyResponse> GetUnansveredQuestions()
        {
            return _dataRepository.GetUnansweredQuestions();
        }

        [HttpGet("getQuestionId")]
        public ActionResult<QuestionGetSingleResponse> GetQuestionById(int id)
        {
            var question = _dataRepository.GetQuestion(id);
            if (question == null)
            {
                return NotFound();
            }
            return question;
        }

        [HttpPost]
        public ActionResult<QuestionGetSingleResponse> CreatePost(QuestionPostFullRequest questionPost)
        {
            var result = _dataRepository.PostQuestion(new QuestionPostFullRequest
            {
                Title = questionPost.Title,
                Content = questionPost.Content,
                UserId = "1",
                UserName = "bob.test@test.com",
                Created = DateTime.UtcNow
            });
            if (result == null)
            {
                return NotFound();
            }
            return CreatedAtAction(nameof(GetQuestionById),
            new { questionId = result.QuestionId },
            result);
        }

        [HttpPut]
        public ActionResult<QuestionGetSingleResponse> PutQuestion(int questionId, QuestionPutRequest questionPut)
        {
            var result = _dataRepository.GetQuestion(questionId);
            if (result == null)
            {
                return NotFound();
            }

            questionPut.Title =
            string.IsNullOrEmpty(questionPut.Title) ?
            result.Title : questionPut.Title;
            questionPut.Content = string.IsNullOrEmpty(questionPut.Content) ? result.Content : questionPut.Content;

            var savedQuestion = _dataRepository.PutQuestion(questionId, questionPut);
            return savedQuestion;
        }

        [HttpDelete]
        public ActionResult DeleteQuestion(int questionId)
        {
            var question = _dataRepository.GetQuestion(questionId);
            if (question == null)
            {
                return NotFound();
            }
            _dataRepository.DeleteQuestion(questionId);
            return NoContent();
        }

        [HttpPost("answer")]
        public ActionResult<AnswerGetResponse> PostAnswer(AnswerPostRequest answerPostRequest)
        {
            var questionExists = _dataRepository.QuestionExists(answerPostRequest.QuestionId.Value);
            if (!questionExists)
            {
                return NotFound();
            }
            var savedAnswer = _dataRepository.PostAnswer(new AnswerPostFullRequest
            {
                QuestionId = answerPostRequest.QuestionId.Value,
                Content = answerPostRequest.Content,
                UserId = "1",
                UserName = "bob.test@test.com",
                Created = DateTime.UtcNow
            }
);
            return savedAnswer;
        }

    }
}