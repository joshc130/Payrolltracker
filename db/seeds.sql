INSERT INTO department (id, name)
VALUES 
  (1, 'NERV Pilots'),
  (2, 'NERV Scientists'),
  (3, 'NERV Executives');

INSERT INTO position (id, title, salary, department_id)
VALUES 
  (1, 'Shinji Ikari', 180000, 1),   
  (2, 'Asuka Langley Soryu', 200000, 1),  
  (3, 'Rei Ayanami', 150000, 1),    
  (4, 'Ritsuko Akagi', 190000, 2),  
  (5, 'Misato Katsuragi', 110000, 3), 
  (6, 'Gendo Ikari', 120000, 3);     

INSERT INTO employee (id, first_name, last_name, position_id, manager_id, salary)
VALUES 
  (1, 'Shinji', 'Ikari', 1, 5, 180000),           
  (2, 'Asuka', 'Langley Soryu', 2, 5, 200000),      
  (3, 'Rei', 'Ayanami', 3, 4, 150000),              
  (4, 'Ritsuko', 'Akagi', 4, 6, 190000),            
  (5, 'Misato', 'Katsuragi', 5, 6, 110000),         
  (6, 'Gendo', 'Ikari', 6, NULL, 120000);        

