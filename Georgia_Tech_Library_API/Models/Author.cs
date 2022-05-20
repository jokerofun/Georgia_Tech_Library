namespace Georgia_Tech_Library_API.Models
{
    public class Author
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ISBN { get; set; }
    }

    public class AuthorDto
    {
        public AuthorDto(string firstName, string lastName)
        {
            FirstName = firstName;
            LastName = lastName;
        }

        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
