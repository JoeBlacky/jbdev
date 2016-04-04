var app = {
  init : function() {
    this.runAnimation();
    this.countdown();
    this.form()
    this.analytics();
  },
  countdown : function() {

    var launchDate = new Date(Date.parse('Apr 30 2016 00:00:00 GMT+0200'));
    initializeClock('countdown', launchDate);

    function getTimeRemaining(endtime) {
      var t = Date.parse(endtime) - Date.parse(new Date());
      var seconds = Math.floor((t / 1000) % 60);
      var minutes = Math.floor((t / 1000 / 60) % 60);
      var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
      var days = Math.floor(t / (1000 * 60 * 60 * 24));

      return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
      };
    }

    function initializeClock(id, endtime) {
      var clock = document.getElementById(id);
      var daysBlock = clock.querySelector('.days');
      var hoursBlock = clock.querySelector('.hours');
      var minutesBlock = clock.querySelector('.minutes');
      var secondsBlock = clock.querySelector('.seconds');
      var timeinterval = setInterval(updateClock, 1000);

      function updateClock() {
        var t = getTimeRemaining(endtime);

        daysBlock.innerHTML = ('0' + t.days).slice(-2);
        hoursBlock.innerHTML = ('0' + t.hours).slice(-2);
        minutesBlock.innerHTML = ('0' + t.minutes).slice(-2);
        secondsBlock.innerHTML = ('0' + t.seconds).slice(-2);

        if (t.total <= 0) {
          clearInterval(timeinterval);
        }
      }

      updateClock();
    }
  },
  runAnimation : function() {
    document.body.className += 'animate';
  },
  form : function() {
    var form = document.getElementById('form');
    var message = document.getElementById('message');

    form.onsubmit = function(e) {
      this.className += ' loading'
      e.preventDefault();
      sendRequest(this);
    };

    function sendRequest(form) {
      var xmlhttp = new XMLHttpRequest();
      var emailValue = document.getElementById('email').value;

      xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
           form.className = form.className.replace(' loading', '');
           if(xmlhttp.status == 200){
            var messageText  = 'Yay! Thank you for signing up!'
            var response = 'success';
            showMessage(messageText, response);
            form.reset()
           }
           else {
            var messageText  = 'Whoops, looks like something went wrong!'
            var response = 'error';
            showMessage(messageText, response);
           }
        }
      }

      xmlhttp.open('POST', 'forms.php');
      xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xmlhttp.send('email=' + emailValue);
    }

    function showMessage(messageText, response) {
      message.className = message.className += ' active' + ' ' + response;
      message.innerHTML = messageText;
      setTimeout(function(){
        message.className = message.className.replace(' active' + ' ' + response, '');
      }, 3000);
    }
  },
  analytics : function() {
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-71377021-1', 'auto');
    ga('send', 'pageview');
  },
  detectMobile : function() {
    if(isMobile.any()) {
      document.body.className += 'handheld';
    }
  }
}
var isMobile = {
  Android: function() {
      return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function() {
      return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function() {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function() {
      return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function() {
      return navigator.userAgent.match(/IEMobile/i);
  },
  any: function() {
      return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
  }
};
window.onload = (function(){
  app.init();
});