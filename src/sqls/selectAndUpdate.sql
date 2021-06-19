UPDATE Table
SET
    Table.col1 = other_table.col1,
    Table.col2 = other_table.col2
FROM
    Table
INNER JOIN
    other_table
ON
    Table.id = other_table.id

ok
insert into user_login (id,name,password) Values((select seq_user_id from seq_user_id),"kai","kaitest")
UPDATE seq_user_id set seq_user_id  =  seq_user_id + 1