using Intern_Project.Models;

namespace Intern_Project.Services.Interfaces
{
    public interface IKullaniciService
    {
        Task<List<Kullanici>> GetAllUsersAsync();
        Task<Kullanici?> GetUserByIdAsync(int id);
        Task<Kullanici> AddUserAsync(Kullanici kullanici);
        Task<bool> DeleteUserAsync(int id);
        Task<Kullanici?> UpdateUserAsync(int id, Kullanici kullanici);
    }
}
