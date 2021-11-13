const biblioList = document.getElementById('biblioList');
const searchBar = document.getElementById('searchBar');
let dataBib = [];

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredCharacters = dataBib.filter((biblio) => {
        return (
            biblio.biblioteca.toLowerCase().includes(searchString)
        );
    });
    displayCharacters(filteredCharacters);
});

const loadCharacters = async () => {
    try {
        const res = await fetch('https://web-dgbsdi-default-rtdb.firebaseio.com/1-MwxFwmUlTdCp1ziE09ZeYpbNWjOqbWqVj5hKdGFTLE/horarios.json');
        dataBib = await res.json();
        console.log(dataBib)
        displayCharacters(dataBib);
    } catch (err) {
        console.error(err);
    }
};

const displayCharacters = (bibliotecas) => {
    const htmlString = bibliotecas
        .map((biblio) => {
            return `
            <li class="biblio">
                <h2>${biblio.biblioteca}</h2> 
                <p>${biblio.dias} ${biblio.horario} </br>
                ${biblio.extensión} </br> <span> ${biblio.correo} </span></p>
                <img src="${biblio.imagen}"></img>
            </li>
        `;
        })
        .join('');
    biblioList.innerHTML = htmlString;
};

loadCharacters();
