namespace Georgia_Tech_Library_API.Models
{
    public class BorrowingActivity
    {
        public int Id { get; set; }
        public string SSN { get; set; }
        public string ISBN { get; set; }
        public string LibraryName { get; set; }
        public DateTime BorrowingDate { get; set; } = DateTime.Now;
        public DateTime DueDate { get; set; }
        public DateTime? DateOfReturn { get; set; } = null;
    }
}
