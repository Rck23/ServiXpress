

using AutoMapper;
using ServiXpress.Application.Features.Categories.Commands.CreateCategory;
using ServiXpress.Application.Features.Categories.ViewModels;
using ServiXpress.Application.Features.Services.Commands.CreateService;
using ServiXpress.Application.Features.Services.ViewModels;
using ServiXpress.Domain;

namespace ServiXpress.Application.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Servicio, ServicioVm>()
                .ForMember(p => p.CategoriaId, x => x.MapFrom(a => a.CategoriaServicio!.Nombre));
               // .ForMember(p => p.NumeroReviews, x => x.MapFrom(a => a.Reviews == null ? 0 : a.Reviews.Count));


            CreateMap<CategoriaServicio, CategoriaServicioVm>();
            CreateMap<CreateCategory, CategoriaServicio>();


            CreateMap<CreateService, Servicio>();
        }
    }
}
