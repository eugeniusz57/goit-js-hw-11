const url ='https://pixabay.com/api/';
const key = '29990165-8c350ed327b5f0dec080b7ac6';
const image_type = "photo";
const orientation = "horizontal";
const safesearch = "true";
const per_page = 40;

export default class API {
    constructor(){
        this.searchQuery = '';
        this.page = 1;
    }

    async fetchArticles(){
const URL = `${url}?key=${key}&page=${this.page}&per_page=${per_page}&q=${this.searchQuery}&image_type =${image_type}&orientation=${orientation}&safesearch=${safesearch}`;
// .then(r => r.json()).then(date => {
//     this.incrementPage();
//     return date
// });

    const response = await fetch(URL);
    const arrays = await response.json();
    this.incrementPage();
    return arrays;
}

incrementPage(){
    this.page +=1;
}

resetPage(){
        this.page = 1;
    }

get query(){
    return this.searchQuery;
}

set query(newName){
        this.searchQuery = newName;
    }

}