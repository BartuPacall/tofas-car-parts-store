using Intern_Project.Models;
using Microsoft.AspNetCore.Mvc;
using Intern_Project.Data;

namespace Intern_Project.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class IletisimController : ControllerBase
    {
        private readonly Intern_ProjectDbContext _context;

        public IletisimController(Intern_ProjectDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult PostIletisim([FromBody] Iletisim iletisim)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _context.Iletisimler.Add(iletisim);
            _context.SaveChanges();

            return Ok(new { mesaj = "Mesaj başarıyla kaydedildi." });
        }

        [HttpGet]
        public IActionResult GetIletisimler()
        {
            var mesajlar = _context.Iletisimler.ToList();
            return Ok(mesajlar);
        }

        // id kullanmadan, nesne bazlı silme
        [HttpPost("delete")]
        public IActionResult DeleteMessage([FromBody] Iletisim silinecekMesaj)
        {
            var record = _context.Iletisimler.FirstOrDefault(m =>
                m.AdSoyad == silinecekMesaj.AdSoyad &&
                m.Email == silinecekMesaj.Email &&
                m.Mesaj == silinecekMesaj.Mesaj
            );

            if (record == null)
                return NotFound(new { mesaj = "Mesaj bulunamadı." });

            _context.Iletisimler.Remove(record);
            _context.SaveChanges();

            return Ok(new { mesaj = "Mesaj başarıyla silindi." });
        }
    }
}
