using System;
namespace ServiXpress.Application.Persistence
{
    /// <summary>
    /// Representa una interfaz de unidad de trabajo que implementa IDisposable.
    /// La interfaz IUnitOfWork se utiliza para definir una unidad de trabajo que
    /// agrupa operaciones relacionadas en una transacción, proporciona acceso a 
    /// repositorios genéricos para interactuar con la base de datos y permite 
    /// guardar los cambios realizados en la base de datos
    /// </summary>
	public interface IUnitOfWork: IDisposable
	{
        /// <summary>
        /// Obtiene un repositorio asíncrono para una entidad específica.
        /// </summary>
        /// <typeparam name="TEntity">El tipo de entidad.</typeparam>
        /// <returns>Un repositorio asíncrono para la entidad especificada.</returns>
        IAsyncRepository<TEntity> Repository<TEntity>() where TEntity : class;

        /// <summary>
        /// Completa la unidad de trabajo y guarda los cambios en la base de datos.
        /// </summary>
        /// <returns>Una tarea que representa la operación. El resultado de la tarea contiene el número de filas afectadas.</returns>
        Task<int> Complete();

    }
}

