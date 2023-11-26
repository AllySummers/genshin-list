import { cn } from "@/lib/utils";

type IconProps = React.HTMLAttributes<SVGElement>;

export const Icons = {
  checkmark: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" {...props}>
      <path
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        stroke="currentColor"
        fill="currentColor"
      ></path>
    </svg>
  ),
  close: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path
        d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
        stroke="currentColor"
        fill="currentColor"
      ></path>
    </svg>
  ),
  dropdown: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path d="M7 10l5 5 5-5z" stroke="currentColor" fill="currentColor"></path>
    </svg>
  ),
  filter: ({ className, ...props }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      className={cn("-scale-x-100", className)}
      {...props}
    >
      <path
        d="M487.976 0H24.028C2.71 0-8.047 25.866 7.058 40.971L192 225.941V432c0 7.831 3.821 15.17 10.237 19.662l80 55.98C298.02 518.69 320 507.493 320 487.98V225.941l184.947-184.97C520.021 25.896 509.338 0 487.976 0z"
        stroke="currentColor"
        fill="currentColor"
      ></path>
    </svg>
  ),
  reverse: ({ className, ...props }: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={cn("-scale-x-100", className)}
      {...props}
    >
      <path
        d="M8 16H4l6 6V2H8zm6-11v17h2V8h4l-6-6z"
        stroke="currentColor"
        fill="currentColor"
      ></path>
    </svg>
  ),
  rightarrow: (props: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path d="M21 12L14 3V7.99L3 8V16H14V21L21 12Z" fill="currentColor" />
    </svg>
  ),
} as const;