//"use strict";
function getItem(id){
	var howMany;
	howMany = document.getElementById(id).value;
	return howMany;
}


function calcPrice(price, quantity){
	var total;
	total = price * quantity;
	return total;
}


function displayRemainingCash(id, checkedBalance){
	id.innerHTML= checkedBalance;
}


function displayCurrentItems(id, currentItems){
	id.innerHTML = currentItems;
	
}

function addItemToInv (current, inputItem) {
	var total;
	total = Number(current) + Number(inputItem);
	return Number(total);
}

function checkBalance(remainingCash, thisRoundsLemonCost, thisRoundsSugarCost, thisRoundsIceCost) {
	var check;
	check = remainingCash - (thisRoundsLemonCost + thisRoundsSugarCost + thisRoundsIceCost);
	return check.toFixed(2);
}


function resetForm (id) {
	document.getElementById(id).value="";
}

function checker(current, per) {
	var total;
	total = current - per;

	if (total < 0 ){
		return false;
	}
	else {
		return total;
	}

}

function createLemonadeObject (lemon, sugar, ice, cups) {
	function AdeObj(lemon, sugar, ice, cups) {
		this.lemon=lemon;
		this.sugar=sugar;
		this.ice=ice;
		this.cups=cups
	};
	var obj;
	obj = new AdeObj(lemon, sugar, ice, cups);
	return obj;
}

function difOf (thisOne, that) {
	var total;
	total = thisOne - that;
	return total;
}


function judgeQuality (storedCups, itr) {
	for(var key in storedCups[itr]){
		if(storedCups[itr][key] < 1 || storedCups[itr][key] > 10){
			storedCups[itr].quality=0
			break;
		}
		else if(storedCups[itr][key] > 1 && storedCups[itr][key] < 10){
			storedCups[itr].quality=1;
		}
	}
	return storedCups;
}

function makeWeather () {
	var num;
	var weather;
	num= Math.random();
	if (num < .199){
		weather="Rainy";
	} else if (num > .199 && num < .399){
		weather="Cold";
	}else if (num > .399 && num < .599){
		weather="Cool";
	}else if (num > .599 && num <.799){
		weather="Warm";
	}else if (num > .799 && num < .999){
		weather="Hot";
	}
	return weather;
}

function toggleButton (){
	if (document.getElementById("makeButton").disabled === true) {
		document.getElementById("makeButton").disabled = false;
	}
	else if (document.getElementById("makeButton").disabled === false) {
		document.getElementById("makeButton").disabled = true;
	}

}

function main(){
	var lemonCost;
	var sugarCost;
	var iceCost;
	var lemonInput;
	var sugarInput;
	var iceInput;
	var remainingCashId;
	var thisRoundsLemonCost;
	var thisRoundsSugarCost;
	var thisRoundsIceCost;
	var remainingCash;
	var lemonId;
	var sugarId;
	var iceId;
	var currentLemon;
	var currentSugar;
	var currentIce;
	var checkedBalance;
	var buyButton;
	var makeButton;
	var cups;
	var sellButton;
	var storedCups;
	var weather;
	var weatherId;
	var cupsPer;
	var day;
	var salesByWeather= {
		Hot:120,
		Warm:90,
		Cool:75,
		Cold:50,
		Rainy:10
	}

	function AdeObj(lemon, sugar, ice, cups, cost) {
		this.lemon=lemon;
		this.sugar=sugar;
		this.ice=ice;
		this.cups=cups,
		this.cost=cost,
		this.quality=0,
		this.worth=0,
		this.taste="",
		this.judge=function () {
			if (this.lemon === 0 || this.sugar === 0 || this.ice === 0) {
				this.quality=0;
			} else {
				this.quality=1;
			}
		},
		this.tasteIt=function () {
			if (this.ice > this.sugar){
				if (this.lemon < this.ice && this.ice >= 7){
					this.taste="cold";
				}
			}
			else if (this.sugar > this.lemon){
				if (this.sugar > this.ice && this.sugar >= 5){
					this.taste="sweet";
				}
			}
			else {
				this.taste="ok";
			}
		},
		this.checkWorth=function (){
			if (this.cost > .50){
				this.worth=.50;
			}
			else if (this.cost <.50 && this.cost > .40){
				this.worth=.70;
			}
			else if (this.cost < .40 && this.cost > .25){
				this.worth=.90;
			}
			else{
				this.worth=1.1;
			}
		}

	};

	var cupsId;

	cupsId=document.getElementById("cups");
	storedCups = [];
	remainingCash=20.00
	remainingCashId= document.getElementById("totalMoney")
	lemonCost=.35;
	sugarCost=.45;
	iceCost=.01;
	currentLemon=0;
	currentSugar=0;
	currentIce=0;
	cups=0;
	day=1;
	weather=makeWeather();
	thisRoundsIceCost=calcPrice(iceCost, iceInput);
	thisRoundsSugarCost=calcPrice(sugarCost, sugarInput);
	thisRoundsLemonCost=calcPrice(lemonCost, lemonInput);
	lemonId=document.getElementById("lemon");
	sugarId=document.getElementById("sugar");
	iceId=document.getElementById("ice");
	buyButton=document.getElementById("buyButton");
	makeButton=document.getElementById("makeButton");
	sellButton=document.getElementById("sellButton");
	weatherId=document.getElementById("weather");
	costPer=document.getElementById("costPer").value;
	document.getElementById("makeButton").disabled = false;

	weatherId.innerHTML=weather;

	buyButton.onclick=function (){
		lemonInput=getItem("lemonField");
		sugarInput=getItem("sugarField");
		iceInput=getItem("iceField");
		thisRoundsIceCost=calcPrice(iceCost, iceInput);
		thisRoundsSugarCost=calcPrice(sugarCost, sugarInput);
		thisRoundsLemonCost=calcPrice(lemonCost, lemonInput);
		checkedBalance=checkBalance(remainingCash, thisRoundsLemonCost, thisRoundsSugarCost, thisRoundsIceCost);
		console.log(checkedBalance);
		if (checkedBalance < 0){
			resetForm("lemonField");
			resetForm("sugarField");
			resetForm("iceField");
			alert("You don't have enough money.")
		}
		else {
			remainingCash=checkedBalance;
			displayRemainingCash(remainingCashId, remainingCash);
			currentLemon = addItemToInv(currentLemon, lemonInput);
			currentSugar = addItemToInv(currentSugar, sugarInput);
			currentIce = addItemToInv(currentIce, iceInput);
			displayCurrentItems(lemonId, currentLemon);
			displayCurrentItems(sugarId, currentSugar);
			displayCurrentItems(iceId, currentIce);
			resetForm("lemonField");
			resetForm("sugarField");
			resetForm("iceField");
			document.getElementById("makeButton").disabled = false;
		}
	}

	makeButton.onclick=function  () {
		var lemonPer;
		var sugarPer;
		var icePer;
		var checkerL;
		var checkerS;
		var checkerI;
		var obj;
		var costPer;
		var cupsIncrement;
		

		lemonPer=document.getElementById("lemonPer").value;
		sugarPer=document.getElementById("sugarPer").value;
		icePer=document.getElementById("icePer").value;
		checkerL=checker(currentLemon, lemonPer);
		checkerS=checker(currentSugar, sugarPer);
		checkerI=checker(currentIce, icePer);
		
		if (checkerL === false || checkerS === false || checkerI === false){
			alert("Not enough resources.")
			
		}
		else if (costPer === "" || costPer === "0"){
			alert("How much will you charge per cup?");
		}
		else if (lemonPer === "0" && sugarPer === '0' && icePer === "0"){
			alert("Enter some numbers.")
		}
		else {
			while (currentLemon > 0 && currentSugar > 0 && currentIce > 0){
				checkerL=checker(currentLemon, lemonPer);
				checkerS=checker(currentSugar, sugarPer);
				checkerI=checker(currentIce, icePer);
				if (checkerL === false || checkerS === false || checkerI === false){
					break;
				}
				else {
					currentLemon= checkerL;
					currentSugar= checkerS;
					currentIce= checkerI;
					cups+= 4;
				}
			}
			toggleButton();
			cupsIncrement=difOf(cups, cupsPer);
			displayCurrentItems(lemonId, currentLemon);
			displayCurrentItems(sugarId, currentSugar);
			displayCurrentItems(iceId, currentIce);
			storedCups.push(new AdeObj(lemonPer, sugarPer, icePer, cupsIncrement, costPer));
			console.log(storedCups);
			displayCurrentItems(cupsId, cups);

		}	
	}

	sellButton.onclick= function () {
		var itr;
		var multiplier;
		var cupsSold;
		cupsSold=cups;
		toggleButton();
		multiplier = 1;

		if (cups === 0){
			alert("You have no cups to sell.");
		} 
		else {
			for (var key in salesByWeather){
				if (key === weather){
					multiplier *= salesByWeather[key];
					alert(multiplier);
				}
			}
			for(itr=0; itr<storedCups.length; itr++){
				storedCups[itr].judge();
				storedCups[itr].tasteIt();
				storedCups[itr].checkWorth();
				console.log(storedCups);
				if (storedCups[itr].quality === 1){
					if (storedCups[itr].taste === "cold" && weather === "Hot"){
						multiplier *= 1;
					} 
					else if (storedCups[itr].taste === "sweet"){
						multiplier *= .9;
					}
					else {
						multiplier *= .7;
					}
				}
				else {
					cupsSold=0;
					alert("Yuck!");
				};

				multiplier *= storedCups[itr].worth;

			}
			cupsSold = multiplier;
			if (cupsSold > cups) {
				cupsSold=cups;
			}
			console.log("you sold " + cupsSold);
			remainingCash= (Number(remainingCash)+(Number(cupsSold) * Number(costPer))).toFixed(2);
			console.log("you made " + ((Number(cupsSold) * Number(costPer))));
			cups=0;
			day++;
			displayCurrentItems(cupsId, cups);
			displayRemainingCash(remainingCashId, remainingCash);
			weather=makeWeather();
			weatherId.innerHTML=weather;
		}
	}


}

main();
