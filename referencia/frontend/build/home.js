// import React from 'react';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section id="hero" className="d-flex align-items-center">
        <div className="container text-center position-relative">
          <h1>Soluções em Energia Solar Inteligente</h1>
          <h2>Eficiência, sustentabilidade e inovação para seu projeto</h2>
          <a href="#about" className="btn-get-started scrollto">Comece Agora</a>
        </div>
      </section>

      {/* Sobre Nós */}
      <section id="about" className="about">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <img src="/solartec-assets/img/about.jpg" className="img-fluid" alt="Sobre a Solartec" />
            </div>
            <div className="col-lg-6 pt-4 pt-lg-0 content">
              <h3>Por que escolher a Solartec?</h3>
              <p className="fst-italic">
                Nossa missão é entregar soluções completas e acessíveis em energia limpa.
              </p>
              <ul>
                <li><i className="bi bi-check-circle"></i> Projetos personalizados.</li>
                <li><i className="bi bi-check-circle"></i> Instalação e suporte técnico especializado.</li>
                <li><i className="bi bi-check-circle"></i> Monitoramento remoto e economia garantida.</li>
              </ul>
              <p>Estamos prontos para te ajudar a transformar sua fonte de energia.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Outros blocos podem ser adicionados aqui */}
    </div>
  );
}
