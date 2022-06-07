using System.ComponentModel.DataAnnotations;

namespace Georgia_Tech_Library_API.Models
{
    public class Catalog
    {
        [Required]
        public string ISBN { get; set; }
        [Required]
        public string LibraryName { get; set; }
        [Required]
        public int TotalAmount { get; set; }
        public int AvailableAmount { get; set; }
        [Required]
        public string Description { get; set; }
    }
}
