import "./nav.css";
export default function Nav() {
    return (
        <nav className="nav">
            <h1 className="logo">Marc</h1>
            <ul className="nav-links">
                <li className="vertical-line"></li>
                <li>Profile</li>
                <li>Projects</li>
                <li>Contact</li>
            </ul>
        </nav>
    )
}