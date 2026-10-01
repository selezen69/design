/**
 * Portfolio data — replace placeholder images with real project photos
 * Each project: id, title, type, area, location, year, description, cover, photos[]
 */
export const projects = [
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
  {
    id: 11,
    slug: "apartments",
    title: "Апартаменты",
    type: "apartment",
    typeLabel: "Апартаменты",
    location: "Москва",
    photoCount: 9,
    cover: "/projects/apartments/photo-01.webp",
    photos: [
      {
        src: "/projects/apartments/photo-01.webp",
        alt: "Гостиная-столовая с чёрными архитектурными акцентами",
      },
      {
        src: "/projects/apartments/photo-02.webp",
        alt: "Гостиная с мягкой мебелью и деревянным панно",
      },
      {
        src: "/projects/apartments/photo-03.webp",
        alt: "Компактная белая кухня в обрамлении тёмных стеллажей",
      },
      {
        src: "/projects/apartments/photo-04.webp",
        alt: "Открытый чёрный стеллаж в гостиной",
      },
      {
        src: "/projects/apartments/photo-05.webp",
        alt: "Диванная зона у окна",
      },
      {
        src: "/projects/apartments/photo-06.webp",
        alt: "Светлая спальня с деревянными дверями",
      },
      {
        src: "/projects/apartments/photo-07.webp",
        alt: "Зеркало и двери спальни с рисунком шеврон",
      },
      {
        src: "/projects/apartments/photo-08.webp",
        alt: "Санузел с деревянной подвесной тумбой",
      },
      {
        src: "/projects/apartments/photo-09.webp",
        alt: "Постирочная зона в санузле",
      },
    ],
  },
  {
    id: 7,
    slug: "gaaga",
    title: "Гаага",
    type: "apartment",
    typeLabel: "Квартира",
    photoCount: 5,
    cover: "/projects/gaaga/cover.webp",
    photos: [
      {
        src: "/projects/gaaga/photo-01.webp",
        alt: "Кухня-столовая с барной стойкой",
      },
      {
        src: "/projects/gaaga/photo-02.webp",
        alt: "Гостиная с модульным диваном",
      },
      {
        src: "/projects/gaaga/photo-03.webp",
        alt: "Кабинет-гостиная с рабочим местом",
      },
      {
        src: "/projects/gaaga/photo-04.webp",
        alt: "Спальня с деревянной стеновой панелью",
      },
      {
        src: "/projects/gaaga/photo-05.webp",
        alt: "Санузел в тёмном камне",
      },
    ],
  },
  {
    id: 8,
    slug: "barkli",
    title: "Баркли",
    type: "apartment",
    typeLabel: "Квартира",
    photoCount: 5,
    cover: "/projects/barkli/cover.webp",
    photos: [
      {
        src: "/projects/barkli/photo-01.webp",
        alt: "Белая кухня с обеденной зоной",
      },
      {
        src: "/projects/barkli/photo-02.webp",
        alt: "Столовая с панорамным окном за стеклянной перегородкой",
      },
      {
        src: "/projects/barkli/photo-03.webp",
        alt: "Обеденная зона со встроенной техникой и винным шкафом",
      },
      {
        src: "/projects/barkli/photo-04.webp",
        alt: "Кухня с дизайнерскими подвесными светильниками",
      },
      {
        src: "/projects/barkli/photo-05.webp",
        alt: "Кухня за стеклянной перегородкой и панель из тёмного дерева",
      },
    ],
  },
  {
    id: 9,
    slug: "krestovsky-ostrov",
    title: "Крестовский остров",
    type: "apartment",
    typeLabel: "Квартира",
    photoCount: 4,
    cover: "/projects/krestovsky-ostrov/cover.webp",
    photos: [
      {
        src: "/projects/krestovsky-ostrov/photo-01.webp",
        alt: "Гостиная с угловым диваном и ярким арт-объектом",
      },
      {
        src: "/projects/krestovsky-ostrov/photo-02.webp",
        alt: "Гостиная с панорамными окнами и телевизионной зоной",
      },
      {
        src: "/projects/krestovsky-ostrov/photo-03.webp",
        alt: "Кухня-столовая с прозрачными стульями",
      },
      {
        src: "/projects/krestovsky-ostrov/photo-04.webp",
        alt: "Спальня с мягким изголовьем и настенным светильником",
      },
    ],
  },
  {
    id: 10,
    slug: "ruza",
    title: "Руза",
    type: "house",
    typeLabel: "Загородный дом",
    photoCount: 5,
    cover: "/projects/ruza/photo-04.webp",
    photos: [
      {
        src: "/projects/ruza/photo-01.webp",
        alt: "Кухня-столовая с зелёными фасадами и деревянной отделкой",
      },
      {
        src: "/projects/ruza/photo-02.webp",
        alt: "Гостиная с угловым диваном и выходом на террасу",
      },
      {
        src: "/projects/ruza/photo-03.webp",
        alt: "Гостиная с камином и телевизионной зоной",
      },
      {
        src: "/projects/ruza/photo-04.webp",
        alt: "Обеденная зона и кухня с латунными деталями",
      },
      {
        src: "/projects/ruza/photo-05.webp",
        alt: "Лестница с винным стеллажом под маршом",
      },
    ],
  },
  // Площадь / местоположение / год / стиль / описание для проектов
  // «Профсоюзная 209», «Апартаменты», «Гаага», «Баркли», «Крестовский остров» и «Руза»,
  // а также для двух проектов выше,
  // не указаны — уточнить у клиента.
];

export const projectTypes = [
  { value: "all", label: "Все" },
  { value: "apartment", label: "Квартиры" },
  { value: "house", label: "Дома" },
];
