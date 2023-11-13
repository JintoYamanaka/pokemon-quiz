import React, { useState } from 'react';

interface Pokemon {
  name: string;
  height: number;
  weight: number;
}

const PokemonQuiz: React.FC = () => {
  const [currentPokemon, setCurrentPokemon] = useState<Pokemon | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [userGuess, setUserGuess] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [quizStarted, setQuizStarted] = useState<boolean>(false);
  const [quizComplete, setQuizComplete] = useState<boolean>(false);

  const fetchPokemon = async () => {
    const randomId = Math.floor(Math.random() * 898) + 1; // PokeAPI has data for pokemon IDs 1-898
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
    const data = await response.json();
    setCurrentPokemon({
      name: data.name,
      height: data.height,
      weight: data.weight,
    });
  };

  const startQuiz = () => {
    setQuizStarted(true);
    setQuizComplete(false);
    setCurrentQuestion(0);
    fetchPokemon();
  };

  const nextQuestion = () => {
    if (currentQuestion < 9) {
      fetchPokemon();
      setCurrentQuestion(currentQuestion + 1);
      setIsCorrect(null);
      setUserGuess('');
    } else {
      setQuizComplete(true);
    }
  };

  const checkAnswer = () => {
    if (currentPokemon) {
      const isAnswerCorrect = userGuess.toLowerCase() === currentPokemon.name.toLowerCase();
      setIsCorrect(isAnswerCorrect);

      if (!isAnswerCorrect || currentQuestion === 9) {
        setTimeout(() => {
          nextQuestion();
        }, 2000); // Wait for 2 seconds before going to next question or ending the quiz
      }
    }
  };

  return (
    <div>
      <h2>ポケモンクイズ</h2>
      {!quizStarted ? (
        <button onClick={startQuiz}>クイズをはじめる</button>
      ) : quizComplete ? (
        <p>クイズ終了！</p>
      ) : (
        currentPokemon && (
          <>
            <p>質問 {currentQuestion + 1} / 10</p>
            <p>身長: {currentPokemon.height * 10} cm</p>
            <p>体重: {currentPokemon.weight / 10} kg</p>
            <input
              type="text"
              value={userGuess}
              onChange={(e) => setUserGuess(e.target.value)}
              placeholder="ポケモンの名前を入力"
            />
            <button onClick={checkAnswer}>答え合わせ</button>
            {isCorrect !== null && (
              <p>{isCorrect ? '正解です！' : '不正解です。次の問題に進みます...'}</p>
            )}
          </>
        )
      )}
    </div>
  );
};

export default PokemonQuiz;
