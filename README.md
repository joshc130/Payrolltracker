## Payroll Tracker App
A command-line payroll tracker application built with Node.js, Inquirer, and PostgreSQL. The app lets you manage employees, positions, and departments through an interactive CLI while storing and retrieving data from a PostgreSQL database.

## Features
• View all employees, positions, and departments
• Add new employees, positions, and departments
• Update employee positions
• Interactive command-line interface using Inquirer
• Database integration using PostgreSQL and the pg package
• Environment configuration via dotenv

## Tech Stack
• Backend: Node.js using ES Modules
• CLI Framework: Inquirer
• Database: PostgreSQL
• Database Driver: pg (node-postgres)
• Environment Management: dotenv

## Installation
Clone the repository from GitHub and navigate into the project folder.
Install project dependencies using npm.
Create a .env file in the project root and add your PostgreSQL connection details (such as DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, and PORT).
Create your database and run your schema file to set up the necessary tables.
Seed the database with initial data using your SQL seed file.
Usage
To start the CLI application, run your index file with Node. You will see an interactive menu offering options such as viewing employees, adding employees, updating employee positions, and viewing or adding positions and departments. Use your arrow keys to navigate and press Enter to select an option.

## Development
Ensure your project is set up to use ES Modules by specifying the module type in your package configuration. For development, you can use a tool like nodemon to automatically restart the application when file changes are detected.

## Troubleshooting
• If the CLI does not display data, confirm that your SQL queries match the database schema and that the data exists in the database.
• Check your .env file to ensure all PostgreSQL credentials are correct and that the database is running.
• If you encounter errors related to missing modules, verify that you have installed all dependencies.

##License
This project is licensed under the MIT License.

