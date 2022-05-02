using Georgia_Tech_Library_API.Models;

namespace Georgia_Tech_Library_API.Repository
{
    public interface ISubjectRepository : IGenericRepository<Subject>
    {
        Task<Subject> GetSubjectByName(string name);
    }
}
