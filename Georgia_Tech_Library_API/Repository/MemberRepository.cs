using Georgia_Tech_Library_API.Helpers;
using Georgia_Tech_Library_API.Models;

namespace Georgia_Tech_Library_API.Repository
{
    public class MemberRepository : IMemberRepository
    {
        private readonly IDbConnectionFactory _dbConnectionFactory;
        public MemberRepository(IDbConnectionFactory dbConnectionFactory)
        {
            _dbConnectionFactory = dbConnectionFactory;
        }

        public Task<IEnumerable<Member>> GetAll()
        {
            throw new NotImplementedException();
        }

        public Task<Member> GetMemberBySSN(string SSN)
        {/*
            var sql = "SELECT ISBN, Title, Publisher, Edition, DateOfPublishing, t.Name, t.Lendable FROM Item INNER JOIN Type t ON Item.Type = t.Name";

            using var connection = _dbConnectionFactory.CreateSqlConnection();
            connection.Open();
            var result = await connection.QueryAsync<Item, ItemType, Item>(sql, (item, type) => { item.ItemType = type; return item; }, splitOn: "Name");
            return result.ToList();
            */
            throw new NotImplementedException();
        }

        public Task<int> Insert(Member obj)
        {
            throw new NotImplementedException();
        }

        public Task<int> Update(Member obj)
        {
            throw new NotImplementedException();
        }
        public Task<int> Delete(Member obj)
        {
            throw new NotImplementedException();
        }
    }
}
