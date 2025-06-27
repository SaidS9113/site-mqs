INSERT INTO users (id, email, password, username, phone, role, is_active, created_by, updated_by)
VALUES (
    1,
    'ssaid@cfsplus.fr',
    'gmm13',  -- Remplace par un mot de passe sécurisé ou hashé
    'admin',
    '0123456789',
    'admin',
    TRUE,
    NULL,
    NULL
);


INSERT INTO products (id, name, description, stock_status, sku, image, created_by, updated_by)
VALUES 
(1, 'Miel 1', 'Miel de fleurs sauvages, doux et parfumé.', 'in_stock', 'MIEL1', 'https://i.ibb.co/Gv54P7KW/miel-Blanc.jpg', 1, 1),
(2, 'Miel 2', 'Miel d''acacia, texture liquide et goût subtil.', 'in_stock', 'MIEL2', 'https://i.ibb.co/Gv54P7KW/miel-Blanc.jpg', 1, 1),
(3, 'Miel 3', 'Miel de montagne, riche et corsé.', 'in_stock', 'MIEL3', 'https://i.ibb.co/Gv54P7KW/miel-Blanc.jpg', 1, 1),
(4, 'Miel 4', 'Miel de lavande, arôme floral et fruité.', 'in_stock', 'MIEL4', 'https://i.ibb.co/Gv54P7KW/miel-Blanc.jpg', 1, 1);
-- Miel 1
INSERT INTO product_variants (product_id, weight, price, quantity, created_by, updated_by)
VALUES 
(1, 0.250, 4.50, 100, 1, 1),
(1, 0.500, 7.90, 100, 1, 1),
(1, 1.000, 14.50, 100, 1, 1),

-- Miel 2
(2, 0.250, 5.00, 80, 1, 1),
(2, 0.500, 9.00, 80, 1, 1),
(2, 1.000, 17.00, 80, 1, 1),

-- Miel 3
(3, 0.250, 5.50, 60, 1, 1),
(3, 0.500, 10.00, 60, 1, 1),
(3, 1.000, 18.50, 60, 1, 1),

-- Miel 4
(4, 0.250, 6.00, 70, 1, 1),
(4, 0.500, 11.00, 70, 1, 1),
(4, 1.000, 20.00, 70, 1, 1);


INSERT INTO product_images (product_id, url, alt_text, is_primary, position, created_by, updated_by)
VALUES 
(1, 'https://example.com/images/miel1.jpg', 'Pot de Miel 1', TRUE, 1, 1, 1),
(2, 'https://example.com/images/miel2.jpg', 'Pot de Miel 2', TRUE, 1, 1, 1),
(3, 'https://example.com/images/miel3.jpg', 'Pot de Miel 3', TRUE, 1, 1, 1),
(4, 'https://example.com/images/miel4.jpg', 'Pot de Miel 4', TRUE, 1, 1, 1);
