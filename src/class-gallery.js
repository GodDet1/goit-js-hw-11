import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

export default class IMAGE_GALLERY {
  constructor() {
    this.form = document.querySelector('#search-form');

    this.imageGallery = document.querySelector('#gallery');
    this.endContainer = document.querySelector('.end-container');
    this.nextBtn = document.querySelector('.next-btn');

    this.search = 'cat';
    this.galleryPageNumber = 1;
    this.lastPage = 17;

    this.gallery = new SimpleLightbox('.gallery a');
    this.gallery.on('show.simplelightbox');

    this.form.addEventListener('submit', this.onSubmit.bind(this));

    this.nextBtn.addEventListener('click', this.onClick.bind(this));
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

    this.zeroImages(rendercards);
    this.thirtyImg(rendercards);
    this.toThirtyImages(rendercards);

    if (rendercards !== undefined && rendercards.hits.length !== 0) {
      Notiflix.Notify.success(`Hooray! We found ${rendercards.totalHits} totalHits images.`);
    }
  }

  async onClick() {
    this.galleryPageNumber += 1;

    if (this.galleryPageNumber === this.lastPage) {
      this.endContainer.insertAdjacentHTML(
        'beforeend',
        "<h2 class='end'>We're sorry, but you've reached the end of search results",
      );

      const data = await this.fetchImg(this.search, this.galleryPageNumber);

      this.nextBtn.classList.add('visually-hidden');
    } else {
      const data = await this.fetchImg(this.search, this.galleryPageNumber);
      this.thirtyImg(data);
      this.toThirtyImages(data);
    }
  }

  async fetchImg() {
    try {
      const urlToFetch = this.url();
      const { data } = await axios.get(urlToFetch);

      this.render(data);
      this.gallery.refresh();

      return data;
    } catch {
      return undefined;
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

  zeroImages(images) {
    if (images.hits.length === 0) {
      this.nextBtn.classList.add('visually-hidden');
      Notiflix.Notify.failure('No image with this name!');
    }
  }

  toThirtyImages(images) {
    if (images.hits.length < 30 && images.hits.length > 0) {
      this.nextBtn.classList.add('visually-hidden');
      this.endContainer.insertAdjacentHTML(
        'beforeend',
        "<h2 class='end'>We're sorry, but you've reached the end of search results",
      );
      Notiflix.Notify.warning("We're sorry, but you've reached the end of search results");
    }
  }

  thirtyImg(images) {
    if (images.hits.length === 30) {
      this.nextBtn.classList.remove('visually-hidden');
    }
  }
}
