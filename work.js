
const ratio = 0.613

let imgs = $('.img');

function resizeImgs() {
    imgs.each((i, img) => {
        let height = img.offsetWidth * ratio;
        $(img).css('height', height);
    })
}

$(window).resize(() => {
    resizeImgs();
})

resizeImgs();