import axios from "axios";
import authStore from "../../../stores/auth.store";
import { useState, useRef, useEffect } from "react";
import type { AuctionType } from "../../../models/auction";


type EditAuctionProps = {
    onClose: () => void;
    auction: AuctionType;
    onAuctionUpdated: () => void;
}

interface AuctionFormData {
    title: string;
    description: string;
    starting_price: number;
    end_date: string;
}

const EditAuction = ({ onClose, auction, onAuctionUpdated }: EditAuctionProps) => {
    const [formData, setFormData] = useState<AuctionFormData>({
        title: '',
        description: '',
        starting_price: 0,
        end_date: ''
    });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const currentImageUrl = auction.image 
        ? `http://localhost:3000/files/${auction.image}`
        : "images/Auctions.png";

    useEffect(() => {
        if (auction) {
            const formatDate = (dateString: string | Date) => {
                const date = new Date(dateString);
                return date.toISOString().split('T')[0];
            };

            setFormData({
                title: auction.title || '',
                description: auction.description || '',
                starting_price: auction.starting_price || 0,
                end_date: formatDate(auction.end_date)
            });
        }
    }, [auction]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'starting_price' ? parseInt(value) || 0 : value
        }));
    };

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
        if (!allowedTypes.includes(file.type)) {
            setError('Please select a PNG, JPG, or JPEG file');
            return;
        }

        const maxSize = 5 * 1024 * 1024; 
        if (file.size > maxSize) {
            setError('File size must be less than 5MB');
            return;
        }

        setSelectedFile(file);
        setError(null);

        const reader = new FileReader();
        reader.onload = (e) => {
            setPreviewUrl(e.target?.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleImageUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!authStore.user?.id) {
            setError('User ID not found');
            return;
        }

        if (!auction.id) {
            setError('Auction ID not found');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const updateData = {
                ...formData,
                end_date: new Date(formData.end_date).toISOString()
            };

            const response = await axios.patch(
                `http://localhost:3000/auction/me/auction/${auction.id}`,
                updateData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true
                }
            );

            console.log('Auction updated successfully:', response.data);

            if (selectedFile) {
                const imageFormData = new FormData();
                imageFormData.append('image', selectedFile);

                const imageResponse = await axios.patch(
                    `http://localhost:3000/auction/upload/${auction.id}`,
                    imageFormData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                        withCredentials: true
                    }
                );

                console.log('Auction image updated successfully:', imageResponse.data);
            }

            onAuctionUpdated();
            
            onClose();
        } catch (error) {
            console.error('Error updating auction:', error);
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message || 'Failed to update auction');
            } else {
                setError('An unexpected error occurred');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        // Reset state
        setSelectedFile(null);
        setPreviewUrl(null);
        setError(null);
        onClose();
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col w-[533px] h-fit p-[16px] rounded-[16px] gap-[16px] bg-white shadow-xl">
                <div className="flex justify-start items-center w-full h-fit gap-[16px]">
                    <h1 className="font-bold text-[23px] leading-[120%]">Edit auction</h1>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        {error}
                    </div>
                )}

                <div className="flex justify-center items-center w-full h-[168px] rounded-[16px] p-[32px] gap-[8px] border border-gray-200">
                    {(previewUrl || auction.image) ? (
                        <div className="flex flex-col items-center gap-4">
                            <img 
                                src={previewUrl || currentImageUrl} 
                                alt="Auction preview" 
                                className="max-h-[100px] max-w-[200px] object-contain rounded-lg"
                            />
                            <button 
                                type="button"
                                onClick={handleImageUploadClick}
                                className="w-fit h-fit max-h-[40px] rounded-[16px] border-2 pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[8px] hover:bg-gray-50 transition-colors"
                                disabled={isLoading}
                            >
                                <p className="font-medium text-[16px] leading-[24px]">Change image</p>
                            </button>
                        </div>
                    ) : (
                        <button 
                            type="button"
                            onClick={handleImageUploadClick}
                            className="w-fit h-fit max-h-[40px] rounded-[16px] border-2 pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[8px] hover:bg-gray-50 transition-colors"
                            disabled={isLoading}
                        >
                            <p className="font-medium text-[16px] leading-[24px]">Add image</p>
                        </button>
                    )}
                </div>

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/jpg"
                    onChange={handleFileSelect}
                    style={{ display: 'none' }}
                />

                {selectedFile && (
                    <div className="text-sm text-gray-600 text-center">
                        <p>Selected: {selectedFile.name}</p>
                        <p>Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                )}

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
                            disabled={isLoading}
                        />
                    </div>
                    <div className="flex flex-col w-full h-[155px] gap-[8px]">
                        <label className="h-[24px] font-light text-[16px] leading-[24px]" htmlFor="description">Description</label>
                        <textarea 
                            className="pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[8px] font-light text-[16px] leading-[24px] h-full w-full rounded-[16px] border-[1px] border-[#DDE9E6] resize-none" 
                            name="description" 
                            id="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Describe your item..."
                            required
                            disabled={isLoading}
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
                            required
                            disabled={isLoading}
                        />
                    </div>
                    <div className="flex flex-col w-full h-fit gap-[8px]">
                        <label className="h-[24px] font-light text-[16px] leading-[24px]" htmlFor="end_date">End date</label>
                        <input 
                            className="pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[8px] font-light text-[16px] leading-[24px] h-[40px] w-full rounded-[16px] border-[1px] border-[#DDE9E6]" 
                            type="date" 
                            name="end_date" 
                            id="end_date"
                            value={formData.end_date}
                            onChange={handleInputChange}
                            required
                            disabled={isLoading}
                            min={new Date().toISOString().split('T')[0]} 
                        />
                    </div>
                </div>
                <div className="flex justify-end items-center w-full h-[40px] gap-[16px]">
                    <div className="w-[85px] h-[40px] min-[40px] rounded-[16px] pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[8px] bg-[#EDF4F2]">
                        <button 
                            type="button"
                            onClick={handleCancel} 
                            className="font-medium text-[16px] leading-[24px]"
                            disabled={isLoading}
                        >
                            Cancel
                        </button>
                    </div>
                    <div className="w-[139px] h-[40px] min-[40px] rounded-[16px] pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[8px] bg-[#272D2D]">
                        <button 
                            type="submit"
                            className="font-medium text-[16px] text-white leading-[24px]"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Updating...' : 'Update auction'}
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default EditAuction;