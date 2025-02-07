import { Container } from "react-bootstrap";
import NavigationBar from "./NavBar";
import "../../styles/globals.css";
import FooterBar from "./FooterBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <NavigationBar />
      <Container fluid className="content">
        {children}
      </Container>
      <FooterBar />
    </div>
  );
}
