using Dapper;
using Georgia_Tech_Library_API.Helpers;
using Georgia_Tech_Library_API.Models;

namespace Georgia_Tech_Library_API.Repository
{
    public class CatalogRepository : ICatalogRepository
    {
        private readonly IDbConnectionFactory _dbConnectionFactory;
        public CatalogRepository(IDbConnectionFactory dbConnectionFactory)
        {
            _dbConnectionFactory = dbConnectionFactory;
        }

        public async Task<IEnumerable<Catalog>> GetAll()
        {
            var sql = "SELECT * FROM Catalog";

            using var connection = _dbConnectionFactory.CreateSqlConnection();
            connection.Open();
            var result = await connection.QueryAsync<Catalog>(sql);
            return result.ToList();
        }
        public async Task<IEnumerable<Catalog>> GetBatch(int batchNumber)
        {
            int from = 0;
            if (batchNumber > 0)
                from = 1000 * batchNumber + 1;
            int until = 1000 * (batchNumber + 1);
            var sql = "exec [getCatalogBatch] @from, @until";
            var values = new { from = from, until = until };

            using var connection = _dbConnectionFactory.CreateSqlConnection();
            connection.Open();

            var result = await connection.QueryAsync<Catalog>(sql, values);
            return result.ToList();
        }

        public Task<Catalog> GetCalatogByISBN(string ISBN)
        {
            throw new NotImplementedException();
        }

        public Task<int> Insert(Catalog obj)
        {
            throw new NotImplementedException();
        }

        public Task<int> Update(Catalog obj)
        {
            throw new NotImplementedException();
        }

        public Task<int> Delete(Catalog obj)
        {
            throw new NotImplementedException();
        }
    }
}
