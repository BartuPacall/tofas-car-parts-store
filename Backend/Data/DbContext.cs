using Microsoft.EntityFrameworkCore;
using Intern_Project.Models;

namespace Intern_Project.Data
{
    public class Intern_ProjectDbContext : DbContext
    {
        public Intern_ProjectDbContext(DbContextOptions<Intern_ProjectDbContext> options) : base(options)
        {
        }

        public DbSet<Parca> Parcalar { get; set; }
        public DbSet<Kullanici> Kullanicilar { get; set; }

        public DbSet<StokYonetimi> Stoklar { get; set; }
        public DbSet<Bildirim> Bildirimler { get; set; }
        public DbSet<Siparis> Siparisler { get; set; }
        public DbSet<SiparisUrun> SiparisUrunler { get; set; }

       public DbSet<Iletisim> Iletisimler { get; set; }


        // Kategori ve ilişkili mapping kaldırıldı
        // public DbSet<Kategori> Kategoriler { get; set; }

        // protected override void OnModelCreating(ModelBuilder modelBuilder)
        //  {
        //    base.OnModelCreating(modelBuilder);

        // Parca-Kategori ilişkisi kaldırıldı
        // modelBuilder.Entity<Parca>()
        //     .HasOne(p => p.Kategori)
        //     .WithMany(k => k.Parcalar)
        //     .HasForeignKey(p => p.KategoriId);
        //}
    }
}
