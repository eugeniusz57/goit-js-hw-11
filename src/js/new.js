import './css/styles.css';

import Notiflix from 'notiflix';

import { refs } from './js/refs';
import { fetchPhotos} from './js/fetchPhotos';
import { createMarkup, refreshSimpleBox } from './js/createMarkup';
import activeScroll from './js/scrollBtn';

const oldValue = [];
let countPage = 0;

const handleForm = async e => {
e.preventDefault();
if (refs.input.value.trim() === '') {
Notiflix.Notify.info('Enter something..')
return;
}
if (refs.input.value.trim() === oldValue[0]) {
Notiflix.Notify.info('Enter something new..');
return;
} else {
clearContainer()
oldValue.push(refs.input.value);
countPage += 1;
try {
const resp = await fetchPhotos(countPage);
if (resp.data.hits.length === 0) {
Notiflix.Notify.info('Sorry, there are no images matching your search query. Please try again.');
refs.scrollBtn.classList.add('is-hidden');
refs.loadingBtn.classList.add('is-hidden');
} else {
Notiflix.Notify.success(`Hooray! We found ${resp.data.totalHits} images.`);
createMarkup(resp);
if (resp.data.hits.length !== 40) {
return
} else {
window.addEventListener('scroll', checkCoordinates);
}
}
} catch (error) {
console.log(error.message);
Notiflix.Notify.failure("Something went wrong, please reload the page.");
return;
}
}
}

refs.form.addEventListener('submit', handleForm);

const checkCoordinates =() => {
const documentRect = document.documentElement.getBoundingClientRect();
const clientHeight = document.documentElement.clientHeight;
if (documentRect.bottom <= clientHeight + 0.5) {
updateGallery();
activeScroll();
}
}

const updateGallery = async () => {
countPage += 1;
try {
const resp = await fetchPhotos(countPage)
createMarkup(resp);
window.addEventListener('click', refreshSimpleBox)
} catch (error) {
console.log(error.message);
Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
refs.loadingBtn.classList.add('is-hidden');
return;
}
}

const clearContainer = () =>{
countPage = 0;
refs.galleryContainer.innerHTML = '';
window.removeEventListener('scroll', checkCoordinates);
window.removeEventListener('click', refreshSimpleBox)
oldValue.shift();
}