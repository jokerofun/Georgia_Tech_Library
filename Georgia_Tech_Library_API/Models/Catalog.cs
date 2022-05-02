namespace Georgia_Tech_Library_API.Models
{
    public class Catalog
    {
        public Item Item { get; set; }
        public Library Library { get; set; }
        public int TotalAmount { get; set; }
        public int AvailableAmount { get; set; }
        public string Description { get; set; }
    }

    public class CatalogDto
    {
        public ItemDto Item { get; set; }
        public Library Library { get; set; }
        public int TotalAmount { get; set; }
        public int AvailableAmount { get; set; }
        public string Description { get; set; }
    }
}
