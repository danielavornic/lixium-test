import clsx from "clsx";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
  as?: "button" | "a";
  size?: "md" | "lg";
  href?: string;
  className?: string;
  fullWidth?: boolean;
}

export const Button = ({
  as = "button",
  size = "md",
  href,
  fullWidth,
  children,
  className,
  ...props
}: ButtonProps) => {
  const btnClassNames = clsx(
    "transition-all duration-500 cursor-pointer text-center rounded-full flex bg-blue-500 text-white hover:bg-blue-600 items-center justify-center font-medium text-sm md:text-base",
    {
      "px-4 h-10": size === "md",
      "px-6 h-12": size === "lg",
      "w-full": fullWidth
    },
    className
  );

  if (href) {
    return (
      <Link className={btnClassNames} href={href}>
        {children}
      </Link>
    );
  }

  if (as === "a") {
    return (
      <a className={btnClassNames} href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={btnClassNames} {...props}>
      {children}
    </button>
  );
};
