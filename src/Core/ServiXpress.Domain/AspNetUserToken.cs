using ServiXpress.Domain.Common;
using System.ComponentModel.DataAnnotations.Schema;


namespace ServiXpress.Domain
{
    public partial class AspNetUserToken
    {
        public string UserId { get; set; } = null!;

        public string LoginProvider { get; set; } = null!;

        public string Name { get; set; } = null!;

        public string? Value { get; set; }

        public virtual Usuario Usuario { get; set; } = null!;
    }
}
