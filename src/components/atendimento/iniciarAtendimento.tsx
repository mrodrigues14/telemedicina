import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';

export default function IniciarAtendimento() {
  const [formData, setFormData] = useState<{ [key: string]: string }>({
    nome: '',
    cpf: '',
    email: '',
    dataNascimento: '',
    cep: '',
    endereco: '',
    numero: '',
    complemento: ''
  });

  const formatCPF = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  };

  const formatCEP = (value: string) => {
    return value.replace(/\D/g, '').replace(/(\d{5})(\d)/, '$1-$2');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "cpf") {
      formattedValue = formatCPF(value);
    } else if (name === "cep") {
      formattedValue = formatCEP(value);
    }

    setFormData({ ...formData, [name]: formattedValue });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/validarDados", {
        cpf: formData.cpf,
        dataNascimento: formData.dataNascimento,
        nome: formData.nome
      });
      console.log(response.data);
      alert("Validação bem-sucedida!");
    } catch (error) {
      console.error("Erro na validação", error);
      alert("Erro ao validar os dados");
    }
  };

  return (
    <Container className="p-4" style={{ backgroundColor: "#ffffff", borderRadius: "8px", boxShadow: "0 0 4px 6px rgba(0, 0, 0, 0.1)" }}>
      <h2 className="text-center mb-4">Iniciar Atendimento</h2>
      <Form onSubmit={handleSubmit}>
        {[
          { label: "Nome", name: "nome", type: "text" },
          { label: "CPF", name: "cpf", type: "text" },
          { label: "E-mail", name: "email", type: "email" },
          { label: "Data de Nascimento", name: "dataNascimento", type: "date" },
          { label: "CEP", name: "cep", type: "text" },
          { label: "Endereço", name: "endereco", type: "text", readOnly: true },
          { label: "Número", name: "numero", type: "text" },
          { label: "Complemento", name: "complemento", type: "text" }
        ].map(({ label, name, type, readOnly }) => (
          <Form.Group as={Row} className="mb-3" key={name}>
            <Form.Label column sm={4} className="text-end fw-bold">{label}</Form.Label>
            <Col sm={8}>
              <Form.Control 
                type={type} 
                name={name} 
                value={formData[name] || ''} 
                onChange={handleChange} 
                readOnly={readOnly} 
              />
            </Col>
          </Form.Group>
        ))}
        <div className="text-center">
          <Button style={{backgroundColor: "#9453a2", color:"white"}} type="submit">Próximo</Button>
        </div>
      </Form>
    </Container>
  );
}
