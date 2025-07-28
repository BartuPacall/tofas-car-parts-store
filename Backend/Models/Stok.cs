using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Intern_Project.Models
{
    public class StokYonetimi
    {
        [Key]
        [JsonIgnore]
        public int Id { get; set; }

        [Required]
        public string ParcaAdi { get; set; } = String.Empty;
        public int Miktar { get; set; }
        public int EsikMiktar { get; set; }
        public DateTime GuncellenmeTarihi { get; set; }
    }
}
