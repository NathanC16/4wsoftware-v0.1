import { BrowserRouter } from 'react-router-dom';
import Rotas from '@/routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <>
        <Rotas />
        <ToastContainer />
      </>
    </BrowserRouter>
  );
}

export default App;
