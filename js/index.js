async function loadProducts() {
    try {
      const response = await fetch('json/data.json');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Erreur lors du chargement des produits :', error);
      return [];
    }
  }

  function createImageElement(src, alt, width) {
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.style.width = `${width}px`;
    return img;
  }

  function createImage(product, index) {
    const image = createImageElement(product[`image${index}`], product.name, 80);
    if (product[`link${index}`]) {
      const link = document.createElement('a');
      link.href = product[`link${index}`];
      link.target = '_blank';
      link.appendChild(image);
      return link;
    }
    return image;
  }

  function displayResults(products, searchTerm) {
    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = '';

    const matchingProducts = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (matchingProducts.length === 0) {
      const noResults = document.createElement('p');
      noResults.textContent = 'Aucun produit trouvé.';
      resultsContainer.appendChild(noResults);
      return;
    }

    matchingProducts.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.className = 'products';

      const productName = document.createElement('h2');
      productName.textContent = product.name;
      productDiv.appendChild(productName);

      const productImage = createImageElement(product.image, product.name, 140);
      productDiv.appendChild(productImage);

      const productDescription = document.createElement('p');
      productDescription.textContent = product.description;
      productDiv.appendChild(productDescription);

      for (let i = 1; i <= 5; i++) {
        productDiv.appendChild(createImage(product, i));
      }

      resultsContainer.appendChild(productDiv);
    });
  }

  function toggleLogoVisibility(searchTerm) {
    const logoContainer = document.querySelector(".logo-container");
    const mainContainer = document.getElementById("main-container");
    
    if (searchTerm === "") {
      logoContainer.style.display = "flex";
      mainContainer.classList.remove("top");
    } else {
      logoContainer.style.display = "none";
      mainContainer.classList.add("top");
    }
  }

  function toggleRaise(searchTerm) {
    const mainContainer = document.getElementById("main-container");
  
    if (searchTerm === "") {
      mainContainer.classList.add("raise");
    } else {
      mainContainer.classList.remove("raise");
    }
  }
  
  async function main() {
    const products = await loadProducts();
    const searchInput = document.getElementById("search");
  
    searchInput.addEventListener("input", () => {
      const searchTerm = searchInput.value.trim();
      toggleLogoVisibility(searchTerm);
      toggleRaise(searchTerm);
  
      if (searchTerm === "") {
        document.getElementById("main-container").classList.remove("top");
        document.getElementById("results").innerHTML = "";
        return;
      }
  
      document.getElementById("main-container").classList.add("top");
      displayResults(products, searchTerm);
    });
  
    toggleRaise("");
  }
  
  document.addEventListener("DOMContentLoaded", main);
  