import "./App.css";
import Pomodoro from "./components/Pomodoro/Pomodoro";
import BreakContent from "./components/BreakContent/BreakContent";

function App() {
  return (
    <div className="app-container">
      <div className="work-content">
        <Pomodoro />
      </div>
      <div className="break-content">
        <BreakContent />
      </div>
    </div>
  );
}

export default App;
