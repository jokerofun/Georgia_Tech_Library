using Dapper;
using Georgia_Tech_Library_API.Models;
using Microsoft.Data.SqlClient;

namespace Georgia_Tech_Library_API.Repository
{
    public class CardRepository : ICardRepository
    {
        private readonly IConfiguration _configuration;
        public CardRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public Task<bool> Delete(Card obj)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Card>> GetAll()
        {
            var sql = "SELECT * FROM Card";
            using (var connection = new SqlConnection(_configuration.GetConnectionString("GeorgiaTechLibraryAPI")))
            {
                connection.Open();
                var result = await connection.QueryAsync<Card>(sql);
                return result.ToList();
            }
        }

        public Task<Card> GetCardByCardNumber(string cardNumber)
        {
            throw new NotImplementedException();
        }

        public Task<Card> Insert(Card obj)
        {
            throw new NotImplementedException();
        }

        public Task<Card> Update(Card obj)
        {
            throw new NotImplementedException();
        }
    }
}
