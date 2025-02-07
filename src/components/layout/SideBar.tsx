import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Navbar, Nav, Button } from "react-bootstrap";

export default function SideBar() {
  const router = useRouter();

  // Estado para controlar a expansão de cada seção
  const [menuOpen, setMenuOpen] = useState({
    login: false,
    telemedicina: false,
    relatorios: false,
  });

  const handleToggle = (menu: keyof typeof menuOpen) => {
    setMenuOpen((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <Navbar bg="dark" variant="dark" className="sidebar flex-column p-3">
      <Navbar.Brand className="text-white fw-bold">TeleSaúde</Navbar.Brand>
      <Nav className="flex-column w-100">

        {/* LOGIN */}
        <Button
          variant="link"
          className="menu-btn text-white text-start w-100 d-inline-block text-decoration-none"
          onClick={() => handleToggle("login")}
        >
          Login do Profissional de Saúde ▼
        </Button>

        {menuOpen.login && (
          <div className="submenu">
            <Nav.Link as={Link} href="/recepcao" className="text-white">Recepção ao Paciente</Nav.Link>
            <Nav.Link as={Link} href="/triagem" className="text-white">Triagem do Paciente</Nav.Link>
            <Nav.Link as={Link} href="/medico" className="text-white">Página do Médico</Nav.Link>
          </div>
        )}

        {/* Telemedicina */}
        <Button variant="link"
          className="menu-btn text-white text-start w-100 d-inline-block text-decoration-none" onClick={() => handleToggle("telemedicina")}>
          Telemedicina e Atendimento ▼
        </Button>
        {menuOpen.telemedicina && (
          <div className="submenu">
            <Nav.Link as={Link} href="/ordem-chegada" className="text-white">Ordem de Chegada</Nav.Link>
          </div>
        )}

        {/* Banco de Dados */}
        <Nav.Link as={Link} href="/banco-dados" className="menu-btn text-white text-start w-100 d-inline-block text-decoration-none">Banco de Dados Médico</Nav.Link>

        {/* Relatórios */}
        <Button variant="link"className="menu-btn text-white text-start w-100 d-inline-block text-decoration-none" onClick={() => handleToggle("relatorios")}>
          Relatórios e Gestão ▼
        </Button>
        {menuOpen.relatorios && (
          <div className="submenu">
            <Nav.Link as={Link} href="/relatorios" className="text-white">Relatórios</Nav.Link>
          </div>
        )}

        {/* Suporte */}
        <Nav.Link as={Link} href="/suporte" className="menu-btn text-white">Suporte e Ajuda</Nav.Link>
      </Nav>

      <Button variant="danger" className="mt-3 w-100" onClick={handleLogout}>
        Sair
      </Button>

      <style jsx>{`
        .sidebar {
          width: 250px;
          height: 100vh;
          position: fixed;
          left: 0;
          top: 0;
          background: #343a40;
          color: white;
          padding: 20px;
          overflow-y: auto;
        }

        .menu-btn {
          width: 100%;
          text-align: left;
          font-size: 18px;
          background: none;
          border: none;
          padding: 10px;
          transition: background 0.3s;
        }

        .menu-btn:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .submenu {
          padding-left: 15px;
          background: rgba(255, 255, 255, 0.1);
          border-left: 3px solid #f39c12;
        }

        .submenu a {
          padding: 5px 10px;
          display: block;
        }

        .submenu a:hover {
          color: #f39c12;
        }
      `}</style>
    </Navbar>
  );
}
