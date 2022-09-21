export default function createCards (arrey){
    return arrey.map( arr => `
    <div class="photo-card">
        <a class= "link" href="${arr.largeImageURL}">
        <img src="${arr.webformatURL}" alt="${arr.tags}" loading="lazy" />
        </a>
        <div class="info">
            <p class="info-item">
            <b>Likes <br> ${arr.likes}</b>
            </p>
            <p class="info-item">
            <b>Views  <br>${arr.views}</b>
            </p>
            <p class="info-item">
            <b>Comments <br> ${arr.comments}</b>
            </p>
            <p class="info-item">
            <b>Downloads <br> ${arr.downloads}</b>
            </p>
        </div>
    </div>`).join('');
}

