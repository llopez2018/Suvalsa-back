import React from 'react';
import CardNavigate from '../../componentes/Cards/CardNavigate';
import Dashboard from './Dashboard.Form';

const Inicio = () => {

  return (
    <CardNavigate title='Dashboard Principal' >
      <Dashboard />
    </CardNavigate>
  );
};

export default Inicio;
