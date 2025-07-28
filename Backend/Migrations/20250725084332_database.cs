using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Intern_Project.Migrations
{
    /// <inheritdoc />
    public partial class database : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Parcalar_Kategoriler_KategoriId",
                table: "Parcalar");

            migrationBuilder.DropTable(
                name: "Kategoriler");
          
      

            migrationBuilder.DropColumn(
                name: "EklenmeTarihi",
                table: "Parcalar");

            migrationBuilder.DropColumn(
                name: "KategoriId",
                table: "Parcalar");

            migrationBuilder.AlterColumn<int>(
                name: "Fiyat",
                table: "SiparisUrunler",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<int>(
                name: "Fiyat",
                table: "Parcalar",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "TEXT");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "Fiyat",
                table: "SiparisUrunler",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AlterColumn<decimal>(
                name: "Fiyat",
                table: "Parcalar",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AddColumn<DateTime>(
                name: "EklenmeTarihi",
                table: "Parcalar",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "KategoriId",
                table: "Parcalar",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Kategoriler",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Ad = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Kategoriler", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Parcalar_KategoriId",
                table: "Parcalar",
                column: "KategoriId");

            migrationBuilder.AddForeignKey(
                name: "FK_Parcalar_Kategoriler_KategoriId",
                table: "Parcalar",
                column: "KategoriId",
                principalTable: "Kategoriler",
                principalColumn: "Id");
        }
    }
}
