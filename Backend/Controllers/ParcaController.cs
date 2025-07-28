using Intern_Project.Interfaces;
using Intern_Project.Models;
using Microsoft.AspNetCore.Mvc;

namespace Intern_Project.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ParcaController : ControllerBase
    {
        private readonly IParcaService _parcaService;

        public ParcaController(IParcaService parcaService)
        {
            _parcaService = parcaService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var parcalar = await _parcaService.GetAllAsync();
            return Ok(parcalar);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var parca = await _parcaService.GetByIdAsync(id);
            if (parca == null) return NotFound();
            return Ok(parca);
        }

        [HttpPost]
        public async Task<IActionResult> Add(Parca parca)
        {
            var added = await _parcaService.AddAsync(parca);
            return CreatedAtAction(nameof(GetById), new { id = added.Id }, added);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Parca parca)
        {
            var updated = await _parcaService.UpdateAsync(id, parca);
            if (updated == null) return NotFound();
            return Ok(updated);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _parcaService.DeleteAsync(id);
            if (!deleted) return NotFound();
            return NoContent();
        }
    }
}
