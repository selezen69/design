/**
 * Portfolio data — replace placeholder images with real project photos
 * Each project: id, title, type, area, location, year, description, cover, photos[]
 */
export const projects = [
  {
    id: 1,
    title: "Пентхаус на Патриарших",
    type: "apartment",
    area: 220,
    location: "Москва",
    year: 2024,
    description:
      "Двухуровневый пентхаус в стиле современного арт-деко. Открытые пространства, панорамные окна и авторская мебель итальянских мастеров.",
    cover: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    photos: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
      "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=1200&q=80",
    ],
  },
  {
    id: 2,
    title: "Загородный дом в Барвихе",
    type: "house",
    area: 480,
    location: "Барвиха, МО",
    year: 2024,
    description:
      "Семейный резиденс в скандинавском минимализме. Натуральный камень, дерево и максимум естественного света.",
    cover: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80",
    photos: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=80",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
    ],
  },
  {
    id: 3,
    title: "Квартира на Остоженке",
    type: "apartment",
    area: 135,
    location: "Москва",
    year: 2023,
    description:
      "Камерный интерьер для пары. Мягкие бежевые тона, бархат и латунные детали создают атмосферу парижского ателье.",
    cover: "https://images.unsplash.com/photo-1616137466211-f939a420be84?w=800&q=80",
    photos: [
      "https://images.unsplash.com/photo-1616137466211-f939a420be84?w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=1200&q=80",
    ],
  },
  {
    id: 4,
    title: "Вилла в Переделкино",
    type: "house",
    area: 650,
    location: "Переделкино, МО",
    year: 2023,
    description:
      "Представительный дом для большой семьи. Классические пропорции, шёлковые ткани и коллекционное искусство.",
    cover: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800&q=80",
    photos: [
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=1200&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80",
    ],
  },
  {
    id: 5,
    title: "Апартаменты в Москва-Сити",
    type: "apartment",
    area: 95,
    location: "Москва-Сити",
    year: 2022,
    description:
      "Компактные апартаменты с видом на Москву. Лаконичный урбан-стиль, встроенная мебель и умная система освещения.",
    cover: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    photos: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=1200&q=80",
    ],
  },
];

export const projectTypes = [
  { value: "all", label: "Все" },
  { value: "apartment", label: "Квартиры" },
  { value: "house", label: "Дома" },
];
