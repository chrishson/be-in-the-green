import './App.css';
import { ExpenseCard } from './components/ExpenseCard';

function App() {
  return (
    <div className="container">
    <head>
        <title>Spend Stream</title>
        <meta name="description" content="Spend Stream"/>
    </head>

    <header>
        Temporary Header
    </header>

    <main className="main">
        <ExpenseCard/>
    </main>

</div>
  );
}

export default App;
