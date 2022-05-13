using Georgia_Tech_Library_API.Business.Interfaces;
using Georgia_Tech_Library_API.Models;
using Georgia_Tech_Library_API.Repository;

namespace Georgia_Tech_Library_API.Business
{
    public class ItemManagement : IItemManagement
    {
        private readonly IItemRepository itemRepository;

        public ItemManagement(IItemRepository itemRepository)
        {
            this.itemRepository = itemRepository;
        }
        public async Task<IEnumerable<Item>> GetAll()
        {
            return await itemRepository.GetAll();
        }

        //find better solution to create Dtos
        public async Task<IEnumerable<ItemDto>> GetAllDtos()
        {
            IEnumerable<Item> items = await itemRepository.GetAll();
            IEnumerable<Author> authors = await itemRepository.GetAuthors();
            IEnumerable<ItemSubject> itemSubjects = await itemRepository.GetSubjects();
            return await CreateItemDto(items, authors, itemSubjects);
        }

        public Task<Item> GetItemByISBN(string ISBN)
        {
            throw new NotImplementedException();
        }

        public Task<int> Insert(Item obj)
        {
            throw new NotImplementedException();
        }

        public Task<int> Update(Item obj)
        {
            throw new NotImplementedException();
        }

        public Task<int> Delete(Item obj)
        {
            throw new NotImplementedException();
        }

        //needs refactoring
        private async Task<IEnumerable<ItemDto>> CreateItemDto(IEnumerable<Item> items, IEnumerable<Author> authors, IEnumerable<ItemSubject> itemSubjects)
        {
            List < ItemDto > itemDtos = new List<ItemDto>();
            foreach (Item item in items)
            {
                ItemDto itemDto = new ItemDto(item);
                foreach(Author author in authors)
                {
                    if (item.ISBN == author.ISBN)
                    {
                        itemDto.Authors.Add(new AuthorDto(author.FirstName, author.LastName));
                    }
                }
                foreach (ItemSubject itemSubject in itemSubjects)
                {
                    if (item.ISBN == itemSubject.ISBN)
                    {
                        itemDto.Subjects.Add(new Subject(itemSubject.Name));
                    }
                }
                itemDtos.Add(itemDto);
            }
            return itemDtos;
        }
    }
}
