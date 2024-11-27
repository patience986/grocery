// script.js
setInterval(async function() {
    try {
      const response = await fetch('/api/dashboard-stats');
      const data = await response.json();
  
      document.querySelector('.totalStock').innerText = data.totalStock;
      document.querySelector('.totalSales').innerText = `UGX ${data.totalSales}`;
      document.querySelector('.creditSales').innerText = data.creditSales;
      document.querySelector('.receipts').innerText = data.receipts;
    } catch (err) {
      console.error('Error updating dashboard:', err);
    }
  }, 10000); // Updates every 10 seconds
  