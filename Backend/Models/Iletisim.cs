using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Intern_Project.Models
{
    public class Iletisim
    {
        
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [JsonIgnore]
        public int Id { get; set; }
        public string AdSoyad { get; set; }

        [Required, EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Mesaj { get; set; }
    }
}
