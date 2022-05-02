using Georgia_Tech_Library_API.Models;

namespace Georgia_Tech_Library_API.Repository
{
    public interface ICardRepository : IGenericRepository<Card>
    {
        Task<Card> GetCardByCardNumber(string cardNumber);
    }
}
