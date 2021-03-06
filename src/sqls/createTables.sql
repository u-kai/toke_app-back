create table seq_user_id (id int primary key (id))
create table seq_event_id (id int primary key (id))
create table user_info (id int, user_name varchar(100), image_path varchar(100),primary key (user_id))
create table users_login (user_id int, name varchar(100), password varchar(100),primary key (user_id,name,password))
create table user_attendance_requests_info (user_id int, attendance_request_id int, is_attendance varchar(10),is_response varchar(10),message varchar(1000),primary key (user_id,attendance_request_id))
create table attendance_requests (attendance_request_id int, purpose varchar(1000), date timestamp, location varchar(100), start_date timestamp, end_date timestamp, organizer_id int, describes varchar(1000), bring varchar(100),organizer_name varchar(100),primary key (attendance_request_id))
create table event_participants (paritcipant_id int, attendance_request_id int, primary key (paritcipant_id,attendance_request_id))