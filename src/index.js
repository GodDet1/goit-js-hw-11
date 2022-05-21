import IMAGE_GALLERY from './class-gallery';

const gallery = new IMAGE_GALLERY();

// import Notiflix from 'notiflix';
// import 'notiflix/dist/notiflix-3.2.5.min.css';
// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';
// import axios from 'axios';

// const refs = {
//   form: document.querySelector('#search-form'),
//   nextPage: document.querySelector('#next-page'),
//   gallery: document.querySelector('#gallery'),
//   endContainer: document.querySelector('.end-container'),
//   html: document.querySelector('html'),
// };

// let search = '';
// let pageNumber = 1;
// let gallery = new SimpleLightbox('.gallery a');
// gallery.on('show.simplelightbox');

// refs.form.addEventListener('submit', onSubmit);
// refs.nextPage.addEventListener('click', onClick);

// async function onSubmit(evt) {
//   event.preventDefault();
//   refs.gallery.innerHTML = '';
//   refs.endContainer.innerHTML = '';

//   pageNumber = 1;

//   const {
//     elements: { searchQuery },
//   } = evt.currentTarget;
//   search = searchQuery.value;

//   const rendercards = await fetchImg(search, pageNumber);

//   Notiflix.Notify.info(`Hooray! We found ${rendercards.totalHits} totalHits images.`);
//   refs.nextPage.classList.remove('visually-hidden');

//   setTimeout(scroll, 400);
// }

// function onClick() {
//   pageNumber += 1;

//   fetchImg(search, pageNumber);
//   setTimeout(scroll, 400);
// }

// async function fetchImg(search, pageNumber) {
//   try {
//     const urlToFetch = url(search, pageNumber);
//     const { data } = await axios.get(urlToFetch);
//     const images = data;

//     const cardTemplate = cards(images);
//     render(cardTemplate);
//     gallery.refresh();

//     toTenImages(images);
//     zeroImages(images);

//     return images;
//   } catch (error) {
//     console.log(error.message);
//   }
// }

// function template(webformatURL, largeImageURL, tags, likes, views, comments, downloads) {
//   const template = `
//       <div class="photo-card">

//         <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" /></a>

//         <div class="info">
//           <p class="info-item">
//           <b>Likes</b>
//           ${likes}
//           </p>
//           <p class="info-item">
//           <b>Views</b>
//           ${views}
//           </p>
//           <p class="info-item">
//           <b>Comments</b>
//           ${comments}
//           </p>
//           <p class="info-item">
//           <b>Downloads</b>
//           ${downloads}
//           </p>
//         </div>
//       </div>`;
//   return template;
// }

// function render(card) {
//   refs.gallery.insertAdjacentHTML('beforeend', card);
// }

// function url(searchQuery, numberOfPage) {
//   return `https://pixabay.com/api/?key=27462846-29688f763242226098511123d&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${numberOfPage}&per_page=30`;
// }

// function cards(obj) {
//   return obj.hits
//     .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
//       template(webformatURL, largeImageURL, tags, likes, views, comments, downloads),
//     )
//     .join('');
// }

// function scroll() {
//   const { height: cardHeight } = refs.gallery.firstElementChild.getBoundingClientRect();

//   window.scrollBy({
//     top: cardHeight * 2,
//     behavior: 'smooth',
//   });
// }

// function zeroImages(images) {
//   if (images.hits.length === 0) {
//     refs.nextPage.classList.add('visually-hidden');
//     throw new Error(Notiflix.Notify.failure('No image with this name!'));
//   }
// }

// function toTenImages(images) {
//   if (images.hits.length < 30) {
//     refs.nextPage.classList.add('visually-hidden');
//     refs.endContainer.insertAdjacentHTML(
//       'beforeend',
//       "<h2 class='end'>We're sorry, but you've reached the end of search results",
//     );
//     Notiflix.Notify.info("We're sorry, but you've reached the end of search results");
//   }
// }
