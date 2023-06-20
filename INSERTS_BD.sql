INSERT INTO Aluno (RA, nome, saldo, createdAt, updatedAt) VALUES
    ('RA00001', 'João', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('RA00002', 'Maria', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('RA00003', 'Pedro', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('RA00004', 'Ana', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('RA00005', 'Carlos', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('RA00006', 'Mariana', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('RA00007', 'Lucas', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('RA00008', 'Julia', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('RA00009', 'Gabriel', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('RA00010', 'Laura', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO Func (senha, nome, email, cargo, createdAt, updatedAt) VALUES
    ('senha123', 'Guilherme', 'guilhermeo@example.com', 'Gerente', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('senha456', 'Camila', 'camila@example.com', 'Caixa', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('senha789', 'Rafael', 'rafael@example.com', 'Caixa', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('senhaabc', 'Fernanda', 'fernanda@example.com', 'Gerente', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('senhaxyz', 'Sofia', 'sofia@example.com', 'Caixa', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('senha123', 'Letícia', 'leticia@example.com', 'Caixa', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('senha456', 'Bruno', 'bruno@example.com', 'Caixa', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('senha789', 'Juliana', 'juliana@example.com', 'Gerente', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('senhaabc', 'Leonardo', 'leonardo@example.com', 'Caixa', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('senhaxyz', 'Vitória', 'vitoria@example.com', 'Gerente', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO Produto (nome, tipo, quantidade, preco, createdAt, updatedAt) VALUES
    ('Produto A', 'Tipo A', 10, 9.99, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Produto B', 'Tipo B', 5, 19.99, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Produto C', 'Tipo C', 20, 4.99, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Produto D', 'Tipo A', 15, 14.99, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Produto E', 'Tipo B', 8, 12.99, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Produto F', 'Tipo C', 12, 6.99, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Produto G', 'Tipo A', 3, 7.99, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Produto H', 'Tipo B', 6, 9.99, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('Produto I', 'Tipo C', 18, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO Transacao (ID_aluno, ID_func, ID_produto, quantidade, valor_prod, valor_total, forma_pgto, createdAt, updatedAt) VALUES
    ('RA00001', 1, 1, 2, 9.99, 19.98, 'Cartão', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('RA00002', 2, 3, 1, 4.99, 4.99, 'Dinheiro', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('RA00003', 3, 2, 3, 19.99, 59.97, 'Cartão', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('RA00004', 4, 1, 1, 9.99, 9.99, 'Dinheiro', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('RA00005', 5, 4, 2, 14.99, 29.98, 'Cartão', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('RA00006', 6, 3, 1, 4.99, 4.99, 'Dinheiro', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('RA00007', 7, 1, 3, 9.99, 29.97, 'Cartão', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('RA00008', 8, 2, 2, 19.99, 39.98, 'Dinheiro', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('RA00009', 9, 4, 1, 14.99, 14.99, 'Cartão', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('RA00010', 10, 3, 2, 4.99, 9.98, 'Dinheiro', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);