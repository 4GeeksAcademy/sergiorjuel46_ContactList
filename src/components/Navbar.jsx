import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/" style={{ textDecoration: "none" }}>
					<span className="navbar-brand mb-0 h1">Lista de Contactos</span>
				</Link>
			</div>
		</nav>
	);
};