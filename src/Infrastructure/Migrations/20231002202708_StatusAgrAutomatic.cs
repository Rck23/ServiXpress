using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ServiXpress.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class StatusAgrAutomatic : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "TipoServicios");

            migrationBuilder.DropColumn(
                name: "CreatedDate",
                table: "TipoServicios");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "TipoServicios");

            migrationBuilder.DropColumn(
                name: "LastModifiedBy",
                table: "TipoServicios");

            migrationBuilder.DropColumn(
                name: "LastModifiedDate",
                table: "TipoServicios");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "EstatusUsuarios");

            migrationBuilder.DropColumn(
                name: "CreatedDate",
                table: "EstatusUsuarios");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "EstatusUsuarios");

            migrationBuilder.DropColumn(
                name: "LastModifiedBy",
                table: "EstatusUsuarios");

            migrationBuilder.DropColumn(
                name: "LastModifiedDate",
                table: "EstatusUsuarios");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "EstatusServicios");

            migrationBuilder.DropColumn(
                name: "CreatedDate",
                table: "EstatusServicios");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "EstatusServicios");

            migrationBuilder.DropColumn(
                name: "LastModifiedBy",
                table: "EstatusServicios");

            migrationBuilder.DropColumn(
                name: "LastModifiedDate",
                table: "EstatusServicios");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "EstatusReportes");

            migrationBuilder.DropColumn(
                name: "CreatedDate",
                table: "EstatusReportes");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "EstatusReportes");

            migrationBuilder.DropColumn(
                name: "LastModifiedBy",
                table: "EstatusReportes");

            migrationBuilder.DropColumn(
                name: "LastModifiedDate",
                table: "EstatusReportes");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "CategoriasServicios");

            migrationBuilder.DropColumn(
                name: "CreatedDate",
                table: "CategoriasServicios");

            migrationBuilder.DropColumn(
                name: "LastModifiedBy",
                table: "CategoriasServicios");

            migrationBuilder.DropColumn(
                name: "LastModifiedDate",
                table: "CategoriasServicios");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "CategoriaReportes");

            migrationBuilder.DropColumn(
                name: "CreatedDate",
                table: "CategoriaReportes");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "CategoriaReportes");

            migrationBuilder.DropColumn(
                name: "LastModifiedBy",
                table: "CategoriaReportes");

            migrationBuilder.DropColumn(
                name: "LastModifiedDate",
                table: "CategoriaReportes");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "TipoServicios",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedDate",
                table: "TipoServicios",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "TipoServicios",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "LastModifiedBy",
                table: "TipoServicios",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "LastModifiedDate",
                table: "TipoServicios",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "EstatusUsuarios",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedDate",
                table: "EstatusUsuarios",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "EstatusUsuarios",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "LastModifiedBy",
                table: "EstatusUsuarios",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "LastModifiedDate",
                table: "EstatusUsuarios",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "EstatusServicios",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedDate",
                table: "EstatusServicios",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "EstatusServicios",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "LastModifiedBy",
                table: "EstatusServicios",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "LastModifiedDate",
                table: "EstatusServicios",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "EstatusReportes",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedDate",
                table: "EstatusReportes",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "EstatusReportes",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "LastModifiedBy",
                table: "EstatusReportes",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "LastModifiedDate",
                table: "EstatusReportes",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "CategoriasServicios",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedDate",
                table: "CategoriasServicios",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "LastModifiedBy",
                table: "CategoriasServicios",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "LastModifiedDate",
                table: "CategoriasServicios",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "CategoriaReportes",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedDate",
                table: "CategoriaReportes",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "CategoriaReportes",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "LastModifiedBy",
                table: "CategoriaReportes",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "LastModifiedDate",
                table: "CategoriaReportes",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
