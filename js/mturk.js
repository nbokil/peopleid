/**
 *  
 *  gup(name) :: retrieves URL parameters if provided
 *
 *  Prepares the page for MTurk on load.
 *  1. looks for a form element with id="mturk_form", and sets its METHOD / ACTION
 *    1a. All that the task page needs to do is submit the form element when ready
 *  2. disables form elements if HIT hasn't been accepted
 *
 **/

// selector used by jquery to identify your form
var form_selector = "#mturk_form";

// function for getting URL parameters
function gup(name) {
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.href);
  if(results == null)
    return "";
  else return unescape(results[1]);
}

//  Turkify the captioning page.
$(document).ready(function () {
  // if assigntmentId is a URL parameter
  if((aid = gup("assignmentId"))!="" && $(form_selector).length>0) {

    // If the HIT hasn't been accepted yet, disabled the form fields.
    if(aid == "ASSIGNMENT_ID_NOT_AVAILABLE") {
	    $('input,textarea,select').attr("DISABLED", "disabled");
    }

    // Add a new hidden input element with name="assignmentId" that
    // with assignmentId as its value.
    var aid_input = $("<input type='hidden' name='assignmentId' value='" + aid + "'>").appendTo($(form_selector));

    // Make sure the submit form's method is POST
    $(form_selector).attr('method', 'POST');

    // Set the Action of the form to the provided "turkSubmitTo" field
    if((submit_url=gup("turkSubmitTo"))!="") {
      $(form_selector).attr('action', submit_url + '/mturk/externalSubmit');
    }
  }

  $('#submit').on('click', showForm);

  function showForm(event) {
    var number = $('#instruction_read input')[0].value;
    var form = '<div class="row text-center"><form id="mturk_form"><div class="col-md-6 col-sm-6 hero-feature"><div class="thumbnail"><img src="images/people1.jpg" alt=""><div class="caption"><p>Number of People</p><input type="number" id="image" min="0" required></div></div></div><div class="col-md-6 col-sm-6 hero-feature"><dv class="thumbnail"><img src="images/people3.jpg" alt=""><div class="caption"><p>Number of People</p><input type="number" id="image" min="0" required></div></div></div><div class="col-md-6 col-sm-6 hero-feature"><div class="thumbnail"><img src="images/people4.jpg" alt=""><div class="caption"><p>Number of People</p><input type="number" id="image" min="0" required></div></div></div><div class="col-md-6 col-sm-6 hero-feature"><div class="thumbnail"><img src="images/people5.jpg" alt=""><div class="caption"><p>Number of People</p><input type="number" id="image" min="0" required></div></div></div><div class="col-md-6 col-sm-6 hero-feature"><div class="thumbnail"><img src="images/people7.jpg" alt=""><div class="caption"><p>Number of People</p><input type="number" id="image" min="0" required></div></div></div><div class="col-md-6 col-sm-6 hero-feature"><div class="thumbnail"><img src="images/people2.jpg" alt=""><div class="caption"><p>Number of People</p><input type="number" id="image" min="0" required></div></div></div><div class="col-md-12 col-sm-12 hero-feature"><div class="thumbnail"><img src="images/people6.jpg" alt=""><div class="caption"><p>Number of People</p><input type="number" id="image" min="0" required></div></div></div><div class="form-group col-lg-12"><center><input type="submit" class="btn btn-default" value="Submit"></center></div></form></div>'
    if (number == 7) {
      $('#mturk_form_show').html(form);
      $('#instruction_space').html('');
      $('#instructions').html('Enter the number of people you see in each photograph below its image. You can only enter numbers, please answer carefully and thoughtfully. When you are done, click submit!');
    }
    else {
      $('#error').html('We want to make sure you have read the instructions! Please read them again and enter the desired input');
    }
    
  }

});