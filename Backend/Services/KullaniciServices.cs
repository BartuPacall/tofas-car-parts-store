using Intern_Project.Data;
using Intern_Project.Interfaces;
using Intern_Project.Models;
using Intern_Project.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Intern_Project.Services
{
    public class KullaniciService : IKullaniciService
    {
        private readonly Intern_ProjectDbContext _context;

        public KullaniciService(Intern_ProjectDbContext context)
        {
            _context = context;
        }

        public async Task<List<Kullanici>> GetAllUsersAsync()
        {
            return await _context.Kullanicilar.ToListAsync();
        }

        public async Task<Kullanici?> GetUserByIdAsync(int id)
        {
            return await _context.Kullanicilar.FindAsync(id);
        }

        public async Task<Kullanici> AddUserAsync(Kullanici kullanici)
        {
            _context.Kullanicilar.Add(kullanici);
            await _context.SaveChangesAsync();
            return kullanici;
        }

        public async Task<bool> DeleteUserAsync(int id)
        {
            var user = await _context.Kullanicilar.FindAsync(id);
            if (user == null)
                return false;

            _context.Kullanicilar.Remove(user);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<Kullanici?> UpdateUserAsync(int id, Kullanici kullanici)
        {
            var user = await _context.Kullanicilar.FindAsync(id);
            if (user == null)
                return null;

            user.KullaniciAdi = kullanici.KullaniciAdi;
            user.Sifre = kullanici.Sifre;
            user.Rol = kullanici.Rol;

            await _context.SaveChangesAsync();
            return user;
        }
    }
}
