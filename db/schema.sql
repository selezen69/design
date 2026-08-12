-- Схема базы данных для сайта-портфолио дизайнера интерьеров.
-- 4 таблицы: projects, project_photos, leads, reviews.
-- Рассчитано на запуск один раз на пустой базе (design_portfolio).

BEGIN;

-- Проекты портфолио (квартиры и загородные дома)
CREATE TABLE projects (
    id           SERIAL PRIMARY KEY,
    slug         TEXT NOT NULL UNIQUE,
    title        TEXT NOT NULL,
    type         TEXT NOT NULL CHECK (type IN ('apartment', 'house')),
    type_label   TEXT NOT NULL,
    area         NUMERIC,
    location     TEXT,
    year         SMALLINT,
    style        TEXT,
    client_task  TEXT,
    description  TEXT NOT NULL,
    materials    TEXT,
    cover_url    TEXT NOT NULL,
    sort_order   INTEGER NOT NULL DEFAULT 0
);

-- Фотографии проекта (только путь/URL, без хранения файлов в базе)
CREATE TABLE project_photos (
    id          SERIAL PRIMARY KEY,
    project_id  INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    url         TEXT NOT NULL,
    sort_order  INTEGER NOT NULL DEFAULT 0,
    UNIQUE (project_id, sort_order)
);

-- Заявки с формы обратной связи
CREATE TABLE leads (
    id            SERIAL PRIMARY KEY,
    name          TEXT NOT NULL,
    contact       TEXT NOT NULL,
    project_type  TEXT CHECK (project_type IN ('apartment', 'house', 'other')),
    message       TEXT,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Отзывы клиентов
CREATE TABLE reviews (
    id             SERIAL PRIMARY KEY,
    author_name    TEXT NOT NULL,
    text           TEXT NOT NULL,
    project_label  TEXT
);

COMMIT;
