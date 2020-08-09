let input = document.querySelector('input');
let searchBtn = document.querySelector('.searchBtn');

searchBtn.addEventListener('click', (e) =>{
    let searchText = input.value;
    getMovies(searchText);
    e.preventDefault();
});

function getMovies(searchText){
    console.log(searchText)
    axios.get('http://www.omdbapi.com/?apikey=ce3c79b1&s='+searchText)
        .then((response) => {
            console.log(response)
            let movies = response.data.Search;
            let output = '';
            for(let i=0; i<movies.length; i++){
                let movie = movies[i];
                output += `
                    <div class="moviesCon">
                        <img src="${movie.Poster}"></img>
                            <div>
                                <h5>${movie.Title}</h5>
                            </div> 
                            <div>
                                <p>${movie.Type}</p>
                            </div>
                            <div>
                                <p>${movie.Year}</p>
                            </div>
                            <div>
                                <button onclick="movieSelected('${movie.imdbID}')">More details</button>
                            </div>
                    </div>     
                `;
            }
            document.querySelector('.movies').innerHTML = output;
        })
        .catch((err) => {
            console.log(err)
        })
}

let shadowCon = document.querySelector('.shadowCon');
shadowCon.addEventListener('click', function(){
    shadowCon.style.display = 'none'
});

function movieSelected(id){
    sessionStorage.setItem('movieId', id);
    let movieId = sessionStorage.getItem('movieId');
    shadowCon.style.display = 'flex'
    console.log(movieId)


    function getMovie(){
        let movieId = sessionStorage.getItem('movieId');
    
        axios.get('http://www.omdbapi.com/?apikey=ce3c79b1&i='+movieId)
            .then((response) => {
                console.log(response)
                let movie = response.data;

                let output = `
                    <div class="photoCon">
                        <img src="${movie.Poster}" alt="" class="singlePhoto">
                    </div>

                    <div class="plotCon">
                        <div class="headingCon">    
                            <h2 class="heading">${movie.Title}</h2> 
                        </div>

                        <div class="plot">${movie.Plot}</div>
                        <div class="genreCon"><p class="boldText">Genre: <span class="normalText">${movie.Genre}</span></p></div>

                        <div class="writtenByCon"><p class="boldText">Written by: <span class="normalText">${movie.Writer}</span></p></div>
                        <div class="directedByCon"><p class="boldText">Directed by: <span class="normalText">${movie.Director}</span></p></div>
                        <div class="starringCon"><p class="boldText">Starring: <span class="normalText">${movie.Actors}</span></p></div>
                        <div class="boxOfficeCon"><p class="boldText">Country: <span class="normalText">${movie.Country}</span></p></div>
                        <div class="awardsCon"><p class="boldText">Awards: <span class="normalText">${movie.Awards}</span></p></div>
                        <div class="metascoreCon"><p class="boldText">Metascore: <span class="normalText">${movie.Metascore}</span></p></div>
                        <div class="runtimeCon"><p class="boldText">Runtime: <span class="normalText">${movie.Runtime}</span></p></div>
                    </div>
                `;
                document.querySelector('.singleMovie').innerHTML = output;
            })
            .catch((err) => {
                console.log(err)
            })
    }
getMovie()
}