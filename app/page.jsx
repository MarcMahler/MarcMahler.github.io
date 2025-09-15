import Head from "next/head";
import "./page.css";
import Profile from "./profile.jsx";
import Nav from "./nav.jsx";

export default function App() {
  return (
    <div>
      <main className="main">
        <Nav />
        <Profile />
      </main>
    </div>
  );
}
