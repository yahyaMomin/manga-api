const sort = [
  'Popularity',
  'Best Match',
  'Alphabet',
  'Subscribers',
  'Recently Added',
  'Latest Updates',
];
const order = ['Ascending', 'Descending'];

const official = ['Any', true, false];
const anime = ['Any', true, false];
const adult = ['Any', true, false];
const status = ['Ongoing', 'Complete', 'Hiatus', 'Canceled'];
const type = ['Manga', 'Manhwa', 'Manhua', 'OEL'];
const genres = [
  'Action',
  'Adult',
  'Adventure',
  'Comedy',
  'Doujinshi',
  'Drama',
  'Ecchi',
  'Fantasy',
  'Gender Bender',
  'Harem',
  'Hentai',
  'Historical',
  'Horror',
  'Isekai',
  'Josei',
  'Lolicon',
  'Martial Arts',
  'Mature',
  'Mecha',
  'Mystery',
  'Psychological',
  'Romance',
  'School Life',
  'Sci-fi',
  'Seinen',
  'Shotacon',
  'Shoujo',
  'Shoujo Ai',
  'Shounen',
  'Shounen Ai',
  'Slice of Life',
  'Smut',
  'Sports',
  'Supernatural',
  'Tragedy',
  'Yaoi',
  'Yuri',
  'Other',
];

const weebcentralStatics = {
  author: {
    default: '',
    options: [],
  },
  keyword: {
    default: '',
    options: [],
  },
  sort: {
    default: 'Popularity',
    options: sort,
  },
  order: {
    default: 'Descending',
    options: order,
  },
  official: {
    default: 'Any',
    options: official,
  },
  anime: {
    default: 'any',
    options: anime,
  },
  adult: {
    default: 'any',
    options: adult,
  },
  status: {
    default: '',
    options: status,
  },
  type: {
    default: '',
    options: type,
  },
  genres: {
    default: '',
    options: genres,
  },
};

export default weebcentralStatics;
