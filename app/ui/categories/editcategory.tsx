'use client'
import { Button } from "@/app/ui/button"
import Link from "next/link"


export default function EditCategoryButton({ id }: { id: string }){
    return(
        <Link 
            href={`/admin/categories/${id}/edit`}>
            <Button variant="outline" size="sm">
                <FilePenIcon />
            </Button>
        </Link>
        
    )
}

function FilePenIcon() {
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
    >
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  )
}
