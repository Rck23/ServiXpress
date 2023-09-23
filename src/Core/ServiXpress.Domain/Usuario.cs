using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data;
using Microsoft.AspNetCore.Identity;

namespace ServiXpress.Domain
{
    public class Usuario : IdentityUser
    {
        //public int Id { get; set; }
        public string Nombre { get; set; }
        public string Apellidos { get; set; }
        public string Calle { get; set; }
        public int NumExterior { get; set; }
        public int? NumInterior { get; set; }
        public string ColoniaFraccionamiento { get; set; }
        public string CodigoPostal { get; set; }
        public string Municipio { get; set; }
        public string Estado { get; set; }
        public string Descripcion { get; set; }
        public string Telefono { get; set; }
       // public string Correo { get; set; }
       // public string Contrasena { get; set; }
        public DateTime FechaHoraRegistro { get; set; }



        public string Estatus { get; set; }
        public string Role { get; set; }

        public EstatusUsuario EstatusUsuario { get; set; }
        //public Role Rol { get; set; }


        // UNO A MUCHOS
        public virtual ICollection<Calificaciones> CalificacionesHechas { get; set; }
        public virtual ICollection<Calificaciones> CalificacionesRecibidas { get; set; }


        public ICollection<Reporte> Reportes { get; set; }

        // PUEDE CONTENER LA IMAGEN DE PERFIL DEL USUARIO
        public string? AvatarUrl { get; set; }
    }
}
