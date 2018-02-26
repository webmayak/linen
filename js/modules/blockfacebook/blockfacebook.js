function addFacebookScript(url,callback){var script=document.createElement('script');if(callback){script.onload=callback;}
script.type='text/javascript';script.src=url;document.body.appendChild(script);}
function loadFacebookAPI(){addFacebookScript('//connect.facebook.net/en_US/all.js#xfbml=1&appId=334341610034299');}
window.onload=loadFacebookAPI;