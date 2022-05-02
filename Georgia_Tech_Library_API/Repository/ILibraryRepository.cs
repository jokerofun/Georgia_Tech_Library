using Georgia_Tech_Library_API.Models;

namespace Georgia_Tech_Library_API.Repository
{
    public interface ILibraryRepository : IGenericRepository<Library>
    {
        Task<Library> GetLibraryByName(string name);
    }
}
