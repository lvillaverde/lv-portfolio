import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import StudyCaseDetailNextchange from './components/StudyCaseDetailNextchange';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/study-case/one-month-big-changes-ux-ui-and-design-system" element={<StudyCaseDetailNextchange />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;