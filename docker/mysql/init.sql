SET NAMES utf8mb4;
SET character_set_connection=utf8mb4;
SET character_set_results=utf8mb4;
SET character_set_client=utf8mb4;

DROP DATABASE IF EXISTS forum;
CREATE DATABASE forum CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE forum;


CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  username VARCHAR(100) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE forums (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE topics (
  id INT AUTO_INCREMENT PRIMARY KEY,
  forum_id INT NOT NULL,
  user_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (forum_id) REFERENCES forums(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);


CREATE TABLE messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  topic_id INT NOT NULL,
  user_id INT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (topic_id) REFERENCES topics(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);



INSERT INTO users (email, username, password, role) VALUES 
  ('admin@example.com', 'Admin', '$2b$10$u3xMZq3Zp.qTL0FODkK52e9nEfsVquUFT8zhuybnSY2eUcHt.QaQi', 'admin'),
  ('user@example.com', 'TestUser', '$2b$10$u3xMZq3Zp.qTL0FODkK52e9nEfsVquUFT8zhuybnSY2eUcHt.QaQi', 'user');

-- Mot de passe pour les deux : `password`

INSERT INTO forums (name, description) VALUES 
  ('Général', 'Discussion générale du forum'),
  ('Idées', 'Suggestions et nouvelles fonctionnalités');

INSERT INTO topics (forum_id, user_id, title) VALUES 
  (1, 1, 'Bienvenue sur le forum !');

INSERT INTO messages (topic_id, user_id, content) VALUES 
  (1, 1, 'Ceci est le premier message du forum, répondez ici !');
