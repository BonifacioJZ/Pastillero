CREATE DATABASE pastillero;

USE pastillero;

CREATE TABLE Paciente(
    id_paciente INT(11)  NOT NULL auto_increment,
    Nombre VARCHAR(100) ,
    Apellido VARCHAR(100) ,
    Edad INT,
    Sexo VARCHAR(1) DEFAULT 'M',
    Email VARCHAR(100),
    contrasena VARCHAR(300),
    Telefono VARCHAR(13),
    PRIMARY KEY (`id_paciente`)

);

CREATE TABLE Encargado (
    id_encargado int(11) NOT NULL auto_increment,
    Nombre VARCHAR(100),
    Apellido VARCHAR(100),
    Edad INT,
    Sexo VARCHAR(1) DEFAULT 'M',
    Email VARCHAR(100),
    contrasena VARCHAR(300),
    Telefono VARCHAR(13),
    PRIMARY KEY (`id_encargado`)
);

CREATE TABLE Paciente_Encargado(
    id_encargado int NOT NULl,
    id_paciente int not NULL,
    FOREIGN KEY (id_encargado) REFERENCES Encargado(id_encargado),
    FOREIGN KEY (id_paciente) REFERENCES Paciente(id_paciente)
);

CREATE TABLE Alergia(
    id_alergia INT NOT NULL auto_increment,
    Nombre VARCHAR(150),
    Descripcion TEXT,
    PRIMARY KEY (`id_alergia`)
);

CREATE TABLE alergias_paciente(
    id_alergia int not null,
    id_paciente int not null,
    FOREIGN KEY (id_alergia) REFERENCES Alergia(id_alergia),
    FOREIGN KEY (id_paciente) REFERENCES Paciente(id_paciente)
);

CREATE TABLE Alarmas(
    id_alarma int not null auto_increment,
    Nombre VARCHAR(100),
    Hora_de_Ingesta VARCHAR(5),
    Tomo int DEFAULT '0',
    Casilla int,
    PRIMARY KEY (`id_alarma`)
);

CREATE TABLE Medicina(
    id_medicina int not null auto_increment, 
    Nombre VARCHAR(100),
    Receta TEXT,
    Dosis VARCHAR(50),
    Frecuencia VARCHAR(50),
    PRIMARY KEY (`id_medicina`)
);

CREATE TABLE Medicina_Alarma(
    id_medicina int,
    id_alarma int,
    FOREIGN KEY (id_medicina) REFERENCES Medicina(id_medicina),
    FOREIGN KEY (id_alarma) REFERENCES Alarmas(id_alarma)
);

CREATE TABLE Alarma_Paciente(
    id_alarma int NOT NULL,
    id_paciente int not null,
    FOREIGN KEY (id_paciente) REFERENCES Paciente(id_paciente),
    FOREIGN KEY (id_alarma) REFERENCES Alarmas (id_alarma)
);