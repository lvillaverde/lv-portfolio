import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import StudyCaseDetailNextchange from './components/StudyCaseDetailNextchange';
import StudyCaseDetailEdden from './components/StudyCaseDetailEdden';
import StudyCaseDetailMeSirve from './components/StudyCaseDetailMeSirve';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/portfolio/" element={<Home />} />
        <Route path="/portfolio/One-Month-Big-Changes-Ux-Ui-And-Design-System" element={<StudyCaseDetailNextchange />} />
        <Route path="/portfolio/Design-Thinking-in-Action-Creating-a-SaaS-EdTech-App" element={<StudyCaseDetailEdden />} />
        <Route path="/portfolio/From-Hypothesis-to-Product-A-Lean-UX-Journey-in-the-Argentine-Market" element={<StudyCaseDetailMeSirve />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;