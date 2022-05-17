namespace Georgia_Tech_Library_API.Models
{
    public class Catalog
    {
        public string ISBN { get; set; }
        public string LibraryName { get; set; }
        public int TotalAmount { get; set; }
        public int AvailableAmount { get; set; }
        public string Description { get; set; }
    }
}
