const questionOne = function questionOne(arr) {
    // Implement question 1 here
    if (arr.length) {
        let sum_string = 0
        arr.forEach(element => {
            sum_string += element * element;
        });
        return sum_string;
    }else {
        return 0;
    }
}

const questionTwo = function questionTwo(num) { 
    if (num <= 1){
        return (num < 1) ? 0 : 1;
    }else {
        return questionTwo(num - 1) + questionTwo(num - 2);
    }
    // Implement question 2 here
}

const questionThree = function questionThree(text) {
    // Implement question 3 here
    var vowel_string = "aeiouAEIOU";
    if(text){
        var vowel_count = 0
        for(let i = 0; i < text.length; i++){
            if(vowel_string.indexOf(text[i]) != -1)

            vowel_count++;
        }
    }
                return vowel_count;
    }
    


const questionFour = function questionFour(num) {
    // Implement question 4 here
        if (num <= 1){
            return num < 0 ? NaN : 1;
        }
    
        else {
             return (num * questionFour(num - 1));
             }
      }


module.exports = {
    firstName: "NIDHI", 
    lastName: "CHOVATIYA", 
    studentId: "10457344",
    questionOne,
    questionTwo,
    questionThree,
    questionFour
};