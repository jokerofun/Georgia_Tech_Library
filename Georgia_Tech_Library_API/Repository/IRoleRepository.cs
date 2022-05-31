using Georgia_Tech_Library_API.Models;

namespace Georgia_Tech_Library_API.Repository
{
    public interface IRoleRepository : IGenericRepository<Role>
    {
        Task<Role> GetRoleByName(string name);
    }
}
