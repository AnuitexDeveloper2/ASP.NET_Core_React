using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using QandA.Hubs;
using Microsoft.AspNetCore.Mvc;
using QandA.Data;
using QandA.Data.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Microsoft.Extensions.Configuration;
using System.Net.Http;
using System.Text.Json;
using System.Linq;

namespace QandA.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class QuestionsController : ControllerBase
    {
        private readonly IDataRepository _dataRepository;
        private readonly IHubContext<QuestionsHub> _questionHubContext;
        private readonly IHttpClientFactory _clientFactory;
        private readonly string _auth0UserInfo;

        public QuestionsController(IDataRepository dataRepository, IHubContext<QuestionsHub> questionHubContext, IHttpClientFactory clientFactory, IConfiguration configuration)
        {
            _clientFactory = clientFactory;
            _auth0UserInfo = $"{configuration["Auth0:Authority"]}userinfo";
            _dataRepository = dataRepository;
            _questionHubContext = questionHubContext;
        }


        [HttpGet]
        public IEnumerable<QuestionGetManyResponse> GetQuestions(string search, bool includeAnswers, int page = 1, int pageSize = 20)
        {
            if (string.IsNullOrEmpty(search))
            {
                if (includeAnswers)
                {
                    return _dataRepository.GetQuestionsWithAnswers();
                }
                else
                {
                    return _dataRepository.GetQuestions();
                }
            }
            else
            {
                return _dataRepository.GetQuestionsBySearchWithPaging(search, page, pageSize);
            }
        }

        [HttpGet("unanswered")]
        public async Task<IEnumerable<QuestionGetManyResponse>> GetUnansveredQuestionsAsync()
        {
            return await _dataRepository.GetUnansweredQuestionsAsync();
        }

        [HttpGet("getQuestionId")]
        public async Task<ActionResult<QuestionGetSingleResponse>> GetQuestionById(int id)
        {
            var question = await _dataRepository.GetQuestion(id);
            if (question == null)
            {
                return NotFound();
            }
            return question;
        }

        [Authorize(Policy = "MustBeQuestionAuthor")]
        [HttpPost]
        public async Task<ActionResult<QuestionGetSingleResponse>> CreatePost(QuestionPostFullRequest questionPost)
        {
            var result = await _dataRepository.PostQuestionAsync(new QuestionPostFullRequest
            {
                Title = questionPost.Title,
                Content = questionPost.Content,
                UserId = User.FindFirst(ClaimTypes.NameIdentifier).Value,
                UserName = "bob.test@test.com",
                Created = DateTime.UtcNow
            });
            if (result == null)
            {
                return NotFound();
            }
            return CreatedAtAction(nameof(GetQuestionById),
            new { questionId = result.QuestionId }, result);
        }

        [Authorize(Policy = "MustBeQuestionAuthor")]
        [HttpPut]
        public async Task<ActionResult<QuestionGetSingleResponse>> PutQuestion(int questionId, QuestionPutRequest questionPut)
        {
            var result = await _dataRepository.GetQuestion(questionId);
            if (result == null)
            {
                return NotFound();
            }

            questionPut.Title =
            string.IsNullOrEmpty(questionPut.Title) ?
            result.Title : questionPut.Title;
            questionPut.Content = string.IsNullOrEmpty(questionPut.Content) ? result.Content : questionPut.Content;

            var savedQuestion = await _dataRepository.PutQuestion(questionId, questionPut);
            return savedQuestion;
        }

        [Authorize(Policy = "MustBeQuestionAuthor")]
        [HttpDelete]
        public async Task<ActionResult> DeleteQuestion(int questionId)
        {
            var question = _dataRepository.GetQuestion(questionId);
            if (question == null)
            {
                return NotFound();
            }
            _dataRepository.DeleteQuestion(questionId);
            return NoContent();
        }

        [Authorize(Policy = "MustBeQuestionAuthor")]
        [HttpPost("answer")]
        public async Task<ActionResult<AnswerGetResponse>> PostAnswerAsync(AnswerPostRequest answerPostRequest)
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
                UserId = User.FindFirst(ClaimTypes.NameIdentifier).Value,
                UserName = await GetUserName(),
                Created = DateTime.UtcNow
            });

            await _questionHubContext.Clients.Group($"Question-{answerPostRequest.QuestionId.Value}")
              .SendAsync("ReceiveQuestion", _dataRepository.GetQuestion(answerPostRequest.QuestionId.Value));

            return savedAnswer;
        }

        private async Task<string> GetUserName()
        {
            var request = new HttpRequestMessage(
            HttpMethod.Get,
            _auth0UserInfo);
            request.Headers.Add("Authorization", Request.Headers["Authorization"].First());
            var client = _clientFactory.CreateClient();
            var response = await client.SendAsync(request);
            if (response.IsSuccessStatusCode)
            {
                var jsonContent =
                await response.Content.ReadAsStringAsync();
                var user =
                JsonSerializer.Deserialize<User>(
                jsonContent,
                new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });
                return user.Name;
            }
            else
                return "";
        }
    }
}

