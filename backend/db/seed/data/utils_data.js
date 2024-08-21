// Utility function to format date
const formatDate = (date) => {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    return null; // or return an empty string, or handle it in a way that suits your needs
  }
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

module.exports = {
  formatDate,
};
