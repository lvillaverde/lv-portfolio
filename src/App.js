import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import StudyCaseDetail from './components/StudyCaseDetail';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/studyCase" element={<StudyCaseDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;