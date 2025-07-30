using Intern_Project.Data;
using Intern_Project.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Intern_Project.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentController : ControllerBase
    {
        private readonly Intern_ProjectDbContext _context;

        public PaymentController(Intern_ProjectDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> PostPayment([FromBody] Payment payment)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _context.Payments.Add(payment);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Ödeme başarıyla kaydedildi." });
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Payment>>> GetPayments()
        {
            var payments = await _context.Payments.ToListAsync();
            return Ok(payments);
        }
        [HttpDelete("{cardNumber}")]
        public async Task<IActionResult> DeletePaymentByCardNumber(string cardNumber)
        {
            var payment = await _context.Payments.FirstOrDefaultAsync(p => p.CardNumber == cardNumber);
            if (payment == null)
            {
                return NotFound(new { message = "Ödeme bulunamadı." });
            }

            _context.Payments.Remove(payment);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Ödeme başarıyla silindi." });
        }

    }
}
