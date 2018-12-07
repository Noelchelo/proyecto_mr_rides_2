$(window).scroll(function() {
        if ($("#main-nav").offset().top > 80) {
          $("#main-nav").removeClass("bg-dark");
          $("#main-nav").removeClass("narvar-dark");
          $("#main-nav").addClass("navs");
        } else {
          $("#main-nav").addClass("bg-dark");
          $("#main-nav").addClass("navbar-dark");
        }
});
