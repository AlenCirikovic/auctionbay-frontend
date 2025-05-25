import axios from "axios";
import authStore from "../../../stores/auth.store";
import { useState, useRef } from "react";

type ChangeAvatarProps = {
    onClose: () => void;
}

const ChangeAvatar = ({ onClose }: ChangeAvatarProps) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const currentAvatarUrl = authStore.user?.avatar 
        ? `http://localhost:3000/files/${authStore.user.avatar}`
        : "images/default_avatar.jpg";

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

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleSaveChanges = async () => {
        if (!selectedFile) {
            setError('Please select a file first');
            return;
        }

        if (!authStore.user?.id) {
            setError('User ID not found');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('avatar', selectedFile);

            const response = await axios.post(
                `http://localhost:3000/users/upload/${authStore.user.id}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                }
            );

            console.log('Avatar updated successfully:', response.data);
            

            onClose();
        } catch (error) {
            console.error('Error updating avatar:', error);
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message || 'Failed to update avatar');
            } else {
                setError('An unexpected error occurred');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        setSelectedFile(null);
        setPreviewUrl(null);
        setError(null);
        onClose();
    };

    return (
        <>
            <div className="flex flex-col relative bg-white w-[533px] h-hug rounded-[16px] p-[16px] gap-[32px] shadow-xl">
                <header>
                    <div className="flex w-full gap-[16px] h-[28px]">
                        <h4 className="font-bold text-[23px] leading-[120%]">Change Avatar</h4>
                    </div>
                </header>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        {error}
                    </div>
                )}

                <div className="flex flex-col w-full h-full justify-center items-center gap-[16px]">
                    <div className="w-[120px] h-[120px] rounded-[100px] overflow-hidden focus:outline-none border-2 border-gray-200">
                        <img 
                            className="w-full h-full object-cover" 
                            src={previewUrl || currentAvatarUrl} 
                            alt="avatar preview" 
                        />
                    </div>

                    {selectedFile && (
                        <div className="text-sm text-gray-600 text-center">
                            <p>Selected: {selectedFile.name}</p>
                            <p>Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                    )}

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/png,image/jpeg,image/jpg"
                        onChange={handleFileSelect}
                        style={{ display: 'none' }}
                    />

                    <div className="flex text-center w-[181px] h-[40px] min-h-[40px] rounded-[16px] pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[8px] border-[#272D2D] border-2 hover:bg-gray-50 transition-colors cursor-pointer">
                        <button 
                            onClick={handleUploadClick}
                            className="w-[149px] h-[24px] font-medium text-[16px] leading-[24px]"
                            type="button"
                            disabled={isLoading}
                        >
                            {selectedFile ? 'Change Picture' : 'Upload New Picture'}
                        </button>
                    </div>

                    <div className="text-xs text-gray-500 text-center max-w-[300px]">
                        Supported formats: PNG, JPG, JPEG<br />
                        Maximum file size: 5MB
                    </div>
                </div>

                <div className="flex justify-end items-center w-full h-fit gap-[16px]">
                    <div className="w-[85px] h-[40px] min-[40px] rounded-[16px] pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[8px] bg-[#EDF4F2]">
                        <button 
                            onClick={handleCancel} 
                            className="font-medium text-[16px] leading-[24px]"
                            disabled={isLoading}
                        >
                            Cancel
                        </button>
                    </div>
                    <div className="w-[139px] h-[40px] min-[40px] rounded-[16px] pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[8px] bg-[#F4FF47]">
                        <button 
                            onClick={handleSaveChanges}
                            className="font-medium text-[16px] leading-[24px]"
                            disabled={isLoading || !selectedFile}
                        >
                            {isLoading ? 'Uploading...' : 'Save Changes'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChangeAvatar;