using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ServiXpress.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Reports4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reportes_CategoriaReportes_Categoria",
                table: "Reportes");

            migrationBuilder.DropIndex(
                name: "IX_Reportes_Categoria",
                table: "Reportes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CategoriaReportes",
                table: "CategoriaReportes");

            migrationBuilder.DropColumn(
                name: "Categoria",
                table: "Reportes");

            migrationBuilder.AlterColumn<string>(
                name: "Estatus",
                table: "Reportes",
                type: "nvarchar(50)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CategoriaId",
                table: "Reportes",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "CategoriaReportes",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CategoriaReportes",
                table: "CategoriaReportes",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Reportes_CategoriaId",
                table: "Reportes",
                column: "CategoriaId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reportes_CategoriaReportes_CategoriaId",
                table: "Reportes",
                column: "CategoriaId",
                principalTable: "CategoriaReportes",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reportes_CategoriaReportes_CategoriaId",
                table: "Reportes");

            migrationBuilder.DropIndex(
                name: "IX_Reportes_CategoriaId",
                table: "Reportes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CategoriaReportes",
                table: "CategoriaReportes");

            migrationBuilder.DropColumn(
                name: "CategoriaId",
                table: "Reportes");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "CategoriaReportes");

            migrationBuilder.AlterColumn<string>(
                name: "Estatus",
                table: "Reportes",
                type: "nvarchar(50)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)");

            migrationBuilder.AddColumn<string>(
                name: "Categoria",
                table: "Reportes",
                type: "nvarchar(100)",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_CategoriaReportes",
                table: "CategoriaReportes",
                column: "Nombre");

            migrationBuilder.CreateIndex(
                name: "IX_Reportes_Categoria",
                table: "Reportes",
                column: "Categoria");

            migrationBuilder.AddForeignKey(
                name: "FK_Reportes_CategoriaReportes_Categoria",
                table: "Reportes",
                column: "Categoria",
                principalTable: "CategoriaReportes",
                principalColumn: "Nombre");
        }
    }
}
