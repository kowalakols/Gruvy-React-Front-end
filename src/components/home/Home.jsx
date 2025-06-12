import Sidebar from "../nav/sidebar"
import './home.css'
import Music from "../Music/Music"

export default function Home(){
    return (
        <>
        <section className="home-body">
            <Sidebar />
            <section className="home-page-space">
                <Music />
            </section>
        </section>
            
        </>
    )
}