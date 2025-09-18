-- Connect to the database
\c songlist;

-- Create extension for UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create songs table
CREATE TABLE IF NOT EXISTS songs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    band VARCHAR(255) NOT NULL,
    year INTEGER,
    genre VARCHAR(100),
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for sorting by band name (as required by test)
CREATE INDEX IF NOT EXISTS idx_songs_band ON songs(band);
CREATE INDEX IF NOT EXISTS idx_songs_title ON songs(title);

-- Insert sample data from the provided CSV (converted to lowercase as required)
INSERT INTO songs (title, band, year) VALUES
    ('crazy', 'aerosmith', 1990),
    ('with or without you', 'u2', 1988),
    ('billy jean', 'michael jackson', 1982),
    ('imagine', 'john lennon', 1971),
    ('bohemian rhapsody', 'queen', 1975),
    ('like a rolling stone', 'bob dylan', 1965),
    ('shape of you', 'ed sheeran', 2017),
    ('smells like teen spirit', 'nirvana', 1991),
    ('thriller', 'michael jackson', 1982),
    ('kiss', 'prince', 1986),
    ('come as you are', 'nirvana', 1991)
ON CONFLICT DO NOTHING;