CREATE DATABASE cabin_db;

USE cabin_db;
CREATE TABLE owners (
ownerID int NOT NULL AUTO_INCREMENT,
ownername varchar(50),
email varchar(100),
selecting boolean,
position integer,
createdAt datetime DEFAULT now(),
UpdatedAt datetime,
Primary key (ownerID)
);

CREATE TABLE schedule (
scheduleID int NOT NULL AUTO_INCREMENT,
weekID integer,
ownerID integer,
Primary key (scheduleID)
);

use cabin_db;
CREATE TABLE weeks (
weekID int NOT NULL AUTO_INCREMENT,
StartDate date,
EndDate date,
Primary key(weekID)
);
