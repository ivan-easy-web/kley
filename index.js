
let logoWrapper = $('#logo-wrapper')
let logo = $('#logo');

let time = Date.now();
let lastX = 0;
let lastY = 0;

function move(e) {
    let x = e.pageX;
    let y = e.pageY;

    let left = x - logoWrapper.offset().left;
    let top = y- logoWrapper.offset().top;

    let width = logoWrapper.width();
    let height = logoWrapper.height();

    let maxRotateX = 15;
    let maxRotateY = 15;
    let maxTranslateX = width / 10;
    let maxTranslateY = width / 10;


    let currentTime = Date.now();
    let timeDiff = currentTime - time;

    let centerX = width / 2;
    let coeffX = (centerX - left) / (width / 2 );
    let moveX = x - lastX;
    lastX = x;

    let rotateX = maxRotateX * coeffX;
    let translateX = maxTranslateX * coeffX;
    
    let scaleX = 1 + (Math.abs(moveX / timeDiff)) / 10;

    let centerY = height / 2;
    let coeffY = (centerY - top) / (height / 2 );
    let moveY = y - lastY;
    lastY = y;

    let rotateY = maxRotateY * coeffY;
    let translateY = maxTranslateY * coeffY;
    let skewX = -((moveX / timeDiff) * 15) *coeffY;
    let skewY = -((moveY / timeDiff) * 10) *coeffX;
    let scaleY = 1 + (Math.abs(moveY / timeDiff)) / 5;

    time = currentTime;

    logo.css('transform', `rotateX(${rotateY}deg) rotateY(${-rotateX}deg) translate3d(${-translateX}px, ${-translateY}px, 0) scaleX(${scaleX}) scaleY(${scaleY}) skew(${skewX}deg,${skewY}deg)`);
    logo.css('-webkit-transform', `rotateX(${rotateY}deg) rotateY(${-rotateX}deg) translate3d(${-translateX}px, ${-translateY}px, 0) scaleX(${scaleX}) scaleY(${scaleY}) skew(${skewX}deg,${skewY}deg)`);
};



logoWrapper.mouseover((event) => {

    document.addEventListener('mousemove', move);

});

logoWrapper.mouseleave((event) => {
    document.removeEventListener('mousemove', move);
    logo.css('transform', `rotateX(0deg) rotateY(0deg)`);
    logo.css('-webkit-transform', `rotateX(0deg) rotateY(0deg)`);
});




const items = $('.logo-i');

items.each((index, item) => {
    setTimeout(() => {
        $(item).addClass('running');
    }, index * 1000);
})