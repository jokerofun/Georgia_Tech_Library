using Georgia_Tech_Library_API.Business;
using Georgia_Tech_Library_API.Business.Interfaces;
using Georgia_Tech_Library_API.Models;
using Georgia_Tech_Library_API.Repository;
using Moq;
using Shouldly;
using System.Collections.Generic;
using Xunit;

namespace Georgia_Tech_Library_Test
{
    public class ItemManagementUnitTest
    {
        private readonly IItemManagement itemManagement;
        private readonly Mock<IItemRepository> itemRepositoryMock = new Mock<IItemRepository>();
        public ItemManagementUnitTest()
        {
            this.itemManagement = new ItemManagement(itemRepositoryMock.Object);
        }
        [Fact]
        public void CreateItemDto_WithTwoAuthorsThreeItemsOneSubject_ShouldCreateThreeDtos()
        {
            Author author1 = new Author { FirstName = "Kol", LastName = "Ben", ISBN = "First" };
            Author author2 = new Author { FirstName = "Kol", LastName = "Ben", ISBN = "Second" };
            Author author3 = new Author { FirstName = "Roman", LastName = "Fall", ISBN = "Second" };

            Item item1 = new Item { ISBN = "First", Title = "First", Edition = "5th Edition", Publisher = "New", DateOfPublishing = null, ItemType = null };
            Item item2 = new Item { ISBN = "Second", Title = "Second", Edition = "5th Edition", Publisher = "New", DateOfPublishing = null, ItemType = null };
            Item item3 = new Item { ISBN = "Third", Title = "Third", Edition = "5th Edition", Publisher = "New", DateOfPublishing = null, ItemType = null };

            ItemSubject itemSubject = new ItemSubject { ISBN = "Second", Name = "subjectOne" };

            IEnumerable<Item> items = new List<Item> { item1, item2, item3 };
            IEnumerable<Author> authors = new List<Author> { author1, author2, author3 };
            IEnumerable<ItemSubject> subjects = new List<ItemSubject> { itemSubject };


            List<ItemDto> itemDtos = (List<ItemDto>)itemManagement.CreateItemDto(items, authors, subjects).Result;

            itemDtos.ShouldNotBeNull();
            itemDtos.Count.ShouldBeEquivalentTo(3);
            itemDtos[1].ISBN.ShouldBeEquivalentTo("Second");
            itemDtos[1].Authors.Count.ShouldBeEquivalentTo(2);
        }
    }
}
