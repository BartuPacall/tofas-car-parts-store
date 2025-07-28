using Intern_Project.Data;
using Intern_Project.Interfaces;
using Intern_Project.Models;
using Microsoft.EntityFrameworkCore;

namespace Intern_Project.Services
{
    public class ParcaService : IParcaService
    {
        private readonly Intern_ProjectDbContext _context;

        public ParcaService(Intern_ProjectDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Parca>> GetAllAsync()
        {
            return await _context.Parcalar.ToListAsync();
        }

        public async Task<Parca?> GetByIdAsync(int id)
        {
            return await _context.Parcalar.FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<Parca> AddAsync(Parca parca)
        {
            _context.Parcalar.Add(parca);
            await _context.SaveChangesAsync();
            return parca;
        }

        public async Task<Parca?> UpdateAsync(int id, Parca parca)
        {
            var existing = await _context.Parcalar.FindAsync(id);
            if (existing == null) return null;

            existing.Ad = parca.Ad;
            existing.Marka = parca.Marka;
            existing.Fiyat = parca.Fiyat;
            existing.StokAdedi = parca.StokAdedi;

            await _context.SaveChangesAsync();
            return existing;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var parca = await _context.Parcalar.FindAsync(id);
            if (parca == null) return false;

            _context.Parcalar.Remove(parca);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
