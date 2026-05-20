export type ExperienceEntry = {
  id: string;
  org: string;
  location: string;
  period: string;
  role: string;
  storyTitle: string;
  summary: string;
  story: string[];
  points: string[];
};

export const experiences: ExperienceEntry[] = [
  {
    id: "apple-developer-academy",
    org: "Apple Developer Academy",
    location: "Bali",
    period: "March 2026 - Present",
    role: "Learner",
    storyTitle: "Building Products in a Global Academy",
    summary:
      "The most diverse international Apple Developer Academy in the world, focused on coding, design, and professional skills.",
    story: [
      "At Apple Developer Academy, I work in a challenge-based environment where every sprint starts from a real user problem, not just a feature request.",
      "I collaborate in multidisciplinary teams and translate research insights into iOS product decisions using Swift and SwiftUI while keeping strong product-design alignment.",
    ],
    points: [
      "Qualified from 5,000+ applicants from around the world",
      "Developing iOS applications using Swift, SwiftUI, and Apple development frameworks",
      "Collaborating in multidisciplinary teams of developers, designers, and business contributors",
      "Applying Human Interface Guidelines (HIG) and user-centered design principles in product development",
      "Building prototypes, conducting user research, and iterating solutions from feedback",
      "Participating in challenge-based learning to solve real-world problems with technology",
      "Strengthening communication, presentation, and cross-cultural collaboration skills",
    ],
  },
  {
    id: "informatics-engineering-community-ithb",
    org: "Informatics Engineering Community - ITHB",
    location: "Bandung",
    period: "June 2024 - June 2025",
    role: "Secretary",
    storyTitle: "Scaling a Student Org Through Systems",
    summary:
      "A student organization focused on leadership, collaboration, and digital transformation in Informatics.",
    story: [
      "This role taught me that strong systems beat ad-hoc effort. I focused on documentation quality, structure, and team communication rhythm.",
      "By improving how information was captured and stored, we reduced search friction and made day-to-day collaboration much faster for the team.",
    ],
    points: [
      "Reviewed and improved administrative documentation, correcting inconsistencies in 4 official documents",
      "Improved team communication with structured meeting notes and increased satisfaction by 21%",
      "Restructured digital document storage and reduced search time by 32%",
    ],
  },
  {
    id: "comet-badminton-club-ithb",
    org: "Comet Badminton Club - ITHB",
    location: "Bandung",
    period: "August 2024 - May 2026",
    role: "Vice Chairman",
    storyTitle: "Leading Through Operations and Consistency",
    summary:
      "A student club focused on badminton training and competition preparation across campus and external matches.",
    story: [
      "In this position, I learned operational leadership: turning plans into weekly execution while balancing logistics, people, and schedule quality.",
      "Coordinating recurring training and event partnerships improved both participation consistency and external collaboration outcomes.",
    ],
    points: [
      "Organized 4 inter-campus sparring sessions and 3 friendly matches with external clubs",
      "Coordinated weekly training sessions attended by around 15 active members",
    ],
  },
];