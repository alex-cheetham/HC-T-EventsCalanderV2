ALTER TABLE settings ADD COLUMN announcement_enabled INTEGER DEFAULT 0;
ALTER TABLE settings ADD COLUMN announcement_text TEXT DEFAULT '';
ALTER TABLE settings ADD COLUMN announcement_bg TEXT DEFAULT '#1f2937';    -- gray-800
ALTER TABLE settings ADD COLUMN announcement_color TEXT DEFAULT '#ffffff'; -- white
