using Georgia_Tech_Library_API.Business.Interfaces;
using Georgia_Tech_Library_API.Models;
using Georgia_Tech_Library_API.Repository;

namespace Georgia_Tech_Library_API.Business
{
    public class BorrowingActivityManagement : IBorrowingActivityManagement
    {
        private readonly IBorrowingActivityRepository borrowingActivityRepository;

        public BorrowingActivityManagement(IBorrowingActivityRepository borrowingActivityRepository)
        {
            this.borrowingActivityRepository = borrowingActivityRepository;
        }

        public async Task<IEnumerable<BorrowingActivity>> GetAll()
        {
            return await borrowingActivityRepository.GetAll();
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

        public async Task<int> LoanItem(Member member, string ISBN, string libraryName)
        {
            BorrowingActivity borrowingActivity = new();
            borrowingActivity.SSN = member.SSN;
            borrowingActivity.ISBN = ISBN;
            borrowingActivity.LibraryName = libraryName;   
            borrowingActivity.DueDate = borrowingActivity.BorrowingDate.AddDays(member.Role.ReturnPeriod);

            return await borrowingActivityRepository.LoanItem(borrowingActivity);
        }
    }
}
