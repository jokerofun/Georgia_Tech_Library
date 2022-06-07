using Georgia_Tech_Library_API.Models;

namespace Georgia_Tech_Library_API.Business.Interfaces
{
    public interface IItemManagement : IGenericManagement<Item>
    {
        Task<Item?> GetItemByISBN(string ISBN);
        Task<IEnumerable<ItemDto>> GetAllDtos();
        Task<IEnumerable<ItemDto>> GetBatch(int batchNumber);
        Task<IEnumerable<ItemDto>> CreateItemDto(IEnumerable<Item> items, IEnumerable<Author> authors, IEnumerable<ItemSubject> itemSubjects);


    }
}
