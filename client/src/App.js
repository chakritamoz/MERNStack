import { BrowserRouter, Routes, Route } from 'react-router-dom';

// components
import FromProduct from './components/FromProduct';
import FromEditProduct from './components/FromEditProduct';

function App() {
  return (
    <>
      <h1>From CRUD</h1>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <FromProduct /> }/>
          <Route path='/edit/:id' element={ <FromEditProduct /> }/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
