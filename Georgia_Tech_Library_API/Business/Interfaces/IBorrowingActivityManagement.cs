using Georgia_Tech_Library_API.Models;

namespace Georgia_Tech_Library_API.Business.Interfaces
{
    public interface IBorrowingActivityManagement : IGenericManagement<BorrowingActivity>
    {
        Task<int> LoanItem(Member member, string ISBN, string libraryName);
        Task<IEnumerable<BorrowingActivity>> GetBatch(int batchNumber);
    }
}
