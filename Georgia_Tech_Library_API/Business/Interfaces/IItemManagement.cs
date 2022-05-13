using Georgia_Tech_Library_API.Models;

namespace Georgia_Tech_Library_API.Business.Interfaces
{
    public interface IItemManagement : IGenericManagement<Item>
    {
        Task<Item> GetItemByISBN(string ISBN);
        Task<IEnumerable<ItemDto>> GetAllDtos();


    }
}
