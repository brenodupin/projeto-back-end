-- Criação das Tabelas!
CREATE TABLE Aluno (
	RA VARCHAR(7) NOT NULL PRIMARY KEY,
	nome VARCHAR(255),
	saldo FLOAT NOT NULL DEFAULT 0,
	createdAt TIMESTAMP WITH TIME ZONE NOT NULL,
	updatedAt TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE TABLE Func(
	ID_func SERIAL NOT NULL PRIMARY KEY,
	senha VARCHAR(255),
	nome VARCHAR(255),
	email VARCHAR(255),
	cargo VARCHAR(7),
	createdAt TIMESTAMP WITH TIME ZONE NOT NULL,
	updatedAt TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE TABLE Produto(
	ID_produto SERIAL NOT NULL PRIMARY KEY,
	nome VARCHAR(255),
	tipo VARCHAR(255),
	quantidade FLOAT NOT NULL DEFAULT '0',
	preco FLOAT,
	createdAt TIMESTAMP WITH TIME ZONE NOT NULL,
	updatedAt TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE TABLE Transacao(
	ID_venda SERIAL NOT NULL PRIMARY KEY,
	ID_aluno VARCHAR,
	ID_func INTEGER,
	ID_produto INTEGER,
	quantidade INTEGER,
	valor_prod FLOAT,
	valor_total FLOAT,
	forma_pgto VARCHAR(8),
	createdAt TIMESTAMP WITH TIME ZONE NOT NULL,
	updatedAt TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Colocando as FK na tabela Tranacao
ALTER TABLE
	Transacao
ADD
	CONSTRAINT alunos_fk FOREIGN KEY (ID_aluno) REFERENCES Aluno(RA),
ADD
	CONSTRAINT func_fk FOREIGN KEY (ID_func) REFERENCES Func(ID_func),
ADD
	CONSTRAINT produto_fk FOREIGN KEY (ID_produto) REFERENCES Produto(ID_produto);

-- Criação dos Indexes
CREATE INDEX idx_Aluno ON Aluno(RA);
CREATE INDEX idx_Func ON Func(ID_func);
CREATE INDEX idx_Produto ON Produto(nome);
CREATE INDEX idx_Venda ON Transacao(ID_venda);

-- Criando VIEW
CREATE VIEW View_total AS
SELECT
	t.ID_venda AS Venda,
	t.ID_aluno AS RA,
	a.nome AS Aluno,
	t.ID_func AS ID_Funcionario,
	f.nome AS Funcionario,
	f.cargo AS Cargo,
	t.ID_produto AS ID_Produto,
	p.nome AS Produto,
	p.tipo AS Tipo,
	t.quantidade AS Quantidade,
	t.valor_prod as Valor_unitario,
	t.valor_total AS Valor_total,
	t.forma_pgto as Forma_Pagamento,
	t.createdAt as Criado_em,
	t.updatedAt as Atualizado_em
FROM
	Transacao t
	INNER JOIN Aluno a ON t.ID_aluno = a.RA
	INNER JOIN Func f ON t.ID_func = f.ID_func
	INNER JOIN Produto p ON t.ID_produto = p.ID_produto;

-- Criando tabela de backup
CREATE TABLE Transacao_backup(
	ID_delete SERIAL NOT NULL PRIMARY KEY,
	ID_venda INTEGER NOT NULL,
	ID_aluno VARCHAR,
	ID_func INTEGER,
	ID_produto INTEGER,
	quantidade INTEGER,
	valor_prod FLOAT,
	valor_total FLOAT,
	forma_pgto VARCHAR(8),
	createdAt TIMESTAMP WITH TIME ZONE NOT NULL,
	updatedAt TIMESTAMP WITH TIME ZONE NOT NULL,
	deletedBy VARCHAR(255),
	deletedAt TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Criando funcão que insere em backup
CREATE OR REPLACE FUNCTION backup_transacao() RETURNS TRIGGER SECURITY DEFINER AS $$
BEGIN
    INSERT INTO Transacao_backup (ID_venda, ID_aluno, ID_func, ID_produto, quantidade, valor_prod, valor_total, forma_pgto, createdAt, updatedAt, deletedBy, deletedAt)
    VALUES (OLD.ID_venda, OLD.ID_aluno, OLD.ID_func, OLD.ID_produto, OLD.quantidade, OLD.valor_prod, OLD.valor_total, OLD.forma_pgto, OLD.createdAt, OLD.updatedAt, current_user, CURRENT_TIMESTAMP);
    
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

-- Criando trigger que executa função de backup
CREATE TRIGGER transacao_backup_trigger
AFTER DELETE ON Transacao
FOR EACH ROW
EXECUTE FUNCTION backup_transacao();

-- Criando usuário novo
CREATE USER Caixa WITH PASSWORD 'caixasenha123';
GRANT SELECT ON Aluno TO Caixa;
GRANT SELECT ON Produto TO Caixa;
GRANT SELECT ON Transacao TO Caixa;
GRANT SELECT ON Func TO Caixa;
REVOKE SELECT (senha) ON Func FROM Caixa;

-- Criando funcão para inserção na view
CREATE OR REPLACE FUNCTION InsereTransacao() RETURNS TRIGGER SECURITY DEFINER AS $$
BEGIN
	INSERT INTO Transacao (ID_aluno, ID_func, ID_produto, quantidade, valor_prod, valor_total, forma_pgto, createdAt, updatedAt) VALUES
		(NEW.RA, NEW.ID_funcionario, NEW.ID_produto, NEW.quantidade, NEW.valor_unitario, NEW.Valor_total, NEW.Forma_Pagamento, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
	
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

--. DROP VIEW View_total;
--. DROP TABLE Transacao_backup;
--. DROP TABLE Transacao;
--. DROP TABLE Aluno;
--. DROP TABLE Func;
--. DROP TABLE Produto;
--. DROP USER Caixa;