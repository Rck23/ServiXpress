using System;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Linq.Expressions;
using ServiXpress.Infrastructure.Context;
using ServiXpress.Application.Persistence;

namespace ServiXpress.Infrastructure.Repositories
{
    /// <summary>
    /// Esta clase se utiliza para realizar operaciones CRUD 
    /// (Crear, Leer, Actualizar, Eliminar) en entidades de base de datos.
    /// </summary>
    /// <typeparam name="T"></typeparam>
	public class RepositoryBase<T> : IAsyncRepository<T> where T : class
    {
		protected readonly ServiXpressDbContext _context;

    /// <summary>
    /// El constructor de la clase acepta un parámetro de tipo ServiXpressDbContext, 
    /// que es el contexto de la base de datos utilizado para realizar las operaciones.
    /// </summary>
    /// <param name="context"></param>
		public RepositoryBase( ServiXpressDbContext context)
		{
			_context = context;
		}

        public async Task<T> GetFirstOrDefaultAsync(Expression<Func<T, bool>> predicate)
        {
            return await _context.Set<T>().FirstOrDefaultAsync(predicate);
        }
        /// <summary>
        /// Agrega una entidad al contexto de la base de datos y guarda 
        /// los cambios de forma asíncrona.
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public async Task<T> AddAsync(T entity)
        {
            _context.Set<T>().Add(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        /// <summary>
        /// Agrega una entidad al contexto de la base de datos.
        /// </summary>
        /// <param name="entity"></param>
        public void AddEntity(T entity)
        {
            _context.Set<T>().Add(entity);
        }

        /// <summary>
        /// Agrega una lista de entidades al contexto de la base de datos.
        /// </summary>
        /// <param name="entities"></param>
        public void AddRange(List<T> entities)
        {
            _context.Set<T>().AddRange(entities);
        }

        /// <summary>
        /// Elimina una entidad del contexto de la base de datos y 
        /// guarda los cambios de forma asíncrona.
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public async Task DeleteAsync(T entity)
        {
            _context.Set<T>().Remove(entity);
            await _context.SaveChangesAsync();
        }

        /// <summary>
        /// Elimina una entidad del contexto de la base de datos.
        /// </summary>
        /// <param name="entity"></param>
        public void DeleteEntity(T entity)
        {
            _context.Set<T>().Remove(entity);
        }

        /// <summary>
        /// Elimina una lista de entidades del contexto de la base de datos.
        /// </summary>
        /// <param name="entities"></param>
        public void DeleteRange(IReadOnlyList<T> entities)
        {
            _context.Set<T>().RemoveRange(entities);
        }

        /// <summary>
        /// Obtiene todas las entidades del contexto de la base de datos de forma asíncrona.
        /// </summary>
        /// <returns></returns>
        public async Task<IReadOnlyList<T>> GetAllAsync()
        {
            return await _context.Set<T>().ToListAsync();
        }

        /// <summary>
        /// Obtiene las entidades que cumplen un predicado dado de forma asíncrona.
        /// </summary>
        /// <param name="predicate"></param>
        /// <returns></returns>
        public async Task<IReadOnlyList<T>> GetAsync(Expression<Func<T, bool>> predicate)
        {
            return await _context.Set<T>().Where(predicate).ToListAsync();
        }

        public async Task<IReadOnlyList<T>> GetAsync(Expression<Func<T, bool>>? predicate, Func<IQueryable<T>, IOrderedQueryable<T>>? orderBy, string? includeString, bool disableTracking = true)
        {
            IQueryable<T> query = _context.Set<T>();
            if (disableTracking) query = query.AsNoTracking();

            if (!string.IsNullOrWhiteSpace(includeString)) query = query.Include(includeString);

            if (predicate != null) query = query.Where(predicate);

            if (orderBy != null)
                return await orderBy(query).ToListAsync();


            return await query.ToListAsync();
        }

        public async Task<IReadOnlyList<T>> GetAsync(Expression<Func<T, bool>>? predicate, Func<IQueryable<T>, IOrderedQueryable<T>>? orderBy = null, List<Expression<Func<T, object>>>? includes = null, bool disableTracking = true)
        {

            IQueryable<T> query = _context.Set<T>();
            if (disableTracking) query = query.AsNoTracking();

            if (includes != null) query = includes.Aggregate(query, (current, include) => current.Include(include));

            if (predicate != null) query = query.Where(predicate);

            if (orderBy != null)
                return await orderBy(query).ToListAsync();


            return await query.ToListAsync();


        }

        /// <summary>
        /// Obtiene una entidad por su identificador de forma asíncrona.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<T> GetByIdAsync(int id)
        {

            return (await _context.Set<T>().FindAsync(id))!;

        }

        /// <summary>
        /// Obtiene una entidad que cumple un predicado dado de forma asíncrona.
        /// </summary>
        /// <param name="predicate"></param>
        /// <param name="includes"></param>
        /// <param name="disableTracking"></param>
        /// <returns></returns>
        public async Task<T> GetEntityAsync(Expression<Func<T, bool>>? predicate, List<Expression<Func<T, object>>>? includes = null, bool disableTracking = true)
        {
            IQueryable<T> query = _context.Set<T>();
            if (disableTracking) query = query.AsNoTracking();

            if (includes != null) query = includes.Aggregate(query, (current, include) => current.Include(include));

            if (predicate != null) query = query.Where(predicate);
            return (await query.FirstOrDefaultAsync())!;
        }

        /// <summary>
        /// Actualiza una entidad en el contexto de la base de datos y guarda los cambios de forma asíncrona.
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public async Task<T> UpdateAsync(T entity)
        {
            _context.Set<T>().Attach(entity);
            _context.Entry(entity).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return entity;
        }

        /// <summary>
        /// Actualiza una entidad en el contexto de la base de datos.
        /// </summary>
        /// <param name="entity"></param>
        public void UpdateEntity(T entity)
        {
            _context.Set<T>().Attach(entity);
            _context.Entry(entity).State = EntityState.Modified;
        }
    }
}

