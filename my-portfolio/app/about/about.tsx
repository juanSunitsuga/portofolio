export default function About() {
  const skills = {
    languages: ['Python', 'Java', 'PHP', 'Typescript', 'Javascript', 'Swift', 'SwiftUI'],
    frameworks: ['React', 'Vue', 'Express', 'Hapi.js', 'Flask'],
    databases: ['MySQL', 'PostgreSQL'],
    cloud: ['AWS', 'AWS S3'],
    tools: ['Figma', 'Docker', 'Git', 'Postman', 'ESLint'],
  };

  const education = [
    {
      degree: 'Sarjana Komputer',
      school: 'Institut Teknologi Harapan Bangsa',
      location: 'Bandung, Indonesia',
      year: 'August 2026',
      details: ['Nominated in Dean\'s List for 1 semester', 'GPA: 3.83'],
    },
  ];

  const certifications = [
    {
      name: 'AWS Academy Cloud Foundation Certification',
      issuer: 'ITHB Career Resource Center',
      date: 'December 2025',
    },
    {
      name: 'AWS Backend Academy',
      issuer: 'Dicoding',
      date: 'September 2024',
      courses: [
        'Learn Back-End Basics with JavaScript',
        'Architecting on AWS',
        'Learn Back-End Beginners with JavaScript',
        'Learn JavaScript Programming Basics',
        'Cloud Practitioner Essentials',
      ],
    },
    {
      name: 'SAP Certification',
      issuer: 'ITHB Career Resource Center',
      date: 'December 2025',
    },
  ];

  const experience = [
    {
      position: 'Learner',
      company: 'Apple Developer Academy',
      location: 'Bali',
      date: 'March 2026 - Present',
      highlights: [
        'Qualified from 5,000+ applicants from around the world',
        'Developing iOS applications using Swift, SwiftUI, and Apple development frameworks',
        'Collaborating in multidisciplinary teams with developers, designers, and business contributors',
        'Applying Human Interface Guidelines (HIG) and user-centered design principles',
        'Building prototypes and conducting user research',
        'Strengthening professional communication in an international environment',
      ],
    },
    {
      position: 'Secretary',
      company: 'Informatics Engineering Community - ITHB',
      location: 'Bandung',
      date: 'June 2024 - June 2025',
      highlights: [
        'Reviewed and improved administrative documentation in 4 official documents',
        'Improved team communication, increasing satisfaction by 21%',
        'Restructured digital document storage system, reducing search time by 32%',
      ],
    },
    {
      position: 'Vice Chairman',
      company: 'Comet Badminton Club - ITHB',
      location: 'Bandung',
      date: 'August 2024 - May 2026',
      highlights: [
        'Successfully organized 4 inter-campus sparring sessions and 3 friendly matches',
        'Coordinated weekly training sessions with average of 15 active members',
      ],
    },
  ];

  return (
    <div className="flex min-h-screen bg-black font-sans pt-20">
      <main className="w-full max-w-3xl mx-auto py-20 px-16">
        {/* Objective */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Career Objective</h2>
          <p className="text-zinc-300 leading-relaxed">
            A career as a Full Stack Developer, specializing in both frontend and backend development, while utilizing strong programming, problem-solving, and analytical skills to build scalable, efficient, and user-focused web applications. Capable of developing end-to-end solutions, managing databases and APIs, and collaborating effectively in both team-based and independent environments.
          </p>
        </section>

        {/* Education */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-6">Education</h2>
          {education.map((edu, idx) => (
            <div key={idx} className="mb-6 p-4 border border-zinc-800 rounded-lg hover:border-zinc-700 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-xl font-semibold text-emerald-400">{edu.degree}</h3>
                  <p className="text-zinc-300">{edu.school}</p>
                </div>
                <span className="text-zinc-400 text-sm">{edu.year}</span>
              </div>
              <p className="text-zinc-400 mb-2">{edu.location}</p>
              <ul className="text-zinc-300 space-y-1">
                {edu.details.map((detail, i) => (
                  <li key={i} className="text-sm">• {detail}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Certifications */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-6">Certifications</h2>
          <div className="space-y-4">
            {certifications.map((cert, idx) => (
              <div key={idx} className="p-4 border border-zinc-800 rounded-lg hover:border-zinc-700 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-emerald-400">{cert.name}</h3>
                  <span className="text-zinc-400 text-sm">{cert.date}</span>
                </div>
                <p className="text-zinc-300 mb-2">{cert.issuer}</p>
                {cert.courses && (
                  <ul className="text-zinc-400 text-sm space-y-1 mt-3">
                    {cert.courses.map((course, i) => (
                      <li key={i}>• {course}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-6">Experience</h2>
          <div className="space-y-6">
            {experience.map((exp, idx) => (
              <div key={idx} className="p-4 border border-zinc-800 rounded-lg hover:border-zinc-700 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-semibold text-emerald-400">{exp.position}</h3>
                    <p className="text-zinc-300">{exp.company}</p>
                  </div>
                  <span className="text-zinc-400 text-sm whitespace-nowrap ml-4">{exp.date}</span>
                </div>
                <p className="text-zinc-400 text-sm mb-3">{exp.location}</p>
                <ul className="text-zinc-300 space-y-2">
                  {exp.highlights.map((highlight, i) => (
                    <li key={i} className="text-sm">• {highlight}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section>
          <h2 className="text-3xl font-bold text-white mb-6">Technical Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-emerald-400 font-semibold mb-3">Programming Languages</h3>
              <div className="flex flex-wrap gap-2">
                {skills.languages.map((lang, idx) => (
                  <span key={idx} className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-sm text-zinc-300 hover:border-emerald-600 transition-colors">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-emerald-400 font-semibold mb-3">Frameworks</h3>
              <div className="flex flex-wrap gap-2">
                {skills.frameworks.map((framework, idx) => (
                  <span key={idx} className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-sm text-zinc-300 hover:border-emerald-600 transition-colors">
                    {framework}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-emerald-400 font-semibold mb-3">Databases</h3>
              <div className="flex flex-wrap gap-2">
                {skills.databases.map((db, idx) => (
                  <span key={idx} className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-sm text-zinc-300 hover:border-emerald-600 transition-colors">
                    {db}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-emerald-400 font-semibold mb-3">Tools & Cloud</h3>
              <div className="flex flex-wrap gap-2">
                {[...skills.cloud, ...skills.tools].map((tool, idx) => (
                  <span key={idx} className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-sm text-zinc-300 hover:border-emerald-600 transition-colors">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
