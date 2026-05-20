import { IconType } from "react-icons";
import {
  SiEslint,
  SiExpress,
  SiFirebase,
  SiFlask,
  SiHtml5,
  SiJavascript,
  SiJest,
  SiMysql,
  SiNodedotjs,
  SiNumpy,
  SiPandas,
  SiPostgresql,
  SiPostman,
  SiPython,
  SiReact,
  SiScikitlearn,
  SiSwift,
  SiTypescript,
  SiVuetify,
  SiCss,
  SiDocker,
  SiGit,
  SiNextdotjs,
  SiVuedotjs,
  SiGraphql,
  SiRedux,
  SiMongodb,
  SiFigma,
  SiTailwindcss,
  SiPhp,
  SiSap,
} from "react-icons/si";
import { FaApple, FaAws, FaDatabase, FaJava, FaKey, FaRegWindowRestore, FaBoxesStacked, FaPuzzlePiece, FaServer } from "react-icons/fa6";

type TechBadgeProps = {
  tech: string;
  className?: string;
};

type TechIconConfig = {
  Icon: IconType;
  iconClassName: string;
};

const techIcons: Record<string, TechIconConfig> = {
  typescript: { Icon: SiTypescript, iconClassName: "text-sky-400" },
  vue: { Icon: SiVuedotjs, iconClassName: "text-emerald-400" },
  vuetify: { Icon: SiVuetify, iconClassName: "text-cyan-400" },
  express: { Icon: SiExpress, iconClassName: "text-zinc-300" },
  eslint: { Icon: SiEslint, iconClassName: "text-purple-400" },
  jest: { Icon: SiJest, iconClassName: "text-rose-400" },
  react: { Icon: SiReact, iconClassName: "text-cyan-300" },
  python: { Icon: SiPython, iconClassName: "text-sky-400" },
  flask: { Icon: SiFlask, iconClassName: "text-zinc-200" },
  "scikit learn": { Icon: SiScikitlearn, iconClassName: "text-orange-400" },
  scikitlearn: { Icon: SiScikitlearn, iconClassName: "text-orange-400" },
  pandas: { Icon: SiPandas, iconClassName: "text-sky-500" },
  numpy: { Icon: SiNumpy, iconClassName: "text-sky-400" },
  html: { Icon: SiHtml5, iconClassName: "text-orange-500" },
  css: { Icon: SiCss, iconClassName: "text-sky-500" },
  javascript: { Icon: SiJavascript, iconClassName: "text-yellow-400" },
  "hapi.js": { Icon: FaServer, iconClassName: "text-zinc-200" },
  hapi: { Icon: FaServer, iconClassName: "text-zinc-200" },
  postgresql: { Icon: SiPostgresql, iconClassName: "text-sky-400" },
  "node.js": { Icon: SiNodedotjs, iconClassName: "text-green-500" },
  node: { Icon: SiNodedotjs, iconClassName: "text-green-500" },
  jwt: { Icon: FaKey, iconClassName: "text-amber-400" },
  "aws s3": { Icon: FaAws, iconClassName: "text-orange-400" },
  aws: { Icon: FaAws, iconClassName: "text-orange-400" },
  postman: { Icon: SiPostman, iconClassName: "text-orange-500" },
  java: { Icon: FaJava, iconClassName: "text-red-400" },
  swing: { Icon: FaRegWindowRestore, iconClassName: "text-zinc-300" },
  jdbc: { Icon: FaDatabase, iconClassName: "text-zinc-300" },
  mysql: { Icon: SiMysql, iconClassName: "text-sky-500" },
  oop: { Icon: FaBoxesStacked, iconClassName: "text-zinc-300" },
  swift: { Icon: SiSwift, iconClassName: "text-orange-400" },
  swiftui: { Icon: SiSwift, iconClassName: "text-orange-400" },
  uikit: { Icon: SiSwift, iconClassName: "text-zinc-200" },
  combine: { Icon: SiSwift, iconClassName: "text-zinc-200" },
  firebase: { Icon: SiFirebase, iconClassName: "text-amber-400" },
  docker: { Icon: SiDocker, iconClassName: "text-sky-400" },
  git: { Icon: SiGit, iconClassName: "text-orange-500" },
  nextjs: { Icon: SiNextdotjs, iconClassName: "text-white" },
  graphql: { Icon: SiGraphql, iconClassName: "text-pink-400" },
  redux: { Icon: SiRedux, iconClassName: "text-violet-400" },
  mongodb: { Icon: SiMongodb, iconClassName: "text-green-500" },
  figma: { Icon: SiFigma, iconClassName: "text-fuchsia-400" },
  sap: { Icon: SiSap, iconClassName: "text-sky-400" },
  tailwindcss: { Icon: SiTailwindcss, iconClassName: "text-cyan-400" },
  php: { Icon: SiPhp, iconClassName: "text-indigo-400" },
  apple: { Icon: FaApple, iconClassName: "text-zinc-200" },
};

function normalizeTechName(tech: string) {
  return tech.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

export default function TechBadge({ tech, className = "" }: TechBadgeProps) {
  const normalizedTech = normalizeTechName(tech);
  const techIcon = techIcons[normalizedTech] ?? techIcons[normalizedTech.replace(/ /g, "")];
  const Icon = techIcon?.Icon ?? FaPuzzlePiece;
  const iconClassName = techIcon?.iconClassName ?? "text-emerald-400";

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950/80 px-3 py-1 text-xs font-medium text-zinc-200 transition-colors hover:border-emerald-500/60 ${className}`}
    >
      <Icon className={`h-3.5 w-3.5 ${iconClassName}`} aria-hidden="true" />
      <span>{tech}</span>
    </span>
  );
}