import Link from 'next/link';
import { notFound } from 'next/navigation';
import { experiences } from '../../experienceData';

type ExperienceDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ExperienceDetailPage({ params }: ExperienceDetailPageProps) {
  const { id } = await params;
  const experience = experiences.find((item) => item.id === id);

  if (!experience) {
    notFound();
  }

  return (
    <div className="flex min-h-screen bg-black font-sans pt-20">
      <main className="w-full max-w-5xl mx-auto py-12 px-8 sm:px-16">
        <Link href="/#experience" className="text-zinc-400 hover:text-white transition-colors mb-8 inline-block">
          ← Back to Home
        </Link>

        <div className="mb-12 border border-zinc-800 rounded-lg bg-zinc-900/40 p-8">
          <div className="flex justify-between items-start mb-4 gap-6">
            <div>
              <h1 className="text-5xl font-bold text-white mb-2">{experience.org}</h1>
              <p className="text-lg text-emerald-400">{experience.role}</p>
              <p className="text-zinc-400 mt-1">{experience.location}</p>
            </div>
            <span className="text-zinc-400 whitespace-nowrap">{experience.period}</span>
          </div>

          <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-lg">
            <h2 className="text-xl font-semibold text-white mb-2">{experience.storyTitle}</h2>
            <p className="text-zinc-300 leading-relaxed">{experience.summary}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
          <div className="lg:col-span-2">
            <section className="mb-12" id="story">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-1 h-8 bg-emerald-500 rounded"></span>
                Full Story
              </h2>
              <div className="space-y-4">
                {experience.story.map((paragraph) => (
                  <p key={paragraph} className="text-zinc-300 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>

            <section className="mb-12" id="highlights">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-1 h-8 bg-emerald-500 rounded"></span>
                Highlights
              </h2>
              <ul className="space-y-3">
                {experience.points.map((point) => (
                  <li key={point} className="flex gap-3 text-zinc-300">
                    <span className="text-emerald-500 flex-shrink-0">✓</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="flex flex-col gap-6">
            <div className="p-6 border border-zinc-800 rounded-lg bg-zinc-900/50">
              <h3 className="text-lg font-bold text-white mb-4">Quick Navigation</h3>
              <div className="space-y-2">
                <a href="#story" className="text-emerald-400 hover:text-emerald-300 text-sm flex items-center gap-2 transition-colors">
                  → Full Story
                </a>
                <a href="#highlights" className="text-emerald-400 hover:text-emerald-300 text-sm flex items-center gap-2 transition-colors">
                  → Highlights
                </a>
              </div>
            </div>

            <div className="p-6 border border-zinc-800 rounded-lg">
              <h3 className="text-lg font-bold text-white mb-4">Role Snapshot</h3>
              <p className="text-zinc-300 text-sm mb-2"><strong>Organization:</strong> {experience.org}</p>
              <p className="text-zinc-300 text-sm mb-2"><strong>Position:</strong> {experience.role}</p>
              <p className="text-zinc-300 text-sm mb-2"><strong>Location:</strong> {experience.location}</p>
              <p className="text-zinc-300 text-sm"><strong>Period:</strong> {experience.period}</p>
            </div>
          </aside>
        </div>

        <div className="p-8 border border-zinc-800 rounded-lg bg-gradient-to-br from-zinc-900/50 to-zinc-950/50">
          <h2 className="text-2xl font-bold text-white mb-4">Explore More</h2>
          <p className="text-zinc-300 mb-6">
            Continue reading other experience stories or jump back to projects.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/#experience"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors font-medium"
            >
              Back to Home →
            </Link>
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 px-6 py-3 border border-zinc-700 hover:bg-zinc-900 text-white rounded-lg transition-colors font-medium"
            >
              View Projects
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
