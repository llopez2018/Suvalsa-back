import React from 'react';
import '../../Estilos/EtiquetaPagina.css';

const EtiquetaPagina= (props) =>{

  const{texto} = props;
  return(
    <section className='border-b-2 border-neutral-100 px-4 dark:border-neutral-600 dark:text-neutral-50'>
      <h2 className='EtiquetaPaginaEstilo'>{texto}</h2>
    </section>
    
  )
}

export default EtiquetaPagina;