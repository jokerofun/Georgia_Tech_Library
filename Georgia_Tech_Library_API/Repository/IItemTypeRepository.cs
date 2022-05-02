using Georgia_Tech_Library_API.Models;
namespace Georgia_Tech_Library_API.Repository
{
    public interface IItemTypeRepository : IGenericRepository<ItemType>
    {
        Task<ItemType> GetTypeByName(string name);
    }
}
