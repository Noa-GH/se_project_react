// src/utils/types.ts

export interface ClothingItem {
    _id: string;      // Standardized to _id
    name: string;
    weather: string;
    imageUrl?: string;
}

export interface User {
    name: string;
    avatar: string;
}