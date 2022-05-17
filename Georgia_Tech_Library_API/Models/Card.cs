using Georgia_Tech_Library_API.Models.CustomDataAnnotations;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data;

namespace Georgia_Tech_Library_API.Models
{
    public class Card
    {
        [Required]
        [StringLength(12)]
        public string CardNumber { get; set; }
        [Required]
        public DateTime DateOfIssue { get; set; }
        [Required]
        [DateGreaterThan("DateOfIssue")]
        public DateTime ExpirationDay { get; set; }
    }
}
