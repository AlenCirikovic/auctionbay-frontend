import { useState } from "react"
import axios from "axios"

type AddAuctionProps = {
    onClose: () => void;
}

interface AuctionFormData {
    title: string;
    description: string;
    starting_price: string;
    end_date: string;
}

const AddAuction = ({ onClose }: AddAuctionProps) => {
    const [formData, setFormData] = useState<AuctionFormData>({
        title: '',
        description: '',
        starting_price: '',
        end_date: ''
    });
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [apiError, setApiError] = useState('');
    const [showError, setShowError] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg'];
            if (!allowedTypes.includes(file.type)) {
                setApiError('File must be a png, jpg or jpeg');
                setShowError(true);
                return;
            }

            setSelectedImage(file);
            
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
            
            setShowError(false);
        }
    };

    const validateForm = (): boolean => {
        if (!formData.title.trim()) {
            setApiError('Title is required');
            setShowError(true);
            return false;
        }
        if (!formData.description.trim()) {
            setApiError('Description is required');
            setShowError(true);
            return false;
        }
        if (!formData.starting_price.trim()) {
            setApiError('Starting price is required');
            setShowError(true);
            return false;
        }
        if (isNaN(Number(formData.starting_price)) || Number(formData.starting_price) <= 0 || !Number.isInteger(Number(formData.starting_price))) {
            setApiError('Starting price must be a valid positive whole number');
            setShowError(true);
            return false;
        }
        if (!formData.end_date) {
            setApiError('End date is required');
            setShowError(true);
            return false;
        }
        
        const endDate = new Date(formData.end_date);
        const now = new Date();
        if (endDate <= now) {
            setApiError('End date must be in the future');
            setShowError(true);
            return false;
        }

        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setShowError(false);

        try {

            const auctionData = {
                title: formData.title.trim(),
                description: formData.description.trim(),
                starting_price: parseInt(formData.starting_price), 
                end_date: new Date(formData.end_date).toISOString(), 
                active: true 
            };

            const auctionResponse = await axios.post(
                'http://localhost:3000/auction/me/auction',
                auctionData,
                {
                    withCredentials: true
                }
            );

            const createdAuction = auctionResponse.data;
            console.log('Auction created:', createdAuction);

            if (selectedImage && createdAuction.id) {
                const formDataImage = new FormData();
                formDataImage.append('image', selectedImage);

                await axios.post(
                    `http://localhost:3000/auction/upload/${createdAuction.id}`,
                    formDataImage,
                    {
                        withCredentials: true
                    }
                );
                console.log('Image uploaded successfully');
            }

            onClose();
            
        } catch (error) {
            console.error('Error creating auction:', error);
            if (axios.isAxiosError(error)) {
                setApiError(error.response?.data?.message || 'Failed to create auction');
            } else {
                setApiError('An unexpected error occurred');
            }
            setShowError(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col w-[533px] h-fit p-[16px] rounded-[16px] gap-[16px] bg-white">
                <div className="flex justify-start items-center w-full h-fit gap-[16px]">
                    <h1 className="font-bold text-[23px] leading-[120%]">Add auction</h1>
                </div>
                
                <div className="flex justify-center items-center w-full h-[168px] rounded-[16px] p-[32px] gap-[8px] border-2 border-dashed border-gray-300">
                    <input
                        type="file"
                        accept="image/png,image/jpg,image/jpeg"
                        onChange={handleImageChange}
                        className="hidden"
                        id="image-upload"
                    />
                    {imagePreview ? (
                        <div className="relative w-full h-full">
                            <img 
                                src={imagePreview} 
                                alt="Preview" 
                                className="w-full h-full object-cover rounded-[8px]"
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    setSelectedImage(null);
                                    setImagePreview(null);
                                }}
                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
                            >
                                ×
                            </button>
                        </div>
                    ) : (
                        <label htmlFor="image-upload" className="cursor-pointer">
                            <div className="w-fit h-fit max-h-[40px] rounded-[16px] border-2 pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[8px]">
                                <p className="font-medium text-[16px] leading-[24px]">Add image</p>
                            </div>
                        </label>
                    )}
                </div>

                <div className="flex flex-col w-full h-fit gap-[16px]">
                    <div className="flex flex-col w-[501px] h-[72px] gap-[8px]">
                        <label className="h-[24px] font-light text-[16px] leading-[24px]" htmlFor="title">Title</label>
                        <input 
                            className="pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[8px] font-light text-[16px] leading-[24px] h-[40px] w-full rounded-[16px] border-[1px] border-[#DDE9E6]" 
                            type="text" 
                            name="title" 
                            id="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="Write item name here"
                            required
                        />
                    </div>

                    <div className="flex flex-col w-full h-[155px] gap-[8px]">
                        <label className="h-[24px] font-light text-[16px] leading-[24px]" htmlFor="description">Description</label>
                        <textarea 
                            className="pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[8px] font-light text-[16px] leading-[24px] h-full w-full rounded-[16px] border-[1px] border-[#DDE9E6] resize-none" 
                            name="description" 
                            id="description"
                            value={formData.description}
                            onChange={(e) => handleInputChange(e as any)}
                            placeholder="Describe your item..."
                            required
                        />
                    </div>
                </div>

                <div className="flex w-full h-fit gap-[18px]">
                    <div className="flex flex-col w-full h-fit gap-[8px]">
                        <label className="h-[24px] font-light text-[16px] leading-[24px]" htmlFor="starting_price">Starting price</label>
                        <input 
                            className="pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[8px] font-light text-[16px] leading-[24px] h-[40px] w-full rounded-[16px] border-[1px] border-[#DDE9E6]" 
                            type="number" 
                            name="starting_price" 
                            id="starting_price"
                            value={formData.starting_price}
                            onChange={handleInputChange}
                            placeholder="Price"
                            min="1"
                            step="1"
                            required
                        />
                    </div>

                    <div className="flex flex-col w-full h-fit gap-[8px]">
                        <label className="h-[24px] font-light text-[16px] leading-[24px]" htmlFor="end_date">End date</label>
                        <input 
                            className="pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[8px] font-light text-[16px] leading-[24px] h-[40px] w-full rounded-[16px] border-[1px] border-[#DDE9E6]" 
                            type="datetime-local" 
                            name="end_date" 
                            id="end_date"
                            value={formData.end_date}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>

                {showError && (
                    <div className="mb-2 text-red-500 text-sm bg-red-50 p-2 rounded-[8px]">
                        {apiError}
                    </div>
                )}

                <div className="flex justify-end items-center w-full h-[40px] gap-[16px]">
                    <div className="w-[85px] h-[40px] min-[40px] rounded-[16px] pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[8px] bg-[#EDF4F2]">
                        <button 
                            type="button"
                            onClick={onClose} 
                            className="font-medium text-[16px] leading-[24px]"
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                    </div>

                    <div className="w-[139px] h-[40px] min-[40px] rounded-[16px] pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[8px] bg-[#F4FF47]">
                        <button 
                            type="submit"
                            className="font-medium text-[16px] leading-[24px]"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Saving...' : 'Save changes'}
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default AddAuction;