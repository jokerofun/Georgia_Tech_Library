using Georgia_Tech_Library_API.Business.Interfaces;
using Georgia_Tech_Library_API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Georgia_Tech_Library_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CatalogController : ControllerBase
    {
        private readonly ICatalogManagement catalogManagement;
        public CatalogController(ICatalogManagement catalogManagement)
        {
            this.catalogManagement = catalogManagement;
        }

        [HttpGet]
        [Route("/api/[controller]/GetList")]
        [ProducesResponseType(typeof(Catalog[]), StatusCodes.Status200OK)]
        [Produces("application/json", "text/plain", "text/json")]
        public async Task<ActionResult<IEnumerable<Catalog>>> GetCatalog()
        {
            return Ok(await catalogManagement.GetAll());
        }
    }
}
