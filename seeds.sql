
use employees_DB;

insert into employee (first_name, last_name)
values ("Michael", "Scott"), ("Angela", "Martin"), ("Dwight", "Schrute"), ("Pam", "Beesley"), ("Jimothy", "Halpert"), ("Creed", "Braton");
insert into role (title, salary)
values ("Manager", 85000), ("Accountant", 65000), ("Sales Lead", 70000), ("Office Manager", 42000), ("Salesperson", 68000), ("Legal Team", 50000);
insert into department (names)
values ("Management"), ("Finance"), ("Sales"), ("Legal");



-- SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;
--SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;
--SELECT department.id, department.name, SUM(role.salary) AS utilized_budget FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id GROUP BY department.id, department.name;