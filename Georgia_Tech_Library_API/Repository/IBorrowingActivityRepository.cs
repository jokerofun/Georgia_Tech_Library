using Georgia_Tech_Library_API.Models;

namespace Georgia_Tech_Library_API.Repository
{
    public interface IBorrowingActivityRepository : IGenericRepository<BorrowingActivity>
    {
        Task<BorrowingActivity> GetBorrowingActivitiesByMember(string SSN);
        Task<BorrowingActivity> GetBorrowingActivitiesByISBN(string ISBN);
    }
}
