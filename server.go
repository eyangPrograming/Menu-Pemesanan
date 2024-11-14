package main

import (
	"fmt"
	"html/template"
	"net/http"
)

// MenuItem struct untuk data menu
type MenuItem struct {
	ID       int
	Name     string
	Price    int
	Stock    bool
	ImageURL string
}

// Data makanan
var foodItems = []MenuItem{
	{ID: 1, Name: "Tahu Kipas (4 pcs)", Price: 21000, Stock: true, ImageURL: "/static/images/tahu-kipas.jpg"},
	{ID: 2, Name: "Chicken Spring Roll", Price: 18000, Stock: true, ImageURL: "/static/images/chicken-spring-roll.jpg"},
	{ID: 3, Name: "Sosis Solo", Price: 18000, Stock: true, ImageURL: "/static/images/sosis-solo.jpg"},
	{ID: 4, Name: "Pisang Goreng Pasir", Price: 12000, Stock: false, ImageURL: "/static/images/pisang-goreng.jpg"},
	{ID: 5, Name: "Ayam Cirebon", Price: 13000, Stock: false, ImageURL: "/static/images/ayam-cirebon.jpg"},
	{ID: 6, Name: "Ayam Bakar 'Sambara'", Price: 16000, Stock: true, ImageURL: "/static/images/ayam-bakar.jpg"},
	{ID: 7, Name: "Nasi Goreng", Price: 22000, Stock: true, ImageURL: "/static/images/nasi-goreng.jpg"},
	{ID: 8, Name: "Mie Goreng", Price: 20000, Stock: true, ImageURL: "/static/images/mie-goreng.jpg"},
}

// Data minuman
var drinkItems = []MenuItem{
	{ID: 9, Name: "Es Teh Manis", Price: 5000, Stock: true, ImageURL: "/static/images/es-teh-manis.jpg"},
	{ID: 10, Name: "Es Jeruk", Price: 7000, Stock: true, ImageURL: "/static/images/es-jeruk.jpg"},
	{ID: 11, Name: "Es Kopi Susu", Price: 15000, Stock: true, ImageURL: "/static/images/es-kopi-susu.jpg"},
	{ID: 12, Name: "Air Mineral", Price: 4000, Stock: true, ImageURL: "/static/images/air-mineral.jpg"},
	{ID: 13, Name: "Jus Mangga", Price: 12000, Stock: true, ImageURL: "/static/images/jus-mangga.jpg"},
	{ID: 14, Name: "Es Kelapa Muda", Price: 15000, Stock: true, ImageURL: "/static/images/es-kelapa-muda.jpg"},
	{ID: 15, Name: "Teh Tarik", Price: 8000, Stock: true, ImageURL: "/static/images/teh-tarik.jpg"},
	{ID: 16, Name: "Jus Jeruk", Price: 10000, Stock: true, ImageURL: "/static/images/jus-jeruk.jpg"},
}

// Data dessert
var dessertItems = []MenuItem{
	{ID: 17, Name: "Puding Coklat", Price: 15000, Stock: true, ImageURL: "/static/images/puding-coklat.jpg"},
	{ID: 18, Name: "Kue Cubir", Price: 12000, Stock: true, ImageURL: "/static/images/kue-cubir.jpg"},
	{ID: 19, Name: "Es Krim Vanilla", Price: 20000, Stock: true, ImageURL: "/static/images/es-krim-vanilla.jpg"},
	{ID: 20, Name: "Brownies", Price: 18000, Stock: true, ImageURL: "/static/images/brownies.jpg"},
	{ID: 21, Name: "Klepon", Price: 12000, Stock: true, ImageURL: "/static/images/klepon.jpg"},
	{ID: 22, Name: "Tart Strawberry", Price: 22000, Stock: true, ImageURL: "/static/images/tart-strawberry.jpg"},
	{ID: 23, Name: "Kue Lapis", Price: 15000, Stock: true, ImageURL: "/static/images/kue-lapis.jpg"},
	{ID: 24, Name: "Kue Pancong", Price: 12000, Stock: true, ImageURL: "/static/images/kue-pancong.jpg"},
}

// MenuData struct untuk data menu yang akan diteruskan ke template
type MenuData struct {
	Foods   []MenuItem
	Drinks  []MenuItem
	Desserts []MenuItem
}

func homePage(w http.ResponseWriter, r *http.Request) {
	// Menyiapkan data menu untuk dikirim ke template
	data := MenuData{
		Foods:   foodItems,
		Drinks:  drinkItems,
		Desserts: dessertItems,
	}

	// Parsing template dan mengeksekusinya dengan data menu
	tmpl := template.Must(template.ParseFiles("templates/index.html"))
	tmpl.Execute(w, data)
}

func main() {
	// Menangani route untuk home page
	http.HandleFunc("/", homePage)

	// Menyajikan file statis (gambar, css, js)
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))
	http.Handle("/script.js", http.FileServer(http.Dir(".")))

	// Menjalankan server pada port 8080
	fmt.Println("Server started at http://localhost:8080")
	http.ListenAndServe(":8080", nil)
}
