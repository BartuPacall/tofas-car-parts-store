using System.Text.Json.Serialization;

namespace Intern_Project.Models
{
    public class SiparisUrun
    {
        [JsonIgnore]
        public int Id { get; set; }
        public string UrunAdi { get; set; } = string.Empty;
        public int Adet { get; set; }
        public int Fiyat { get; set; }

        public int SiparisId { get; set; }
        [JsonIgnore]
        public Siparis? Siparis { get; set; }
    }
}

