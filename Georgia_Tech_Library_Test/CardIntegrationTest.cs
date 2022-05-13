using Georgia_Tech_Library_API.Models;
using Georgia_Tech_Library_Test.Fixtures;
using Georgia_Tech_Library_Test.Utils;
using Shouldly;
using System.Threading.Tasks;
using Xunit;

namespace Georgia_Tech_Library_Test
{
    public class CardIntegrationTest : IntegrationTest
    {

        public CardIntegrationTest(ApiWebApplicationFactory fixture)
            : base(fixture) { }

        [Fact]
        public async Task GetAll()
        {
            var response = await _client.GetAndDeserialize<Card[]>("api/Card/GetList");
            response.Length.ShouldBeGreaterThanOrEqualTo(0);
        }
    }
}