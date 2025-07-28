using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Intern_Project.Data;
using Intern_Project.Models;

namespace Intern_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SiparisController : ControllerBase
    {
        private readonly Intern_ProjectDbContext _context;
        public SiparisController(Intern_ProjectDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Siparis>>> GetSiparisler()
        {
            return await _context.Siparisler
                .Include(s => s.Urunler)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Siparis>> GetSiparis(int id)
        {
            var siparis = await _context.Siparisler
                .Include(s => s.Urunler)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (siparis == null) return NotFound();

            return siparis;
        }

        [HttpPost]
        public async Task<ActionResult<Siparis>> PostSiparis(Siparis siparis)
        {
            siparis.ToplamTutar = siparis.Urunler.Sum(u => u.Adet * u.Fiyat);

            _context.Siparisler.Add(siparis);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetSiparis), new { id = siparis.Id }, siparis);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutDurum(int id, [FromBody] string durum)
        {
            var siparis = await _context.Siparisler.FindAsync(id);
            if (siparis == null) return NotFound();

            siparis.SiparisDurumu = durum;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut("{id}/durum")]
        public async Task<IActionResult> GuncelleSiparisDurumu(int id, [FromBody] string yeniDurum)
        {
            var siparis = await _context.Siparisler.FindAsync(id);

            if (siparis == null)
                return NotFound(new { mesaj = "Sipariş bulunamadı." });

            siparis.SiparisDurumu = yeniDurum;
            await _context.SaveChangesAsync();

            return Ok(new { mesaj = "Durum güncellendi.", siparis });
        }


    }
}
