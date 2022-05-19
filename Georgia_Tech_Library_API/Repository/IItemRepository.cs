using Georgia_Tech_Library_API.Models;

namespace Georgia_Tech_Library_API.Repository
{
    public interface IItemRepository : IGenericRepository<Item>
    {
        Task<Item?> GetItemByISBN(string ISBN);
        Task<IEnumerable<Author>> GetAuthors();
        Task<IEnumerable<ItemSubject>> GetSubjects();
    }
}
