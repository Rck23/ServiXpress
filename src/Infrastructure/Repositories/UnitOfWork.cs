using System;
using System.Collections;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using ServiXpress.Application.Persistence;
using ServiXpress.Infrastructure.Context;
using ServiXpress.Domain;

namespace ServiXpress.Infrastructure.Repositories
{
    /// <summary>
    /// Unidad de trabajo que representa una transacción de base de datos.
    /// </summary>
	public class UnitOfWork: IUnitOfWork
    {
        private Hashtable? _repositories;

        private readonly ServiXpressDbContext _context;

        /// <summary>
        /// Inicializa una nueva instancia de la clase "UnitOfWork".
        /// </summary>
        /// <param name="context">Contexto de la base de datos.</param>
        public UnitOfWork(ServiXpressDbContext context)
        {
            _context = context;
        }

         /// <summary>
        /// Guarda los cambios en la base de datos de forma asíncrona.
        /// </summary>
        /// <returns>El número de entidades afectadas.</returns>
        public async Task<int> Complete()
        {

            try
            {
                return await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                throw new Exception("Error en transacion", e);
            }

        }

        /// <summary>
        /// Libera los recursos utilizados por la unidad de trabajo.
        /// </summary>
        public void Dispose()
        {
            _context.Dispose();
        }

 /// <summary>
        /// Obtiene el repositorio para una entidad específica.
        /// </summary>
        /// <typeparam name="TEntity">El tipo de entidad.</typeparam>
        /// <returns>El repositorio para la entidad especificada.</returns>
        public IAsyncRepository<TEntity> Repository<TEntity>() where TEntity : class
        {
            if (_repositories is null)
            {
                _repositories = new Hashtable();
            }

            var type = typeof(TEntity).Name;

            if (!_repositories.ContainsKey(type))
            {
                var repositoryType = typeof(RepositoryBase<>);
                var repositoryInstance = Activator.CreateInstance(repositoryType.MakeGenericType(typeof(TEntity)), _context);
                _repositories.Add(type, repositoryInstance);
            }

            return (IAsyncRepository<TEntity>)_repositories[type]!;


        }



        

    }
}

