document.addEventListener('DOMContentLoaded', () => {

    const numberInput = document.querySelector(".numbertoroman input");
    const romanInput = document.querySelector(".romantonumber input");
    const numberButton = document.querySelector(".numbertoroman button");
    const romanButton = document.querySelector(".romantonumber button");
    const numberOutput = document.querySelector(".numoutput");
    const romanOutput = document.querySelector(".romanoutput");



    class RomanNumerals {
        static toRoman(num) {
            if (num > 4000 || num < 1 || isNaN(num)) {
                document.querySelector(".errornums").style.display = 'block';
                numberOutput.style.display = 'none'
                return 'num not good';
            } else {
                document.querySelector(".errornums").style.display = 'none';
        const romanNumerals = {
            M: 1000, CM: 900, D: 500, CD: 400, C: 100,
            XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1
        };
    
        let result = '';
    
            for (let key in romanNumerals) {
                while (num >= romanNumerals[key]) {
                    result += key;
                    num -= romanNumerals[key];
                }
            }
        
            numberOutput.innerHTML = result;
            numberOutput.style.display = 'block';
        
            return result;
        }
        }
        
            static fromRoman(str) {

                try {
            const romanNumerals = {
                M: 1000, CM: 900, D: 500, CD: 400, C: 100,
                XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1
            };
        
            let result = 0;
            str = str.toUpperCase();
        
            for (let i = 0; i < str.length; i++) {
                if (!romanNumerals[str[i]]) {
                    document.querySelector(".error").style.display = 'block';
                    romanOutput.style.display = 'none';
                    return 'error';
                } 
                let current = romanNumerals[str[i]];
                let next = romanNumerals[str[i + 1]];
        
                if (next && next > current) {
                    result += next - current;
                    i++;
                } else {
                    result += current;
                }
            }
            if (result === null) {
                document.querySelector(".error").style.display = 'block';
                romanOutput.style.display = 'none';
            } else {
                romanOutput.innerHTML = result;
            romanOutput.style.display = 'block';
            document.querySelector(".error").style.display = 'none';
            return result;
            }
        
            
        }
        catch (error) {
            document.querySelector(".error").style.display = 'block';
            romanOutput.style.display = 'none';
            console.log(error);
        }
    }
        }

        numberButton.addEventListener('click', () => {
            RomanNumerals.toRoman(numberInput.value);
        });
        numberButton.addEventListener('keypress', function (e) {
            if ((e.key === 'Enter') && numberInput.value.trim() !== '') {
                RomanNumerals.toRoman(numberInput.value);
        }});
        romanButton.addEventListener('click', () => {
            RomanNumerals.fromRoman(romanInput.value);
        });
        romanButton.addEventListener('keypress', function (e) {
            if ((e.key === 'Enter') && romanInput.value.trim() !== '') {
                RomanNumerals.fromRoman(romanInput.value);
        }});
        console.log("JavaScript code is running");
        document.querySelector(".helpbutton").addEventListener('click', () => {
            console.log("Button clicked");
            if (document.querySelector(".help").innerHTML.length === 0) {
            document.querySelector(".help").innerHTML = 'M: 1000,  CM: 900,  D: 500,  CD: 400,  C: 100\n XC: 90,  L: 50,  XL: 40,  X: 10,  IX: 9,  V: 5,  IV: 4,  I: 1';
            } else {
                document.querySelector(".help").innerHTML = '';
            }
        });



    });