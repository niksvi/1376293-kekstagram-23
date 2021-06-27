import {getRandomInt} from './random-int.js';

const MAX_COMMENT_LENGTH = 140;

function checkCommentLength(comment, maxLength) {
  return comment.length < maxLength;
}

checkCommentLength('some twit', MAX_COMMENT_LENGTH);

const MIN_LIKES_AMOUNT = 15;
const MAX_LIKES_AMOUNT = 200;

const MIN_COMMENT_AMOUNT = 1;
const MAX_COMMENT_AMOUNT = 10;

const MIN_COMMENT_ID = 0;
const MAX_COMMENT_ID = 250;

const MIN_AVATAR_ID = 1;
const MAX_AVATAR_ID = 6;

const MIN_MESSAGE_AMOUNT = 1;
const MAX_MESSAGE_AMOUNT = 2;

const description = [
  'Если смогу, я сделаю это. Конец истории',
  'Смейтесь как только умеете, любите столько, сколько живете',
  'Помните: вы единственный человек, который может наполнить ваш мир солнечным светом',
  'Я полностью уверена, что я — диснеевская принцесса, которую еще не придумали',
  'Не позволяйте кому-то затушить ваши искры только потому, что их свет сияет в чьих-то глазах',
  'Делайте в вашей жизни то, что меньше заставляет вас смотреть в свой телефон',
  'Улыбка — единственный тренд в моде, который актуален всегда',
  'Никогда не ищите свое счастье там, где вы его однажды потеряли',
  'Жизнь похожа на фотокамеру: вам просто нужно смотреть на нее с улыбкой',
  'Моя жизнь меняется, потому что меняю ее я',
  'Всегда начинайте свой день с хороших людей и кофе',
  'Ни о чем не беспокойтесь. Потому что все лучшие умы на работе',
  'Жизнь — это всего лишь серия крошечных чудес, поэтому обратите внимание на них',
  'Живите во всех тех моментах, которые вы не можете выразить словами',
  'Не ждите идеального момента. Берите каждый момент и делайте его идеальным',
];

const message = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const name = [
  'Онисим',
  'Порфирий',
  'Ладомир',
  'Дива',
  'Феоктиста',
  'Феврония',
  'Никанор',
  'Агриппина',
  'Лавр',
  'Матрона',
  'Феофания',
  'Святополк',
  'Добрыня',
];

const getCommentId = (() => {
  const ids = [];

  return () => {
    let id;

    do {
      id = getRandomInt(MIN_COMMENT_ID, MAX_COMMENT_ID);
    } while (ids.includes(id));

    ids.push(id);

    return id;
  };
})();

const getComment = () => (
  {
    id: getCommentId(),
    avatar: `img/avatar-${getRandomInt(MIN_AVATAR_ID,MAX_AVATAR_ID)}.svg`,
    message: new Array(getRandomInt(MIN_MESSAGE_AMOUNT, MAX_MESSAGE_AMOUNT)).fill(null).map(() => message[getRandomInt(0,message.length-1)]),
    name: name[getRandomInt(0, name.length-1)],
  });

const photos = [];

const getPhoto = (index) => (
  {
    id: index,
    url: `photos/${index}.jpg` ,
    description: description[getRandomInt(0, description.length - 1)],
    likes: getRandomInt(MIN_LIKES_AMOUNT, MAX_LIKES_AMOUNT),
    comments: new Array(getRandomInt(MIN_COMMENT_AMOUNT, MAX_COMMENT_AMOUNT)).fill(null).map(() => getComment()),
  });

const createPhotos = (arrayAmount) => {
  for (let id = 1; id <= arrayAmount; id++){
    const photo = getPhoto(id);
    photos.push(photo);
  }
  return getPhoto;
};

export {createPhotos};
