using Intern_Project.Models;

namespace Intern_Project.Services.Interfaces
{
    public interface IBildirimService
    {
        Task<List<Bildirim>> GetAllAsync();
        Task<Bildirim?> GetByIdAsync(int id);
        Task<Bildirim> AddAsync(Bildirim bildirim);
        Task<bool> DeleteAsync(int id);
        Task<Bildirim?> UpdateAsync(Bildirim bildirim);
    }
}
