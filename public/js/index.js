// Start of use strict
(function ($) {
"use strict"; 

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
        if (
            location.pathname.replace(/^\//, "") ==
                this.pathname.replace(/^\//, "") &&
            location.hostname == this.hostname
        ) {
            var target = $(this.hash);
            target = target.length
                ? target
                : $("[name=" + this.hash.slice(1) + "]");
            if (target.length) {
                $("html, body").animate(
                    {
                        scrollTop: target.offset().top - 70,
                    },
                    1000,
                    "easeInOutExpo"
                );
                return false;
            }
        }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $(".js-scroll-trigger").click(function () {
        $(".navbar-collapse").collapse("hide");
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $("body").scrollspy({
        target: "#mainNav",
        offset: 100,
    });

    // Collapse Navbar
    var navbarCollapse = function () {
        if ($("#mainNav").offset().top > 100) {
            $("#mainNav").addClass("navbar-shrink");
        } else {
            $("#mainNav").removeClass("navbar-shrink");
        }
    };
    // Collapse now if page is not at top
    navbarCollapse();
    // Collapse the navbar when page is scrolled
    $(window).scroll(navbarCollapse);
})(jQuery); // End of use strict


// form submission
document.getElementById('cta').addEventListener('click', event => {
    event.preventDefault()
    const name = document.getElementById('name')
    const email = document.getElementById('email')
    const subject = document.getElementById('subject')
    const message = document.getElementById('message')
    const subscribe = document.getElementById('subscribe')

        // if (this.email.value === null || this.email.value === '') {
        //      error.classList.add('errorMessage')
        // };

    const fetchData = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: name.value,
            email: email.value,
            subject: subject.value,
            message: message.value,
            subscribe: subscribe.value,
            js: true 
        })
    }

    fetch('/send', fetchData)
    .then(res => {
        if (res.ok) {
            console.log('yayyyyy it worked')
        } else {
            // error.classList.add('errorMessage')
            console.log('ya blew it')
        }
    })
    .catch(err => console.log('POST ERROR: ', err))
})


