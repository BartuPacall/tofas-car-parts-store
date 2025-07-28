
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;


namespace Intern_Project.Models
{
    public class Bildirim
    {
        [Key]
        [JsonIgnore]
        public int Id { get; set; }
        [Required]
        public string ParcaAdi { get; set; } = String.Empty;
        [Required]
        public int Miktar { get; set; }
        [Required]
        public int EsikMiktar { get; set; }

        public DateTime Tarih { get; set; } = DateTime.Now;
        public string Durum { get; set; } = "Yeni";
        public string Mesaj { get; internal set; } = String.Empty;
    }
}

