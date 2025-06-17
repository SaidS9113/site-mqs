-- TRIGGER : Met à jour updated_at avant chaque modification

-- Pour toutes les tables concernées par un champ updated_at
-- Nécessite d'abord une fonction générique

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Déclencheurs pour chaque table

CREATE TRIGGER trigger_set_updated_at_users
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trigger_set_updated_at_address
BEFORE UPDATE ON address
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trigger_set_updated_at_products
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trigger_set_updated_at_product_variants
BEFORE UPDATE ON product_variants
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trigger_set_updated_at_orders
BEFORE UPDATE ON orders
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trigger_set_updated_at_order_items
BEFORE UPDATE ON order_items
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trigger_set_updated_at_payments
BEFORE UPDATE ON payments
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trigger_set_updated_at_shipment
BEFORE UPDATE ON shipment
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();


// Vues 

-- VIEW : Détails complets d'une commande

CREATE OR REPLACE VIEW v_order_details AS
SELECT 
    o.id AS order_id,
    o.order_number,
    o.status AS order_status,
    u.username,
    u.email,
    oi.product_variant_id,
    p.name AS product_name,
    oi.quantity,
    oi.price,
    oi.weight,
    pay.amount AS payment_amount,
    pay.status AS payment_status,
    s.carrier_name,
    s.tracking_number,
    s.shipping_status,
    s.estimated_delivery,
    o.created_at AS order_date
FROM orders o
JOIN users u ON o.user_id = u.id
LEFT JOIN order_items oi ON oi.order_id = o.id
LEFT JOIN product_variants pv ON pv.id = oi.product_variant_id
LEFT JOIN products p ON p.id = pv.product_id
LEFT JOIN payments pay ON pay.order_id = o.id
LEFT JOIN shipment s ON s.order_id = o.id;
