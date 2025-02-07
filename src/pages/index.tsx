import React from 'react';
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="container d-flex flex-column align-items-center justify-content-center" style={{ marginTop: "5rem" }}>
      <div className="row w-100 d-flex align-items-center mb-5">
        {/* Texto e Botão */}
        <div className="col-md-6 text-center text-md-start">
          <h1 className="display-4 fw-bold">Bem-vindo ao Sistema TeleSaúde Municipal!</h1>
          <p className="lead text-secondary">Acesse consultas, exames e receba orientações médicas diretamente de sua casa.</p>
          <Link href="/telemedicina" className="btn btn-lg shadow-sm mt-3" style={{backgroundColor: "#9453a2", color:"white"}}>Acessar Atendimento</Link>
        </div>
        {/* Imagem Principal */}
        <div className="col-md-6 d-flex justify-content-center">
          <Image src="/img1.jpg" alt="Imagem TeleSaúde" width={500} height={300} className="img-fluid rounded shadow" />
        </div>
      </div>

      {/* Seção Informativa */}
      <div className="row text-center mt-5">
        <h2 className="display-5 fw-semibold text-dark">Por que escolher o TeleSaúde?</h2>
        <p className="fs-5 text-muted px-5">O TeleSaúde Municipal oferece um atendimento rápido, acessível e eficiente para todos os cidadãos.</p>
      </div>

      {/* Seção com Cards de Informações */}
      <div className="row mt-5 w-100 text-center">
        <div className="col-md-4 d-flex flex-column align-items-center">
          <Image src="/teleAtendimento.png" alt="Teleconsulta" width={300} height={250} className="img-fluid rounded shadow" />
          <h4 className="mt-4 fw-bold ">Teleconsulta</h4>
          <p className="text-muted">Realize consultas online com médicos especializados sem sair de casa.</p>
        </div>
        <div className="col-md-4 d-flex flex-column align-items-center">
          <Image src="/agendamento.png" alt="Agendamento Fácil" width={300} height={250} className="img-fluid rounded shadow" />
          <h4 className="mt-4 fw-bold ">Agendamento Fácil</h4>
          <p className="text-muted">Marque consultas e exames de forma rápida e sem complicações.</p>
        </div>
        <div className="col-md-4 d-flex flex-column align-items-center">
          <Image src="/Prontuario.png" alt="Prontuário Digital" width={300} height={250} className="img-fluid rounded shadow" />
          <h4 className="mt-4 fw-bold ">Prontuário Digital</h4>
          <p className="text-muted">Acesse seu histórico médico a qualquer momento com segurança.</p>
        </div>
      </div>
    </div>
  );
}
