"use client";
import "./nav.css";
import { useRouter, usePathname } from "next/navigation";

export default function Nav() {
  const router = useRouter();
  const pathname = usePathname();  // liefert z.B. "/", "/university", "/projects"

  return (
    <nav className="nav">
      <h1 className="logo">Marc</h1>
      <ul className="nav-links">
        <li className="vertical-line"></li>
        <li
          onClick={() => router.push("/")}
          className={pathname === "/" ? "active-tab" : ""}
        >
          Home
        </li>
        <li
          onClick={() => router.push("/university")}
          className={pathname === "/university" ? "active-tab" : ""}
        >
          University
        </li>
        <li
          onClick={() => router.push("/projects")}
          className={pathname === "/projects" ? "active-tab" : ""}
        >
          Projects
        </li>
      </ul>
    </nav>
  );
}
