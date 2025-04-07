import { Link } from "react-router-dom";

interface FooterListProps {
  title: string;
  links: { name: string; to: string }[];
}

const FooterList = ({ title, links }: FooterListProps) => {
  return (
    <div className="flex flex-col items-center md:items-start">
      <ul className="space-y-2">
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        {links.map((link) => (
          <li className="text-sm">
            <Link
              to={link.to}
              target={link.to.startsWith("http") ? "_blank" : undefined}
              rel={
                link.to.startsWith("http") ? "noopener noreferrer" : undefined
              }
              className="text-white hover:underline"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterList;
