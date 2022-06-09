using Georgia_Tech_Library_API.Models;

namespace Georgia_Tech_Library_API.Business.Interfaces
{
    public interface ICatalogManagement : IGenericManagement<Catalog>
    {
        Task<IEnumerable<Catalog>> GetBatch(int batchNumber);
    }
}
