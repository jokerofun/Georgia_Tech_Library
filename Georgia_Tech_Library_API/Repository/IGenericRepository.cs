namespace Georgia_Tech_Library_API.Repository
{
    public interface IGenericRepository<T> where T : class
    {
        Task<IEnumerable<T>> GetAll();
        Task<int> Insert(T obj);
        Task<int> Update(T obj);
        Task<int> Delete(T obj);
    }
}
