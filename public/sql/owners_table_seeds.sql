USE cabin_db;


INSERT INTO owners (ownername, email, selecting, position, modifiedPos, createdAt, updatedAt)
VALUES
	("Eric", "eghove@gmail.com", true, 1, 1, now(), now() ),
    ("Eric NineFingers", "eric.hove@academicarts.org", false, 2, 2, now(), now() ),
    ("Jane Frost", "jane@jane.com", false, 3, 3, now(), now() ),
    ("Tester Guy", "fightingmongooses4@gmail.com", false, 4, 4, now(), now() );
    
SELECT * FROM owners;