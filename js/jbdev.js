var app={init:function(){this.runAnimation(),this.countdown(),this.form(),this.analytics()},countdown:function(){function a(a){var b=Date.parse(a)-Date.parse(new Date),c=Math.floor(b/1e3%60),d=Math.floor(b/1e3/60%60),e=Math.floor(b/36e5%24),f=Math.floor(b/864e5);return{total:b,days:f,hours:e,minutes:d,seconds:c}}function b(b,c){function d(){var b=a(c);f.innerHTML=("0"+b.days).slice(-2),g.innerHTML=("0"+b.hours).slice(-2),h.innerHTML=("0"+b.minutes).slice(-2),i.innerHTML=("0"+b.seconds).slice(-2),b.total<=0&&clearInterval(j)}var e=document.getElementById(b),f=e.querySelector(".days"),g=e.querySelector(".hours"),h=e.querySelector(".minutes"),i=e.querySelector(".seconds"),j=setInterval(d,1e3);d()}var c=new Date(Date.parse("Apr 30 2016 00:00:00 GMT+0200"));b("countdown",c)},runAnimation:function(){document.body.className+="animate"},form:function(){function a(a){var c=new XMLHttpRequest,d=document.getElementById("email").value;c.onreadystatechange=function(){if(c.readyState==XMLHttpRequest.DONE)if(a.className=a.className.replace(" loading",""),200==c.status){var d="Yay! Thank you for signing up!",e="success";b(d,e),a.reset()}else{var d="Whoops, looks like something went wrong!",e="error";b(d,e)}},c.open("POST","forms.php"),c.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),c.send("email="+d)}function b(a,b){d.className=d.className+=" active "+b,d.innerHTML=a,setTimeout(function(){d.className=d.className.replace(" active "+b,"")},3e3)}var c=document.getElementById("form"),d=document.getElementById("message");c.onsubmit=function(b){this.className+=" loading",b.preventDefault(),a(this)}},analytics:function(){!function(a,b,c,d,e,f,g){a.GoogleAnalyticsObject=e,a[e]=a[e]||function(){(a[e].q=a[e].q||[]).push(arguments)},a[e].l=1*new Date,f=b.createElement(c),g=b.getElementsByTagName(c)[0],f.async=1,f.src=d,g.parentNode.insertBefore(f,g)}(window,document,"script","//www.google-analytics.com/analytics.js","ga"),ga("create","UA-71377021-1","auto"),ga("send","pageview")}};window.onload=function(){app.init()};