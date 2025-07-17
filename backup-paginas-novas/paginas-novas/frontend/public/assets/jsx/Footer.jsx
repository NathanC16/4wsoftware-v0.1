import React from 'react';

export default function Footer() {
  return (
    
    <footer className="sticky-footer bg-white">
      <div className="container my-auto">
        <div className="copyright text-center my-auto">
          <span>Copyright &copy; Ecossistema Energia {new Date().getFullYear()}</span>
        </div>
      </div>
      <span>
       &copy; {new Date().getFullYear()} <a href="https://4wenergia.com.br" target="_blank" rel="noopener noreferrer">Ecossistema Energia</a>
      </span>

    </footer>
  );
}
