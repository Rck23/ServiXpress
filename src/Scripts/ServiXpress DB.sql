create database ServiXpress;

use ServiXpress;

Create table Roles(
	Role varchar(50) primary key not null
)

-- Verficado | Alta | Bloqueado
create table EstatusUsuario (
	Estatus varchar(50) primary key not null
)


-- Alta | Completado | Cancelado | Rechazado 
create table EstatusServicio(
	Estatus varchar(50) primary key not null 
)

-- Alta | Revision | Cerrado
create table EstatusReporte(
	Estatus varchar(50) primary key not null 
)

-- Error de aplicacion | Reporte de cuenta | Usuario con información falsa | Cuenta robada | Reporte para usuario | Otros
create table CategoriaReporte(
	Nombre varchar(100) primary key
)

create table Usuarios(
	Id int identity(1,1) primary key, 
	Nombre varchar(60) not null,
	Apellidos varchar(80) not null,
	Calle varchar(100) not null,
	NumExterior int not null,
	NumInterior int,
	ColioniaFraccionamiento varchar(255) not null,
	CodigoPostal varchar(20) not null,
	Municipio varchar(255) not null,
	Estado varchar(100) not null,
	Descripcion varchar(255),
	Estatus varchar(50) not null foreign key references EstatusUsuario(Estatus),
	Telefono varchar(10),
	Correo varchar(150),
	Contrasena varchar(255),
	FechaHoraRegistro datetime not null,
	Role varchar(50) not null foreign key references Roles(Role)
)

create table CategoriasServicios(
	Id int identity(1,1) primary key,
	Nombre varchar(100) not null,
	FechaHoraRegistro datetime not null
)


-- Ofertado | Requerido
create table TipoServicio(
	Tipo varchar(50) not null primary key
)

create table Servicios (
	Id int identity(1,1) primary key,
	Estado varchar(150) not null,
	Municipio varchar(150) not null,
	Telefonos varchar(100),
	Correos varchar(255),
	OtrosMediosContacto varchar(255),
	Descripcion varchar(500) not null,
	UbicacionMaps varchar(max) not null,
	Precio float,
	Usuario int not null foreign key references Usuarios(Id),
	Categoria int not null foreign key references CategoriasServicios(Id),
	Tipo varchar(50) not null foreign key references TipoServicio(Tipo),
	FechaHoraRegistro datetime not null,
	FechaVencimiento datetime
)


create table Calificaciones(
	UsuarioCalifica int not null foreign key references Usuarios(Id),
	UsuarioCalificado int not null foreign key references Usuarios(Id),
	Calificacion int not null,
	Comentarios varchar(255),
	FechaHoraRegistro datetime  not null
)


create table Reportes (
	Usuario int not null foreign key references Usuarios(Id),
	UsuarioReportar int foreign key references Usuarios(Id),
	Categoria varchar(100) foreign key references CategoriaReporte(Nombre),
	Descripcion varchar(255) not null,
	Estatus varchar(50) not null foreign key references EstatusReporte(Estatus),
	AgenteCierraReporte int foreign key references Usuarios(Id),
	DescripcionAgente varchar(255),
	FechaHoraRegistro datetime not null,
	FechaHoraCierre datetime
)

---- PENDIENTE
--create table LogActualizaciones(
	
--)




-----########## INSERTS ########### -----
insert into EstatusUsuario values('Verificado'), ('Bloqueado'), ('Alta')

insert into EstatusServicio values('Alta'), ('Completado'), ('Cancelado'), ('Rechazado')

insert into TipoServicio values('Ofertado', 'Requerido')