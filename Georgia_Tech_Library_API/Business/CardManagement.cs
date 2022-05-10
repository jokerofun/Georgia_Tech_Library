using Georgia_Tech_Library_API.Business.Interfaces;
using Georgia_Tech_Library_API.Models;
using Georgia_Tech_Library_API.Repository;

namespace Georgia_Tech_Library_API.Business
{
    public class CardManagement : ICardManagement
    {
        private readonly ICardRepository cardRepository;

            public CardManagement(ICardRepository cardRepository) 
        {
            this.cardRepository = cardRepository;
        }

        public async Task<IEnumerable<Card>> GetAll()
        {
            return await cardRepository.GetAll();
        }

        public async Task<Card> GetCardByCardNumber(string cardNumber)
        {
            return await cardRepository.GetCardByCardNumber(cardNumber);
        }

        public async Task<int> Insert(Card obj)
        {
            return await cardRepository.Insert(obj);
        }

        public async Task<int> Update(Card obj)
        {
            return await cardRepository.Update(obj);
        }

        public Task<int> Delete(Card obj)
        {
            return cardRepository.Delete(obj);
        }
    }
}
