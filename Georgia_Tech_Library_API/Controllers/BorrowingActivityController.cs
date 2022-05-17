using Georgia_Tech_Library_API.Business.Interfaces;
using Georgia_Tech_Library_API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Georgia_Tech_Library_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BorrowingActivityController : ControllerBase
    {
        private readonly IBorrowingActivityManagement borrowingActivityManagement;
        private readonly IMemberManagement memberManagement;
        public BorrowingActivityController(IBorrowingActivityManagement borrowingActivityManagement, IMemberManagement memberManagement)
        {
            this.borrowingActivityManagement = borrowingActivityManagement;
            this.memberManagement = memberManagement;   
        }

        [HttpGet]
        [Route("/api/[controller]/GetList")]
        [ProducesResponseType(typeof(BorrowingActivity[]), StatusCodes.Status200OK)]
        [Produces("application/json", "text/plain", "text/json")]
        public async Task<ActionResult<IEnumerable<BorrowingActivity>>> GetBorrowingActivities()
        {
            return Ok(await borrowingActivityManagement.GetAll());
        }

        [HttpPost]
        [Route("/api/[controller]/LoanItem")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [Produces("application/json", "text/plain", "text/json")]
        public async Task<IActionResult> LoanItem(string SSN, string ISBN, string libraryName)
        {
            Member member = await memberManagement.GetMemberBySSN(SSN);
            /* if (memberRepository.....)
             {
                 return NotFound(SSN);
             }
            */

            await borrowingActivityManagement.LoanItem(member, ISBN, libraryName);

            return Ok();

        }
    }
}
