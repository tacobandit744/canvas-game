
import Canvas from './components/Canvas';

function App(props: {width: number, height: number}) {
  return (
    <div className="App">
      <header className="App-header">
        <Canvas width={props.width} height={props.height} />
      </header>
    </div>
  );
}

export default App;
