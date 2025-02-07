import React from 'react';
import Link from "next/link";

export default function Home() {
  return (
    <div className="container mt-5">
      <h1>Bem-vindo ao Sistema TeleSaúde Municipal!</h1>
      <p>Escolha uma das opções abaixo para acessar o sistema:</p>

      <div className="d-flex flex-column">
        <button className="btn btn-primary mb-3">
          <Link href="/login" style={{ color: 'white', textDecoration: 'none' }}>
            Login do Profissional de Saúde
          </Link>
        </button>

        <div className="d-flex flex-column mb-3">
          <button className="btn btn-secondary mb-2">
            <Link href="/recepcao" style={{ color: 'white', textDecoration: 'none' }}>
              Recepção ao Paciente
            </Link>
          </button>
          <button className="btn btn-secondary mb-2">
            <Link href="/triagem" style={{ color: 'white', textDecoration: 'none' }}>
              Triagem do Paciente
            </Link>
          </button>
          <button className="btn btn-secondary mb-2">
            <Link href="/medico" style={{ color: 'white', textDecoration: 'none' }}>
              Página do Médico
            </Link>
          </button>
        </div>

        <button className="btn btn-info mb-3">
          <Link href="/telemedicina" style={{ color: 'white', textDecoration: 'none' }}>
            Telemedicina e Atendimento
          </Link>
        </button>

        <button className="btn btn-warning mb-3">
          <Link href="/ordem-chegada" style={{ color: 'white', textDecoration: 'none' }}>
            Ordem de Chegada e Chamamento
          </Link>
        </button>

        <button className="btn btn-success mb-3">
          <Link href="/banco-dados" style={{ color: 'white', textDecoration: 'none' }}>
            Banco de Dados Médico
          </Link>
        </button>

        <button className="btn btn-danger mb-3">
          <Link href="/relatorios" style={{ color: 'white', textDecoration: 'none' }}>
            Relatórios e Gestão
          </Link>
        </button>

        <button className="btn btn-light mb-3">
          <Link href="/suporte" style={{ color: 'black', textDecoration: 'none' }}>
            Suporte e Ajuda
          </Link>
        </button>
      </div>
    </div>
  );
}
