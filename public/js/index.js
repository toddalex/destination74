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
document.getElementById('submit').addEventListener('click', event => {
    event.preventDefault()
    const email = document.getElementById('email')
    const mailformat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    // validates email
    if (email.value === null || email.value === ''|| !email.value.match(mailformat)) {
        document.getElementById('error-message').innerHTML = 'Please enter a valid email address'
        alert('Please enter a valid email address!')
        setTimeout(()=> document.getElementById('error-message').innerHTML = '', 3000)
    } else {
        document.getElementById('submit').innerHTML = 'Sending'

    const fetchData = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            email: email.value,
            js: true 
        })
    }

    fetch('/send', fetchData)
    .then(res => {
        if (res.ok) {
            console.log('subscription confirmed.')
            document.getElementById('email').style.display = 'none';
            document.getElementById('submit').style.display = 'none';
            document.getElementById('subscribe-header').innerHTML = 'Thank you!';
            setTimeout( () => {
                document.getElementById('email').style.display = 'block';
                document.getElementById('submit').style.display = 'block';
                document.getElementById('subscribe-header').innerHTML = 'Subscribe to receive updates!';
                document.getElementById('submit').innerHTML = 'Submit';
            }, 3000)
        } else {
           console.log('failed to send.')
        }
    })
    .catch(err => console.log('POST ERROR: ', err))
    }
})


