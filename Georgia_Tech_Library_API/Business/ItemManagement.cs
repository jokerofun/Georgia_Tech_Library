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

        public async Task<IEnumerable<ItemDto>> GetBatch(int batchNumber)
        {
            IEnumerable<Item> items = await itemRepository.GetBatch(batchNumber);
            IEnumerable<Author> authors = await itemRepository.GetAuthors();
            IEnumerable<ItemSubject> itemSubjects = await itemRepository.GetSubjects();
            return await CreateItemDto(items, authors, itemSubjects);
        }

        public async Task<Item?> GetItemByISBN(string ISBN)
        {
            return await itemRepository.GetItemByISBN(ISBN);
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

        public async Task<IEnumerable<ItemDto>> CreateItemDto(IEnumerable<Item> items, IEnumerable<Author> authors, IEnumerable<ItemSubject> itemSubjects)
        {
            List<ItemDto> itemDtos = new();
            List<Author> authorsList = authors.ToList();
            List<ItemSubject> itemSubjectsList = itemSubjects.ToList();
            foreach (Item item in items)
            {
                ItemDto itemDto = new(item);

                for (int i = authorsList.Count - 1; i >= 0; i--)
                {
                    if (item.ISBN == authorsList[i].ISBN)
                    {
                        itemDto.Authors.Add(new AuthorDto(authorsList[i].FirstName, authorsList[i].LastName));
                        authorsList.RemoveAt(i);
                    }
                }
                for (int i = itemSubjectsList.Count - 1; i >= 0; i--)
                {
                    if (item.ISBN == itemSubjectsList[i].ISBN)
                    {
                        itemDto.Subjects.Add(new Subject(itemSubjectsList[i].Name));
                        itemSubjectsList.RemoveAt(i);
                    }
                }
                itemDtos.Add(itemDto);
            }
            return itemDtos;
        }
    }
}
