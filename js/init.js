$(function(){
    var r = Raphael('map', 1200, 820),
        attributes = {
            fill: '#fff',
            stroke: '#3899E6',
            'stroke-width': 1,
            'stroke-linejoin': 'round'
        },
        arr = new Array();
    for (var country in paths) {
        var obj = r.path(paths[country].path);
        obj.attr(attributes);
        arr[obj.id] = country;
        obj
            .hover(function(){
                this.animate({
                    fill: '#1669AD'
                }, 300);
            }, function(){
                this.animate({
                    fill: attributes.fill
                }, 300);
            })
            .click(function(){
                document.location.hash = arr[this.id];
                var point = this.getBBox(0);
                $('#map').next('.point').remove();
                $('#map').after($('<div />').addClass('point'));
                $('.point')
                    .html(paths[arr[this.id]].name)
                    .prepend($('<a />').attr('href', '#').addClass('close').text('Close'))
                    .prepend($('<img />').attr('src', 'flags/'+arr[this.id]+'.png'))
                    .css({
                        left: point.x+(point.width/2)-80,
                        top: point.y+(point.height/2)-20
                    })
                    .fadeIn();
            });
        $('.point').find('.close').live('click', function(){
            var t = $(this),
                parent = t.parent('.point');
            parent.fadeOut(function(){
                parent.remove();
            });
            return false;
        });
    }
});