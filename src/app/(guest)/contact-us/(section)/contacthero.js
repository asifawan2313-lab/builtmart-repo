// Image ka path apni file ke mutabiq likhein (src/assets/image/guest/ mein rakhi ho to yahi)
import contactBg from "../../../../assets/image/contact/contactbanner.png";

export default function ContactHero() {
  return (
    <section
      className="relative bg-[var(--industrial-blue-grey)] bg-cover bg-center"
      style={{ backgroundImage: `url(${contactBg.src})` }}
    >
      {/* Halka overlay: image pehle se dark hai, is liye bas text ko support dene ke liye */}
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--deep-charcoal)]/60 via-[var(--industrial-blue-grey)]/30 to-transparent" />

      {/* Text: left taraf, Tameer jaisa thoda andar se shuru */}
      <div className="relative z-10 flex items-center px-4 md:pl-[12%] lg:pl-[25%] min-h-[16rem] sm:min-h-[20rem] lg:min-h-[25rem]">
        <div className="text-white">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl leading-tight">GET IN TOUCH!</h1>
          <p className="text-lg sm:text-xl lg:text-2xl mt-2">We&apos;re here to assist you.</p>
        </div>
      </div>
    </section>
  );
}