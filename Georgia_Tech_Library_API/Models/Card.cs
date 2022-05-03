using System.ComponentModel.DataAnnotations.Schema;
using System.Data;

namespace Georgia_Tech_Library_API.Models
{
    public class Card
    {
        public string CardNumber { get; set; }
        public DateTime DateOfIssue { get; set; }
        public DateTime ExpirationDay { get; set; }
    }
}
