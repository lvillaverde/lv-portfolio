import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import StudyCaseDetailNextchange from './components/StudyCaseDetailNextchange';
import StudyCaseDetailEdden from './components/StudyCaseDetailEdden';
import StudyCaseDetailMeSirve from './components/StudyCaseDetailMeSirve';
import ScrollToTop from './components/ScrollToTop';


function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/One-Month-Big-Changes-Ux-Ui-And-Design-System" element={<StudyCaseDetailNextchange />} />
        <Route path="/Design-Thinking-in-Action-Creating-a-SaaS-EdTech-App" element={<StudyCaseDetailEdden />} />
        <Route path="/From-Hypothesis-to-Product-A-Lean-UX-Journey-in-the-Argentine-Market" element={<StudyCaseDetailMeSirve />} />
      </Routes>
    </HashRouter>
  );
};

export default App;