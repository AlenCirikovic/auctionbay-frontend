import axios from "axios";
import authStore from "../../../stores/auth.store";
import { useState, useEffect } from "react";

type ProfileSettingsProps = {
    onClose: () => void;
    onChangePassword: () => void;
    onChangeAvatar: () => void;
};

interface UserFormData {
    name: string;
    surname: string;
    email: string;
}

const ProfileSettings = ({ onClose, onChangePassword, onChangeAvatar }: ProfileSettingsProps) => {
    const [formData, setFormData] = useState<UserFormData>({
        name: '',
        surname: '',
        email: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Load current user data when component mounts
    useEffect(() => {
        if (authStore.user) {
            setFormData({
                name: authStore.user.name || '',
                surname: authStore.user.surname || '',
                email: authStore.user.email || ''
            });
        }
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!authStore.user?.id) {
            setError('User ID not found');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.patch(
                `http://localhost:3000/users/${authStore.user.id}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );

            console.log('User updated successfully:', response.data);
            
            // Update the auth store with new user data if needed
            // authStore.updateUser(response.data);
            
            // Close the modal after successful update
            onClose();
        } catch (error) {
            console.error('Error updating user:', error);
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message || 'Failed to update profile');
            } else {
                setError('An unexpected error occurred');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col bg-white w-[533px] h-[404px] rounded-[16px] p-[16px] gap-[32px] shadow-xl">
            <header>
                <div className="flex w-full gap-[16px] h-[28px]">
                    <h4 className="font-bold text-[23px] leading-[120%]">Profile settings</h4>
                </div>
            </header>
            
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            )}
            
            <form onSubmit={handleSubmit} className="flex flex-col w-[501px] h-[240px] gap-[16px]">
                <div className="flex w-[501px] h-[72px] gap-[17px]">
                    <div className="flex flex-col w-[242px] h-[72px] gap-[8px]">
                        <label className="w-[184px] h-[24px] font-light text-[16px] leading-[24px]" htmlFor="name">
                            Name
                        </label>
                        <input 
                            className="pt-[16px] pr-[8px] pb-[16px] pl-[8px] gap-[8px] font-light text-[16px] leading-[24px] h-[40px] w-[242px] rounded-[16px] border-[1px] border-[#DDE9E6]" 
                            type="text" 
                            name="name" 
                            id="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Enter your name"
                            required
                        />
                    </div>
                    <div className="flex flex-col w-[242px] h-[72px] gap-[8px]">
                        <label className="w-[184px] h-[24px] font-light text-[16px] leading-[24px]" htmlFor="surname">
                            Surname
                        </label>
                        <input 
                            className="pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[8px] font-light text-[16px] leading-[24px] h-[40px] w-[242px] rounded-[16px] border-[1px] border-[#DDE9E6]" 
                            type="text" 
                            name="surname" 
                            id="surname"
                            value={formData.surname}
                            onChange={handleInputChange}
                            placeholder="Enter your surname"
                            required
                        />
                    </div>
                </div>
                <div className="flex flex-col w-[501px] h-[72px] gap-[8px]">
                    <label className="h-[24px] font-light text-[16px] leading-[24px]" htmlFor="email">
                        Email
                    </label>
                    <input 
                        className="pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[8px] font-light text-[16px] leading-[24px] h-[40px] w-full rounded-[16px] border-[1px] border-[#DDE9E6]" 
                        type="email" 
                        name="email" 
                        id="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <button onClick={onChangePassword} className="text-left" type="button">
                    Change password
                </button>
                <button onClick={onChangeAvatar} className="text-left" type="button">
                    Change profile picture
                </button>
            </form>
            
            <div className="flex justify-end items-center w-full h-[40px] gap-[16px]">
                <div className="w-[85px] h-[40px] min-[40px] rounded-[16px] pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[8px] bg-[#EDF4F2]">
                    <button 
                        onClick={onClose} 
                        className="font-medium text-[16px] leading-[24px]"
                        type="button"
                        disabled={isLoading}
                    >
                        Cancel
                    </button>
                </div>
                <div className="w-[139px] h-[40px] min-[40px] rounded-[16px] pt-[8px] pr-[16px] pb-[8px] pl-[16px] gap-[8px] bg-[#F4FF47]">
                    <button 
                        className="font-medium text-[16px] leading-[24px]"
                        type="submit"
                        disabled={isLoading}
                        onClick={handleSubmit}
                    >
                        {isLoading ? 'Saving...' : 'Save changes'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileSettings;