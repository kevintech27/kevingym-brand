import {
  CONTACT_EMAIL,
  CONTACT_INTENTS,
  ECOSYSTEM,
  MEDIA_KIT_URL,
  PERSON,
  SOCIALS,
  mailto,
} from '@/lib/brand';
import { Card, Label, PageHead, Reveal, Section, Todo } from '@/components/Primitives';

// Contact.
//
// No form. This site is a static build with no backend, and a form that posts
// nowhere is worse than no form at all: the sender believes the message left.
// Every button below opens a real mail client with the subject prefilled.

const Intents = () => (
  <Section label="Reason" title="What is it about?" align="center" className="border-t border-kg-border">
    <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
      {CONTACT_INTENTS.map((intent, i) => (
        <Reveal key={intent.id} delay={(i % 2) * 90} className="h-full">
          <a href={mailto(intent.subject)} className="group block h-full">
            <Card className="flex h-full items-center justify-between gap-6 px-8 py-8">
              <span className="font-display text-lg font-semibold tracking-headline text-kg-white sm:text-xl">
                {intent.label}
              </span>
              <span className="shrink-0 text-sm font-medium tracking-copy text-kg-muted transition-colors duration-500 ease-apple group-hover:text-kg-white">
                Write &rsaquo;
              </span>
            </Card>
          </a>
        </Reveal>
      ))}
    </div>
  </Section>
);

const Elsewhere = () => (
  <Section label="Elsewhere" title="The rest of it." align="center" className="border-t border-kg-border">
    <div className="flex flex-wrap justify-center gap-3">
      {SOCIALS.map((s) => (
        <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer" className="kg-btn-ghost">
          {s.label} {s.handle}
        </a>
      ))}
      <a href={ECOSYSTEM.links} className="kg-btn-ghost">
        All links
      </a>
      <a href={ECOSYSTEM.programme} className="kg-btn-ghost">
        HYBRID programme
      </a>
      <a href={ECOSYSTEM.app} className="kg-btn-ghost">
        Member area
      </a>
      {MEDIA_KIT_URL ? (
        <a href={MEDIA_KIT_URL} className="kg-btn-ghost" download>
          Media kit
        </a>
      ) : (
        <span className="kg-btn-ghost cursor-not-allowed opacity-40" aria-disabled="true">
          Media kit
        </span>
      )}
    </div>

    {!MEDIA_KIT_URL && (
      <div className="mx-auto mt-12 max-w-2xl text-left">
        <Todo>
          PLACEHOLDER: the media kit is not published yet. Drop the PDF at{' '}
          <code>public/media-kit.pdf</code> and set <code>MEDIA_KIT_URL</code> in{' '}
          <code>src/lib/brand.js</code>.
        </Todo>
      </div>
    )}
  </Section>
);

export default function Contact() {
  return (
    <>
      <PageHead
        eyebrow="Contact"
        title="Write to me."
        intro={`Every professional inquiry is read and answered by me. No agency in between. Based in ${PERSON.city}, available internationally.`}
      />

      <Section align="center" className="border-t border-kg-border">
        <div className="text-center">
          <Reveal>
            <Label>Direct</Label>
          </Reveal>
          <Reveal delay={90}>
            <a
              href={mailto()}
              className="kg-underline-swipe mt-6 inline-block break-all font-display text-[clamp(1.35rem,4.6vw,3.25rem)] font-semibold tracking-display text-kg-white"
            >
              {CONTACT_EMAIL}
            </a>
          </Reveal>
        </div>
      </Section>

      <Intents />
      <Elsewhere />
    </>
  );
}
