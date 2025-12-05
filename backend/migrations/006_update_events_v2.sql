ALTER TABLE events ADD COLUMN category TEXT DEFAULT 'General';
ALTER TABLE events ADD COLUMN meetup_time TEXT;
ALTER TABLE events ADD COLUMN departure_time TEXT;
ALTER TABLE events ADD COLUMN is_featured INTEGER DEFAULT 0;
