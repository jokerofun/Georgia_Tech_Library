using Georgia_Tech_Library_API.Business.Interfaces;
using Georgia_Tech_Library_API.Models;
using Georgia_Tech_Library_API.Repository;

namespace Georgia_Tech_Library_API.Business
{
    public class MemberManagement : IMemberManagement
    {
        private readonly IMemberRepository memberRepository;

        public MemberManagement(IMemberRepository memberRepository)
        {
            this.memberRepository = memberRepository;
        }
        public Task<IEnumerable<Member>> GetAll()
        {
            throw new NotImplementedException();
        }

        public async Task<Member?> GetMemberBySSN(string SSN)
        {
            return await memberRepository.GetMemberBySSN(SSN);
        }

        public Task<int> Insert(Member obj)
        {
            throw new NotImplementedException();
        }

        public Task<int> Update(Member obj)
        {
            throw new NotImplementedException();
        }

        public Task<int> Delete(Member obj)
        {
            throw new NotImplementedException();
        }
    }
}
