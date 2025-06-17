-- STRUCTURE SQL E-COMMERCE - VERSION SANS TRIGGERS
-- Base de données: PostgreSQL

-- Table des adresses
CREATE TABLE address (
    id SERIAL PRIMARY KEY,
    street VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    country VARCHAR(100) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('billing', 'shipping', 'both')),
    created_by INTEGER,
    updated_by INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des utilisateurs
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    username VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20),
    is_active BOOLEAN DEFAULT TRUE,
    role VARCHAR(50) DEFAULT 'customer' CHECK (role IN ('customer', 'admin', 'vendor')),
    created_by INTEGER,
    updated_by INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des produits
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    stock_status VARCHAR(50) DEFAULT 'in_stock' CHECK (stock_status IN ('in_stock', 'out_of_stock', 'discontinued')),
    sku VARCHAR(100) UNIQUE NOT NULL,
    image VARCHAR(500), -- Optionnel : tu peux retirer cette ligne si tu utilises uniquement product_images
    created_by INTEGER,
    updated_by INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des images produits
CREATE TABLE product_images (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL,
    url VARCHAR(500) NOT NULL,
    alt_text VARCHAR(255),
    is_primary BOOLEAN DEFAULT FALSE,
    position INTEGER DEFAULT 0,
    created_by INTEGER,
    updated_by INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des variantes de produits
CREATE TABLE product_variants (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL,
    weight DECIMAL(10,3),
    price DECIMAL(12,2) NOT NULL CHECK (price >= 0),
    quantity INTEGER NOT NULL DEFAULT 0 CHECK (quantity >= 0),
    created_by INTEGER,
    updated_by INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des commandes
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded')),
    total_amount DECIMAL(12,2) NOT NULL CHECK (total_amount >= 0),
    created_by INTEGER,
    updated_by INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des items de commande
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL,
    product_variant_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    price DECIMAL(12,2) NOT NULL CHECK (price >= 0),
    weight DECIMAL(10,3),
    created_by INTEGER,
    updated_by INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des paiements
CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL,
    email VARCHAR(255) NOT NULL,
    card VARCHAR(4),
    amount DECIMAL(12,2) NOT NULL CHECK (amount > 0),
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INTEGER,
    updated_by INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des expéditions
CREATE TABLE shipment (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL,
    carrier_name VARCHAR(100) NOT NULL,
    tracking_number VARCHAR(100) UNIQUE,
    shipping_status VARCHAR(50) DEFAULT 'preparing' CHECK (shipping_status IN ('preparing', 'shipped', 'in_transit', 'delivered', 'returned')),
    estimated_delivery DATE,
    created_by INTEGER,
    updated_by INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- INDEX POUR PERFORMANCES

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_payments_email ON payments(email);

CREATE INDEX idx_product_variants_product_id ON product_variants(product_id);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_variant_id ON order_items(product_variant_id);
CREATE INDEX idx_payments_order_id ON payments(order_id);
CREATE INDEX idx_shipment_order_id ON shipment(order_id);

CREATE INDEX idx_products_sku ON products(sku);
CREATE INDEX idx_orders_order_number ON orders(order_number);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_shipment_tracking ON shipment(tracking_number);

CREATE INDEX idx_orders_user_status ON orders(user_id, status);
CREATE INDEX idx_products_stock_status ON products(stock_status);

-- Index pour product_images
CREATE INDEX idx_product_images_product_id ON product_images(product_id);
CREATE INDEX idx_product_images_is_primary ON product_images(is_primary);
CREATE INDEX idx_product_images_position ON product_images(position);

-- CONTRAINTES DE CLÉS ÉTRANGÈRES

ALTER TABLE address 
ADD CONSTRAINT fk_address_created_by FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
ADD CONSTRAINT fk_address_updated_by FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL;

ALTER TABLE users 
ADD CONSTRAINT fk_users_created_by FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
ADD CONSTRAINT fk_users_updated_by FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL;

ALTER TABLE products 
ADD CONSTRAINT fk_products_created_by FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
ADD CONSTRAINT fk_products_updated_by FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL;

ALTER TABLE product_variants 
ADD CONSTRAINT fk_product_variants_product_id FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
ADD CONSTRAINT fk_product_variants_created_by FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
ADD CONSTRAINT fk_product_variants_updated_by FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL;

ALTER TABLE orders 
ADD CONSTRAINT fk_orders_user_id FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT,
ADD CONSTRAINT fk_orders_created_by FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
ADD CONSTRAINT fk_orders_updated_by FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL;

ALTER TABLE order_items 
ADD CONSTRAINT fk_order_items_order_id FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
ADD CONSTRAINT fk_order_items_product_variant_id FOREIGN KEY (product_variant_id) REFERENCES product_variants(id) ON DELETE RESTRICT,
ADD CONSTRAINT fk_order_items_created_by FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
ADD CONSTRAINT fk_order_items_updated_by FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL;

ALTER TABLE payments 
ADD CONSTRAINT fk_payments_order_id FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE RESTRICT,
ADD CONSTRAINT fk_payments_created_by FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
ADD CONSTRAINT fk_payments_updated_by FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL;

ALTER TABLE shipment 
ADD CONSTRAINT fk_shipment_order_id FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE RESTRICT,
ADD CONSTRAINT fk_shipment_created_by FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
ADD CONSTRAINT fk_shipment_updated_by FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL;

ALTER TABLE product_images 
ADD CONSTRAINT fk_product_images_product_id FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
ADD CONSTRAINT fk_product_images_created_by FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
ADD CONSTRAINT fk_product_images_updated_by FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL;

-- COMMENTAIRES SUR LES TABLES

COMMENT ON TABLE address IS 'Adresses de livraison et facturation';
COMMENT ON TABLE users IS 'Utilisateurs du système (clients, admins, vendeurs)';
COMMENT ON TABLE products IS 'Catalogue des produits';
COMMENT ON TABLE product_images IS 'Images associées aux produits, dont plusieurs par produit avec ordre et image principale.';
COMMENT ON TABLE product_variants IS 'Variantes des produits (taille, couleur, etc.)';
COMMENT ON TABLE orders IS 'Commandes passées par les utilisateurs';
COMMENT ON TABLE order_items IS 'Items/lignes des commandes';
COMMENT ON TABLE payments IS 'Paiements des commandes';
COMMENT ON TABLE shipment IS 'Informations d''expédition des commandes';
