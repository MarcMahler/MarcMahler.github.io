import Head from "next/head";
import "./page.css";
import Profile from "./Components/Profile/profile.jsx";
import Nav from "./Components/Nav/nav.jsx";

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