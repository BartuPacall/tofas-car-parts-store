using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Intern_Project.Data;
using Intern_Project.Models;
using System;


namespace Intern_Project.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StokController : ControllerBase
    {
        private readonly Intern_ProjectDbContext _context;

        public StokController(Intern_ProjectDbContext context)
        {
            _context = context;
        }

        // GET: api/Stok
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StokYonetimi>>> GetStoklar()
        {
            return await _context.Stoklar.ToListAsync();
        }

        // GET: api/Stok/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StokYonetimi>> GetStok(int id)
        {
            var stok = await _context.Stoklar.FindAsync(id);
            if (stok == null) return NotFound();
            return stok;
        }

        // POST: api/Stok
        [HttpPost]
        public async Task<ActionResult<StokYonetimi>> PostStok(StokYonetimi stok)
        {
            _context.Stoklar.Add(stok);
            await _context.SaveChangesAsync();

            if (stok.Miktar <= stok.EsikMiktar)
            {
                var bildirim = new Bildirim
                {
                    ParcaAdi = stok.ParcaAdi,
                    Mesaj = $"Parça: {stok.ParcaAdi} için eşik değeri aşıldı! Miktar: {stok.Miktar}, Eşik: {stok.EsikMiktar}",
                    Tarih = DateTime.Now
                };

                _context.Bildirimler.Add(bildirim);
                await _context.SaveChangesAsync();
            }
            return CreatedAtAction(nameof(GetStok), new { id = stok.Id }, stok);
        }

        // PUT: api/Stok/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStok(int id, StokYonetimi stok)
        {
            if (id != stok.Id) return BadRequest();

            _context.Entry(stok).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Stoklar.Any(e => e.Id == id)) return NotFound();
                throw;
            }

            return NoContent();
        }

        // DELETE: api/Stok/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStok(int id)
        {
            var stok = await _context.Stoklar.FindAsync(id);
            if (stok == null) return NotFound();

            _context.Stoklar.Remove(stok);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
