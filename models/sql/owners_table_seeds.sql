USE cabin_db;
SELECT * FROM owners;


INSERT INTO owners (ownername, email, selecting, position, modifiedPos, createdAt, updatedAt)
VALUES
	("Eric", "eghove@gmail.com", true, 1, 1, now(), now() ),
    ("Eric NineFingers", "eric.hove@academicarts.org", false, 2, 2, now(), now() ),
    ("Jane Frost", "jane@jane.com", false, 3, 3, now(), now() ),
    ("Tester Guy", "fightingmongooses4@gmail.com", false, 4, 4, now(), now() );
    
USE cabin_db;
UPDATE owners
SET 
selecting = true,
modifiedPos = 1
WHERE id = 1;


UPDATE owners
SET selecting = false,
email = "eghove@gmail.com",
modifiedPos = 2
WHERE id = 2;

UPDATE owners
SET selecting = false,
email = "eghove@gmail.com",
modifiedPos = 3
WHERE id = 3;

UPDATE owners
SET selecting = false,
email = "eghove@gmail.com",
modifiedPos = 4
WHERE id = 4;

SELECT * FROM owners;
