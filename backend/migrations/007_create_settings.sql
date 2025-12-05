CREATE TABLE IF NOT EXISTS settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    logo_url TEXT DEFAULT NULL,
    footer_text TEXT DEFAULT '© 2025 HCC Development Team | Built by Matrix Gaming',
    last_updated TEXT DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO settings (id) VALUES (1)
ON CONFLICT(id) DO NOTHING;
