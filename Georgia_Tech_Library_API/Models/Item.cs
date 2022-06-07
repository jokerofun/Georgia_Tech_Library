using System.ComponentModel.DataAnnotations;

namespace Georgia_Tech_Library_API.Models
{
    public class Item
    {
        public string ISBN { get; set; }
        public string Title { get; set; }
        public string Edition { get; set; }
        public string Publisher { get; set; }
        public string DateOfPublishing { get; set; }
        public ItemType ItemType { get; set; }
    }

    public class ItemDto
    {
        [Required]
        public string ISBN { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Edition { get; set; }
        [Required]
        public string Publisher { get; set; }
        [Required]
        public string DateOfPublishing { get; set; }
        [Required]
        public ItemType ItemType { get; set; }
        [Required]
        public List<AuthorDto> Authors { get; set; }
        [Required]
        public List<Subject> Subjects { get; set; }

        public ItemDto(Item item)
        {
            ISBN = item.ISBN;
            Title = item.Title;
            Edition = item.Edition;
            Publisher = item.Publisher;
            DateOfPublishing = item.DateOfPublishing;
            ItemType = item.ItemType;
            Authors = new List<AuthorDto>();
            Subjects = new List<Subject>();
        }
    }
}
