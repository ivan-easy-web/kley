
let logoWrapper = $('#logo-wrapper')
let logo = $('#logo');

let time = Date.now();
let lastX = -1;
let lastY = -1;

function move(e) {
    let x = e.pageX;
    let y = e.pageY;

    if (lastX == -1 && lastY == -1) {
      lastX = x;
      lastY = y;
    }

    let left = x - logoWrapper.offset().left;
    let top = y- logoWrapper.offset().top;

    let width = logoWrapper.width();
    let height = logoWrapper.height();

    let maxRotateX = 25;
    let maxRotateY = 25;
    let maxTranslateX = width / 5;
    let maxTranslateY = width / 7;


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









// Create the application helper and add its render target to the page
let app = new PIXI.Application({ backgroundAlpha: 0});
logo.append(app.view);
app.stage.interactive = true;






// Create the sprite and add it to the stage
let sprite = PIXI.Sprite.from('img/logo-final.jpg');
sprite.anchor.set(0.5);
sprite.x = app.screen.width/2;
sprite.y = app.screen.height/2;

let filterSprite = PIXI.Sprite.from('img/radial_gradient.png');
app.stage.addChild(filterSprite);



filterSprite.position.set(0, 0);
filterSprite.anchor.set(0.5);


let filter = new PIXI.filters.DisplacementFilter(filterSprite);
sprite.filters = [filter];

app.stage.addChild(sprite);


var handler = function(e){
  x = app.renderer.plugins.interaction.mouse.global.x;
  y = app.renderer.plugins.interaction.mouse.global.y;
  filterSprite.position.set(x, y);
}

app.stage.on("pointermove", handler);

$(window).resize(() => {
  app.renderer.view.style.width = window.innerWidth + "px";
  app.renderer.view.style.height = window.innerHeight + "px";
  sprite.position.x = (app.renderer.width / 2) - (sprite.width / 2);
  sprite.position.y = (app.renderer.height / 2) - (sprite.height / 2);
  app.renderer.resize(window.innerWidth ,window.innerHeight);
})