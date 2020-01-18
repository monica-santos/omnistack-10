import React, { useState, useEffect } from 'react';

export default function DevForm({ onSubmit }) {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [github_username, setGithub_username] = useState('');
  const [techs, setTechs] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      },
      err => {
        console.log(err);
      },
      {
        timeout: 30000
      }
    );
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    await onSubmit({ github_username, techs, latitude, longitude });

    setGithub_username('');
    setTechs('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='input-block'>
        <label htmlFor='github_username'>Usuário do GitHub</label>
        <input
          type='text'
          value={github_username}
          onChange={e => setGithub_username(e.target.value)}
          name='github_username'
          id='github_username'
          required
        />
      </div>

      <div className='input-block'>
        <label htmlFor='techs'>Tecnologias</label>
        <input
          type='text'
          value={techs}
          onChange={e => setTechs(e.target.value)}
          name='techs'
          id='techs'
          required
        />
      </div>

      <div className='input-group'>
        <div className='input-block'>
          <label htmlFor='latitude'>Latitude</label>
          <input
            type='number'
            value={latitude}
            onChange={e => setLatitude(e.target.value)}
            name='latitude'
            id='latitude'
            required
          />
        </div>
        <div className='input-block'>
          <label htmlFor='longitude'>Longitude</label>
          <input
            type='number'
            value={longitude}
            onChange={e => setLongitude(e.target.value)}
            name='longitude'
            id='longitude'
            required
          />
        </div>
      </div>
      <button type='submit'>Salvar</button>
    </form>
  );
}
