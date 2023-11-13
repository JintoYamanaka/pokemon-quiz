/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';

type Pokemon = {
    name: string;
    height: number;
    weight: number;
};

const quizStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
`;

const questionStyle = css`
  margin: 1rem;
  font-size: 1.2rem;
`;

const inputStyle = css`
  margin: 1rem;
  padding: 0.5rem;
  font-size: 1rem;
`;

const buttonStyle = css`
  background-color: #007bff;
  color: white;
  padding: 0.5rem 1rem;
  margin: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    background-color: #0056b3;
  }
`;

const resultStyle = css`
  margin: 1rem;
  font-size: 1.2rem;
  color: #ff4136;
`;

const PokemonQuiz = () => {
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
    <div css={quizStyle}>
      <h2>ポケモンクイズ</h2>
      {!quizStarted ? (
        <button css={buttonStyle} onClick={startQuiz}>クイズをはじめる</button>
      ) : quizComplete ? (
        <p css={resultStyle}>クイズ終了！</p>
      ) : (
        currentPokemon && (
          <>
            <p css={questionStyle}>質問 {currentQuestion + 1} / 10</p>
            <p>身長: {currentPokemon.height * 10} cm</p>
            <p>体重: {currentPokemon.weight / 10} kg</p>
            <input
              css={inputStyle}
              type="text"
              value={userGuess}
              onChange={(e) => setUserGuess(e.target.value)}
              placeholder="ポケモンの名前を入力"
            />
            <button css={buttonStyle} onClick={checkAnswer}>答え合わせ</button>
            {isCorrect !== null && (
              <p css={resultStyle}>{isCorrect ? '正解です！' : '不正解です。次の問題に進みます...'}</p>
            )}
          </>
        )
      )}
    </div>
  );
};

export default PokemonQuiz;
