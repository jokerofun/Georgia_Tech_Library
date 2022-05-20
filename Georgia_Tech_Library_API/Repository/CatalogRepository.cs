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
