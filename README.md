
# ServiXpress

Proyecto desarrollado en la clase de Desarrollo movil Integral 
IDGS 10-A-II 

## Realizado con

- **.Net 7**
- **React-native**

## Librerias 

- ****
- ****
- ****

# Inicial Backend  

INICIO: 

```

dotnet new sln --name ServiXpressSolution

mkdir src

```

PROYECTOS: 

```

dotnet sln add src/Infrastructure/ServiXpress.Infrastructure.csproj 

dotnet sln add src/Core/ServiXpress.Domain/ServiXpress.Domain.csproj

dotnet sln add src/Core/ServiXpress.Application/ServiXpress.Application.csproj

dotnet sln add src/Api/ServiXpress.Api.csproj

```


REFERENCIAS: 

```
dotnet add src/Infrastructure/ServiXpress.Infrastructure.csproj reference src/Core/ServiXpress.Application/ServiXpress.Application.csproj

dotnet add src/Core/ServiXpress.Application/ServiXpress.Application.csproj reference src/Core/ServiXpress.Domain/ServiXpress.Domain.csproj

dotnet add src/Api/ServiXpress.Api.csproj reference src/Core/ServiXpress.Application/ServiXpress.Application.csproj

dotnet add src/Api/ServiXpress.Api.csproj reference src/Infrastructure/ServiXpress.Infrastructure.csproj

```

## Comando base de datos

### Para crear las migraciones
```
dotnet ef migrations add InitMigration -p src/Infrastructure/ -s src/Api/
```

### Para crear la base de datos
```
update-database
```
