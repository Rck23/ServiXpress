using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ServiXpress.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class context : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Servicios_AspNetUsers_UsuarioId",
                table: "Servicios");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "Calificaciones");

            migrationBuilder.DropColumn(
                name: "CreatedDate",
                table: "Calificaciones");

            migrationBuilder.DropColumn(
                name: "LastModifiedBy",
                table: "Calificaciones");

            migrationBuilder.DropColumn(
                name: "LastModifiedDate",
                table: "Calificaciones");

            migrationBuilder.RenameColumn(
                name: "Calificacion",
                table: "Calificaciones",
                newName: "CalificacionServicio");

            migrationBuilder.AddForeignKey(
                name: "FK_Servicios_AspNetUsers_UsuarioId",
                table: "Servicios",
                column: "UsuarioId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Servicios_AspNetUsers_UsuarioId",
                table: "Servicios");

            migrationBuilder.RenameColumn(
                name: "CalificacionServicio",
                table: "Calificaciones",
                newName: "Calificacion");

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "Calificaciones",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedDate",
                table: "Calificaciones",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "LastModifiedBy",
                table: "Calificaciones",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "LastModifiedDate",
                table: "Calificaciones",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddForeignKey(
                name: "FK_Servicios_AspNetUsers_UsuarioId",
                table: "Servicios",
                column: "UsuarioId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
