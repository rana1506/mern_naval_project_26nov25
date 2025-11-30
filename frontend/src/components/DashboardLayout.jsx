import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function DashboardLayout({ title, children }) {
  const { user, logout } = useAuth();

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      
      {/* Sidebar */}
      <div style={{
        width: 220,
        background: "#1f2937",
        color: "white",
        padding: 20
      }}>
        <h2 style={{ marginBottom: 20 }}>{title}</h2>

        
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: 30, overflow: "auto" }}>
        {children}
      </div>
    </div>
  );
}
