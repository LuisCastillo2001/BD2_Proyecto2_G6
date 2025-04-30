CREATE DATABASE Clinica;
USE Clinica;

-- Tabla Paciente
CREATE TABLE PACIENTE (
    idPaciente INT PRIMARY KEY,
    edad INT NOT NULL,
    genero VARCHAR(20) NOT NULL
);

-- Tabla Habitacion
CREATE TABLE HABITACION (
    idHabitacion INT PRIMARY KEY,
    habitacion VARCHAR(50) NOT NULL
);

-- Tabla Log de Actividad
CREATE TABLE LOG_ACTIVIDAD (
    id_log_actividad INT PRIMARY KEY,
    timestamp VARCHAR(100) NOT NULL,
    actividad VARCHAR(500) NOT NULL,
    idHabitacion INT,
    idPaciente INT,
    FOREIGN KEY (idPaciente) REFERENCES PACIENTE(idPaciente),
    FOREIGN KEY (idHabitacion) REFERENCES HABITACION(idHabitacion)
);

-- Tabla Log de Habitacion
CREATE TABLE LOG_HABITACION (
    id_log_habitacion INT PRIMARY KEY,
    timestamp VARCHAR(100) NOT NULL,
    status VARCHAR(45) NOT NULL,
    idHabitacion INT,
    FOREIGN KEY (idHabitacion) REFERENCES HABITACION(idHabitacion)
);

ALTER TABLE LOG_HABITACION MODIFY COLUMN id_log_habitacion INT AUTO_INCREMENT;
ALTER TABLE LOG_ACTIVIDAD MODIFY COLUMN id_log_actividad INT AUTO_INCREMENT;