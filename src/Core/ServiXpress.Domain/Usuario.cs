using Microsoft.AspNetCore.Identity;

namespace ServiXpress.Domain
{
    public class Usuario : IdentityUser
    {
        public string? Nombre { get; set; }
        public string? Apellidos { get; set; }
        public string? Telefono { get; set; }
        public string? Calle { get; set; }
        public int? NumExterior { get; set; }
        public int? NumInterior { get; set; }
        public string? ColoniaFraccionamiento { get; set; }
        public string? CodigoPostal { get; set; }
        public string? Municipio { get; set; }
        public string? Estado { get; set; }
        public string? Descripcion { get; set; }
      
        public DateTime? FechaHoraRegistro { get; set; }

        public string? Estatus { get; set; }
        public EstatusUsuario? EstatusUsuario { get; set; }


        // UNO A MUCHOS
        public virtual ICollection<Calificacion>? CalificacionesHechas { get; set; }
        public virtual ICollection<Calificacion>? CalificacionesRecibidas { get; set; }


        public ICollection<Reporte>? Reportes { get; set; }




        // PUEDE CONTENER LA IMAGEN DE PERFIL DEL USUARIO
        public string? AvatarUrl { get; set; }


        public List<Documento> Documentos { get; set; }
    }
}
