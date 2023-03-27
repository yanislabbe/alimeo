document.getElementById('uploadImage').addEventListener('change', function (event) {
    const img = document.getElementById('sourceImage');
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        img.src = e.target.result;
        img.onload = function () {
            document.getElementById('convertButton').style.display = 'block';
        }
    };
    reader.readAsDataURL(file);
});
document.getElementById('convertButton').addEventListener('click', function () {
    const img = document.getElementById('sourceImage');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const outputFormat = document.getElementById('outputFormat').value;
    const extension = outputFormat.split('/')[1];
    const imageName = document.getElementById('imageName').value;
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, img.width, img.height);

    canvas.toBlob(function (blob) {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = imageName + '.' + extension;
        link.click();
    }, outputFormat, 1);
});