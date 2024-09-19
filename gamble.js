/// setting up constants
const bundle = 1600;
const bundlePrice = 100;

let gachaList = [];

let numberCurrency = 6400;

let totalPull = 0;
let totalSpent = 0;
///let totalSpent = (totalPull * 160) / 6400 * 100;
let totalFiveStar = 0;
let status;

let fiveStarPity = 0;
let fourStarPity = 0;


///represents the "units" that a person could get from the gacha system
const threeStar = ["garbage", "trash", "useless", "unviable", "waste"];
const fourStar = ["decent", "niche", "underrated", "good", "meh"];
const fiveStar = ["ULTRA_GARBAGE", "better", "alright", "godtier"];
const goodFiveStar = "The One";

///set up rate system

function fiveStarPityRate(fiveStarPityCounter) {
    ///basic: if pity less than 75, fiveStar rate equals the same. Else, the rate for fiveStar increases drastically until fiveStar is rolled
    /// find a way to actually give results, like rolling 0-100 or smthn like that. 
    /// pulling an item is determined by 1/rate
    let rate;
    if (fiveStarPityCounter < 75) {
        rate = 0.006;
    }
    else if (fiveStarPityCounter >= 75 && fiveStarPityCounter < 90) {
        rate = (1 - 0.006) ** fiveStarPityCounter;

    }

    else if (fiveStarPityCounter === 90) {
        rate = 1;
    }
    return rate;
}

function fourStarPityRate(fourStarPityCounter) {
    let fourStarRate;
    if (fourStarPityCounter < 9) {
        fourStarRate = 0.1;
    }
    else if (fourStarPityCounter === 9) {
        fourStarRate = 0.5;
    }
    else {
        fourStarRate = 1;
    }
    return fourStarRate;
}

///result of the gacha system
///current problem: 5 star rate doesnt work??
function itemPulled(rateOne, rateTwo) {
    let randomNumberOne = (Math.round(Math.random() * (1 / rateOne)) + 1);
    if (randomNumberOne === Math.round(1 / rateOne)) {
        if (Math.round(Math.random(1)) + 1 === 2) {
            fiveStarPity = 0;
            return "5 star: " + goodFiveStar;
        }
        else {
            fiveStarPity = 0;
            return "5 star: " + (fiveStar[Math.round(Math.random() * fiveStar.length)]);
        }
    }
    else {
        let randomNumberTwo = (Math.round(Math.random() * (1 / rateTwo)) + 1);
        if (randomNumberTwo === Math.round(1 / rateTwo)) {
            fourStarPity = 0;
            return "4 star: " + fourStar[Math.round(Math.random() * fourStar.length)];
        }
        else {
            return "3 star: " + threeStar[Math.round(Math.random() * threeStar.length)];
        }
    }
}

///testing the html website thing WIP
/*function showTextAndRunCode() {
    // Text to be displayed
    let lines = [
        "Total Pulls: " + totalPull,
        "Total Spent: $" + totalSpent,
        "Total Five Stars: " + totalFiveStar,
        "After viewing your stats, the consensus is that your luck is: GARBAGE WTF!!!!!"
    ];

    // Get the div element and set its content
    let textElement = document.getElementById("displayText");
    textElement.innerHTML = lines.join('<br>');

    // Display the hidden text
    textElement.style.display = "block";

    // Additional code to run when the button is pressed
}
*/

//gives opinion of luck depending on the 5 star ratio
function checkStatus(totalPull, totalFiveStar) {
    let pull = totalPull;
    let five = totalFiveStar;
    const averagePity = 70;

    if ((pull / five) <= averagePity) {
        return ("Pretty good luck");
    }
    else {
        return ("Terrible luck bro");
    }
}

///entire system, maybe implement design from html soon
function gachaSystem() {
    let exit = false;
    while (exit == false) {
        let response = prompt("Do you want to pull (y / n)");
        if (response == "n") {
            exit = true;
            console.log("out");
            break;
        }
        else {
            let pullType = prompt("One pull or Ten Pull? (1, 2)");
            switch (pullType) {
                case "1":
                    console.log("You pulled: " + itemPulled(fiveStarPityRate(fiveStarPity), fourStarPityRate(fourStarPity)));
                    fiveStarPity++;
                    fourStarPity++;
                    console.log("Five star pity: " + fiveStarPity);
                    console.log("Four star pity: " + fourStarPity);
                    break;
                case "2":
                    for (let i = 0; i < 10; i++) {
                        console.log("You pulled: " + itemPulled(fiveStarPityRate(fiveStarPity), fourStarPityRate(fourStarPity)));
                        fiveStarPity++;
                        fourStarPity++;


                    }
                    console.log("Five star pity: " + fiveStarPity);
                    console.log("Four star pity: " + fourStarPity);
                    break;
                default:
                    console.log("Invalid.");
                    break;
            }

        }
    }

}

gachaSystem();
