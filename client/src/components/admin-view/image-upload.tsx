import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
// import axios from "axios";
import { Skeleton } from "../ui/skeleton";
import { useEffect, useRef } from "react";

const ProductImageUpload = ({
    isCustomStyling = false,
    imageFile,
    setImageFile,
    isEditMode = false,
    imageLoadingState,
    setImageLoadingState,
    // uploadedImageUrl,
    setUploadedImageUrl
}: any) => {

    const inputRef = useRef<any>(null);
    const handleImageFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();

        const file = event.target.value
        if (file) {
            setImageFile(file)
        }

    }

    const handleRemoveImage = () => {
        setImageFile(null)
        if (inputRef.current) {
            inputRef.current.value = ''
        }
    }

    async function uploadImageToCloud() {
        setImageLoadingState(true)
        // const response = await axios.post("http://localhost:5000/api/admin/products/upload-image", { image: imageFile })
        if (imageFile !== null) {
            setUploadedImageUrl(imageFile)
            setImageLoadingState(false)

        }
    }

    useEffect(() => {
        if (imageFile !== null) {
            uploadImageToCloud()
        }
    }, [imageFile])

    // console.log(imageFile)
    return (
        <div className={`w-full mt-4 ${isCustomStyling ? '' : 'max-w-md mx-auto'}`}>
            <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
            <div className="border-2 border-dashed rounded-lg p-4">
                <Input id="image-upload" ref={inputRef} type="text" onChange={handleImageFileChange} />
                {!imageFile ? (
                    <Label
                        htmlFor="image-upload"
                        className={`${isEditMode ? "cursor-not-allowed" : ""
                            } flex flex-col items-center justify-center h-32 cursor-pointer`}
                    >
                        <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
                        <span> Insert image path</span>
                    </Label>
                ) : imageLoadingState ? (
                    <Skeleton className="h-10 bg-gray-100" />
                ) : (
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <FileIcon className="w-8 text-primary mr-2 h-8" />
                        </div>
                        <p className="text-sm font-medium">{imageFile}</p>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground hover:text-foreground"
                            onClick={handleRemoveImage}
                        >
                            <XIcon className="w-4 h-4" />
                            <span className="sr-only">Remove File</span>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProductImageUpload