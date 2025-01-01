import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';

const Modal = ({ isOpen, onClose, onCreate }) => {
    const [title, setTitle] = useState(''); // State for title
    const [idea, setIdea] = useState(''); // State for idea description
    const [region, setRegion] = useState(''); // State for region selection
    const [isCollaborative, setIsCollaborative] = useState(false); // State for collaborative toggle
    const [loading, setLoading] = useState(false); // State for loading indicator
    const { currentUser } = useSelector((state) => state.user);

    if (!isOpen) return null;

    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleIdeaChange = (e) => setIdea(e.target.value);
    const handleRegionChange = (e) => setRegion(e.target.value);
    const handleToggleChange = () => setIsCollaborative(!isCollaborative);

    const userId = currentUser?.id;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`http://localhost:5000/api/idea/create/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ title, idea, region, isCollaborative }),
            });

            if (response.ok) {
                const result = await response.json();
                toast.success("Idea created successfully!");
                setTitle('');
                setIdea('');
                setRegion('');
                setIsCollaborative(false);
                onCreate(result.idea); // Pass new idea back to parent
                onClose();
            } else {
                const result = await response.json();
                toast.error(result.message || "Failed to create idea");
            }
        } catch (error) {
            toast.error("Failed to create idea. Check your connection.");
        } finally {
            setLoading(false);
        }
    };

    return (
        
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-11/12 sm:w-96 md:w-1/2 lg:w-1/3 xl:w-1/4">
                <h2 className="text-xl font-bold mb-4">Create Idea</h2>
                <form onSubmit={handleSubmit}>
                    {/* Title Input */}
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={title}
                            onChange={handleTitleChange}
                            placeholder="Enter a title for your idea"
                            className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    {/* Idea Textarea */}
                    <div className="mb-4">
                        <label htmlFor="idea" className="block text-sm font-medium text-gray-700">
                            Idea Description
                        </label>
                        <textarea
                            id="idea"
                            name="idea"
                            value={idea}
                            onChange={handleIdeaChange}
                            placeholder="Describe your idea"
                            className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                            rows="4"
                            required
                        ></textarea>
                    </div>

                    {/* Region Selection */}
                    <div className="mb-4">
                        <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                            Region
                        </label>
                        <select
                            id="region"
                            name="region"
                            value={region}
                            onChange={handleRegionChange}
                            className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                            required
                        >
                            <option value="">Select a Region</option>
                            <option value="North America">North America</option>
                            <option value="Europe">Europe</option>
                            <option value="Asia">Asia</option>
                            <option value="Africa">Africa</option>
                            <option value="South America">South America</option>
                            <option value="Australia">Australia</option>
                        </select>
                    </div>

                    {/* Collaborative Toggle */}
                    <div className="mb-4 flex items-center gap-4">
                        <label htmlFor="isCollaborative" className="block text-sm font-medium text-gray-700">
                            Is this idea collaborative?
                        </label>
                        <div className="relative">
                            <input
                                type="checkbox"
                                id="isCollaborative"
                                name="isCollaborative"
                                checked={isCollaborative}
                                onChange={handleToggleChange}
                                className="hidden"
                            />
                            <div
                                className={`w-10 h-6 rounded-full cursor-pointer transition ${
                                    isCollaborative ? "bg-green-500" : "bg-gray-300"
                                }`}
                                onClick={handleToggleChange}
                            >
                                <div
                                    className={`w-4 h-4 bg-white rounded-full transition transform ${
                                        isCollaborative ? "translate-x-4" : ""
                                    }`}
                                ></div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="py-2 px-6 border rounded-md bg-gray-200 hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={`py-2 px-6 rounded-md ${loading ? 'bg-gray-400' : 'bg-black text-white'}`}
                            disabled={loading}
                        >
                            {loading ? 'Creating...' : 'Create'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;
