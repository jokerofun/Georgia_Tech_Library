using Georgia_Tech_Library_API.Models;

namespace Georgia_Tech_Library_API.Repository
{
    public interface IAuthorRepository : IGenericRepository<Author>
    {
        Task<Author> GetAuthorByName(string firstName, string lastName);
    }
}
