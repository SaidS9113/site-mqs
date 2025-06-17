-- Table des catégories de produits
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    created_by INTEGER,
    updated_by INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table de liaison produits <-> catégories (plusieurs catégories par produit possible)
CREATE TABLE product_categories (
    product_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    PRIMARY KEY (product_id, category_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contraintes FK
ALTER TABLE categories
ADD CONSTRAINT fk_categories_created_by FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
ADD CONSTRAINT fk_categories_updated_by FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL;

ALTER TABLE product_categories
ADD CONSTRAINT fk_product_categories_product_id FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
ADD CONSTRAINT fk_product_categories_category_id FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE;

-- Commentaire sur la table categories
COMMENT ON TABLE categories IS 'Catégories permettant de classer les produits pour organisation et filtres futurs';

-- Commentaire sur la table product_categories
COMMENT ON TABLE product_categories IS 'Table de liaison pour associer plusieurs catégories à un produit';
