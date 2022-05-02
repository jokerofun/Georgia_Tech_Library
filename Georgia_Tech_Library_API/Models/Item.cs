namespace Georgia_Tech_Library_API.Models
{
    public class Item
    {
        public string ISBN { get; set; }
        public string Title { get; set; }
        public string Edition { get; set; }
        public string Publisher { get; set; }
        public string DateOfPublishing { get; set; }
        public ItemType Type { get; set; }

    }
}
