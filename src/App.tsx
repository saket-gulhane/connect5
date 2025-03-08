import GameGrid from './component/GameGrid';
import './App.css';

function App() {
  return (
    <div style={{ margin: 'auto' }}>
      <h2>Connect 5</h2>
      <div>
        <GameGrid />
      </div>
    </div>
  );
}

export default App;
