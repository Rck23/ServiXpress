

using AutoMapper;
using ServiXpress.Application.Features.Categories.Commands.CreateCategoryService;
using ServiXpress.Application.Features.Categories.ViewModels;
using ServiXpress.Application.Features.Reviews.ViewModels;
using ServiXpress.Application.Features.Services.Commands.CreateService;
using ServiXpress.Application.Features.Services.Commands.UpdateService;
using ServiXpress.Application.Features.Services.ViewModels;
using ServiXpress.Domain;

namespace ServiXpress.Application.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Servicio, ServicioVm>()
                .ForMember(p => p.NombreCategoria, x => x.MapFrom(a => a.CategoriaServicio!.Nombre));
              


            CreateMap<CategoriaServicio, CategoriaServicioVm>();
            CreateMap<CreateCategoryService, CategoriaServicio>();

            CreateMap<UpdateService, Servicio>();

            CreateMap<CreateService, Servicio>();

            CreateMap<Calificacion, ReviewVm>();

        }
    }
}
