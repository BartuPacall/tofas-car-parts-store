namespace Intern_Project.Models
{
    public class Siparis
    {
        public int Id { get; set; }
        public string KullaniciAdi { get; set; } = string.Empty;
        public DateTime SiparisTarihi { get; set; } = DateTime.Now;
        public decimal ToplamTutar { get; set; }
        public string SiparisDurumu { get; set; } = "Bekliyor"; // Hazırlanıyor, Kargoda, Teslim Edildi, İptal Edildi olabilir
        public List<SiparisUrun> Urunler { get; set; } = new();
    }
}
