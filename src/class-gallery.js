import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';
import InfiniteScroll from 'infinite-scroll';

export default class IMAGE_GALLERY {
  constructor() {
    this.form = document.querySelector('#search-form');

    this.imageGallery = document.querySelector('#gallery');
    this.endContainer = document.querySelector('.end-container');
    this.html = document.querySelector('html');

    this.search = 'cat';
    this.galleryPageNumber = 4;

    this.gallery = new SimpleLightbox('.gallery a');
    this.gallery.on('show.simplelightbox');

    this.form.addEventListener('submit', this.onSubmit.bind(this));

    this.html.addEventListener('keydown', this.onKeydown.bind(this));

    let infScroll = new InfiniteScroll(this.imageGallery, {
      // options
      path: () => {
        this.galleryPageNumber += 1;
        return this.url(this.search, this.galleryPageNumber);
      },
      history: false,
      responseBody: 'json',
    });

    infScroll.on('load', body => {
      this.render(body);
    });
  }

  onKeydown(evt) {
    if (evt.code === 'ArrowDown') {
      this.scroll();
    }

    if (evt.code === 'ArrowUp') {
      this.scroll(-1);
    }
  }

  async onSubmit(evt) {
    event.preventDefault();
    this.imageGallery.innerHTML = '';
    this.endContainer.innerHTML = '';

    this.galleryPageNumber = 1;

    const {
      elements: { searchQuery },
    } = evt.currentTarget;
    this.search = searchQuery.value;

    const rendercards = await this.fetchImg(this.search, this.galleryPageNumber);
    console.log(rendercards);

    Notiflix.Notify.info(`Hooray! We found ${rendercards.totalHits} totalHits images.`);
  }

  onClick() {
    this.galleryPageNumber += 1;

    this.fetchImg(this.search, this.galleryPageNumber);
    setTimeout(scroll, 400);
  }

  async fetchImg() {
    try {
      const urlToFetch = this.url(this.search, this.galleryPageNumber);
      const { data } = await axios.get(urlToFetch);

      const images = data;

      this.render(images);
      return images;
    } catch (error) {
      console.log(error.message);
    }
  }

  template(webformatURL, largeImageURL, tags, likes, views, comments, downloads) {
    const template = `
      <div class="photo-card">

        <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
        
        <div class="info">
          <p class="info-item">
          <b>Likes</b>
          ${likes}
          </p>
          <p class="info-item">
          <b>Views</b>
          ${views}
          </p>
          <p class="info-item">
          <b>Comments</b>
          ${comments}
          </p>
          <p class="info-item">
          <b>Downloads</b>
          ${downloads}
          </p>
        </div>
      </div>`;
    return template;
  }

  render(data) {
    const cardTemplate = this.cards(data);

    this.imageGallery.insertAdjacentHTML('beforeend', cardTemplate);
    this.gallery.refresh();

    this.toTenImages(data);
    this.zeroImages(data);
  }

  url(searchQuery = this.search, numberOfPage = this.galleryPageNumber) {
    return `https://pixabay.com/api/?key=27462846-29688f763242226098511123d&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${numberOfPage}&per_page=30`;
  }

  cards(obj) {
    return obj.hits
      .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
        this.template(webformatURL, largeImageURL, tags, likes, views, comments, downloads),
      )
      .join('');
  }

  scroll(num = 1) {
    if (this.imageGallery.firstElementChild) {
      const { height: cardHeight } = this.imageGallery.firstElementChild.getBoundingClientRect();
      console.log(this.imageGallery.firstElementChild);

      window.scrollBy({
        top: cardHeight * 2 * num,
        behavior: 'smooth',
      });
    }
  }

  zeroImages(images) {
    if (images.hits.length === 0) {
      throw new Error(Notiflix.Notify.failure('No image with this name!'));
    }
  }

  toTenImages(images) {
    if (images.hits.length < 30) {
      this.endContainer.insertAdjacentHTML(
        'beforeend',
        "<h2 class='end'>We're sorry, but you've reached the end of search results",
      );
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results");
    }
  }
}
