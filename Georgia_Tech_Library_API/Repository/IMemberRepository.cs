using Georgia_Tech_Library_API.Models;

namespace Georgia_Tech_Library_API.Repository
{
    public interface IMemberRepository : IGenericRepository<Member>
    {
        Task<Member> GetMemberBySSN(string SSN);
    }
}
