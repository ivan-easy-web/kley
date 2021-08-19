

$('.plusButton').each((index, button) => {
    $(button).click(() => {
        let id = $(button).attr('infoId');
        let img = $('#img' + id);
        
        let svg = $('#svg' + id);
        let hsvg = $('#svg' + id + '' + id);

        if(svg.css('display') == 'none') {
            hsvg.fadeOut('fast', () => {
                svg.fadeIn('fast');
            });
        } else {
            svg.fadeOut('fast', () => {
                hsvg.fadeIn('fast');
            });
        }
        

        switch(id) {
            case ('2') : {
                let height = img.width() * 1.414;
                img.toggleClass('i-collapsed');
                img.toggleClass('uncollapsed2');

                $('.uncollapsed2').css('height', height);
                break;
            }
            case ('5') : {
                let height = img.width();
                img.toggleClass('i-collapsed');
                img.toggleClass('uncollapsed5');

                $('.uncollapsed5').css('height', height);
                break;
            }
            case ('6') : {
                let height = img.width() * 1.414;
                img.toggleClass('i-collapsed');
                img.toggleClass('uncollapsed6');

                $('.uncollapsed6').css('height', height);
                break;
            }
            case ('7') : {
                let height = img.width() * 1.414;
                img.toggleClass('i-collapsed');
                img.toggleClass('uncollapsed7');

                $('.uncollapsed7').css('height', height);
                break;
            }
        }
        
    })
})