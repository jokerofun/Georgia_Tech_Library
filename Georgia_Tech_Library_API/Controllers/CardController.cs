using Georgia_Tech_Library_API.Business.Interfaces;
using Georgia_Tech_Library_API.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Georgia_Tech_Library_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CardController : ControllerBase
    {
        private readonly ICardManagement cardManagement;
        public CardController(ICardManagement cardManagement)
        {
            this.cardManagement = cardManagement;
        }

        [HttpGet]
        [Route("/api/[controller]/GetList")]
        [ProducesResponseType(typeof(Card[]), StatusCodes.Status200OK)]
        [Produces("application/json", "text/plain", "text/json")]
        public async Task<ActionResult<IEnumerable<Card>>> GetCards()
        {
            return Ok(await cardManagement.GetAll());
        }

        [HttpGet]
        [Route("/api/[controller]/GetByCardNumber/{cardNumber}")]
        [ProducesResponseType(typeof(Card), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [Produces("application/json", "text/plain", "text/json")]
        public async Task<ActionResult<Card>> GetCardByCardNumber(string cardNumber)
        {
            var result = await cardManagement.GetCardByCardNumber(cardNumber);
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpPost]
        [Route("/api/[controller]/Insert")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Produces("application/json", "text/plain", "text/json")]
        public async Task<IActionResult> Insert([FromBody] Card card)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            if (await cardManagement.Insert(card) == 0)
            {
                throw new Exception();
            }
            else return Ok();

        }
        [HttpPut]
        [Route("/api/[controller]/Update")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [Produces("application/json", "text/plain", "text/json")]
        public async Task<IActionResult> Update([FromBody] Card card)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (await cardManagement.Update(card) == 0)
            {
                return NotFound();
            }
            else return Ok();
        }

        [HttpDelete]
        [Route("/api/[controller]/Delete")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [Produces("application/json", "text/plain", "text/json")]
        public async Task<IActionResult> Delete([FromBody] Card card)
        {
            if (await cardManagement.Delete(card) == 0)
            {
                return NotFound();
            }
            else return Ok();
        }
    }
}
