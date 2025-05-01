/*   Author: Ronn
   Created: Apr 2025
   Description: Custom JS file
*/


(function($) {
    "use strict"; 
	
	/* Preloader */
	$(window).on('load', function() {
		var preloaderFadeOutTime = 500;
		function hidePreloader() {
			var preloader = $('.spinner-wrapper');
			setTimeout(function() {
				preloader.fadeOut(preloaderFadeOutTime);
			}, 500);
		}
		hidePreloader();
	});

	
	/* Navbar Scripts */
	// jQuery to collapse the navbar on scroll
    $(window).on('scroll load', function() {
		if ($(".navbar").offset().top > 60) {
			$(".fixed-top").addClass("top-nav-collapse");
		} else {
			$(".fixed-top").removeClass("top-nav-collapse");
		}
    });

	// jQuery for page scrolling feature - requires jQuery Easing plugin
	$(function() {
		$(document).on('click', 'a.page-scroll', function(event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top
			}, 600, 'easeInOutExpo');
			event.preventDefault();
		});
	});

    // closes the responsive menu on menu item click
    $(".navbar-nav li a").on("click", function(event) {
    if (!$(this).parent().hasClass('dropdown'))
        $(".navbar-collapse").collapse('hide');
    });


    /* Countdown Timer - The Final Countdown */
	$('#clock').countdown('2025/05/16') /* change here your "countdown to" date */
	.on('update.countdown', function(event) {
		var format = '<span class="counter-number">%D<br><span class="timer-text">Days</span></span><span class="counter-number">%H<br><span class="timer-text">Hours</span></span><span class="counter-number">%M<br><span class="timer-text">Minutes</span></span><span class="counter-number">%S<br><span class="timer-text">Seconds</span></span>';
		$(this).html(event.strftime(format));
	})
	.on('finish.countdown', function(event) {
	$(this).html('This offer has expired!')
		.parent().addClass('disabled');
    });


    /* Image Slider 2 - Swiper */
    var imageSliderOne = new Swiper('.image-slider-1', {
        autoplay: {
            delay: 3000,
            disableOnInteraction: true
		},
        loop: true,
        navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		}
    });


    /* Image Slider - Swiper */
    var imageSliderTwo = new Swiper('.image-slider-2', {
        autoplay: {
            delay: 2000,
            disableOnInteraction: false
		},
        loop: true,
        spaceBetween: 30,
        slidesPerView: 5,
		breakpoints: {
            // when window is <= 580px
            580: {
                slidesPerView: 1,
                spaceBetween: 10
            },
            // when window is <= 768px
            768: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            // when window is <= 992px
            992: {
                slidesPerView: 3,
                spaceBetween: 20
            },
            // when window is <= 1200px
            1200: {
                slidesPerView: 4,
                spaceBetween: 20
            },

        }
    });


    /* Text Slider - Swiper */
	var textSlider = new Swiper('.text-slider', {
        autoplay: {
            delay: 6000,
            disableOnInteraction: false
		},
        loop: true,
        navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev'
        },
        spaceBetween: 70,
        slidesPerView: 2,
		breakpoints: {
            // when window is <= 1199px
            1199: {
                slidesPerView: 1,
            },
        }
    });
    

    /* Video Lightbox - Magnific Popup */
    $('.popup-youtube, .popup-vimeo').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false,
        iframe: {
            patterns: {
                youtube: {
                    index: 'youtube.com/', 
                    id: function(url) {        
                        var m = url.match(/[\\?\\&]v=([^\\?\\&]+)/);
                        if ( !m || !m[1] ) return null;
                        return m[1];
                    },
                    src: 'https://www.youtube.com/embed/%id%?autoplay=1'
                },
                vimeo: {
                    index: 'vimeo.com/', 
                    id: function(url) {        
                        var m = url.match(/(https?:\/\/)?(www.)?(player.)?vimeo.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/);
                        if ( !m || !m[5] ) return null;
                        return m[5];
                    },
                    src: 'https://player.vimeo.com/video/%id%?autoplay=1'
                }
            }
        }
    });


    /* Details Lightbox - Magnific Popup */
	$('.popup-with-move-anim').magnificPopup({
		type: 'inline',
		fixedContentPos: false, /* keep it false to avoid html tag shift with margin-right: 17px */
		fixedBgPos: true,
		overflowY: 'auto',
		closeBtnInside: true,
		preloader: false,
		midClick: true,
		removalDelay: 300,
		mainClass: 'my-mfp-slide-bottom'
	});
    
    
    /* Move Form Fields Label When User Types */
    // for input and textarea fields
    $("input, textarea").keyup(function(){
		if ($(this).val() != '') {
			$(this).addClass('notEmpty');
		} else {
			$(this).removeClass('notEmpty');
		}
    });

// Wait until the page is fully loaded
(() => {
  'use strict';

  // Fetch all the forms we want to apply custom Bootstrap validation to
  const forms = document.querySelectorAll('.needs-validation');

  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      // If the form is invalid, prevent submission
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      // Add Bootstrap validation styles
      form.classList.add('was-validated');
    }, false);
  });
})();
    

    /* Registration Form */
(function() {
    const form = document.getElementById("registrationForm");
    const status = document.getElementById("registration-form-status");
  
    async function handleSubmit(event) {
      event.preventDefault();
      event.stopPropagation();
  
      form.classList.add("was-validated");
      if (!form.checkValidity()) return false;
  
      const data = new FormData(form);
      try {
        const response = await fetch("https://formspree.io/f/xyzwzono", {
          method: "POST",
          body: data,
          headers: { "Accept": "application/json" }
        });
        if (response.ok) {
          status.innerHTML = "Thanks for your submission!";
          form.classList.remove("was-validated");
          form.reset();
        } else {
          const result = await response.json();
          status.innerHTML = result.errors
            ? result.errors.map(e => e.message).join(", ")
            : "Oops! There was a problem submitting your form";
        }
      } catch (err) {
        status.innerHTML = "Oops! There was a problem submitting your form";
      }
      return false;
    }
  
    form.removeEventListener("submit", handleSubmit); // clean up any duplicates
    form.addEventListener("submit", handleSubmit);
  })();
  
    
    /* Newsletter Form */
    $("#newsletterForm").validator().on("submit", function(event) {
    	if (event.isDefaultPrevented()) {
            // handle the invalid form...
            nformError();
            nsubmitMSG(false, "Please fill all fields!");
        } else {
            // everything looks good!
            event.preventDefault();
            nsubmitForm();
        }
    });

    ;(function() {
        'use strict';
        // Contact form element and status div
        const cForm = document.getElementById("contactForm");
        const cStatus = document.getElementById("contact-form-status");
      
        async function handleContactSubmit(event) {
          event.preventDefault();
          event.stopPropagation();
      
          // Bootstrap validation UI
          cForm.classList.add("was-validated");
          if (!cForm.checkValidity()) return false;
      
          const data = new FormData(cForm);
          try {
            const response = await fetch("https://formsubmit.co/88bc2219f5beb2fce46d9f7f2d6f6b00", {
              method: "POST",
              body: data,
              headers: { "Accept": "application/json" }
            });
            if (response.ok) {
              cStatus.innerHTML = "Your message has been sent!";
              // Clear validation and reset form
              cForm.classList.remove("was-validated");
              cForm.reset();
            } else {
              const result = await response.json();
              cStatus.innerHTML = result.errors 
                ? result.errors.map(e => e.message).join(", ") 
                : "Oops! There was a problem sending your message.";
            }
          } catch (err) {
            cStatus.innerHTML = "Oops! There was a problem sending your message.";
          }
      
          return false;
        }
      
        // Attach handler
        cForm.addEventListener("submit", handleContactSubmit);
      })();

    /* Back To Top Button */
    // create the back to top button
    $('body').prepend('<a href="body" class="back-to-top page-scroll">Back to Top</a>');
    var amountScrolled = 700;
    $(window).scroll(function() {
        if ($(window).scrollTop() > amountScrolled) {
            $('a.back-to-top').fadeIn('500');
        } else {
            $('a.back-to-top').fadeOut('500');
        }
    });


	/* Removes Long Focus On Buttons */
	$(".button, a, button").mouseup(function() {
		$(this).blur();
	});

})(jQuery);

let modalId = $('#image-gallery');

$(document).ready(function () {
  // initialize with our selector
  loadGallery(true, '.image-masonry .thumbnail');

  // disable buttons at ends
  function disableButtons(max, current) {
    $('#show-previous-image, #show-next-image').show();
    if (current === 1) {
      $('#show-previous-image').hide();
    }
    if (current === max) {
      $('#show-next-image').hide();
    }
  }

  function loadGallery(setIDs, selector) {
    let currentImage, counter = 0;

    // assign IDs if wanted
    if (setIDs) {
      $(selector).each(function () {
        counter++;
        $(this).attr('data-image-id', counter);
      });
    }

    // click handlers for prev/next buttons
    $('#show-next-image, #show-previous-image').click(function () {
      currentImage += ($(this).attr('id') === 'show-previous-image') ? -1 : 1;
      let $sel = $('[data-image-id="' + currentImage + '"]');
      updateGallery($sel);
    });

    // when a thumbnail is clicked
    $(selector).click(function () {
      updateGallery($(this));
    });

    function updateGallery($sel) {
      currentImage = $sel.data('image-id');
      $('#image-gallery-title').text($sel.data('title'));
      $('#image-gallery-image').attr('src', $sel.data('image'));
      disableButtons(counter, currentImage);
    }
  }

  // keyboard navigation
  $(document).keydown(function (e) {
    if ((modalId.data('bs.modal') || {})._isShown) {
      if (e.which === 37 && $('#show-previous-image').is(':visible')) {
        $('#show-previous-image').click();
      }
      if (e.which === 39 && $('#show-next-image').is(':visible')) {
        $('#show-next-image').click();
      }
    }
  });
});
