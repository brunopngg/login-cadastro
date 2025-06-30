-- Script para criar a tabela de usuários
CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índice para melhorar performance nas consultas por email
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Comentários sobre a tabela
COMMENT ON TABLE users IS 'Tabela para armazenar informações dos usuários do sistema';
COMMENT ON COLUMN users.user_id IS 'ID único do usuário (auto-incremento)';
COMMENT ON COLUMN users.username IS 'Nome de usuário';
COMMENT ON COLUMN users.email IS 'Email do usuário (único)';
COMMENT ON COLUMN users.password_hash IS 'Hash da senha do usuário';
COMMENT ON COLUMN users.created_at IS 'Data e hora de criação do registro'; 