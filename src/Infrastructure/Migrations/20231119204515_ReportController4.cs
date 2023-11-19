using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ServiXpress.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class ReportController4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reportes_Servicios_ServicioId",
                table: "Reportes");

            migrationBuilder.DropIndex(
                name: "IX_Reportes_ServicioId",
                table: "Reportes");
        }
    }
}
