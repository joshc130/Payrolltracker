import inquirer from "inquirer";
import dotenv from "dotenv";
dotenv.config();
import pool from "./connection.js";

// Main menu prompt for the CLI app
const mainMenu = async () => {
  try {
    const { initial_choices } = await inquirer.prompt([
      {
        type: "list",
        name: "initial_choices",
        message: "What would you like to do?",
        choices: [
          "View all Employees",
          "Add Employee",
          "Update Employee Position",
          "View all Positions",
          "Add Position",
          "View all Departments",
          "Add Department",
          "Exit"
        ]
      }
    ]);

    switch (initial_choices) {
      case "View all Employees":
        return viewAllEmployees();
      case "Add Employee":
        return addEmployee();
      case "Update Employee Position":
        return updateEmployeePosition();
      case "View all Positions":
        return viewAllPositions();
      case "Add Position":
        return addPosition();
      case "View all Departments":
        return viewAllDepartments();
      case "Add Department":
        return addDepartment();
      case "Exit":
        console.log("Goodbye!");
        process.exit(0);
      default:
        return mainMenu();
    }
  } catch (error) {
    console.error("Error in main menu:", error);
    process.exit(1);
  }
};

const viewAllEmployees = async () => {
  try {
    const { rows } = await pool.query(`
      SELECT e.id, e.first_name, e.last_name, position.title, department.name AS department, position.salary,
             CONCAT(m.first_name, ' ', m.last_name) AS manager
      FROM employee e
      LEFT JOIN position ON e.position_id = position.id
      LEFT JOIN department ON position.department_id = department.id
      LEFT JOIN employee m ON e.manager_id = m.id
    `);
    console.table(rows);
  } catch (error) {
    console.error("Error retrieving employees:", error);
  }
  mainMenu();
};

const addEmployee = async () => {
  try {
    const { first_name, last_name, position_id, manager_id } = await inquirer.prompt([
      { type: "input", name: "first_name", message: "Enter the first name:" },
      { type: "input", name: "last_name", message: "Enter the last name:" },
      { type: "input", name: "position_id", message: "Enter the position ID:" },
      { type: "input", name: "manager_id", message: "Enter the manager ID (or leave blank for none):" }
    ]);
    await pool.query(
      "INSERT INTO employee (first_name, last_name, position_id, manager_id) VALUES ($1, $2, $3, $4)",
      [first_name, last_name, position_id, manager_id || null]
    );
    console.log(`Added employee: ${first_name} ${last_name}`);
  } catch (error) {
    console.error("Error adding employee:", error);
  }
  mainMenu();
};

const updateEmployeePosition = async () => {
  try {
    const { employee_id, new_position_id } = await inquirer.prompt([
      { type: "input", name: "employee_id", message: "Enter the employee ID:" },
      { type: "input", name: "new_position_id", message: "Enter the new position ID:" }
    ]);
    await pool.query("UPDATE employee SET position_id = $1 WHERE id = $2", [new_position_id, employee_id]);
    console.log("Updated employee position");
  } catch (error) {
    console.error("Error updating employee position:", error);
  }
  mainMenu();
};

const viewAllPositions = async () => {
  try {
    const { rows } = await pool.query(`
      SELECT position.id, position.title, position.salary, department.name AS department
      FROM position
      JOIN department ON position.department_id = department.id
    `);
    console.table(rows);
  } catch (error) {
    console.error("Error retrieving positions:", error);
  }
  mainMenu();
};

const addPosition = async () => {
  try {
    const { title, salary, department_id } = await inquirer.prompt([
      { type: "input", name: "title", message: "Enter the position title:" },
      { type: "input", name: "salary", message: "Enter the salary:" },
      { type: "input", name: "department_id", message: "Enter the department ID:" }
    ]);
    await pool.query("INSERT INTO position (title, salary, department_id) VALUES ($1, $2, $3)", [
      title,
      salary,
      department_id
    ]);
    console.log(`Added position: ${title}`);
  } catch (error) {
    console.error("Error adding position:", error);
  }
  mainMenu();
};

const viewAllDepartments = async () => {
  try {
    const { rows } = await pool.query("SELECT * FROM department");
    console.table(rows);
  } catch (error) {
    console.error("Error retrieving departments:", error);
  }
  mainMenu();
};

const addDepartment = async () => {
  try {
    const { name } = await inquirer.prompt([
      { type: "input", name: "name", message: "Enter the department name:" }
    ]);
    await pool.query("INSERT INTO department (name) VALUES ($1)", [name]);
    console.log(`Added department: ${name}`);
  } catch (error) {
    console.error("Error adding department:", error);
  }
  mainMenu();
};

// Start the CLI application
mainMenu();
