using Georgia_Tech_Library_API.Business.Interfaces;
using Georgia_Tech_Library_API.Models;
using Georgia_Tech_Library_API.Repository;

namespace Georgia_Tech_Library_API.Business
{
    public class CatalogManagement : ICatalogManagement
    {
        private readonly ICatalogRepository catalogRepository;

        public CatalogManagement(ICatalogRepository catalogRepository)
        {
            this.catalogRepository = catalogRepository;
        }
        public async Task<IEnumerable<Catalog>> GetAll()
        {
            return await catalogRepository.GetAll();
        }

        public Task<int> Insert(Catalog obj)
        {
            throw new NotImplementedException();
        }

        public Task<int> Update(Catalog obj)
        {
            throw new NotImplementedException();
        }
        public Task<int> Delete(Catalog obj)
        {
            throw new NotImplementedException();
        }
    }
}
