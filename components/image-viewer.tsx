"use client"

import { useEffect, useRef, useState } from "react"
import { Maximize, Minimize, ZoomIn, ZoomOut, RotateCw, Pencil, Eraser, Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"

interface ImageData {
  id: string
  title: string
  imageUrl: string
  [key: string]: any
}

export function ImageViewer({ imageData }: { imageData: ImageData }) {
  const viewerRef = useRef<HTMLDivElement>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isAnnotating, setIsAnnotating] = useState(false)
  const [viewer, setViewer] = useState<any>(null)

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return

    // Dynamic import of OpenSeadragon
    import("openseadragon").then((OpenSeadragon) => {
      if (!viewerRef.current || viewer) return

      // For demo purposes, we'll use a sample DZI image
      // In a real app, you would use the actual DZI from your server
      const sampleDziUrl = "https://openseadragon.github.io/example-images/highsmith/highsmith.dzi"

      const newViewer = new OpenSeadragon.default({
        element: viewerRef.current,
        prefixUrl: "https://openseadragon.github.io/openseadragon/images/",
        tileSources: sampleDziUrl,
        showNavigator: true,
        navigatorPosition: "BOTTOM_RIGHT",
        navigatorHeight: "120px",
        navigatorWidth: "180px",
        animationTime: 0.5,
        blendTime: 0.1,
        constrainDuringPan: true,
        maxZoomPixelRatio: 2,
        minZoomLevel: 0.5,
        visibilityRatio: 1,
        zoomPerScroll: 1.2,
      })

      setViewer(newViewer)

      // Clean up on unmount
      return () => {
        if (newViewer) {
          newViewer.destroy()
        }
      }
    })
  }, [viewerRef, viewer])

  useEffect(() => {
    // Handle fullscreen changes
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      viewerRef.current?.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }

  const zoomIn = () => {
    viewer?.viewport.zoomBy(1.5)
  }

  const zoomOut = () => {
    viewer?.viewport.zoomBy(0.75)
  }

  const rotate = () => {
    const currentRotation = viewer?.viewport.getRotation() || 0
    viewer?.viewport.setRotation((currentRotation + 90) % 360)
  }

  const toggleAnnotation = () => {
    setIsAnnotating(!isAnnotating)
    // In a real app, you would initialize or disable the annotation plugin here
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="text-xl font-semibold">{imageData.title}</h2>
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={toggleAnnotation}>
                  {isAnnotating ? <Eraser className="h-4 w-4" /> : <Pencil className="h-4 w-4" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>{isAnnotating ? "Stop Annotating" : "Start Annotating"}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Separator orientation="vertical" className="h-6" />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={zoomIn}>
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Zoom In</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={zoomOut}>
                  <ZoomOut className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Zoom Out</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={rotate}>
                  <RotateCw className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Rotate 90°</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Separator orientation="vertical" className="h-6" />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={toggleFullscreen}>
                  {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>{isFullscreen ? "Exit Fullscreen" : "Fullscreen"}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Download Image</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <div ref={viewerRef} className="flex-1 bg-black/10" />
    </div>
  )
}
