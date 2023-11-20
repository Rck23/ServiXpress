using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ServiXpress.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class ReportController5 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reportes_Servicios_ServicioId",
                table: "Reportes");

            migrationBuilder.DropForeignKey(
                name: "FK_Servicios_AspNetUsers_UsuarioId1",
                table: "Servicios");

            migrationBuilder.DropIndex(
                name: "IX_Servicios_UsuarioId1",
                table: "Servicios");

            migrationBuilder.DropIndex(
                name: "IX_Reportes_ServicioId",
                table: "Reportes");

            migrationBuilder.DropColumn(
                name: "UsuarioId1",
                table: "Servicios");

            migrationBuilder.DropColumn(
                name: "ServicioId",
                table: "Reportes");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.CreateIndex(
                name: "IX_Reportes_ServicioId",
                table: "Reportes",
                column: "ServicioId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reportes_Servicios_ServicioId",
                table: "Reportes",
                column: "ServicioId",
                principalTable: "Servicios",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Servicios_AspNetUsers_UsuarioId1",
                table: "Servicios",
                column: "UsuarioId1",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
