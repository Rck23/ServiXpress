namespace ServiXpress.Domain.Common
{
    public abstract class BaseDomainModel
    {

        public int Id { get; set; }

        // FECHA DE CREACION 
        public DateTime CreatedDate { get; set; }

        // CREADO POR
        public string CreatedBy { get; set; }

        // FECHAS DE MODIFICACIONES
        public DateTime LastModifiedDate { get; set; }
        public string LastModifiedBy { get; set; }
    }
}
