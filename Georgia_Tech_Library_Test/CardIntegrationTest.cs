using Georgia_Tech_Library_API.Models;
using Georgia_Tech_Library_Test.Fixtures;
using Georgia_Tech_Library_Test.Utils;
using Shouldly;
using System;
using System.Net.Http.Json;
using System.Threading.Tasks;
using Xunit;

[assembly: CollectionBehavior(DisableTestParallelization = true)]

namespace Georgia_Tech_Library_Test
{
    public class CardIntegrationTest : IntegrationTest
    {

        public CardIntegrationTest(ApiWebApplicationFactory fixture)
            : base(fixture) { }

        [Fact]
        public async Task GetAllCards_ShouldReturn0OrMore()
        {
            var response = await _client.GetAndDeserialize<Card[]>("api/Card/GetList");
            response.Length.ShouldBeGreaterThanOrEqualTo(0);
        }

        [Fact]
        public async Task Post_Put_Delete_ShouldBeSuccessful()
        {
            #region Post request and verify that it was successful
            var postResponse = await _client.PostAsJsonAsync("api/Card/Insert", new Card
            {
                CardNumber = "333",
                DateOfIssue = DateTime.Today,
                ExpirationDay = DateTime.Today.AddDays(10),
            });

            postResponse.StatusCode.ShouldBe(System.Net.HttpStatusCode.OK);
            #endregion

            #region Get request and verify that it returned an object
            var getResponse1 = await _client.GetAndDeserialize<Card>("api/Card/GetByCardNumber/333");
            getResponse1.ShouldNotBeNull();
            #endregion

            #region Put request and verify that it was successful
            var putResponse = await _client.PutAsJsonAsync("api/Card/Update", new Card
            {
                CardNumber = "333",
                DateOfIssue = DateTime.Today,
                ExpirationDay = DateTime.Today.AddDays(2),
            });

            putResponse.StatusCode.ShouldBe(System.Net.HttpStatusCode.OK);
            #endregion

            #region Get request and verify that it returned an updated object
            var getResponse2 = await _client.GetAndDeserialize<Card>("api/Card/GetByCardNumber/333");
            getResponse2.ShouldNotBeNull();

            postResponse.ShouldNotBeSameAs(getResponse2);
            #endregion

            #region Delete request and verify that it was successful
            var deleteResponse = await _client.DeleteAsJsonAsync("api/Card/Delete", getResponse2);

            deleteResponse.StatusCode.ShouldBe(System.Net.HttpStatusCode.OK);
            #endregion
        }

        [Fact]
        public async Task Post_Put_Delete_ShouldNotBeSuccessful()
        {
            #region Post request and verify that it was not successful
            var postResponse = await _client.PostAsJsonAsync("api/Card/Insert", new Card
            {
                CardNumber = "333",
                DateOfIssue = DateTime.Today,
                ExpirationDay = DateTime.Today.AddDays(-1),
            });

            postResponse.StatusCode.ShouldBe(System.Net.HttpStatusCode.BadRequest);
            #endregion

            #region Put request and verify that it was not successful
            var putResponse = await _client.PutAsJsonAsync("api/Card/Update", new Card
            {
                CardNumber = "333",
                DateOfIssue = DateTime.Today,
                ExpirationDay = DateTime.Today.AddDays(2),
            });

            putResponse.StatusCode.ShouldBe(System.Net.HttpStatusCode.NotFound);
            #endregion

            #region Delete request and verify that it was not successful
            var deleteResponse = await _client.DeleteAsJsonAsync("api/Card/Delete", new Card
            {
                CardNumber = "333",
                DateOfIssue = DateTime.Today,
                ExpirationDay = DateTime.Today.AddDays(2),
            });

            deleteResponse.StatusCode.ShouldBe(System.Net.HttpStatusCode.NotFound);
            #endregion
        }
    }
}