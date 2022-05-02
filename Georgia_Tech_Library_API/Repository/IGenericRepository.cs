namespace Georgia_Tech_Library_API.Repository
{
    public interface IGenericRepository<T> where T : class
    {
        IEnumerable<T> GetAll();
        void Insert(T obj);
        void Update(T obj);
        void Delete(object id);
    }
}

