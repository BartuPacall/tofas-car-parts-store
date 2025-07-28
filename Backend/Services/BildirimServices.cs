using Intern_Project.Data;
using Intern_Project.Models;
using Intern_Project.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Intern_Project.Services
{
    public class BildirimService : IBildirimService
    {
        private readonly Intern_ProjectDbContext _context;

        public BildirimService(Intern_ProjectDbContext context)
        {
            _context = context;
        }

        public async Task<List<Bildirim>> GetAllAsync()
        {
            return await _context.Bildirimler
                .OrderByDescending(b => b.Tarih)
                .ToListAsync();
        }

        public async Task<Bildirim?> GetByIdAsync(int id)
        {
            return await _context.Bildirimler.FindAsync(id);
        }

        public async Task<Bildirim> AddAsync(Bildirim bildirim)
        {
            _context.Bildirimler.Add(bildirim);
            await _context.SaveChangesAsync();
            return bildirim;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var bildirim = await _context.Bildirimler.FindAsync(id);
            if (bildirim == null) return false;

            _context.Bildirimler.Remove(bildirim);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<Bildirim?> UpdateAsync(Bildirim bildirim)
        {
            var existing = await _context.Bildirimler.FindAsync(bildirim.Id);
            if (existing == null) return null;

            existing.ParcaAdi = bildirim.ParcaAdi;
            existing.Miktar = bildirim.Miktar;
            existing.EsikMiktar = bildirim.EsikMiktar;
            existing.Tarih = bildirim.Tarih;
            existing.Durum = bildirim.Durum;
            existing.Mesaj = bildirim.Mesaj;

            await _context.SaveChangesAsync();
            return existing;
        }
    }
}
