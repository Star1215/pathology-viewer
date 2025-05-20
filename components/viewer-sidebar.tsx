"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Info, Layers, MessageSquare, History } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

interface ImageData {
  id: string
  title: string
  description: string
  type: string
  date: string
  metadata: {
    [key: string]: string
  }
  [key: string]: any
}

export function ViewerSidebar({ imageData }: { imageData: ImageData }) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className={`border-r bg-background transition-all duration-300 flex flex-col ${isOpen ? "w-80" : "w-12"}`}>
      <div className="p-3 flex justify-between items-center border-b">
        {isOpen && <h3 className="font-medium">Image Details</h3>}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className={isOpen ? "ml-auto" : "mx-auto"}
        >
          {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
      </div>

      {isOpen && (
        <Tabs defaultValue="info" className="flex-1 flex flex-col">
          <TabsList className="grid grid-cols-3 mx-4 mt-4">
            <TabsTrigger value="info">
              <Info className="h-4 w-4 mr-2" />
              Info
            </TabsTrigger>
            <TabsTrigger value="layers">
              <Layers className="h-4 w-4 mr-2" />
              Layers
            </TabsTrigger>
            <TabsTrigger value="notes">
              <MessageSquare className="h-4 w-4 mr-2" />
              Notes
            </TabsTrigger>
          </TabsList>
          <ScrollArea className="flex-1 p-4">
            <TabsContent value="info" className="mt-0">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Description</h4>
                  <p className="text-sm">{imageData.description}</p>
                </div>
                <Separator />
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Metadata</h4>
                  <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    <dt className="text-muted-foreground">Type:</dt>
                    <dd>{imageData.type}</dd>
                    <dt className="text-muted-foreground">Date:</dt>
                    <dd>{imageData.date}</dd>
                    {Object.entries(imageData.metadata).map(([key, value]) => (
                      <>
                        <dt className="text-muted-foreground" key={`dt-${key}`}>
                          {key.charAt(0).toUpperCase() + key.slice(1)}:
                        </dt>
                        <dd key={`dd-${key}`}>{value}</dd>
                      </>
                    ))}
                  </dl>
                </div>
                <Separator />
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">History</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <History className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Uploaded</p>
                        <p className="text-xs text-muted-foreground">May 15, 2023 - 10:23 AM</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <History className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Processed</p>
                        <p className="text-xs text-muted-foreground">May 15, 2023 - 10:25 AM</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <History className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Viewed by Dr. Smith</p>
                        <p className="text-xs text-muted-foreground">May 16, 2023 - 2:45 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="layers" className="mt-0">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">Visible Layers</h4>
                  <Button variant="ghost" size="sm" className="h-8 text-xs">
                    Add Layer
                  </Button>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500" />
                      <span className="text-sm">Base Image</span>
                    </div>
                    <Badge>Visible</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                      <span className="text-sm">Annotations</span>
                    </div>
                    <Badge variant="outline">Hidden</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <span className="text-sm">AI Segmentation</span>
                    </div>
                    <Badge variant="outline">Hidden</Badge>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="notes" className="mt-0">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">Notes & Comments</h4>
                  <Button variant="ghost" size="sm" className="h-8 text-xs">
                    Add Note
                  </Button>
                </div>
                <div className="space-y-3">
                  <div className="p-3 bg-muted/50 rounded-md">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Dr. Smith</span>
                      <span className="text-xs text-muted-foreground">May 16, 2023</span>
                    </div>
                    <p className="text-sm">
                      Normal hepatocytes with no evidence of inflammation or fibrosis. Portal tracts are unremarkable.
                    </p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-md">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Dr. Johnson</span>
                      <span className="text-xs text-muted-foreground">May 17, 2023</span>
                    </div>
                    <p className="text-sm">
                      I agree with Dr. Smith's assessment. No pathological changes observed in this sample.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      )}
    </div>
  )
}
