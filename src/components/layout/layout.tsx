import { Container } from "react-bootstrap";
import SideBar from "./SideBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="d-flex">
      <SideBar />
      <Container fluid className="content">
        {children}
      </Container>

      <style jsx>{`
        .content {
          margin-left: 250px;
          width: 100%;
          padding: 20px;
        }
      `}</style>
    </div>
  );
}
