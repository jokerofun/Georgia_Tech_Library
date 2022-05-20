namespace Georgia_Tech_Library_API.Business.Interfaces
{
    public interface IGenericManagement<T> where T : class
    {
        Task<IEnumerable<T>> GetAll();
        Task<int> Insert(T obj);
        Task<int> Update(T obj);
        Task<int> Delete(T obj);
    }
}
