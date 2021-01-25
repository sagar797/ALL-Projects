if ($(".text-slider").length == 1) {

    var typed_strings = $(".text-slider-items").text();
    // console.log(typed_strings);

    var typed = new Typed(".text-slider", {
        strings: typed_strings.split(", "),
        typeSpeed: 50,
        loop: true,
        backDelay: 900,
        backSpeed: 30,
    });
}