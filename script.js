let order = [];

// Fungsi untuk menambahkan item ke dalam pesanan
function addToOrder(name, price, imageUrl) {
  const existingItem = order.find((item) => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
    existingItem.subtotal = existingItem.quantity * price;
  } else {
    order.push({
      name: name,
      quantity: 1,
      price: price,
      subtotal: price,
      imageUrl: imageUrl,
    });
  }

  updateOrderList(); // Memperbarui daftar pesanan
}

// Fungsi untuk membatalkan seluruh pesanan
function cancelOrder() {
  order = []; // Kosongkan pesanan
  updateOrderList(); // Perbarui tampilan pesanan
}

// Fungsi untuk menambah jumlah item pada pesanan
function increaseQuantity(index) {
  order[index].quantity += 1;
  order[index].subtotal = order[index].quantity * order[index].price;
  updateOrderList();
}

// Fungsi untuk mengurangi jumlah item pada pesanan
function decreaseQuantity(index) {
  if (order[index].quantity > 1) {
    order[index].quantity -= 1;
    order[index].subtotal = order[index].quantity * order[index].price;
  } else {
    order.splice(index, 1); // Hapus item jika quantity 1
  }

  updateOrderList(); // Perbarui daftar pesanan
}

// Fungsi untuk menghapus item dari pesanan
function removeFromOrder(index) {
  order.splice(index, 1);
  updateOrderList(); // Perbarui daftar pesanan
}

// Fungsi untuk memperbarui tampilan daftar pesanan
function updateOrderList() {
  const orderList = document.getElementById("orderItems");
  orderList.innerHTML = ""; // Kosongkan daftar sebelumnya
  let total = 0;

  // Header untuk daftar pesanan
  orderList.innerHTML += `
    <div class="order-header">
        <span class="order-header-name">Item Menu</span>
        <span class="order-header-quantity">Jumlah</span>
        <span class="order-header-subtotal">Subtotal</span>
    </div>
  `;

  // Menambahkan item pesanan ke daftar
  order.forEach((item, index) => {
    total += item.subtotal; // Tambahkan subtotal ke total
    orderList.innerHTML += `
      <div class="order-item">
          <img src="${item.imageUrl}" alt="${item.name}" />
          <span class="order-item-name">${item.name}</span>
          <div class="order-item-quantity">
              <button class="quantity-button" onclick="decreaseQuantity(${index})">-</button>
              <input type="text" value="${
                item.quantity
              }" class="quantity-input" readonly />
              <button class="quantity-button" onclick="increaseQuantity(${index})">+</button>
          </div>
          <span class="order-item-subtotal">Rp. ${item.subtotal.toLocaleString()}</span>
          <button class="btn-remove" onclick="removeFromOrder(${index})">🗑️</button>
      </div>
    `;
  });

  // Menampilkan total harga
  document.getElementById("totalPrice").innerText =
    "Total: Rp. " + total.toLocaleString();
}

// Fungsi untuk memfilter menu berdasarkan kategori
function filterCategory(category) {
  const menuItems = document.querySelectorAll(".menu-item");
  menuItems.forEach((item) => {
    const itemCategory = item.getAttribute("data-category");
    if (category === "all" || itemCategory === category) {
      item.style.display = "flex"; // Tampilkan item sesuai kategori
    } else {
      item.style.display = "none"; // Sembunyikan item yang tidak sesuai kategori
    }
  });

  // Perbarui tombol kategori yang aktif
  document.querySelectorAll(".category-btn").forEach((btn) => {
    btn.classList.remove("active");
  });
  document.getElementById(`btn${capitalize(category)}`).classList.add("active");
}

// Fungsi untuk mengkapitalisasi kata pertama (untuk kategori)
function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Fungsi untuk menghasilkan nomor antrian acak
function generateQueueNumber() {
  const randomNumber = Math.floor(Math.random() * 1000) + 1; // Angka acak antara 1 dan 1000
  return randomNumber;
}

// Fungsi untuk menampilkan form untuk input nama dan nomor antrian
function confirmOrder() {
  const orderForm = document.getElementById("orderForm");
  orderForm.style.display = "block";
  document.querySelector(".btn-select").disabled = true; // Nonaktifkan tombol "Pesan Sekarang"

  // Menampilkan nomor antrian acak
  const queueNumberField = document.getElementById("queueNumber");
  queueNumberField.value = generateQueueNumber();
}

// Fungsi untuk menangani pengisian form
function submitOrderDetails() {
  const customerName = document.getElementById("customerName").value;
  const queueNumber = document.getElementById("queueNumber").value;

  if (customerName && queueNumber) {
    // Menyembunyikan form setelah data diisi
    const orderForm = document.getElementById("orderForm");
    orderForm.style.display = "none";

    // Menampilkan invoice setelah form diisi
    showInvoice(customerName, queueNumber);
  } else {
    alert("Mohon lengkapi semua data!");
  }
}

// Fungsi untuk menampilkan invoice dengan data pemesan
function showInvoice(customerName, queueNumber) {
  const invoiceDisplay = document.getElementById("invoiceDisplay");
  const invoiceItems = document.getElementById("invoiceItems");
  const invoiceTotal = document.getElementById("invoiceTotal");

  // Kosongkan konten sebelumnya
  invoiceItems.innerHTML = "";
  let totalInvoice = 0;

  // Menambahkan item pesanan ke dalam invoice
  order.forEach((item) => {
    totalInvoice += item.subtotal;
    invoiceItems.innerHTML += `
      <p>${item.name} (x${
      item.quantity
    }): Rp. ${item.subtotal.toLocaleString()}</p>
    `;
  });

  // Menampilkan total harga invoice
  invoiceTotal.innerText = `Total: Rp. ${totalInvoice.toLocaleString()}`;

  // Menambahkan pembatas antara daftar pesanan dan informasi pemesan
  invoiceItems.innerHTML += `<hr />`;

  // Menambahkan informasi pemesan dan nomor antrian
  invoiceItems.innerHTML += `
    <p><strong>Nama Pemesan:</strong> ${customerName}</p>
    <p><strong>Nomor Antrian:</strong> ${queueNumber}</p>
  `;

  // Tampilkan invoice dalam pesanan
  invoiceDisplay.style.display = "block"; // Menampilkan invoice
  document.querySelector(".btn-select").disabled = true; // Nonaktifkan tombol "Pesan sekarang"
  document.querySelector(".btn-cancel").innerText = "Tutup"; // Mengubah tombol Batal menjadi Tutup
  document
    .querySelector(".btn-cancel")
    .setAttribute("onclick", "closeInvoice()"); // Fungsi untuk menutup invoice
}

// Fungsi untuk menutup invoice
function closeInvoice() {
  const invoiceDisplay = document.getElementById("invoiceDisplay");
  invoiceDisplay.style.display = "none"; // Menyembunyikan invoice

  // Reset tombol
  document.querySelector(".btn-select").disabled = false;
  document.querySelector(".btn-cancel").innerText = "Batal";
  document
    .querySelector(".btn-cancel")
    .setAttribute("onclick", "cancelOrder()");
}

// Fungsi untuk menutup form melayang
function closeOrderForm() {
  const orderForm = document.getElementById("orderForm");
  orderForm.style.display = "none"; // Menyembunyikan form
  document.querySelector(".btn-select").disabled = false; // Mengaktifkan kembali tombol "Pesan Sekarang"
}
