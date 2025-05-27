import type { SVGProps } from "react"

export function MoleculeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="3" />
      <circle cx="18" cy="6" r="2" />
      <circle cx="6" cy="6" r="2" />
      <circle cx="18" cy="18" r="2" />
      <circle cx="6" cy="18" r="2" />
      <line x1="12" y1="9" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="15" />
      <line x1="9" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="15" y2="12" />
      <line x1="9" y1="9" x2="7" y2="7" />
      <line x1="15" y1="9" x2="17" y2="7" />
      <line x1="9" y1="15" x2="7" y2="17" />
      <line x1="15" y1="15" x2="17" y2="17" />
    </svg>
  )
}
