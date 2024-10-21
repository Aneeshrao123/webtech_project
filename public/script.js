const filterForm = document.getElementById('filter-form');
if (filterForm) {
  filterForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const location = document.getElementById('location').value;
    const brand = document.getElementById('brand').value;
    const budget = document.getElementById('budget').value;

    const response = await fetch(`/api/cars?location=${location}&brand=${brand}&budget=${budget}`);
    const cars = await response.json();

    const carList = document.getElementById('car-list');
    carList.innerHTML = cars.map(car => `
      <div class="car-item">
        <h3>${car.brand} ${car.model} (${car.year})</h3>
        <p>Price: ₹${car.price}</p>
        <p>Location: ${car.location}</p>
      </div>
    `).join('');
  });
}

// Handling the Sell form submission
const sellForm = document.getElementById('sell-form');
if (sellForm) {
  sellForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(sellForm);
    const carData = Object.fromEntries(formData);

    await fetch('/api/add-car', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(carData),
    });

    alert('Car added successfully!');
    sellForm.reset();
  });
}
