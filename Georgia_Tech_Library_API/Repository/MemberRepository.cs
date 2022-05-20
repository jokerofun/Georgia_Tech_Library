using Dapper;
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

        public async Task<Member?> GetMemberBySSN(string SSN)
        {
            var sql = "SELECT m.SSN, m.FirstName, m.LastName, m.Email, m.Phone, m.Street, m.City, m.ZipCode, m.CampusName, " +
                      "r.Name, r.GracePeriod, r.ReturnPeriod, c.CardNumber, c.DateOfIssue, c.ExpirationDay " +
                      "FROM Member m JOIN Role r ON m.RoleName = r.Name JOIN Card c ON m.CardNumber = c.CardNumber";

            using var connection = _dbConnectionFactory.CreateSqlConnection();
            connection.Open();
            var result = await connection.QueryAsync<Member, Role, Card, Member>(sql, (member, role, card) => { member.Role = role; member.Card = card; return member; }, splitOn: "Name, CardNumber");
            if (result.Count() == 0)
            {
                return null;
            }
            return result.First();
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
