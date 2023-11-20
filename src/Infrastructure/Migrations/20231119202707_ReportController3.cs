using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ServiXpress.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class ReportController3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UsuarioId1",
                table: "Servicios",
                type: "nvarchar(36)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ServicioId",
                table: "Reportes",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Servicios_UsuarioId1",
                table: "Servicios",
                column: "UsuarioId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Servicios_AspNetUsers_UsuarioId1",
                table: "Servicios",
                column: "UsuarioId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Servicios_AspNetUsers_UsuarioId1",
                table: "Servicios");

            migrationBuilder.DropIndex(
                name: "IX_Servicios_UsuarioId1",
                table: "Servicios");

            migrationBuilder.DropColumn(
                name: "UsuarioId1",
                table: "Servicios");

            migrationBuilder.DropColumn(
                name: "ServicioId",
                table: "Reportes");
        }
    }
}
