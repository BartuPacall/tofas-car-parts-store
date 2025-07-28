using Intern_Project.Models;

namespace Intern_Project.Interfaces
{
    public interface IParcaService
    {
        Task<IEnumerable<Parca>> GetAllAsync();
        Task<Parca?> GetByIdAsync(int id);
        Task<Parca> AddAsync(Parca parca);
        Task<Parca?> UpdateAsync(int id, Parca parca);
        Task<bool> DeleteAsync(int id);
    }
}
