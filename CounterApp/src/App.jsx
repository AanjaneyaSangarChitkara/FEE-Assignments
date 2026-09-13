import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const changeCount = (operation) => {
    if (operation === "add") setCount(count + 1);
    if (operation === "subtract") setCount(count - 1);
    if (operation === "multiply") setCount(count * 4);
    if (operation === "divide") setCount(count / 5);
    if (operation === "square") setCount(count * count);
    if (operation === "root") setCount(Math.sqrt(count));
    if (operation === "reset") setCount(0);
  };

  return (
    <div className="app">
      <h1>Counter</h1>
      <p className="subtitle">Simple number calculator</p>

      <div className="display">
        <span>{count}</span>
      </div>

      <div className="buttons">
        <button onClick={() => changeCount("add")}>+ Add</button>
        <button onClick={() => changeCount("subtract")}>− Subtract</button>
        <button onClick={() => changeCount("multiply")}>× 4</button>
        <button onClick={() => changeCount("divide")}>÷ 5</button>
        <button onClick={() => changeCount("square")}>x² Square</button>
        <button onClick={() => changeCount("root")}>√ Root</button>
      </div>

      <button className="reset" onClick={() => changeCount("reset")}>
        Reset Counter
      </button>
    </div>
  );
}

export default App;