using Georgia_Tech_Library_API.Models;

namespace Georgia_Tech_Library_API.Business.Interfaces
{
    public interface IMemberManagement : IGenericManagement<Member>
    {
        Task<Member> GetMemberBySSN(string SSN);
    }
}
