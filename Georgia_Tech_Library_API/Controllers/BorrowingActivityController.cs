using Georgia_Tech_Library_API.Business.Interfaces;
using Georgia_Tech_Library_API.Models;
using Microsoft.AspNetCore.Mvc;

namespace Georgia_Tech_Library_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BorrowingActivityController : ControllerBase
    {
        private readonly IBorrowingActivityManagement borrowingActivityManagement;
        private readonly IMemberManagement memberManagement;
        private readonly IItemManagement itemManagement;
        public BorrowingActivityController(IBorrowingActivityManagement borrowingActivityManagement, IMemberManagement memberManagement, IItemManagement itemManagement)
        {
            this.borrowingActivityManagement = borrowingActivityManagement;
            this.memberManagement = memberManagement;
            this.itemManagement = itemManagement;
        }

        [HttpGet]
        [Route("/api/[controller]/GetList")]
        [ProducesResponseType(typeof(BorrowingActivity[]), StatusCodes.Status200OK)]
        [Produces("application/json", "text/plain", "text/json")]
        public async Task<ActionResult<IEnumerable<BorrowingActivity>>> GetBorrowingActivities()
        {
            return Ok(await borrowingActivityManagement.GetAll());
        }

        [HttpGet]
        [Route("/api/[controller]/GetList/{batchNumber}")]
        [ProducesResponseType(typeof(BorrowingActivity[]), StatusCodes.Status200OK)]
        [Produces("application/json", "text/plain", "text/json")]
        public async Task<ActionResult<IEnumerable<BorrowingActivity>>> GetBatch(int batchNumber)
        {
            return Ok(await borrowingActivityManagement.GetBatch(batchNumber));
        }

        [HttpPost]
        [Route("/api/[controller]/LoanItem")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [Produces("application/json", "text/plain", "text/json")]
        public async Task<IActionResult> LoanItem(string SSN, string ISBN, string libraryName)
        {
            Item? item = await itemManagement.GetItemByISBN(ISBN);
            if (item == null)
            {
                return NotFound("The item with ISBN " + ISBN + " was not found.");
            }
            else if (item.ItemType.Lendable == false)
            {
                return BadRequest("This item is not lendable.");
            }

            Member? member = await memberManagement.GetMemberBySSN(SSN);
            if (member == null)
            {
                return NotFound("The member with SSN " + SSN + " was not found.");
            }

            await borrowingActivityManagement.LoanItem(member, ISBN, libraryName);

            return Ok();

        }
    }
}
