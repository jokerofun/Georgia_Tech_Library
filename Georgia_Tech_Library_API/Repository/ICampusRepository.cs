using Georgia_Tech_Library_API.Models;

namespace Georgia_Tech_Library_API.Repository
{
    public interface ICampusRepository : IGenericRepository<Campus>
    {
        Task<Campus> GetCampusByName(string name);
    }
}
