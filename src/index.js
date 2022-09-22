
import refs from "./js/refs";
import Notiflix from 'notiflix';
import createCard from "./js/createCards";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import AP from "./js/classapi";

const API = new AP();

let throttle = require('lodash.throttle');

refs.form.addEventListener('submit', onSubmit);
window.addEventListener('scroll', throttle(onScroll, 300));
refs.imgLoader.classList.add('hiden');





function onSubmit(e) {
e.preventDefault();
clearList();
API.query = e.currentTarget.elements.searchQuery.value;
API.resetPage();
API.fetchArticles().then(r => {
    if(r.totalHits === 0){
        Notiflix.Notify.failure('We are sorry, but you have reached the end of search results.');
        refs.imgLoader.classList.add('hiden');
        return;
    }

    Notiflix.Notify.info(`Hooray! We found ${r.totalHits} images.`);
    refs.imgLoader.classList.remove('hiden')
    createLists(r.hits)
    const lightbox = new SimpleLightbox('.photo-card a');
})
}


function onScroll() {
  
        const docRect = document.documentElement.getBoundingClientRect()
        if(docRect.bottom <= document.documentElement.clientHeight + 50){
            API.fetchArticles().then(r => {
                createLists(r.hits);
                const lightbox = new SimpleLightbox('.photo-card a');
                let amountImage = refs.card.children.length

                lightbox.refresh();
                console.log(amountImage);
                if (amountImage === r.totalHits) {
                    refs.imgLoader.classList.add('hiden')
                    Notiflix.Notify.info(`We're sorry, but you've reached the end of search results`);
                }

            })
            .catch(error => console.log(error));
        }
        }

function clearList() {
    refs.card.innerHTML = '';
}

function createLists(params) {
    const list = createCard(params);
    refs.card.insertAdjacentHTML("beforeend", list);

}


// function scrollSmooth() {
//     const { height: cardHeight } = document.querySelector(".gallery").firstElementChild.clientHeight();

// window.scrollBy({
//   top: cardHeight,
//   behavior: "smooth"
// });
// }