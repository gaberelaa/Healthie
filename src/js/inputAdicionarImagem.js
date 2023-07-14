const inputFile = document.querySelector('#input__picture');
const pictureImage = document.querySelector('.picture__image');
const pictureBtn = document.querySelector('.picture__btn');

pictureBtn.addEventListener('click', function () {
    inputFile.click();
});

const pictureImageTxT = `<img src="../src/images/image-fill.svg" class="icone" alt="icone de imagem">
<span class="image__Txt fw-medium">Arraste para adicionar uma imagem para o produto</span>`;

pictureImage.innerHTML = pictureImageTxT;

inputFile.addEventListener('change', function (event) {
    const inputTarget = event.target;
    const file = inputTarget.files[0];

    if (file) {
        const reader = new FileReader();

        reader.addEventListener('load', function (event) {
            const readerTarget = event.target;

            const img = document.createElement('img');
            img.src = readerTarget.result;
            img.classList.add('picture__adc');

            pictureImage.innerHTML = '';
            pictureImage.appendChild(img);
        });

        reader.readAsDataURL(file);
    } else {
        pictureImage.innerHTML = pictureImageTxT;
    }
});
