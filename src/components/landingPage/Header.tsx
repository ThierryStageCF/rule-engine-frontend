import {type JSX} from "react";
import {Link} from "react-router-dom";
import {BookOpen, ListCheck} from "lucide-react";
import logo from "../../assets/cf-logo.png";

export function Header(): JSX.Element {

    return (
        <header className="w-full">
            <nav className="flex h-24 max-w-7xl mx-auto  items-center justify-between px-5 sm:px-8">
                <Link to="/">
                    <img
                        src={logo}
                        alt={"Logo Cheval Frères"}
                        className="h-36 w-60"
                    />
                </Link>
                <div className="flex items-center gap-1 sm:gap-2">
                    <NavLinkItem href="/rules" icon={<ListCheck/>}>
                        Règles métier
                    </NavLinkItem>
                    <NavLinkItem href="/documentation" icon={<BookOpen/>}>
                        Documentation
                    </NavLinkItem>

                </div>
            </nav>
        </header>
    )
}


function NavLinkItem({href, icon, children}: {href: string, icon: JSX.Element, children: string}) {
    return (
        <Link to={href} className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-foreground  transition duration-200 hover:bg-accent hover:text-ring hover:font-semibold">
            <span className="text-ring">{icon}</span>
            <span className="hidden sm:inline"> {children}</span>
        </Link>
    )
}