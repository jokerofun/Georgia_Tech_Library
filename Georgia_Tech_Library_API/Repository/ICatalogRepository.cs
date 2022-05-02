using Georgia_Tech_Library_API.Models;

namespace Georgia_Tech_Library_API.Repository
{
    public interface ICatalogRepository : IGenericRepository<Catalog>
    {
        Task<Catalog> GetCalatogByISBN(string ISBN);
    }
}
