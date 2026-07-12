import { Layout } from "./components/layout/Layout";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/hero/Hero";
import { Experience } from "./components/experience/Experience";
import { Projects } from "./components/projects/Projects";
import { Skills } from "./components/skills/Skills";
import { Certifications } from "./components/certifications/Certifications";
import { ChatWidget } from "./components/chatbot/ChatWidget";

function App() {
  return (
    <Layout>
      <Navbar />
      <main>
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <Certifications />
      </main>
      <Footer />
      <ChatWidget />
    </Layout>
  );
}

export default App;
