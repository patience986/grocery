function showStock(stockId) {
    const stockInfo = document.getElementById(stockId);
    stockInfo.style.display = 'block';
    setTimeout(() => {
        stockInfo.style.display = 'none';
    }, 30000); // Hide after 3 seconds
}