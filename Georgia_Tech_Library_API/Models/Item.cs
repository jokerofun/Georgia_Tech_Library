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

        public string ISBN { get; set; }
        public string Title { get; set; }
        public string Edition { get; set; }
        public string Publisher { get; set; }
        public string DateOfPublishing { get; set; }
        public ItemType ItemType { get; set; }
        public List<AuthorDto> Authors { get; set; }
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
