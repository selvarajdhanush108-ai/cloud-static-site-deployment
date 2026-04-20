import React from 'react';
import Home from './pages/Home';

function App() {
  return (
    <div className="flex flex-col flex-1 w-full relative">
      {/* Fixed backgrounds so they never interfere with the layout height */}
      <div className="fixed inset-0 bg-grid-pattern pointer-events-none z-0"></div>
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-white/5 blur-[120px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none z-0"></div>

      <div className="relative z-10 flex flex-col flex-1 w-full">
        <Home />
      </div>
    </div>
  );
}

export default App;