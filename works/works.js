
let videos = $('video');

videos.each((index, video) => {
    if ($(window).width() < 500) {
        $(video).attr('autoplay', '');
        $(video).attr('preload', '');
    }
    $(video).mouseenter(() => {
        video.play()

    })
    $(video).mouseleave(() => {
        video.pause();
        $(video).removeAttr('controls');
    })
    $(video).click(() => {
        $(video).attr('controls', '');
    })
})

let navBlock = $('#nav-block');
let contacts = $('#contacts');

$(window).scroll(function(){
    let scrollPos = $(document).scrollTop();
    if (scrollPos > 15) {
        navBlock.addClass('top-sticky')
    } else {
        navBlock.removeClass('top-sticky')
    }

    let bottomOffset = $(document).height() - $( window ).height() - scrollPos + 35;
    if (bottomOffset < 90) {
        contacts.css('bottom', 90 - bottomOffset);
    } else {
        contacts.css('bottom', 0);
    }
});

