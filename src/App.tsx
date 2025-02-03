import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginPage, ChatPage } from "./pages";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </Router>
  );
}
