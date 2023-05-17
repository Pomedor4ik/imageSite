const searchInput = document.querySelector('.search-input')
const searchBtn = document.querySelector ('.search-btn')
const gallery = document.querySelector('.gallery')
const btnLoadMore = document.querySelector('.loadMore')

const apiKey = '36456844-6f56ba9a1b98b67084965e6a5'
const url = 'https://pixabay.com/api'

const renderImgCards = (imgStore) => { 
    imgStore.forEach(imgCard => {
        gallery.innerHTML += `
        <div class="photo-card" card-id="${imgCard.id}">
            <img src="${imgCard.largeImageURL}" class="photo-img" alt="${imgCard.tags}">
            <ul class="photo-static">
                <li class="photo-static-item">
                    <p class="photo-param">views</p>
                    <p class="photo-text">${imgCard.views}</p>
                </li>
                <li class="photo-static-item">
                    <p class="photo-param">downloads</p>
                    <p class="photo-text">${imgCard.downloads}</p>
                </li>
                <li class="photo-static-item">
                    <p class="photo-param">likes</p>
                    <p class="photo-text">${imgCard.likes}</p>
                </li>
                <li class="photo-static-item">
                    <p class="photo-param">comments</p>
                    <p class="photo-text">${imgCard.comments}</p>
                </li>
            </ul>
        </div>
        `
    });
}

searchBtn.addEventListener('click', () => { 
    const searchText = searchInput.value
    console.log(searchText)
    if (searchText.length > 0){
        localStorage.setItem('search', searchText)
        localStorage.setItem('page', 1)
        btnLoadMore.style.display = 'block'
        let fullUrl = `${url}/?key=${apiKey}&orientation=horizontal&per_page=20`
        axios.get(`${fullUrl}&page=1&q=${searchText}`)
            .then((res)=> {
                renderImgCards(res.data.hits)
            })
    } else { 
        alert('Please enter some text')
    }
    searchInput.value = ''   
})

btnLoadMore.addEventListener('click', () => {
    let searchText = localStorage.getItem('search')
    let page = parseInt(localStorage.getItem('page'))
    page += 1
    localStorage.setItem('page', page)
    let fullUrl = `${url}/?key=${apiKey}&orientation=horizontal&per_page=20`
    axios.get(`${fullUrl}&page=${page}&q=${searchText}`)
        .then((res)=> {
            renderImgCards(res.data.hits)
        })
})