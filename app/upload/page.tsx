"use client"

import type React from "react"

import { useState } from "react"
import { Upload, FileType, X, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { PageHeader } from "@/components/page-header"
import { Progress } from "@/components/ui/progress"

export default function UploadPage() {
  const [files, setFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [uploadComplete, setUploadComplete] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(Array.from(e.target.files))
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFiles(Array.from(e.dataTransfer.files))
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  const simulateUpload = () => {
    setUploading(true)
    setProgress(0)

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setUploading(false)
          setUploadComplete(true)
          return 100
        }
        return prev + 5
      })
    }, 200)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <PageHeader />
      <main className="flex-1 p-6 container mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Upload Pathology Images</h1>
          <p className="text-muted-foreground">
            Upload SVS or TIFF files for viewing and analysis in the pathology viewer
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Upload Files</CardTitle>
              <CardDescription>Drag and drop SVS or TIFF files, or click to select files for upload</CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center ${
                  files.length > 0 ? "border-primary" : "border-muted-foreground/25"
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                {files.length === 0 ? (
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="rounded-full bg-primary/10 p-4">
                      <Upload className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Drag files here or click to upload</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Supports SVS and TIFF file formats up to 10GB
                      </p>
                    </div>
                    <Input
                      type="file"
                      className="hidden"
                      id="file-upload"
                      accept=".svs,.tiff,.tif"
                      multiple
                      onChange={handleFileChange}
                    />
                    <Label htmlFor="file-upload" className="cursor-pointer">
                      <Button variant="outline" type="button">
                        Select Files
                      </Button>
                    </Label>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                        <div className="flex items-center gap-3">
                          <FileType className="h-5 w-5 text-muted-foreground" />
                          <div className="text-left">
                            <p className="text-sm font-medium truncate max-w-[200px]">{file.name}</p>
                            <p className="text-xs text-muted-foreground">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeFile(index)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <div className="flex justify-center mt-4">
                      <Input
                        type="file"
                        className="hidden"
                        id="add-more-files"
                        accept=".svs,.tiff,.tif"
                        multiple
                        onChange={handleFileChange}
                      />
                      <Label htmlFor="add-more-files" className="cursor-pointer">
                        <Button variant="outline" type="button" size="sm">
                          Add More Files
                        </Button>
                      </Label>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-4">
              <div className="w-full">
                <Label htmlFor="metadata" className="mb-2 block">
                  Additional Information
                </Label>
                <Textarea
                  id="metadata"
                  placeholder="Add any additional information about these images (optional)"
                  className="resize-none"
                />
              </div>
              <div className="w-full">
                {uploading && (
                  <div className="mb-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Uploading...</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} />
                  </div>
                )}
                {uploadComplete ? (
                  <div className="flex items-center gap-2 text-green-600 mb-4">
                    <Check className="h-5 w-5" />
                    <span>Upload complete! Processing files...</span>
                  </div>
                ) : (
                  <Button className="w-full" disabled={files.length === 0 || uploading} onClick={simulateUpload}>
                    {uploading ? "Uploading..." : "Upload Files"}
                  </Button>
                )}
              </div>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upload Guidelines</CardTitle>
              <CardDescription>Follow these guidelines to ensure your images are processed correctly</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-1">Supported File Formats</h3>
                <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                  <li>Aperio SVS (.svs)</li>
                  <li>TIFF/BigTIFF (.tif, .tiff)</li>
                  <li>Hamamatsu NDPI (.ndpi)</li>
                  <li>Leica SCN (.scn)</li>
                  <li>DICOM (.dcm)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-1">File Size Limits</h3>
                <p className="text-sm text-muted-foreground">
                  Individual files up to 10GB are supported. For larger files, please contact support.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-1">Processing Time</h3>
                <p className="text-sm text-muted-foreground">
                  Large files may take several minutes to process after upload. You will receive a notification when
                  processing is complete.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-1">Metadata</h3>
                <p className="text-sm text-muted-foreground">
                  The system will automatically extract metadata from your files. You can add additional information in
                  the text field provided.
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-1">Privacy & Security</h3>
                <p className="text-sm text-muted-foreground">
                  All uploads are encrypted and stored securely. Please ensure you have the necessary permissions to
                  upload and share these images.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
