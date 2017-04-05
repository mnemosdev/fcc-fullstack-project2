'use strict';

(function($){
    /*
    *@ Main app.js FCC Nightlife App by mnemosdev
    */
    var URL = "https://fcc-nightlifeapp-mnemosdev.c9users.io/search/";
    var URL_RSVP = "https://fcc-nightlifeapp-mnemosdev.c9users.io/rsvp";
    $("#searchapiform").on('submit', function(e){
        e.preventDefault();
        var searchfor = $("#searchapiform input").val();
        $("#searchapiform input").val("");
        
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: URL + searchfor
        })
        .done(function(data, status, jqXHR){
            // console.log(data);
            data.forEach(function(current, index, array){
                // console.log(current, index);
                if(current.image_url == ""){
                    current.image_url = "https://gh-prod-ruby-images.s3.amazonaws.com/uploads/growth_study_post/logo/11/yelp_logo.png";
                }
                if(current.price == undefined){
                    current.price = "Unknown";
                }
                var elheader = "<div id='" + current.id + "' class='jumbotron result clearfix'>";
                var el = 
                    "<img class='img-responsive pull-left clearfix' src='" + current.image_url + "' />" +
                    "<p class='clearfix'>RSVP   <i class='fa fa-bookmark rsvp' aria-hidden='true'></i></p>" + 
                    "<p class='clearfix'>" + current.phone + "   <i class='fa fa-phone' aria-hidden='true'></i></p>" +
                    "<p class='clearfix'><a href='" + current.url + "' target='_blank'>" + current.name + "</a>   <i class='fa fa-cutlery' aria-hidden='true'></i></p>" +
                    "<p class='clearfix'>" + current.rating + "   <i class='fa fa-star' aria-hidden='true'></i></p>" +
                    "<p class='clearfix'>" + current.price + "   <i class='fa fa-money' aria-hidden='true'></i></p>"
                    "</div>";
                var elfooter = "</div>";
                if(current.is_closed){
                    elheader += "<p style='width: 20px; height: 20px; background-color: red; border-radius: 50%;' class='clearfix'></p>";
                } else {
                    elheader += "<p style='width: 20px; height: 20px; background-color: green; border-radius: 50%;' class='clearfix'></p>";
                }
                el = elheader + el + elfooter;
                $("#searchresults").append(el);
            });
            
            $('.rsvp').on('click', function(e){
                var el = $(this).parent().parent();
                var elid = el[0].id;
                $.ajax({
                    type: 'POST',
                    url: URL_RSVP,
                    data: { 'id' : elid }
                })
                .done(function(data, status, jqXHR){
                    console.log(data);
                    if(data.registered == "false"){
                        $("h1").append("<h2 style='font-size: 18px;'>You must register to be able to rsvp</h2>");
                        $("h2").fadeOut(4000);
                    }
                    if(data.found == "true"){
                        $("h1").append("<h2 style='font-size: 18px;'>You rsvp already</h2>");
                        $("h2").fadeOut(4000);
                        $("#" + data.id + " i.fa-bookmark").css('color', 'blue');
                    }else if(data.added == 'true'){
                        $("#" + data.id + " i.fa-bookmark").css('color', 'red');
                    }
                })
                .fail(function(jqXHR, status, err){
                    console.log(err);
                });
            });
            
        })
        .fail(function(jqXHR, status, err){
            console.error('ajax request failed', err);
        });
    });
})(jQuery);