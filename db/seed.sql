-- Тестовое наполнение базы design_portfolio.
-- projects / project_photos — реальные данные и пути к уже существующим
-- изображениям в public/projects (взято из src/data/portfolio.js).
-- leads / reviews — полностью вымышленные тестовые записи, реальных людей
-- не существует, используются только для проверки схемы.

BEGIN;

-- ── projects ────────────────────────────────────────────────────────────

INSERT INTO projects
    (slug, title, type, type_label, area, location, year, style,
     client_task, description, materials, cover_url, sort_order)
VALUES
    ('dom-so-vtorym-svetom',
     'Дом со вторым светом', 'house', 'Загородная резиденция',
     320, 'Московская область', 2017,
     'Современный с натуральными материалами',
     'Создать светлый, тёплый дом с акцентом на естественном свете и материалах, без перегруженности декором.',
     'Современный интерьер загородного дома с открытым вторым светом, натуральными материалами и панорамным остеклением.',
     'Натуральное дерево, камень, кирпичная кладка, панорамное остекление',
     '/projects/dom-so-vtorym-svetom/cover.jpg', 1),

    ('loft-v-sadu',
     'Лофт в саду', 'house', 'Загородный дом',
     NULL, NULL, NULL,
     'Лофт с элементами кантри',
     'Создать уютное пространство для отдыха на природе с характером городского лофта.',
     'Лофт-эстетика в загородном доме: кирпичная стена, тёплое дерево и терраса, растворяющаяся в саду.',
     'Декоративный кирпич, натуральный камень, дерево',
     '/projects/zelenyi-mys/cover.jpg', 2),

    ('kvartira-s-biryuzovym-aktsentom',
     'Квартира с бирюзовым акцентом', 'apartment', 'Квартира',
     NULL, NULL, NULL,
     'Современный с цветным акцентом',
     'Создать современный интерьер с ярким акцентом, который задаёт настроение всей квартире.',
     'Современная квартира с ярким бирюзовым акцентом в гостиной и продуманным зонированием каждой комнаты.',
     'Глянцевый МДФ, керамогранит, текстиль',
     '/projects/stoletova/cover.jpg', 3),

    ('tyoplaya-klassika',
     'Тёплая классика', 'apartment', 'Квартира',
     NULL, NULL, NULL,
     'Классический тёплый',
     'Создать тёплый классический интерьер, комфортный для повседневной жизни.',
     'Классический интерьер квартиры с мягкими текстилями, тёплой палитрой и вниманием к деталям декора.',
     'Дерево, текстиль, керамическая плитка',
     '/projects/lobachevskogo/cover.jpg', 4);

-- ── project_photos ──────────────────────────────────────────────────────

INSERT INTO project_photos (project_id, url, sort_order)
SELECT p.id, v.url, v.sort_order
FROM projects p
JOIN (VALUES
    ('/projects/dom-so-vtorym-svetom/photo-01.jpg', 1),
    ('/projects/dom-so-vtorym-svetom/photo-02.jpg', 2),
    ('/projects/dom-so-vtorym-svetom/photo-03.jpg', 3),
    ('/projects/dom-so-vtorym-svetom/photo-04.jpg', 4),
    ('/projects/dom-so-vtorym-svetom/photo-05.jpg', 5),
    ('/projects/dom-so-vtorym-svetom/photo-06.jpg', 6),
    ('/projects/dom-so-vtorym-svetom/photo-07.jpg', 7),
    ('/projects/dom-so-vtorym-svetom/photo-08.jpg', 8),
    ('/projects/dom-so-vtorym-svetom/photo-09.jpg', 9),
    ('/projects/dom-so-vtorym-svetom/photo-10.jpg', 10),
    ('/projects/dom-so-vtorym-svetom/photo-11.jpg', 11),
    ('/projects/dom-so-vtorym-svetom/photo-12.jpg', 12),
    ('/projects/dom-so-vtorym-svetom/photo-13.jpg', 13),
    ('/projects/dom-so-vtorym-svetom/photo-14.jpg', 14),
    ('/projects/dom-so-vtorym-svetom/photo-15.jpg', 15),
    ('/projects/dom-so-vtorym-svetom/photo-16.jpg', 16)
) AS v(url, sort_order) ON true
WHERE p.slug = 'dom-so-vtorym-svetom';

INSERT INTO project_photos (project_id, url, sort_order)
SELECT p.id, v.url, v.sort_order
FROM projects p
JOIN (VALUES
    ('/projects/zelenyi-mys/photo-01.jpg', 1),
    ('/projects/zelenyi-mys/photo-02.jpg', 2),
    ('/projects/zelenyi-mys/photo-03.jpg', 3),
    ('/projects/zelenyi-mys/photo-04.jpg', 4),
    ('/projects/zelenyi-mys/photo-05.jpg', 5),
    ('/projects/zelenyi-mys/photo-06.jpg', 6),
    ('/projects/zelenyi-mys/photo-07.jpg', 7),
    ('/projects/zelenyi-mys/photo-08.jpg', 8),
    ('/projects/zelenyi-mys/photo-09.jpg', 9),
    ('/projects/zelenyi-mys/photo-10.jpg', 10),
    ('/projects/zelenyi-mys/photo-11.jpg', 11),
    ('/projects/zelenyi-mys/photo-12.jpg', 12),
    ('/projects/zelenyi-mys/photo-13.jpg', 13)
) AS v(url, sort_order) ON true
WHERE p.slug = 'loft-v-sadu';

INSERT INTO project_photos (project_id, url, sort_order)
SELECT p.id, v.url, v.sort_order
FROM projects p
JOIN (VALUES
    ('/projects/stoletova/photo-01.jpg', 1),
    ('/projects/stoletova/photo-02.jpg', 2),
    ('/projects/stoletova/photo-03.jpg', 3),
    ('/projects/stoletova/photo-04.jpg', 4),
    ('/projects/stoletova/photo-05.jpg', 5),
    ('/projects/stoletova/photo-06.jpg', 6),
    ('/projects/stoletova/photo-07.jpg', 7),
    ('/projects/stoletova/photo-08.jpg', 8),
    ('/projects/stoletova/photo-09.jpg', 9),
    ('/projects/stoletova/photo-10.jpg', 10)
) AS v(url, sort_order) ON true
WHERE p.slug = 'kvartira-s-biryuzovym-aktsentom';

INSERT INTO project_photos (project_id, url, sort_order)
SELECT p.id, v.url, v.sort_order
FROM projects p
JOIN (VALUES
    ('/projects/lobachevskogo/photo-01.jpg', 1),
    ('/projects/lobachevskogo/photo-02.jpg', 2),
    ('/projects/lobachevskogo/photo-03.jpg', 3),
    ('/projects/lobachevskogo/photo-04.jpg', 4),
    ('/projects/lobachevskogo/photo-05.jpg', 5),
    ('/projects/lobachevskogo/photo-06.jpg', 6),
    ('/projects/lobachevskogo/photo-07.jpg', 7),
    ('/projects/lobachevskogo/photo-08.jpg', 8),
    ('/projects/lobachevskogo/photo-09.jpg', 9),
    ('/projects/lobachevskogo/photo-10.jpg', 10)
) AS v(url, sort_order) ON true
WHERE p.slug = 'tyoplaya-klassika';

-- ── leads (полностью вымышленные тестовые заявки) ──────────────────────

INSERT INTO leads (name, contact, project_type, message, created_at) VALUES
    ('Тестовый Клиент Один', '+7 900 000-00-01', 'apartment',
     'Тестовая заявка для проверки базы данных: интересует ремонт квартиры 90 м².',
     now() - interval '5 days'),
    ('Тестовый Клиент Два', '@test_client_two', 'house',
     'Тестовая заявка, реальным клиентом не является. Загородный дом, бюджет от 8 млн ₽.',
     now() - interval '3 days'),
    ('Тестовый Клиент Три', '+7 900 000-00-03', NULL, NULL,
     now() - interval '1 days'),
    ('Тестовый Клиент Четыре', '@test_client_four', 'other',
     'Тестовые данные: хочу обсудить дизайн коммерческого помещения.',
     now());

-- ── reviews (полностью вымышленные тестовые отзывы) ─────────────────────

INSERT INTO reviews (author_name, text, project_label) VALUES
    ('Тестовый Отзыв 1',
     'Тестовый отзыв для проверки базы данных: работой очень довольны, всё сделано аккуратно и в срок.',
     'Дом со вторым светом'),
    ('Тестовый Отзыв 2',
     'Тестовые данные: отличное внимание к деталям и понятный процесс на каждом этапе.',
     'Лофт в саду'),
    ('Тестовый Отзыв 3',
     'Тестовый отзыв без привязки к конкретному проекту, используется только для проверки схемы.',
     NULL);

COMMIT;
