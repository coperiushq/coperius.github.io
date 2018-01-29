$(function() {

    $("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
          event.preventDefault(); // prevent default submit behaviour
          // get values from FORM
          var email = $("input#email").val();
          let payload = {
            "apikey": "8e62031222b110259ee129ff956c7ac2-us17",
            "email_address": email,
            "status": "subscribed"
          };
          $.ajax({
              url: "https://us17.api.mailchimp.com/3.0/lists/0debfcd56d/members/",
              data: JSON.stringify(payload),
              contentType: "application/json; charset=utf-8",
              dataType: "json",
              type: "POST",
              cache: false,
              success: function() {
                  // Success message
                  $('#success').html("<div class='alert alert-success'>");
                  $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                      .append("</button>");
                  $('#success > .alert-success')
                      .append("<strong>Vous êtes désormais inscrit à notre mailing list.</strong>");
                  $('#success > .alert-success')
                      .append('</div>');

                  //clear all fields
                  $('#contactForm').trigger("reset");
              },
              error: function() {
                  // Fail message
                  $('#success').html("<div class='alert alert-danger'>");
                  $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                      .append("</button>");
                  $('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
                  $('#success > .alert-danger').append('</div>');
                  //clear all fields
                  $('#contactForm').trigger("reset");
              },
          })
        },
        filter: function() {
            return $(this).is(":visible");
        }
      });

});
