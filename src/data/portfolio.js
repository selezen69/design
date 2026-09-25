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
    photoCount: 12,
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
  {
    id: 5,
    slug: "lukomorye",
    title: "Лукоморье",
    type: "house",
    typeLabel: "Загородный дом",
    area: 800,
    location: "Посёлок Лукоморье",
    photoCount: 10,
    cover: "/projects/lukomorye/cover.webp",
    photos: [
      "/projects/lukomorye/photo-01.webp",
      "/projects/lukomorye/photo-02.webp",
      "/projects/lukomorye/photo-03.webp",
      "/projects/lukomorye/photo-04.webp",
      "/projects/lukomorye/photo-05.webp",
      "/projects/lukomorye/photo-06.webp",
      "/projects/lukomorye/photo-07.webp",
      "/projects/lukomorye/photo-08.webp",
      "/projects/lukomorye/photo-09.webp",
      "/projects/lukomorye/photo-10.webp",
    ],
  },
  {
    id: 6,
    slug: "profsoyuznaya-209",
    title: "Профсоюзная 209",
    type: "apartment",
    typeLabel: "Квартира",
    photoCount: 18,
    cover: "/projects/profsoyuznaya-209/cover.webp",
    photos: [
      {
        src: "/projects/profsoyuznaya-209/photo-01.webp",
        alt: "Кухня-гостиная с обеденной зоной",
      },
      {
        src: "/projects/profsoyuznaya-209/photo-02.webp",
        alt: "Общий вид гостиной и столовой",
      },
      {
        src: "/projects/profsoyuznaya-209/photo-03.webp",
        alt: "Гостиная с диванной группой",
      },
      {
        src: "/projects/profsoyuznaya-209/photo-04.webp",
        alt: "Столовая и гостиная",
      },
      {
        src: "/projects/profsoyuznaya-209/photo-05.webp",
        alt: "Кухня, общий вид",
      },
      {
        src: "/projects/profsoyuznaya-209/photo-06.webp",
        alt: "Кухня с обеденным столом",
      },
      {
        src: "/projects/profsoyuznaya-209/photo-07.webp",
        alt: "Рабочая зона кухни",
      },
      {
        src: "/projects/profsoyuznaya-209/photo-08.webp",
        alt: "Спальня, вид из угла",
      },
      {
        src: "/projects/profsoyuznaya-209/photo-09.webp",
        alt: "Спальня, общий вид",
      },
      {
        src: "/projects/profsoyuznaya-209/photo-10.webp",
        alt: "Спальня с мягким изголовьем",
      },
      {
        src: "/projects/profsoyuznaya-209/photo-11.webp",
        alt: "Спальня с телевизионной зоной",
      },
      {
        src: "/projects/profsoyuznaya-209/photo-12.webp",
        alt: "Ванная комната, общий вид",
      },
      {
        src: "/projects/profsoyuznaya-209/photo-13.webp",
        alt: "Ванная комната с тумбой",
      },
      {
        src: "/projects/profsoyuznaya-209/photo-14.webp",
        alt: "Постирочная",
      },
      {
        src: "/projects/profsoyuznaya-209/photo-15.webp",
        alt: "Холл со встроенным шкафом",
      },
      {
        src: "/projects/profsoyuznaya-209/photo-16.webp",
        alt: "Просторный холл квартиры",
      },
      {
        src: "/projects/profsoyuznaya-209/photo-17.webp",
        alt: "Прихожая",
      },
      {
        src: "/projects/profsoyuznaya-209/photo-18.webp",
        alt: "Гостиная, дополнительный ракурс",
      },
    ],
  },
  // Площадь / местоположение / год / стиль / описание для проекта «Лукоморье»,
  // проекта «Профсоюзная 209», а также для трёх проектов выше,
  // не указаны — уточнить у клиента.
];

export const projectTypes = [
  { value: "all", label: "Все" },
  { value: "apartment", label: "Квартиры" },
  { value: "house", label: "Дома" },
];
