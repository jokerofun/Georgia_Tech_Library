using Dapper;
using Georgia_Tech_Library_API.Helpers;
using Georgia_Tech_Library_API.Models;

namespace Georgia_Tech_Library_API.Repository
{
    public class ItemRepository : IItemRepository
    {
        private readonly IDbConnectionFactory _dbConnectionFactory;
        public ItemRepository(IDbConnectionFactory dbConnectionFactory)
        {
            _dbConnectionFactory = dbConnectionFactory;
        }

        public async Task<IEnumerable<Item>> GetAll()
        {
            var sql = "SELECT ISBN, Title, Publisher, Edition, DateOfPublishing, t.Name, t.Lendable FROM Item INNER JOIN Type t ON Item.Type = t.Name";

            using var connection = _dbConnectionFactory.CreateSqlConnection();
            connection.Open();
            var result = await connection.QueryAsync<Item, ItemType, Item>(sql, (item, type) => { item.ItemType = type; return item; }, splitOn: "Name");
            return result.ToList();
        }

        public async Task<Item> GetItemByISBN(string ISBN)
        {
            throw new NotImplementedException();
        }

        public async Task<int> Insert(Item obj)
        {
            throw new NotImplementedException();
        }

        public async Task<int> Update(Item obj)
        {
            var sql = "UPDATE Item set Title = @Title, Publisher = @Publisher, Edition = @Edition, DateOfPublishing = @DateOfPublishing, Type = @Type WHERE ISBN = @ISBN;";

            using var connection = _dbConnectionFactory.CreateSqlConnection();
            connection.Open();
            return await connection.ExecuteAsync(sql, new { obj.Title, obj.Publisher, obj.Edition, obj.DateOfPublishing, obj.ItemType.Name, obj.ISBN });
        }

        public async Task<int> Delete(Item obj)
        {
            var sql = "DELETE FROM Item WHERE ISBN = @ISBN";

            using var connection = _dbConnectionFactory.CreateSqlConnection();
            connection.Open();
            return await connection.ExecuteAsync(sql, new { obj.ISBN });
        }

        public async Task<IEnumerable<Author>> GetAuthors()
        {
            var sql = "SELECT * FROM Author";

            using var connection = _dbConnectionFactory.CreateSqlConnection();
            connection.Open();
            var result = await connection.QueryAsync<Author>(sql);
            return result.ToList();
        }

        public async Task<IEnumerable<ItemSubject>> GetSubjects()
        {
            var sql = "SELECT ISBN, SubjectName as Name FROM ItemSubject";

            using var connection = _dbConnectionFactory.CreateSqlConnection();
            connection.Open();
            var result = await connection.QueryAsync<ItemSubject>(sql);
            return result.ToList();
        }
    }
}
