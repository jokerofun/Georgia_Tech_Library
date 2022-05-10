using Georgia_Tech_Library_API.Models;

namespace Georgia_Tech_Library_API.Business.Interfaces
{
    public interface ICardManagement : IGenericManagement<Card>
    {
        Task<Card> GetCardByCardNumber(string cardNumber);
    }
}
