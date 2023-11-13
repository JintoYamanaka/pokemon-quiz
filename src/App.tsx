import Header from './components/Header';
import Footer from './components/Footer';
import PokemonQuiz from './PokemonQuiz';

const App = () => {
  return (
    <>
      <Header />
      <main>
        <PokemonQuiz />
      </main>
      <Footer />
    </>
  );
};

export default App;
