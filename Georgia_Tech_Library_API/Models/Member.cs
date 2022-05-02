namespace Georgia_Tech_Library_API.Models
{
    public class Member
    {
        public string SSN { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string Zip_Code { get; set; }
        public Campus Campus { get; set; }
        public Role Role { get; set; }
        public Card Card { get; set; }
    }
}
