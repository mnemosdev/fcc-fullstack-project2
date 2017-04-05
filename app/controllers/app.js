'use strict';

(function($){
    /*
    *@ Main app.js FCC Nightlife App by mnemosdev
    */
    var URL = "https://fcc-nightlifeapp-mnemosdev.c9users.io/search/";
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
                    "<p class='clearfix'>" + current.phone + "   <i class='fa fa-phone' aria-hidden='true'></i></p>" +
                    "<p class='clearfix'><a href='" + current.url + "'>" + current.name + "</a>   <i class='fa fa-cutlery' aria-hidden='true'></i></p>" +
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
                $("#searchresults").append(el)
            })
        })
        .fail(function(jqXHR, status, err){
            console.error('ajax request failed', err);
        });
    })
})(jQuery);