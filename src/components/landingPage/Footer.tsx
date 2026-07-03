import type {JSX} from "react";
import {Link} from "react-router-dom";


export function Footer(): JSX.Element {

    return (
        <footer className="h-13 bg-primary w-full">
            <div className="max-w-7xl mx-auto flex justify-between items-center px-8  py-4 text-white/80">
                <p>Mentions légales</p>
                <p className="font-semibold text-white/90 ">Cheval Frères © {new Date().getFullYear()}</p>
                <div className="flex justify-center items-center text-white/80 gap-4">
                    <Link
                        to="/documentation"
                        className="hover:text-white hover:font-medium transition-all duration-300"
                    >
                        documentation
                    </Link>
                    <Link
                        to="/contact"
                        className="hover:text-white hover:font-medium transition-all duration-300"
                    >
                        contact
                    </Link>
                </div>

            </div>
        </footer>
    )
}
