
import {refs} from "./js/refs";
import Notiflix from 'notiflix';
import createCard from "./js/createCards";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import AP from "./js/classapi";

const API = new AP();

let throttle = require('lodash.throttle');
refs.imgLoader.classList.add('hiden');
refs.btnInfo.classList.add('hiden');
refs.form.addEventListener('submit', onSubmit);
window.addEventListener('scroll', throttle(onScroll, 300));



function onSubmit(e) {
    e.preventDefault();
    clearList();
    API.query = e.currentTarget.elements.searchQuery.value;
    API.resetPage();
    searchDate();
}

function onScroll() {
        const docRect = document.documentElement.getBoundingClientRect();

        if(docRect.bottom <= document.documentElement.clientHeight + 50){
            addImageScroll()
        }
}

async function searchDate() {
try {
    const date = await API.fetchArticles();
    if(date.totalHits === 0){
            Notiflix.Notify.failure('We are sorry, but you have reached the end of search results.');
            refs.imgLoader.classList.add('hiden');
            return;
    }
    
        Notiflix.Notify.info(`Hooray! We found ${date.totalHits} images.`);
        refs.imgLoader.classList.remove('hiden')
        createLists(date.hits)
        lightBox();
       
        checkAmountImages(date);
} catch (error) {
    console.log(error);
}
    
}

async function addImageScroll() {
try {
    const date = await API.fetchArticles();
    createLists(date.hits)
        lightBox();
        checkAmountImages(date);
} catch (error) {
    console.log(error);
}
}

function lightBox() {
    const lightbox = new SimpleLightbox('.photo-card a');
    lightbox.refresh();
}

function checkAmountImages(params) {
    let amountImage = refs.card.children.length

    console.log("div", amountImage);
    console.log("tot", params.totalHits);
    if (amountImage >= params.totalHits) {
        refs.imgLoader.classList.add('hiden')
        refs.btnInfo.classList.remove('hiden')
        return;
    }
}

function clearList() {
    refs.card.innerHTML = '';
}

function createLists(params) {
    const list = createCard(params);
    refs.card.insertAdjacentHTML("beforeend", list);
    
}