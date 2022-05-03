using Microsoft.Data.SqlClient;
using System.Data;

namespace Georgia_Tech_Library_API.Helpers
{
    public class DbConnectionFactory : IDbConnectionFactory
    {
        private string _connectionString;
        public DbConnectionFactory(string connectionString)
        {
            _connectionString = connectionString;
        }

        public IDbConnection CreateSqlConnection()
        {
            return new SqlConnection(_connectionString);
        }
    }

    /*
     * List db providers
     */
    public interface IDbConnectionFactory
    {
        IDbConnection CreateSqlConnection();
    }
}
