// server.js
const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/pokemonData', async (req, res) => {
  try {
    // Utilisation de l'importation dynamique
    const PokedexModule = await import('pokedex-promise-v2');
    const Pokedex = PokedexModule.default;
    const P = new Pokedex();

    const [pikachuData, bulbasaurData] = await Promise.all([
      P.getPokemonByName('pikachu'),
      P.getPokemonByName('bulbasaur')
    ]);

    const pikachu = {
      name: pikachuData.name,
      type: pikachuData.types[0].type.name,
      stats: pikachuData.stats[0].base_stat,
      health: 100
    };

    const bulbasaur = {
      name: bulbasaurData.name,
      type: bulbasaurData.types[0].type.name,
      stats: bulbasaurData.stats[0].base_stat,
      health: 100
    };

    res.json({ pikachu, bulbasaur });
  } catch (error) {
    console.error('Erreur lors de la récupération des Pokémon', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des Pokémon' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
