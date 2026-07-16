import {type JSX} from "react";
import {Header} from "../components/landingPage/Header.tsx";
import {Hero} from "../components/landingPage/Hero.tsx";
import {Footer} from "../components/landingPage/Footer.tsx";


/**
 * @summary Composant fonctionnel qui rend la page d'accueil de l'application.
 */
function LandingPage(): JSX.Element {
     return (
        <main className="flex overflow-y-hidden h-screen flex-col bg-background md:min-h-screen md:overflow-y-auto">
            <Header/>
            <Hero/>
            <Footer/>
        </main>
    )
}

export default LandingPage;

