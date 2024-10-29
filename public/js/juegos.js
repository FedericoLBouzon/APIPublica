async function cargarAlumnos() {
    try {
        const response = await fetch('https://public-api-ashy-two.vercel.app/');
        const data = await response.json();

        mostrarJuegos(data);

        // Filtrar dinámicamente por la primera letra del título
        document.getElementById('filter-id').addEventListener('input', () => {
            const filterLetter = document.getElementById('filter-id').value.toLowerCase();
            const juegosFiltrados = data.filter(game => game.title.toLowerCase().startsWith(filterLetter));
            mostrarJuegos(juegosFiltrados);
        });

        // Limpiar filtro
        document.getElementById('clear-filter').addEventListener('click', () => {
            document.getElementById('filter-id').value = '';
            mostrarJuegos(data);
        });

    } catch (error) {
        console.error("Error al obtener los juegos", error);
    }
}

function mostrarJuegos(games) {
    const gamesContainer = document.getElementById('games-container');
    gamesContainer.innerHTML = ''; // Limpiar juegos previos

    games.forEach(game => {
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
            <img src="${game.thumbnail}" alt="${game.title}">
            <h2>${game.title}</h2>
            <p>${game.short_description}</p>
            <a href="${game.game_url}" target="_blank">Ver juego</a>
            <button class="delete-button">Eliminar</button>
        `;

        // Eliminar el juego de la vista
        card.querySelector('.delete-button').addEventListener('click', () => {
            card.remove();
        });

        gamesContainer.appendChild(card);
    });
}

cargarAlumnos();
