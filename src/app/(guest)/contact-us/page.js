import ContactHero from "./(section)/contacthero.js";
import ContactCards from './(section)/contactcard.js'
import ContactForm from './(section)/contactform.js'

export default function ContactPage() {
  return (
    <main className="bg-[var(--off-white-background)] pt-10 md:pt-20">
      <ContactHero />
      <ContactCards/>
      <ContactForm/>
    </main>
  );
}