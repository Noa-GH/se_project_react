// src/utils/types.ts

interface ClothingItem {
    id: string;      // Standardized to _id
    name: string;
    weather: string;
    imageUrl?: string;
}

export default ClothingItem

export interface User {
    name: string;
    avatar: string;
}