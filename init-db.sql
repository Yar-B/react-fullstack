CREATE TABLE item
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(20),
    description VARCHAR(255)
);

CREATE TABLE roles
(
    id bigint NOT NULL,
    name VARCHAR(20),
    CONSTRAINT roles_pkey PRIMARY KEY (id)
);

INSERT INTO roles(id, name) VALUES (0, 'admin');
INSERT INTO roles(id, name) VALUES (1, 'corny');

CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    login VARCHAR(255),
    password VARCHAR(255),
    role bigint DEFAULT 1,
    FOREIGN KEY (role) REFERENCES roles (id)
);

INSERT INTO users(login, password, role) VALUES ('admin', '25d55ad283aa400af464c76d713c07ad', 0);

CREATE TABLE messages
(
    id SERIAL PRIMARY KEY,
    message VARCHAR(255),
    dateStamp bigint,
    userID bigint DEFAULT 1,
    FOREIGN KEY (userID) REFERENCES users (id)
);