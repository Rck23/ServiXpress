using System;
using System.Collections.Generic;

namespace ServiXpress.Api.Models;

public partial class Servicio
{
    public int Id { get; set; }

    public string Estado { get; set; } = null!;

    public string Municipio { get; set; } = null!;

    public string Telefonos { get; set; } = null!;

    public string Correos { get; set; } = null!;

    public string OtrosMediosContacto { get; set; } = null!;

    public string Descripcion { get; set; } = null!;

    public string UbicacionMaps { get; set; } = null!;

    public float Precio { get; set; }

    public DateTime FechaHoraRegistro { get; set; }

    public DateTime? FechaVencimiento { get; set; }

    public string UsuarioId { get; set; } = null!;

    public int CategoriaId { get; set; }

    public string Tipo { get; set; } = null!;

    public virtual CategoriasServicio Categoria { get; set; } = null!;

    public virtual TipoServicio TipoNavigation { get; set; } = null!;

    public virtual AspNetUser Usuario { get; set; } = null!;
}
