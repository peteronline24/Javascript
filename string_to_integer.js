
//returns -1 if the word cannot be converted to a number in the range 0-19
function wordToInt(word){
    let numbers = ["zero", "one", "two", "three", "four", "five", "six", "seven",
                "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen",
                "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];

    let intVal = numbers.indexOf(word);
    if(intVal >= 0) return intVal;

    numbers = ["twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
    return (numbers.indexOf(word) + 2) * 10;
}
function getMultiplier(word){
    switch(word){
        case "hundred": return 100;
        case "thousand": return 1000;
        case "million": return 1000000;
    }
    return 1;
}

//Only works for positive integers
//Tested with values up to 1,000,000
function parseInt(string){
    let numList = string.replace(/-| and /g, " ").split(" ");
    
    /*This does not work for the explanation below
    var totalNumber = numList.reduce((totalNum, currWord)=>{
        let mult = getMultiplier(currWord);
        if(mult > 1){//isMultiplier:
            return totalNum * mult;
        }
        return totalNum + wordToInt(currWord);
        
    },0);
    */
    //When we encounter a number, we need to wait until we get 
    //the next number because often we have to perform a math
    //operation on the two last numbers seen before affecting 
    //the total sum (totalNumber).
    //Example "one thousand two hundred" != ((1 * 1000 + 2) * 100)
    
    var totalNumber = 0, prevNumber=0, prevMult=0;
    numList.forEach((currWord)=>{
        let mult = getMultiplier(currWord);
        if(mult > 1){//isMultiplier:
            if(prevNumber){
                if(mult > prevMult){
                    //for number like 203000
                    //Otherwise, would get 200 + 3000 = 3200
                    totalNumber = (totalNumber + prevNumber) *mult;
                }else{
                    totalNumber += prevNumber*mult;
                }
                prevNumber = 0;
            }else{
                totalNumber *= mult;
            }
            prevMult = mult;
        }else{

            if(prevNumber){
                totalNumber += prevNumber + wordToInt(currWord);
                prevNumber = 0;
            }else{
                prevNumber = wordToInt(currWord);
            }
        }
    });
    //In case prevNumber > 0
    return totalNumber + prevNumber;
    //Ideally, I would have used a stack, and form the entire
    //math expression before processing.
}

console.log(parseInt("one thousand two hundred"));
//console.log(parseInt("two hundred and three thousand"));
//console.log(wordToInt("million"));