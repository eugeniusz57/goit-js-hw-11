import {refs} from "./js/refs";
import Notiflix from 'notiflix';
import createCard from "./js/createCards";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import AP from "./js/classapi";
const debounce = require('debounce');
const API = new AP();

refs.form.addEventListener('submit', onSubmit);


function onSubmit(e) {
    e.preventDefault();
    
    API.query = e.currentTarget.elements.searchQuery.value.trim();
    console.log( API.query);
    if (!API.query) {
    Notiflix.Notify.failure('Enter search word');
    console.log("pusty");
        return;
    }
    clearContainer();
    API.resetPage();
    searchDate();
}

function onScroll(e) {
        if((window.scrollY + window.innerHeight + 0.5) >= document.documentElement.scrollHeight){
            addImageScroll();
            return;
        }
}

async function searchDate() {
try {

    const date = await API.fetchArticles();
    console.log("date", date);
    if(date.totalHits === 0){
            Notiflix.Notify.failure('We are sorry, but you have reached the end of search results.');
            refs.imgLoader.classList.add('hiden');
    }else{
        Notiflix.Notify.info(`Hooray! We found ${date.totalHits} images.`);
        createLists(date.hits);
        lightBox();
        checkAmountImages(date);    
        refs.imgLoader.classList.remove('hiden');
        console.log("LEv", date.hits.length);
        
        if(date.hits.length < 40){
            refs.imgLoader.classList.add('hiden');
            return;
        }
        window.addEventListener('scroll', onScroll);
    }   

} catch (error) {
    console.log(error);
}
    
}



async function addImageScroll() {
try {

    const date = await API.fetchArticles();
   
    createLists(date.hits);
    console.log("datescroll =", date);
    checkAmountImages(date);
    lightBox();
} catch (error) {
    console.log(error);
}
}

function lightBox() {
    let lightbox = new SimpleLightbox('.gallery a');
    lightbox.refresh();
}

function checkAmountImages(params) {
    let amountImage = refs.card.children.length

    console.log("div", amountImage);
    console.log("tot", params.totalHits);
    if (amountImage >= params.totalHits) {
        refs.imgLoader.classList.add('hiden');
        refs.btnInfo.classList.remove('hiden'); 
        window.removeEventListener('scroll', onScroll);
    }

}

function clearContainer(){
    window.removeEventListener('scroll', onScroll);
    refs.card.innerHTML = '';
    refs.imgLoader.classList.add('hiden');
    refs.btnInfo.classList.add('hiden');
    
}

function createLists(params) {
    
    refs.card.insertAdjacentHTML("beforeend", createCard(params));
    
}

