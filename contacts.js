

let b = $('#b');
let bb = $('#bb');
let width = b.width();

let xdiff = 0;
let ydiff = 0;

let startX;
let startY;
let animationStarted = false;
let animating = true;



if ($(window).width() > 979) {
    setTimeout(() => {
        bb.css('opacity', 0);
        b.css('display', 'flex');
        b.css('left', '' + bb.offset().left + 'px');
        b.css('top', '' + bb.offset().top + 'px');
    
        $(document).mousemove((e) => {
            if ($(window).width() > 1100) {
                let x = e.pageX;
                let y = e.pageY;
            
                if (animating) {
                    if (!animationStarted) {
                        startX = bb.offset().left + width/2;
                        startY = bb.offset().top + width/2;
                        animationStarted = true;
                    }
                    
                    ydiff = ydiff + y - b.offset().top - width/2;
                        
                    b.css('transform', `translate3d(${x - startX}px, ${y - startY}px, 0)`);
                    b.css('transition', 'transform 150ms ease-out');
                } else {
                    b.css('transform', `translate3d(0px, 0px, 0)`);
                    b.css('transition', 'transform 600ms ease-out');
                    animationStarted = false;
                }
            }
            
        })
    
        $('a, nav-item').hover(() => {animating = false}, () => {animating = true});
    }, 1000);

    $(window).resize(() => {
        b.css('left', '' + bb.offset().left + 'px');
        
    })

    $('a, .nav-item').click(e => {
        e.stopPropagation();
    })

    $(document).click(e => {
        window.location.href = 'mailto:sonja@kley.studio';
    })
}



