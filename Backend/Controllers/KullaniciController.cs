using Intern_Project.Models;
using Intern_Project.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class KullaniciController : ControllerBase
{
    private readonly IKullaniciService _kullaniciService;

    public KullaniciController(IKullaniciService kullaniciService)
    {
        _kullaniciService = kullaniciService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Kullanici>>> GetAll()
    {
        return await _kullaniciService.GetAllUsersAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Kullanici>> GetById(int id)
    {
        var user = await _kullaniciService.GetUserByIdAsync(id);
        if (user == null)
            return NotFound();
        return user;
    }

    [HttpPost]
    public async Task<ActionResult<Kullanici>> Create(Kullanici kullanici)
    {
        var created = await _kullaniciService.AddUserAsync(kullanici);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Kullanici kullanici)
    {
        var updated = await _kullaniciService.UpdateUserAsync(id, kullanici);
        if (updated == null)
            return NotFound();
        return Ok(updated);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var success = await _kullaniciService.DeleteUserAsync(id);
        if (!success)
            return NotFound();
        return NoContent();
    }
}
