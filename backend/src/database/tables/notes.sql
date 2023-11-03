-- CREATE TABLE note (
--     note_id VARCHAR(7000) NOT NULL,
--     note_title VARCHAR(255) NOT NULL,
--     note_body VARCHAR(8000),
--     note_time DATETIME2 NOT NULL DEFAULT GETDATE()
-- )





ALTER TABLE note
add  note_id varchar not null primary key;

use notes
select * from note
delete from note
where id  = 16

drop table note