import { ImageViewer } from "@/components/image-viewer"
import { PageHeader } from "@/components/page-header"
import { ViewerSidebar } from "@/components/viewer-sidebar"

// Sample image data for the landing page
const imageData = {
  id: "img1",
  title: "H&E Stained Liver Tissue",
  type: "SVS",
  date: "2023-05-15",
  description: "Liver tissue sample with H&E staining showing normal hepatocytes and portal tracts.",
  metadata: {
    magnification: "40x",
    stain: "H&E",
    scanner: "Aperio AT2",
    dimensions: "30000 x 25000 pixels",
    fileSize: "1.2 GB",
  },
  // In a real app, this would be a DZI source or tiled image source
  imageUrl: "/api/images/img1/dzi",
}

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <PageHeader />
      <div className="flex flex-1 overflow-hidden">
        <ViewerSidebar imageData={imageData} />
        <main className="flex-1 overflow-hidden">
          <ImageViewer imageData={imageData} />
        </main>
      </div>
    </div>
  )
}
