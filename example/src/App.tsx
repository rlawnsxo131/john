import { usePreservedCallback } from '@john/react';
import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  const addCount = usePreservedCallback(() => setCount((prev) => prev + 1));

  return (
    <div>
      <h1>hello world</h1>
      <button onClick={addCount}>add</button>
      {count}
    </div>
  );
}

export default App;
