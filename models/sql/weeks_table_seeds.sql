USE cabin_db;

INSERT INTO weeks (StartDate, EndDate, Available, createdAt, updatedAt)
VALUES
(
"2019-01-01",
"2019-01-08",
true,
now(),
now()
);

USE cabin_db;

INSERT INTO weeks (StartDate, EndDate, Available, createdAt, updatedAt)
VALUES
(
"2019-01-09",
"2019-01-16",
true,
now(),
now()
),
(
"2019-01-17",
"2019-01-24",
true,
now(),
now()
),
(
"2019-01-25",
"2019-02-01",
true,
now(),
now()
);

SELECT * FROM weeks;

USE cabin_db;
UPDATE weeks
SET
Available = false
WHERE id =1;

USE cabin_db;
UPDATE weeks
SET
StartDate= "2017-01-25",
Available = true
WHERE id =2;

SELECT * FROM weeks;

