import React, { useEffect, useState } from 'react';
import './Main.css';
import './Sidebar.css';
import './App.css';
import './global.css';
import api from './services/api';
import DevForm from './components/DevForm';
import DevItem from './components/DevItem';
function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await api.get('devs');
      setDevs(response.data);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddDev = async data => {
    const response = await api.post('/dev', data);
    setDevs([...devs, response.data]);
  };

  return (
    <div id='App'>
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
