using Microsoft.AspNetCore.Mvc;
using Intern_Project.Data;
using Microsoft.EntityFrameworkCore;

namespace Intern_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KarsilastirmaController : ControllerBase
    {
        private readonly Intern_ProjectDbContext _context;

        public KarsilastirmaController(Intern_ProjectDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> Karsilastir([FromBody] List<int> parcaIdList)
        {
            if (parcaIdList == null || !parcaIdList.Any())
                return BadRequest("Karşılaştırmak için en az bir parça ID girilmelidir.");

            var parcalar = await _context.Parcalar
                .Where(p => parcaIdList.Contains(p.Id))
                .Select(p => new
                {
                    p.Id,
                    p.Ad,
                    p.Fiyat
                }).ToListAsync();

            return Ok(parcalar);
        }
    }
}
