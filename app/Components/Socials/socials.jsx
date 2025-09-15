import "./socials.css";
export default function Socials() {
    return (
        <div className="socials">
            <a href="https://www.instagram.com/marc_mahler/" target="_blank" rel="noopener noreferrer">
                <img src="/insta.svg" alt="Insta" className="socials-img" />
            </a>
            <a href="https://www.linkedin.com/in/marc-mahler/" target="_blank">
            <img src="/linkedin.svg" alt="Linkedin" className="socials-img"/>
            </a>
            <a href="https://github.com/MarcMahler" target="_blank">
            <img src="/github.svg" alt="Github" className="socials-img" />
            </a>
        </div>
    )
}