import Link from "next/link"
import { FileImage, LayoutDashboard, LineChart, FileText } from "lucide-react"

export function MobileNav() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center gap-2 font-semibold mb-4">
        <FileImage className="h-5 w-5" />
        <span>PathView</span>
      </div>
      <nav className="flex flex-col gap-3">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-foreground/80"
        >
          <LayoutDashboard className="h-4 w-4" />
          Dashboard
        </Link>
        <Link
          href="/images"
          className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-foreground/80"
        >
          <FileImage className="h-4 w-4" />
          Images
        </Link>
        <Link
          href="/analysis"
          className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-foreground/80"
        >
          <LineChart className="h-4 w-4" />
          Analysis
        </Link>
        <Link
          href="/reports"
          className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-foreground/80"
        >
          <FileText className="h-4 w-4" />
          Reports
        </Link>
      </nav>
    </div>
  )
}
