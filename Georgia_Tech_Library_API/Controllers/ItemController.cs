using Georgia_Tech_Library_API.Business.Interfaces;
using Georgia_Tech_Library_API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Georgia_Tech_Library_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        private readonly IItemManagement itemManagement;
        public ItemController(IItemManagement itemManagement)
        {
            this.itemManagement = itemManagement;
        }

        [HttpGet]
        [Route("/api/[controller]/GetList")]
        [ProducesResponseType(typeof(ItemDto[]), StatusCodes.Status200OK)]
        [Produces("application/json", "text/plain", "text/json")]
        public async Task<ActionResult<IEnumerable<ItemDto>>> GetCards()
        {
            return Ok(await itemManagement.GetAllDtos());
        }
    }
}
