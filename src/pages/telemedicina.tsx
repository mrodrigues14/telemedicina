import IniciarAtendimento from '@/components/atendimento/iniciarAtendimento';
import React, { useState } from 'react';
import { Container, Button } from "react-bootstrap";

export default function Telemedicina() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center text-center" style={{ minHeight: "100vh", padding: "50px 20px" }}>
      {!mostrarFormulario ? (
        <>
          <h1 className="display-4 fw-bold">Telemedicina e Atendimento</h1>
          <p className="lead text-secondary" style={{ maxWidth: "600px" }}>
            Paciente e médico conectados para consultas virtuais, registro de sintomas, prescrições e exames
          </p>
          <Button  style={{backgroundColor: "#9453a2", color:"white"}} size="lg" className="mt-3 shadow-sm" onClick={() => setMostrarFormulario(true)}>
            Iniciar Atendimento
          </Button>
        </>
      ) : (
        <IniciarAtendimento />
      )}
    </Container>
  );
}
