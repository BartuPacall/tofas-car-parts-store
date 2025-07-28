using Intern_Project.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Intern_Project.Models;

namespace Intern_Project.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BildirimController : ControllerBase
    {
        private readonly IBildirimService _bildirimService;

        public BildirimController(IBildirimService bildirimService)
        {
            _bildirimService = bildirimService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Bildirim>>> GetBildiriler()
        {
            var bildiriler = await _bildirimService.GetAllAsync();
            return Ok(bildiriler);
        }

        [HttpPost]
        public async Task<ActionResult<Bildirim>> AddBildirim(Bildirim bildirim)
        {
            var added = await _bildirimService.AddAsync(bildirim);
            return CreatedAtAction(nameof(GetBildiriler), new { id = added.Id }, added);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var success = await _bildirimService.DeleteAsync(id);
            if (!success) return NotFound();
            return NoContent();
        }
    }
}
