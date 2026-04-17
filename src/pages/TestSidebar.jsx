import AdminSidebar from "../components/AdminSidebar";

export default function TestSidebar() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <AdminSidebar />

      <div
        style={{
          flex: 1,
          background: "#f4f4f4",
          padding: "40px"
        }}
      >
        <h1>Preview Sidebar</h1>
      </div>
    </div>
  );
}