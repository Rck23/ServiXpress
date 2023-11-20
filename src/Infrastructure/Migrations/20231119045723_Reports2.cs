using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ServiXpress.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Reports2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reportes_AspNetUsers_AgenteCierraReporteId",
                table: "Reportes");

            migrationBuilder.DropIndex(
                name: "IX_Reportes_AgenteCierraReporteId",
                table: "Reportes");

            migrationBuilder.DropColumn(
                name: "AgenteCierraReporteId",
                table: "Reportes");

            migrationBuilder.DropColumn(
                name: "DescripcionAgente",
                table: "Reportes");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AgenteCierraReporteId",
                table: "Reportes",
                type: "nvarchar(36)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "DescripcionAgente",
                table: "Reportes",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Reportes_AgenteCierraReporteId",
                table: "Reportes",
                column: "AgenteCierraReporteId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reportes_AspNetUsers_AgenteCierraReporteId",
                table: "Reportes",
                column: "AgenteCierraReporteId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
