let navBlock = $('#nav-block');


var ua = navigator.userAgent.toLowerCase(); 
if (ua.indexOf('safari') != -1) { 
  if (ua.indexOf('chrome') > -1) {
    $('#bubbles').addClass('svg-filter');
  } else {
    $('#bubbles').addClass('safari-bubbles');
    $('.bb .bubble').addClass('safari-bubble');
  }
}




let breakpoints = [];

let endX;
let endY = 0;

let bubbles = $('#bubbles');
let contactBubble = $('#contact-bubble-wrapper');

let b1 = $('#bb1');
let b2 = $('#bb2');
let b3 = $('#bb3');

let bb1 = $('#b1');
let bb2 = $('#b2');
let bb3 = $('#b3');

b1.width = 349;
b2.width = 302;
b3.width = 246;

let breakpoint1 = $('#bubbles-block');
let breakpoint2 = $('#1st-breakpoint');
let breakpoint3 = $('#2nd-breakpoint');

let progress;
let breakpoint;

let pEntered = false;

let displayingBottomBlock = ($(document).scrollTop() <= breakpoint3.offset().top)

function updateValues(scrollPos) {

    breakpoints[0] = breakpoint1.offset().top - 100;
    breakpoints[1] = breakpoint2.offset().top;
    breakpoints[2] = breakpoint3.offset().top - 500;

    if (scrollPos < breakpoints[2]) {
        if (scrollPos < breakpoints[1]) {
            if (scrollPos < breakpoints[0]) {
                if (breakpoint != 0) {
                    breakpoint = -0.5;
                } else {
                    breakpoint = 0;
                }
            } else {
                if (breakpoint == 0) {
                    breakpoint = 0.5;
                } else if (breakpoint == 2) {
                    breakpoint = -1.5;
                } else {
                    breakpoint = 1;
                }
            }
        } else {
            if (breakpoint == 1) {
                breakpoint = 1.5;
            } else if (breakpoint == 3) {
                breakpoint = -2.5;
            } else {
                breakpoint = 2;

            }
        }
    } else {
        if (breakpoint != 3) {
            breakpoint = 2.5;
        } else {
            breakpoint = 3;
        }
        
    }

    if (breakpoint == 0) {
        bubbles.css('display', 'none');
    } else {
        if (breakpoint == 0.5) {
            bubbles.css('display', 'block');
        } 
        if (breakpoint == -0.5) {
            bubbles.css('display', 'none');
        }
    }

    b1.css('margin-left', '' + bb1.offset().left + 'px');
    b2.css('margin-left', bb2.offset().left);
    b3.css('margin-left', bb3.offset().left);

    endX = bb1.offset().left - 50;

    b1.xdif = -50;

    b2.xdif = endX + b1.width / 2 - (bb2.offset().left + b2.width / 2);
    b2.ydif = bb1.offset().top + b1.width / 2 - (bb2.offset().top + b2.width / 2);

    b3.xdif = endX + b1.width / 2 - (bb3.offset().left + b3.width / 2);
    b3.ydif = bb1.offset().top + b1.width / 2 - (bb3.offset().top + b3.width / 2);

    let animationPos = scrollPos - breakpoints[0];

    if (scrollPos < breakpoints[0]) {
        progress = 0;
    } else if (scrollPos > breakpoints[1]) {
        progress = 1;
    } else {
        progress = animationPos / (breakpoints[1] - breakpoints[0]);
    }

}

function animate() {
    b1.css('transform', `translate3d(${b1.xdif * progress}px, 0px, 0)`);
    b2.css('transform', `translate3d(${b2.xdif * progress}px, ${b2.ydif * progress}px, 0)`);
    b3.css('transform', `translate3d(${b3.xdif * progress}px, ${b3.ydif * progress}px, 0)`);
}

function showBubbles() {
    bb1.css('opacity', '0');
    bb2.css('opacity', '0');
    bb3.css('opacity', '0');
}

function hideBubbles() {
    bb1.css('opacity', '1');
    bb2.css('opacity', '1');
    bb3.css('opacity', '1');
}

function transformToContactBubble() {
    contactBubble.css('left', '' + (b1.offset().left + b1.xdif - 1) + 'px');
    $('#p-v').fadeOut('fast', () => {
        $('#p-h').fadeIn('fast', () => {
            bubbles.css('display', 'none');
            contactBubble.css('display', 'flex');
        });
    });
}

function transformFromContactBubble() {
    contactBubble.css('display', 'none');
    bubbles.css('display', 'block');
    $('#p-h').fadeOut('fast', () => {
        $('#p-v').fadeIn();
    });
}

function hideContatBubble() {
    contactBubble.fadeOut('fast');
}

function showContatBubble() {
    contactBubble.fadeIn('fast');
}


$(window).scroll(function(){
    let scrollPos = $(document).scrollTop();
    if (scrollPos > 15) {
        navBlock.addClass('top-sticky')
    } else {
        navBlock.removeClass('top-sticky')
    }

    if (scrollPos > breakpoints[2] - 500) {
        $('#spacer-ontacts').fadeOut('fast')
    } else {
        $('#spacer-ontacts').fadeIn('fast');
    }

    updateValues(scrollPos);

    switch (breakpoint) {
        case 0.5: {
            showBubbles();
            animate();
            breakpoint = 1;
            break;
        }

        case -0.5: {
            hideBubbles();
            breakpoint = 0;
            break;
        }

        case 1: {
            animate();
            break;
        }

        case 1.5: {
            transformToContactBubble();
            breakpoint = 2;
            break;
        }

        case -1.5: {
            transformFromContactBubble();
            breakpoint = 1;
            break;
        }

        case 2.5: {
            hideContatBubble();
            $('#nav-block').fadeOut('fast');
            breakpoint = 3;
            break;
        }

        case -2.5: {
            showContatBubble();
            $('#nav-block').fadeIn('fast');
            breakpoint = 2;
            break;
        }
    }
    
});

$(window).resize(() => {
    let scrollPos = $(document).scrollTop();
    updateValues(scrollPos);
    animate();
})

let scrollPos = $(document).scrollTop();
updateValues(scrollPos);
if (breakpoint >= 1) {
    bb1.css('opacity', '0');
    bb2.css('opacity', '0');
    bb3.css('opacity', '0');
}
animate();