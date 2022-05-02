using Georgia_Tech_Library_API.Models;
using Georgia_Tech_Library_API.Repository;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Georgia_Tech_Library_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CardController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly ICardRepository cardRepository;
        public CardController(IConfiguration configuration)
        {
            _configuration = configuration;
            cardRepository = new CardRepository(_configuration);
        }

        // GET: api/<CardController>
        [HttpGet]
        public async Task<IEnumerable<Card>> Get()
        {
            //return new string[] { "value1", "value2" };
            return await cardRepository.GetAll();
        }

        // GET api/<CardController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<CardController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<CardController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<CardController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
