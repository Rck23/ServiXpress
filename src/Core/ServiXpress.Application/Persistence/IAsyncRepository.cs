using System;
using System.Linq.Expressions;

namespace ServiXpress.Application.Persistence
{
     /// <summary>
    /// Representa una interfaz de repositorio asíncrono para entidades de tipo T.
    /// </summary>
    /// <typeparam name="T">El tipo de entidad.</typeparam>
	public interface IAsyncRepository<T> where T : class
    {

        Task<T> GetFirstOrDefaultAsync(Expression<Func<T, bool>> predicate);

        /// <summary>
        /// Obtiene todas las entidades de forma asíncrona.
        /// </summary>
        /// <returns>Una tarea asíncrona que representa la operación. El resultado de la tarea contiene una lista de solo lectura de entidades.</returns>
        Task<IReadOnlyList<T>> GetAllAsync();

        /// <summary>
        /// Obtiene entidades de forma asíncrona basadas en un predicado.
        /// </summary>
        /// <param name="predicate">El predicado para filtrar entidades.</param>
        /// <returns>Una tarea asíncrona que representa la operación. El resultado de la tarea contiene una lista de solo lectura de entidades.</returns>
        Task<IReadOnlyList<T>> GetAsync(Expression<Func<T, bool>> predicate);

        Task<IReadOnlyList<T>> GetAsync(Expression<Func<T, bool>>? predicate,
                                       Func<IQueryable<T>, IOrderedQueryable<T>>? orderBy,
                                       string? includeString,
                                       bool disableTracking = true);

        Task<IReadOnlyList<T>> GetAsync(Expression<Func<T, bool>>? predicate,
                                       Func<IQueryable<T>, IOrderedQueryable<T>>? orderBy = null,
                                       List<Expression<Func<T, object>>>? includes = null,
                                       bool disableTracking = true);


        Task<T> GetEntityAsync(Expression<Func<T, bool>>? predicate,
                                         List<Expression<Func<T, object>>>? includes = null,
                                       bool disableTracking = true);


        Task<T> GetByIdAsync(int id);

        Task<T> AddAsync(T entity);



        Task<T> UpdateAsync(T entity);

        Task DeleteAsync(T entity);


        void AddEntity(T entity);

        void UpdateEntity(T entity);

        void DeleteEntity(T entity);

        void AddRange(List<T> entities);

        void DeleteRange(IReadOnlyList<T> entities);

    }
}

