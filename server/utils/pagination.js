/**
 * Formats a paginated response to a standard structure.
 * 
 * @param {Array} data - The array of items for the current page.
 * @param {Number} total - The total count of items across all pages.
 * @param {Number|String} page - The current page number.
 * @param {Number|String} limit - The limit of items per page.
 * @returns {Object} Standardized pagination object
 */
export const formatPaginatedResponse = (data, total, page, limit) => {
  const pageNum = parseInt(page, 10) || 1;
  const limitNum = parseInt(limit, 10) || 20;
  
  return {
    data,
    page: pageNum,
    totalPages: Math.ceil(total / limitNum),
    totalCount: total
  };
};
