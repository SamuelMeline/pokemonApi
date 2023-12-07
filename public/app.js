document.addEventListener("DOMContentLoaded", async () => {
	try {
		const response = await fetch("/pokemonData");
		const { pikachu, bulbasaur } = await response.json();

		document.getElementById("pokemon1").innerHTML = `
      <h2>${pikachu.name}</h2>
      <p>Type: ${pikachu.type}</p>
      <p>Stats: ${pikachu.stats}</p>
      <p>Health: ${pikachu.health}</p>
    `;

		document.getElementById("pokemon2").innerHTML = `
      <h2>${bulbasaur.name}</h2>
      <p>Type: ${bulbasaur.type}</p>
      <p>Stats: ${bulbasaur.stats}</p>
      <p>Health: ${bulbasaur.health}</p>
    `;

		// Événement pour déclencher le combat
		document
			.getElementById("start-battle-btn")
			.addEventListener("click", () => {
				startBattle(pikachu, bulbasaur);
			});
	} catch (error) {
		console.error(
			"Erreur lors de la récupération des données Pokémon",
			error
		);
	}
});

function startBattle(pokemon1, pokemon2) {
	const battleLog = document.getElementById("battle-log");
	battleLog.innerHTML = ""; // Réinitialisez le journal de combat

	// Continuez les tours du combat jusqu'à ce qu'un Pokémon n'ait plus de points de vie
	while (pokemon1.health > 0 && pokemon2.health > 0) {
		// Pokémon 1 attaque Pokémon 2
		pokemonAttack(pokemon1, pokemon2);
		// Vérifiez si Pokémon 2 a encore des points de vie après l'attaque
		if (pokemon2.health > 0) {
			// Pokémon 2 attaque Pokémon 1
			pokemonAttack(pokemon2, pokemon1);
		}
	}

	// Affichez le vainqueur à la fin du combat
	const winner = pokemon1.health > 0 ? pokemon1 : pokemon2;
	battleLog.innerHTML += `<p>${winner.name} remporte le combat !</p>`;
}

// Fonction pour simuler une attaque de Pokémon
function pokemonAttack(attacker, defender) {
	const battleLog = document.getElementById("battle-log");
	const baseDamage = Math.floor(Math.random() * 10) + 1; // Dégâts de base aléatoires
	const damage = calculateDamage(attacker.stats, defender.stats, baseDamage);
	defender.health -= damage;

	battleLog.innerHTML += `<p>${attacker.name} attaque ${defender.name} et lui inflige ${damage} dégâts. ${defender.name} a maintenant ${defender.health} points de vie.</p>`;
}

// Fonction pour calculer les dégâts en fonction des statistiques
function calculateDamage(attackerStats, defenderStats, baseDamage) {
	// Utilisez les statistiques pour ajuster les dégâts
	const attackModifier = attackerStats / 10; // Vous pouvez ajuster ce coefficient en fonction de vos besoins
	const defenseModifier = defenderStats / 10; // Vous pouvez ajuster ce coefficient en fonction de vos besoins

	const damage = Math.floor((baseDamage * attackModifier) / defenseModifier);

  const increasedDamage = damage * 4;

  return increasedDamage;
}
