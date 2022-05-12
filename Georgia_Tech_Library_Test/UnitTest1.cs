using Georgia_Tech_Library_API.Models;
using Georgia_Tech_Library_Test.Fixtures;
using Georgia_Tech_Library_Test.Utils;
using Shouldly;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace Georgia_Tech_Library_Test
{
    public class UnitTest1 : IntegrationTest
    {

        public UnitTest1(ApiWebApplicationFactory fixture)
            : base(fixture) { }

        [Fact]
        public async Task Test1()
        {
            var response = await _client.GetAndDeserialize<Card[]>("api/Card/GetList");
            response.Length.ShouldBeGreaterThan(0);
        }
    }
}