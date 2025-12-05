CREATE TABLE IF NOT EXISTS settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    logo_url TEXT DEFAULT '',
    footer_text TEXT DEFAULT '',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO settings (logo_url, footer_text)
VALUES ('', '© 2025 HCC Development Team | Built by Matrix Gaming');
