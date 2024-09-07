// api.js
export const getUniqueDaysToMaturity = async () => {
    try {
      const response = await fetch('/api/unique-days-to-maturity'); // Update with your actual endpoint
      const data = await response.json();
      return data; // Assuming the API returns an array of unique days
    } catch (error) {
      console.error('Error fetching unique days:', error);
      return [];
    }
  };
  