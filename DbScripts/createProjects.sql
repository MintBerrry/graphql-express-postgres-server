CREATE TABLE projects(
	ID serial PRIMARY KEY,
	creatorid integer NOT NULL,
	created TIMESTAMP NOT NULL,
	title VARCHAR (50),
	description VARCHAR (255),
	CONSTRAINT fk_project_user
		FOREIGN KEY (creatorid)
		REFERENCES users (ID)
);

INSERT INTO projects (creatorid, created, title, description)
VALUES (1, current_timestamp, 'A project title', 'A simple description')