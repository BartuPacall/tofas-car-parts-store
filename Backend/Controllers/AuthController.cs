using Microsoft.AspNetCore.Mvc;
using Intern_Project.Data;
using Intern_Project.Models;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Intern_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly Intern_ProjectDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthController(Intern_ProjectDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        //POST api/auth/register
        [HttpPost("register")]
        public async Task<IActionResult> Register(Kullanici kullanici)
        {
            if (await _context.Kullanicilar.AnyAsync(u => u.KullaniciAdi == kullanici.KullaniciAdi))
                return BadRequest("Bu kullanıcı zaten kayıtlı");
            _context.Kullanicilar.Add(kullanici);
            await _context.SaveChangesAsync();

            return Ok("Kayıt başarılı!");
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login(Kullanici loginData)
        {
            var kullanici = await _context.Kullanicilar.FirstOrDefaultAsync(u => u.KullaniciAdi == loginData.KullaniciAdi && u.Sifre == loginData.Sifre);

            if (kullanici == null)
                return Unauthorized("Kullanıcı adı veya şifre yanlış.");

            //JWT Token Üretimi
            var token = GenerateJwtToken(kullanici);
            return Ok(new { token });

        }
        private string GenerateJwtToken(Kullanici kullanici)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, kullanici.KullaniciAdi),
                new Claim(ClaimTypes.Role, kullanici.Rol)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(2),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);

        }
    }
}
