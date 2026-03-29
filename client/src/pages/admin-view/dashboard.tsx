import ProductImageUpload from "@/components/admin-view/image-upload"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { addFeatureImage, getFeatureImages } from "@/store/common-slice"



const AdminDashboard = () => {
    const [imageFile, setImageFile] = useState(null)
    const [imageLoadingState, setImageLoadingState] = useState(false)
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");

    const dispatch = useAppDispatch()
    const { featureImageList } = useAppSelector((state) => state.commonFeature)

    function handleUploadImage() {
        dispatch(addFeatureImage(uploadedImageUrl)).then((data: any) => {
            if (data?.payload?.success) {
                dispatch(getFeatureImages())
                setImageFile(null)
                setUploadedImageUrl("")
            }
        })
    }
    useEffect(() => {
        dispatch(getFeatureImages())
    }, [dispatch])

    return (
        <div>
            <ProductImageUpload
                imageFile={imageFile}
                setImageFile={setImageFile}
                imageLoadingState={imageLoadingState}
                setImageLoadingState={setImageLoadingState}
                isCustomStyling={true}
                uploadedImageUrl={uploadedImageUrl}
                setUploadedImageUrl={setUploadedImageUrl}
            />
            <Button className="mt-5 w-full" onClick={handleUploadImage}>Upload</Button>
            <div className="flex flex-col gap-4 mt-5">
                {
                    featureImageList && featureImageList.length > 0 ? featureImageList.map((singleImage: any, index: any) => (
                        <div key={index} className="relative">
                            <img src={singleImage.image} alt="" className=" w-full h-[300] object-cover rounded-t-lg" />
                        </div>
                    )) : null
                }
            </div>
        </div>
    )
}

export default AdminDashboard