// src/services/orchidApi.js
import { orchids as allOrchids } from '../data/orchids';

/**
 * Simulates fetching all orchids.
 * @returns {Promise<Array>} A promise that resolves to the array of all orchids.
 */
export const getAllOrchids = () => {
    // In a real app, this would be a fetch call:
    // return fetch('/api/orchids').then(res => res.json());
    return Promise.resolve(allOrchids);
};

/**
 * Simulates fetching a single orchid by its ID.
 * @param {string} id The ID of the orchid to fetch.
 * @returns {Promise<Object|undefined>} A promise that resolves to the orchid object or undefined if not found.
 */
export const getOrchidById = (id) => {
    const orchid = allOrchids.find(o => String(o.id) === String(id));
    // In a real app, this might be:
    // return fetch(`/api/orchids/${id}`).then(res => res.json());
    return Promise.resolve(orchid);
};
