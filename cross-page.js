function fadeOut(event) {
    event.preventDefault();

    let prevB = false;
    if ($(event.currentTarget).hasClass('prev-button')) {
        prevB = true;
    }

    let href = event.currentTarget.href || event.currentTarget.dataset.href;
    

    if(( href && href != null && ($(event.currentTarget).attr('bs-toggle') !== "" )) || prevB) {

        if ($(window).width() < 1100) {
            $( ".right-content" ).each((index, item) =>{
                $(item).removeClass('fadeInRight').addClass('fadeOutLeft');
            } );
            setTimeout(function(){
                if (prevB) {
                    if (window.location.href == document.referrer) {
                        window.location.href = "/index.html";
                    } else {
                        window.location.href = document.referrer;
                    }
                } else {
                    window.location.href = href;
                }
            }, 600)
        } else {
            $('#header-middle').fadeOut('fast');
            $( ".left-content" ).each((index, item) => {
                $(item).removeClass('fadeInLeft').addClass('fadeOutLeft');
            });
            $( ".right-content" ).each((index, item) =>{
                $(item).removeClass('fadeInRight').addClass('fadeOutRight');
            } );
            setTimeout(function(){
                if (prevB) {
                    if (window.location.href == document.referrer) {
                        window.location.href = "/index.html";
                    } else {
                        window.location.href = document.referrer;
                    }
                } else{
                    window.location.href = href;
                }
            }, 600)
        }

        
    }
}


$('.nav-item').click((event) => fadeOut(event));



const heaerMiddle = $('#header-middle');
const rightColumn = $( "#right-column" );
const footerNavs = $('#footer-navs');

function fixHeaderMiddlePosition() {
    if ($( window ).width() > 1099) {
        let leftOffset = parseInt(rightColumn[0].offsetLeft);
        let attr = rightColumn.attr('data-header-main');
        if (attr == '1') {
            leftOffset += 35;
        }
        heaerMiddle.css('position', 'fixed');
        heaerMiddle.css('left', leftOffset);
        $('#header-middle').fadeIn();
    } else {
        heaerMiddle.css('position', 'static');
    }
};

function fixFooterNavsPosition() {
    if ($( window ).width() > 1099) {
        let leftOffset = parseInt(rightColumn[0].offsetLeft);
        footerNavs.css('margin-left', '' + leftOffset - 35 - 24 + 'px');
    }
}

$(window).resize(() => {
    fixHeaderMiddlePosition();
    fixFooterNavsPosition();
});



fixHeaderMiddlePosition();
fixFooterNavsPosition();

$(window).bind("pageshow", function(event) {
    if (event.originalEvent.persisted) {
        window.location.reload() 
    }
});