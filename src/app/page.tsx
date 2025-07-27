import { Header } from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background text-foreground">
        <Hero />

        <About />

        {/* Experience Section */}
        <section
          id="experience"
          className="min-h-screen flex items-center justify-center"
        >
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Experience</h2>
            <div className="bg-card p-8 rounded-lg border max-w-2xl mx-auto">
              <p className="text-muted-foreground">
                This is the Experience section. The navigation header allows
                smooth scrolling to this section.
              </p>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section
          id="skills"
          className="min-h-screen flex items-center justify-center bg-muted/30"
        >
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Skills</h2>
            <div className="bg-card p-8 rounded-lg border max-w-2xl mx-auto">
              <p className="text-muted-foreground">
                This is the Skills section. The navigation header allows smooth
                scrolling to this section.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="min-h-screen flex items-center justify-center"
        >
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Contact</h2>
            <div className="bg-card p-8 rounded-lg border max-w-2xl mx-auto">
              <p className="text-muted-foreground">
                This is the Contact section. The navigation header allows smooth
                scrolling to this section.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
