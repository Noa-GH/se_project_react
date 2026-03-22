import { useState, useEffect } from "react";
import { getItems, addItem } from "../utils/api";

function useClothingItems() {
    useEffect(() => {
        getItems()
            .then((data) => setClothingItems(data))
            .catch((error) => setError(error.message));
    }, [])

    const handleAddITem = async () => {
        try {
            const added = await addItem(newItem);
            setItems([added, ...items]);
        } catch (error) {
            console.error(`Failed to add item: ${error.message}`);
        }
    }

}