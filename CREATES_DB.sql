DROP VIEW IF EXISTS View_total CASCADE;
DROP TABLE IF EXISTS Transacao_backup CASCADE;
DROP TABLE IF EXISTS Transacao CASCADE;
DROP TABLE IF EXISTS Aluno CASCADE;
DROP TABLE IF EXISTS Func CASCADE;
DROP TABLE IF EXISTS Produto CASCADE;
DROP USER IF EXISTS Caixa;

-- Criação das Tabelas!
CREATE TABLE Aluno (
	RA VARCHAR(7) NOT NULL PRIMARY KEY,
	nome VARCHAR(255),
	saldo FLOAT NOT NULL DEFAULT 0,
	createdat TIMESTAMP WITH TIME ZONE NOT NULL,
	updatedat TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE TABLE Func(
	id_func SERIAL NOT NULL PRIMARY KEY,
	senha VARCHAR(255) NOT NULL,
	nome VARCHAR(255),
	email VARCHAR(255),
	cargo VARCHAR(7),
	createdat TIMESTAMP WITH TIME ZONE NOT NULL,
	updatedat TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE TABLE Produto(
	id_produto SERIAL NOT NULL PRIMARY KEY,
	nome VARCHAR(255),
	tipo VARCHAR(255),
	quantidade FLOAT NOT NULL DEFAULT 0,
	preco FLOAT,
	createdat TIMESTAMP WITH TIME ZONE NOT NULL,
	updatedat TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE TABLE Transacao(
	id_venda SERIAL NOT NULL PRIMARY KEY,
	id_aluno VARCHAR,
	id_func INTEGER,
	id_produto INTEGER,
	quantidade INTEGER,
	valor_prod FLOAT,
	valor_total FLOAT,
	forma_pgto VARCHAR(8),
	createdat TIMESTAMP WITH TIME ZONE NOT NULL,
	updatedat TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Colocando as FK na tabela Tranacao
ALTER TABLE
	Transacao
ADD
	CONSTRAINT alunos_fk FOREIGN KEY (id_aluno) REFERENCES Aluno(RA),
ADD
	CONSTRAINT func_fk FOREIGN KEY (id_func) REFERENCES Func(id_func),
ADD
	CONSTRAINT produto_fk FOREIGN KEY (id_produto) REFERENCES Produto(id_produto);

-- Criação dos Indexes
CREATE INDEX idx_Aluno ON Aluno(RA);
CREATE INDEX idx_Func ON Func(id_func);
CREATE INDEX idx_Produto ON Produto(nome);
CREATE INDEX idx_Venda ON Transacao(id_venda);

-- Criando VIEW
CREATE VIEW View_total AS
SELECT
	t.id_venda AS Venda,
	t.id_aluno AS RA,
	a.nome AS Aluno,
	t.id_func AS id_Funcionario,
	f.nome AS Funcionario,
	f.cargo AS Cargo,
	t.id_produto AS id_Produto,
	p.nome AS Produto,
	p.tipo AS Tipo,
	t.quantidade AS Quantidade,
	t.valor_prod as Valor_unitario,
	t.valor_total AS Valor_total,
	t.forma_pgto as Forma_Pagamento,
	t.createdat as Criado_em,
	t.updatedat as atualizado_em
FROM
	Transacao t
	INNER JOIN Aluno a ON t.id_aluno = a.RA
	INNER JOIN Func f ON t.id_func = f.id_func
	INNER JOIN Produto p ON t.id_produto = p.id_produto;

-- Criando tabela de backup
CREATE TABLE Transacao_backup(
	id_delete SERIAL NOT NULL PRIMARY KEY,
	id_venda INTEGER NOT NULL,
	id_aluno VARCHAR,
	id_func INTEGER,
	id_produto INTEGER,
	quantidade INTEGER,
	valor_prod FLOAT,
	valor_total FLOAT,
	forma_pgto VARCHAR(8),
	createdat TIMESTAMP WITH TIME ZONE NOT NULL,
	updatedat TIMESTAMP WITH TIME ZONE NOT NULL,
	deletedBy VARCHAR(255),
	deletedat TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Criando funcão que insere em backup
CREATE OR REPLACE FUNCTION backup_transacao() RETURNS TRIGGER SECURITY DEFINER AS $$
BEGIN
    INSERT INTO Transacao_backup (id_venda, id_aluno, id_func, id_produto, quantidade, valor_prod, valor_total, forma_pgto, createdat, updatedat, deletedBy, deletedat)
    VALUES (OLD.id_venda, OLD.id_aluno, OLD.id_func, OLD.id_produto, OLD.quantidade, OLD.valor_prod, OLD.valor_total, OLD.forma_pgto, OLD.createdat, OLD.updatedat, current_user, CURRENT_TIMESTAMP);
    
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

-- Criando trigger que executa função de backup
CREATE TRIGGER transacao_backup_trigger
AFTER DELETE ON Transacao
FOR EACH ROW
EXECUTE FUNCTION backup_transacao();

-- Criando usuário (role) novo
CREATE ROLE Caixa WITH PASSWORD 'caixasenha123';
GRANT SELECT ON Aluno TO Caixa;
GRANT SELECT ON Produto TO Caixa;
GRANT SELECT ON Transacao TO Caixa;
GRANT SELECT ON Func TO Caixa;
REVOKE SELECT (senha) ON Func FROM Caixa;

-- Criando funcão para inserção na view
CREATE OR REPLACE FUNCTION InsereTransacao() RETURNS TRIGGER SECURITY DEFINER AS $$
BEGIN
	INSERT INTO Transacao (id_aluno, id_func, id_produto, quantidade, valor_prod, valor_total, forma_pgto, createdat, updatedat) VALUES
		(NEW.RA, NEW.id_funcionario, NEW.id_produto, NEW.quantidade, NEW.valor_unitario, NEW.Valor_total, NEW.Forma_Pagamento, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
	
	RETURN NEW;
END; $$ LANGUAGE plpgsql;

-- Crinaod trigger que executra função de inserção
CREATE TRIGGER InsereTransacao_Trigger
INSTEAD OF INSERT ON View_total
FOR EACH ROW
EXECUTE PROCEDURE InsereTransacao();

-- Atualização do usuário Caixa
GRANT SELECT ON View_total TO Caixa;
GRANT INSERT ON View_total TO Caixa;