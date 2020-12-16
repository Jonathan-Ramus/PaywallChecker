links = document.getElementsByTagName('a');

for (i = 0;  i < links.length; i++) { //for every link, create a mouseover event 
    links[i].onmouseover = function () { 
        //saves default style to oldStyle attribute
        var link = this;
		if (this.hasAttribute("oldStyle") == false){ //checks whether oldstyle attribute exists 
            var old = this.getAttribute("style"); 
            this.setAttribute("oldStyle", old);
        }
        if (this.href != ""){
		
		var check = this.href + "";
		var xhttp = new XMLHttpRequest(), searchString = "https://cors-anywhere.herokuapp.com/" + this.href;

		xhttp.onreadystatechange = function() {

			if (xhttp.readyState == 4 && xhttp.status == 200) {

				var mark = xhttp.responseText.split('\n');
				var i = 0
				for (; i < mark.length - 1; i++){
					if (check.indexOf(mark[i]) > -1){
						invalidLink(link);
						break;
					}
				}
				if (i == mark.length - 1){
					validLink(link);
				}
			}
		};

		xhttp.open("GET", "https://raw.githubusercontent.com/Jonathan-Ramus/PaywallChecker/main/BList.txt", true);
		xhttp.send();
		
		}
    }
}

function validLink(thisLink) { //changes doc to show it is valid 
    chrome.storage.sync.get( //get greenBox and greenBoxTime values from popup saved to chrome.storage
        ['greenBox', 'greenBoxTime'], function(result) { 
        //console.log(result);
        if (result.greenBox == true){
            thisLink.style['background-color'] = "lightgreen";
            thisLink.style.color = "black";
            if (result.greenBoxTime == '2'){
                setTimeout(function() {
                    thisLink.style = thisLink.getAttribute("oldStyle"); 
                }, 2000);            
            }
            else if (result.greenBoxTime == '5'){
                setTimeout(function() {
                    thisLink.style = thisLink.getAttribute("oldStyle"); 
                }, 5000);  
            }
        }
    });
}

function invalidLink(thisLink){ //changes doc to show link is invalid
    chrome.storage.sync.get( //get unclickable and strikethrough values from popup saved to chrome.storage
        ['unclickable', 'redBox', 'redBoxTime'], function(result) {
        if (result.unclickable == true){
            thisLink.removeAttribute("href"); //remove url
        }
        /*if (result.strikethrough == true){
            thisLink.style.setProperty("text-decoration", "line-through"); //strikethrough link
        }*/
		if (result.redBox == true){
            thisLink.style['background-color'] = "red";
            thisLink.style.color = "black";
            if (result.redBoxTime == '2'){
                setTimeout(function() {
                    thisLink.style = thisLink.getAttribute("oldStyle"); 
                }, 2000);            
            }
            else if (result.redBoxTime == '5'){
                setTimeout(function() {
                    thisLink.style = thisLink.getAttribute("oldStyle"); 
                }, 5000);  
            }
        }
    });         
}




    






