/**
 * Portfolio data — replace placeholder images with real project photos
 * Each project: id, title, type, area, location, year, description, cover, photos[]
 */
export const projects = [
  {
    id: 1,
    slug: "dom-so-vtorym-svetom",
    title: "Дом со вторым светом",
    type: "house",
    typeLabel: "Загородная резиденция",
    area: 320,
    location: "Московская область",
    year: 2017,
    style: "Современный с натуральными материалами",
    clientTask:
      "Создать светлый, тёплый дом с акцентом на естественном свете и материалах, без перегруженности декором.",
    description:
      "Современный интерьер загородного дома с открытым вторым светом, натуральными материалами и панорамным остеклением.",
    materials: "Натуральное дерево, камень, кирпичная кладка, панорамное остекление",
    photoCount: 16,
    cover: "/projects/dom-so-vtorym-svetom/cover.jpg",
    photos: [
      "/projects/dom-so-vtorym-svetom/photo-01.jpg",
      "/projects/dom-so-vtorym-svetom/photo-02.jpg",
      "/projects/dom-so-vtorym-svetom/photo-03.jpg",
      "/projects/dom-so-vtorym-svetom/photo-04.jpg",
      "/projects/dom-so-vtorym-svetom/photo-05.jpg",
      "/projects/dom-so-vtorym-svetom/photo-06.jpg",
      "/projects/dom-so-vtorym-svetom/photo-07.jpg",
      "/projects/dom-so-vtorym-svetom/photo-08.jpg",
      "/projects/dom-so-vtorym-svetom/photo-09.jpg",
      "/projects/dom-so-vtorym-svetom/photo-10.jpg",
      "/projects/dom-so-vtorym-svetom/photo-11.jpg",
      "/projects/dom-so-vtorym-svetom/photo-12.jpg",
      "/projects/dom-so-vtorym-svetom/photo-13.jpg",
      "/projects/dom-so-vtorym-svetom/photo-14.jpg",
      "/projects/dom-so-vtorym-svetom/photo-15.jpg",
      "/projects/dom-so-vtorym-svetom/photo-16.jpg",
    ],
  },
  {
    id: 2,
    slug: "loft-v-sadu",
    title: "Лофт в саду",
    type: "house",
    typeLabel: "Загородный дом",
    style: "Лофт с элементами кантри",
    clientTask:
      "Создать уютное пространство для отдыха на природе с характером городского лофта.",
    description:
      "Лофт-эстетика в загородном доме: кирпичная стена, тёплое дерево и терраса, растворяющаяся в саду.",
    materials: "Декоративный кирпич, натуральный камень, дерево",
    photoCount: 13,
    cover: "/projects/zelenyi-mys/cover.jpg",
    photos: [
      "/projects/zelenyi-mys/photo-01.jpg",
      "/projects/zelenyi-mys/photo-02.jpg",
      "/projects/zelenyi-mys/photo-03.jpg",
      "/projects/zelenyi-mys/photo-04.jpg",
      "/projects/zelenyi-mys/photo-05.jpg",
      "/projects/zelenyi-mys/photo-06.jpg",
      "/projects/zelenyi-mys/photo-07.jpg",
      "/projects/zelenyi-mys/photo-08.jpg",
      "/projects/zelenyi-mys/photo-09.jpg",
      "/projects/zelenyi-mys/photo-10.jpg",
      "/projects/zelenyi-mys/photo-11.jpg",
      "/projects/zelenyi-mys/photo-12.jpg",
      "/projects/zelenyi-mys/photo-13.jpg",
    ],
  },
  {
    id: 3,
    slug: "kvartira-s-biryuzovym-aktsentom",
    title: "Квартира с бирюзовым акцентом",
    type: "apartment",
    typeLabel: "Квартира",
    style: "Современный с цветным акцентом",
    clientTask:
      "Создать современный интерьер с ярким акцентом, который задаёт настроение всей квартире.",
    description:
      "Современная квартира с ярким бирюзовым акцентом в гостиной и продуманным зонированием каждой комнаты.",
    materials: "Глянцевый МДФ, керамогранит, текстиль",
    photoCount: 10,
    cover: "/projects/stoletova/cover.jpg",
    photos: [
      "/projects/stoletova/photo-01.jpg",
      "/projects/stoletova/photo-02.jpg",
      "/projects/stoletova/photo-03.jpg",
      "/projects/stoletova/photo-04.jpg",
      "/projects/stoletova/photo-05.jpg",
      "/projects/stoletova/photo-06.jpg",
      "/projects/stoletova/photo-07.jpg",
      "/projects/stoletova/photo-08.jpg",
      "/projects/stoletova/photo-09.jpg",
      "/projects/stoletova/photo-10.jpg",
    ],
  },
  {
    id: 4,
    slug: "tyoplaya-klassika",
    title: "Тёплая классика",
    type: "apartment",
    typeLabel: "Квартира",
    style: "Классический тёплый",
    clientTask:
      "Создать тёплый классический интерьер, комфортный для повседневной жизни.",
    description:
      "Классический интерьер квартиры с мягкими текстилями, тёплой палитрой и вниманием к деталям декора.",
    materials: "Дерево, текстиль, керамическая плитка",
    photoCount: 10,
    cover: "/projects/lobachevskogo/cover.jpg",
    photos: [
      "/projects/lobachevskogo/photo-01.jpg",
      "/projects/lobachevskogo/photo-02.jpg",
      "/projects/lobachevskogo/photo-03.jpg",
      "/projects/lobachevskogo/photo-04.jpg",
      "/projects/lobachevskogo/photo-05.jpg",
      "/projects/lobachevskogo/photo-06.jpg",
      "/projects/lobachevskogo/photo-07.jpg",
      "/projects/lobachevskogo/photo-08.jpg",
      "/projects/lobachevskogo/photo-09.jpg",
      "/projects/lobachevskogo/photo-10.jpg",
    ],
  },
  // Площадь / местоположение / год для этих трёх проектов не указаны — уточнить у клиента.
];

export const projectTypes = [
  { value: "all", label: "Все" },
  { value: "apartment", label: "Квартиры" },
  { value: "house", label: "Дома" },
];
