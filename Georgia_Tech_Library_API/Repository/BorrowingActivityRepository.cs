using Dapper;
using Georgia_Tech_Library_API.Helpers;
using Georgia_Tech_Library_API.Models;

namespace Georgia_Tech_Library_API.Repository
{
    public class BorrowingActivityRepository : IBorrowingActivityRepository
    {
        private readonly IDbConnectionFactory _dbConnectionFactory;
        public BorrowingActivityRepository(IDbConnectionFactory dbConnectionFactory)
        {
            _dbConnectionFactory = dbConnectionFactory;
        }

        public async Task<IEnumerable<BorrowingActivity>> GetAll()
        {
            var sql = "SELECT * FROM BorrowingActivity";

            using var connection = _dbConnectionFactory.CreateSqlConnection();
            connection.Open();
            var result = await connection.QueryAsync<BorrowingActivity>(sql);
            return result.ToList();
        }
        public async Task<IEnumerable<BorrowingActivity>> GetBatch(int batchNumber)
        {
            int from = 0; 
            if (batchNumber > 1)
                from = 1000 * (batchNumber - 1) + 1;
            int until = 1000 * batchNumber;
            var sql = "exec [getBorrowingActivityBatch] @from, @until";
            var values = new { from = from, until = until };

            using var connection = _dbConnectionFactory.CreateSqlConnection();
            connection.Open();

            var result = await connection.QueryAsync<BorrowingActivity>(sql, values);
            return result.ToList();
        }

        public Task<BorrowingActivity> GetBorrowingActivitiesByISBN(string ISBN)
        {
            throw new NotImplementedException();
        }

        public Task<BorrowingActivity> GetBorrowingActivitiesByMember(string SSN)
        {
            throw new NotImplementedException();
        }

        public Task<int> Insert(BorrowingActivity obj)
        {
            throw new NotImplementedException();
        }

        public Task<int> Update(BorrowingActivity obj)
        {
            throw new NotImplementedException();
        }

        public Task<int> Delete(BorrowingActivity obj)
        {
            throw new NotImplementedException();
        }

        public async Task<int> LoanItem(BorrowingActivity obj)
        {
            var sql = "UPDATE Catalog set AvailableAmount = AvailableAmount - 1 WHERE ISBN = @ISBN AND LibraryName = @LibraryName;";

            using var connection = _dbConnectionFactory.CreateSqlConnection();
            connection.Open();
            using var transaction = connection.BeginTransaction();


            await connection.ExecuteAsync(sql, new { obj.ISBN, obj.LibraryName }, transaction);

            var sql2 = "INSERT into BorrowingActivity values (@SSN, @ISBN, @LibraryName, @BorrowingDate, @DueDate, @DateOfReturn);";


            int affected = await connection.ExecuteAsync(sql2, new { obj.SSN, obj.ISBN, obj.LibraryName, obj.BorrowingDate, obj.DueDate, obj.DateOfReturn }, transaction);
            transaction.Commit();
            return affected;
        }
        /*
        public async Task<IEnumerable<BorrowingActivity>> GetMostPopularBooks(int amount)
        {
            
             var procedure = "[Sales by Year]";
             var values = new { Beginning_Date = "2017.1.1", Ending_Date = "2017.12.31" };
             var results = connection.Query(procedure, values, commandType: CommandType.StoredProcedure).ToList();
             results.ForEach(r => Console.WriteLine($"{r.OrderID} {r.Subtotal}"));
            
        }
            */
    }
}
