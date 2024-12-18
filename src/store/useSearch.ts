import { useState } from "react";

const MAX_RECENT_SEARCHES = 5;

const useRecentSearches = () => {
  const getStoredSearches = (): string[] => {
    try {
      const storedSearches = localStorage.getItem("recentSearches");
      return storedSearches ? JSON.parse(storedSearches) : [];
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return [];
    }
  };

  const [recentSearches, setRecentSearches] =
    useState<string[]>(getStoredSearches());

  const saveSearchesToLocalStorage = (searches: string[]) => {
    try {
      localStorage.setItem("recentSearches", JSON.stringify(searches));
    } catch (error) {
      console.error("Error writing to localStorage:", error);
    }
  };

  const addSearch = (searchTerm: string) => {
    const updatedSearches = recentSearches.filter(
      (term) => term !== searchTerm
    );
    const newSearches = [searchTerm, ...updatedSearches];

    if (newSearches.length > MAX_RECENT_SEARCHES) {
      newSearches.pop();
    }

    setRecentSearches(newSearches);
    saveSearchesToLocalStorage(newSearches);
  };

  const removeSearch = (searchTerm: string) => {
    const updatedSearches = recentSearches.filter(
      (term) => term !== searchTerm
    );
    setRecentSearches(updatedSearches);
    saveSearchesToLocalStorage(updatedSearches);
  };

  const clearSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  return {
    recentSearches,
    addSearch,
    removeSearch,
    clearSearches,
  };
};

export default useRecentSearches;
