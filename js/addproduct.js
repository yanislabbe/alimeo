const products = [];

document.getElementById("product-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const description = document.getElementById('description');
  const image = document.getElementById("image").value;
  const link1 = document.getElementById("link1").value;
  const link2 = document.getElementById("link2").value;
  const link3 = document.getElementById("link3").value;
  const link4 = document.getElementById("link4").value;
  const link5 = document.getElementById("link5").value;
  
  const descriptionValue = "Prix régulier le plus cher: " + description.value;

  const product = {
    name: name,
    description: descriptionValue,
    "image": image,
    "image1": "img/grocery/super-c.jpg",
    "image2": "img/grocery/walmart.jpg",
    "image3": "img/grocery/iga.jpg",
    "image4": "img/grocery/maxi.jpg",
    "image5": "img/grocery/metro.jpg",
    "image6": "img/grocery/super-c-x.jpg",
    "image7": "img/grocery/walmart-x.jpg",
    "image8": "img/grocery/iga-x.jpg",
    "image9": "img/grocery/maxi-x.jpg",
    "image10": "img/grocery/metro-x.jpg",
    link1: link1,
    link2: link2,
    link3: link3,
    link4: link4,
    link5: link5,
  };

  products.push(product);
});

document.getElementById("download-data").addEventListener("click", () => {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(products));
  const downloadAnchorNode = document.createElement("a");
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", "data.json");
  document.body.appendChild(downloadAnchorNode);
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
});

const form = document.getElementById("product-form");
const downloadBtn = document.getElementById("download-data");

downloadBtn.addEventListener("click", () => {
  const name = document.getElementById("name").value;
  const image = document.getElementById("convert").files[0];

  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(blob => {
        const link = document.createElement("a");
        link.download = name + ".jpg";
        link.href = URL.createObjectURL(blob);
        link.click();
        URL.revokeObjectURL(link.href);
      }, "image/jpeg", 0.9);
    };
    img.src = reader.result;
  };
  reader.readAsDataURL(image);
});
