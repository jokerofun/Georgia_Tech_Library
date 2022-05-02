namespace Georgia_Tech_Library_API.Repository
{
    public interface IGenericRepository<T> where T : class
    {
        Task<IEnumerable<T>> GetAll();
        Task<T> Insert(T obj);
        Task<T> Update(T obj);
        Task <bool> Delete(T obj);
    }
}
