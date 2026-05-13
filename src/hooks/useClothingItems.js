// src/hooks/useClothingItems.js

// Custom hook for managing clothing items
import { useState, useEffect } from "react";
import { getItems, addItem, deleteItem } from "../utils/api";

function useClothingItems() {
  // State management
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch items on mount
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
        setError(error.message);
      })
      .finally(() => setIsLoading(false));
  }, []);

  // Add item (your async version - improved!)
  const handleAddItem = async (newItem, token) => {
    try {
      setIsLoading(true);
      const added = await addItem(newItem, token);
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

  // Delete item with improved error handling
  const handleDeleteItem = async (id, token) => {
    console.log("useClothingItems: Deleting item with ID:", id, typeof id);

    try {
      setIsLoading(true);
      setError(null);

      // Make the API call
      await deleteItem(id, token);
      console.log("useClothingItems: API delete successful for ID:", id);

      // Update local state - filter out the deleted item
      setClothingItems((prevItems) => {
        console.log("Previous items:", prevItems);
        const filteredItems = prevItems.filter((item) => {
          const itemId = String(item.id ?? item._id);
          const deleteId = String(id);

          return itemId !== deleteId;
        });
        return filteredItems;
      });

      return { success: true };
    } catch (error) {
      console.error(`Failed to delete item: ${error.message}`, error);
      setError(error.message);
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  };

  const updateClothingItem = (updatedItem) => {
    setClothingItems((items) =>
      items.map((item) => (item._id === updatedItem._id ? updatedItem : item)),
    );
  };

  const clearError = () => setError(null);

  // Clear error
  const fetchItems = async () => {
    setIsLoading(true);
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
        setError(error.message);
      })
      .finally(() => setIsLoading(false));
  };

  // Return everything components will need
  return {
    clothingItems,
    isLoading,
    error,
    handleAddItem,
    handleDeleteItem,
    updateClothingItem,
    clearError,
    refetch: fetchItems,
  };
}

export default useClothingItems;
