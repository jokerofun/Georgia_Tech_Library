using Dapper;
using Georgia_Tech_Library_API.Helpers;
using Georgia_Tech_Library_API.Models;

namespace Georgia_Tech_Library_API.Repository
{
    public class CardRepository : ICardRepository
    {
        private readonly IDbConnectionFactory _dbConnectionFactory;
        public CardRepository(IDbConnectionFactory dbConnectionFactory)
        {
            _dbConnectionFactory = dbConnectionFactory;
        }

        public async Task<int> Delete(Card obj)
        {
            var sql = "DELETE FROM Card WHERE CardNumber = @CardNumber";

            using var connection = _dbConnectionFactory.CreateSqlConnection();
            connection.Open();
            return await connection.ExecuteAsync(sql, new {obj.CardNumber});
        }

        public async Task<IEnumerable<Card>> GetAll()
        {
            var sql = "SELECT CardNumber, DateOfIssue, ExpirationDay FROM Card";

            using var connection = _dbConnectionFactory.CreateSqlConnection();
            connection.Open();
            var result = await connection.QueryAsync<Card>(sql);
            return result.ToList();
        }

        public async Task<Card> GetCardByCardNumber(string cardNumber)
        {
            var sql = "SELECT CardNumber, DateOfIssue, ExpirationDay FROM Card WHERE CardNumber = @CardNumber";

            using var connection = _dbConnectionFactory.CreateSqlConnection();
            connection.Open();
            var result = await connection.QuerySingleOrDefaultAsync<Card>(sql, new { cardNumber });
            return result;
        }

        public async Task<int> Insert(Card obj)
        {
            var sql = "insert into Card values (@CardNumber, @DateOfIssue, @ExpirationDay);";

            using var connection = _dbConnectionFactory.CreateSqlConnection();
            connection.Open();
            return await connection.ExecuteAsync(sql, new { obj.CardNumber, obj.DateOfIssue, obj.ExpirationDay });
        }

        public async Task<int> Update(Card obj)
        {
            var sql = "update Card set @DateOfIssue, @ExpirationDay WHERE CardNumber = @CardNumber;";

            using var connection = _dbConnectionFactory.CreateSqlConnection();
            connection.Open();
            return await connection.ExecuteAsync(sql, new { obj.DateOfIssue, obj.ExpirationDay, obj.CardNumber });
        }
    }
}
