import { useState, useEffect } from 'react';

interface Pokemon {
  name: string;
  height: number;
  weight: number;
}

const PokemonQuiz = () => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [userGuess, setUserGuess] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      const randomId = Math.floor(Math.random() * 898) + 1; // PokeAPI has data for pokemon IDs 1-898
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      const data = await response.json();
      setPokemon({
        name: data.name,
        height: data.height,
        weight: data.weight
      });
    };

    fetchPokemon();
  }, []);

  const checkAnswer = () => {
    if (pokemon) {
      setIsCorrect(userGuess.toLowerCase() === pokemon.name.toLowerCase());
    }
  };

  return (
    <div>
      <h2>ポケモンクイズ</h2>
      {pokemon && (
        <>
          <p>身長: {pokemon.height * 10} cm</p>
          <p>体重: {pokemon.weight / 10} kg</p>
          <input
            type="text"
            value={userGuess}
            onChange={(e) => setUserGuess(e.target.value)}
            placeholder="ポケモンの名前を入力"
          />
          <button onClick={checkAnswer}>答え合わせ</button>
          {isCorrect !== null && (
            <p>{isCorrect ? '正解です！' : '残念、不正解です。'}</p>
          )}
        </>
      )}
    </div>
  );
};

export default PokemonQuiz;
