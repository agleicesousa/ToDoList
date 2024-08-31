CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    task TEXT NOT NULL,
    due_date DATE,
    completed BOOLEAN DEFAULT FALSE
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    task_id INTEGER REFERENCES tasks(id),
    comment TEXT NOT NULL
);

CREATE TABLE attachments (
    id SERIAL PRIMARY KEY,
    task_id INTEGER REFERENCES tasks(id),
    file_url TEXT NOT NULL
);