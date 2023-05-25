// *******************************HOME******************************** //

try {
    // Counter
    var trigger = false;
    if (!trigger) {
        $(window).scroll(function () {
            var targetElement = $("#section2");
            var targetElementOffset = targetElement.position().top - targetElement.outerHeight() - 160;
            if ($(window).scrollTop() >= targetElementOffset && !trigger) {
                trigger = true;
                $(".count").each(function () {
                    var $this = $(this);
                    jQuery({ Counter: 0 }).animate(
                        { Counter: $this.text() },
                        {
                            duration: 1800,
                            easing: "swing",
                            step: function () {
                                $this.text(Math.ceil(this.Counter));
                            },
                        }
                    );
                });
            }
        });
    }

    // Owl Carousel
    $(".owl-carousel").owlCarousel({
        loop: true,
        margin: 20,
        responsiveClass: true,
        nav: true,
        lazyLoad: true,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 2,
            },
        },
    });

    $(window).scroll(function () {
        let scrollPos = $(window).scrollTop();
        $(".background-image").css({
            transform: "scale(" + (1 + scrollPos / 1000) + ")",
        });
    });
} catch (error) {}

// disable button
$(".form").submit(function () {
    $(".submitForm").prop("disabled", true);
});
$(".submitButton").click(function () {
    $(this).hide();
});
