-- Drop the database if it exists and create a fresh instance
DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

\c employee_db;

-- Create the department table with a unique name constraint
CREATE TABLE department (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL UNIQUE
);

-- Create the position table.
CREATE TABLE position (
  id SERIAL PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2) NOT NULL CHECK (salary >= 0),
  department_id INT REFERENCES department(id) ON DELETE SET NULL
);

-- Create the employee table
CREATE TABLE employee (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  position_id INT REFERENCES position(id) ON DELETE SET NULL,
  manager_id INT REFERENCES employee(id) ON DELETE SET NULL,
  salary DECIMAL(10,2) NOT NULL CHECK (salary >= 0)
);
