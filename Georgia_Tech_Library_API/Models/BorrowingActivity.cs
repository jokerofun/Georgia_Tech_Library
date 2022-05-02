namespace Georgia_Tech_Library_API.Models
{
    public class BorrowingActivity
    {
        public Member Member { get; set; }
        public Catalog Catalog { get; set; }
        public DateTime BorrowingDate { get; set; }
        public DateTime DueDate { get; set; }
        public DateTime DayOfReturn { get; set; }
    }
}
