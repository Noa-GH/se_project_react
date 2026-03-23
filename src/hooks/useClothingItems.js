// src/hooks/useClothingItems.js

// Custom hook for managing clothing items
import { useState, useEffect } from "react";
import { getItems, addItem, deleteItem } from "../utils/api";

function useClothingItems() {
    // State management
    const [clothingItems, setClothingItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch items on mount (what you already had!)
    useEffect(() => {
        setIsLoading(true);
        setError(null);

        getItems()
            .then((data) => setClothingItems(data))
            .catch((error) => setError(error.message))
            .finally(() => setIsLoading(false));
    }, []);

    // Add item (your async version - improved!)
    const handleAddItem = async (newItem) => {
        try {
            setIsLoading(true);
            const added = await addItem(newItem);
            setClothingItems((prevItems) => [added, ...prevItems]);
            return { success: true, item: added };
        } catch (error) {
            console.error(`Failed to add item: ${error.message}`);
            setError(error.message);
            return { success: false, error };
        } finally {
            setIsLoading(false);
        }
    };

    // Delete item
    const handleDeleteItem = async (id) => {
        try {
            setIsLoading(true);
            await deleteItem(id);
            setClothingItems((prevItems) =>
                prevItems.filter((item) => String(item._id) !== String(id)),
            );
            return { success: true };
        } catch (error) {
            console.error(`Failed to delete item: ${error.message}`);
            setError(error.message);
            return { success: false, error };
        } finally {
            setIsLoading(false);
        }
    };

    // Clear error
    const clearError = () => setError(null);

    // Return everything components will need
    return {
        clothingItems,
        isLoading,
        error,
        handleAddItem,
        handleDeleteItem,
        clearError,
    };
}

export default useClothingItems;