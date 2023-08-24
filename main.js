const lengthSlider = document.querySelector('.pass-length input');//to select the slider input
let generatebtn = document.querySelector('.generate-btn')
let options = document.querySelectorAll('.option input'); // taking in all the options using SelectorAll
let passOutput = document.querySelector('.output-box input');
let copy=document.querySelector('.copy');


// console.log(options[3].id);

function updateSlider() {
    let temp = document.querySelector('.pass-length span');
    temp.innerHTML = lengthSlider.value;
    console.log(lengthSlider.value); // to check for update
}// function to connect the span element with the slider value to update it real time


/* listening to any change in the checkboxes with the 'change' for each option
under the options , and then checking for that event with event.target . Only for check*/
options.forEach(option => {
    option.addEventListener('change', event => {
        if (event.target.checked) {
            console.log(`${option.id} is checked`);
        }
        else {
            console.log(`${option.id} is unchecked`)
        }
    });
});



const characters = {
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+=-,<>?:"{}[]'
} //characters that are available in the options

const copyPassword=() =>{
    navigator.clipboard.writeText(passOutput.value); 
    alert('Password Was Copied');
}



const generatePassword = () => {
    let staticPassword = '', // to take in the characters of the password from the options checked
        randomPassword = '',// to store the final password 
        excludeDublicate = false, // by default considering dublictaes to be included
        passLength = lengthSlider.value; // getting the value of the length of the password from the slider 

    /* looping through each setting > input to check if they are selected and
    add the options to be included in the password */

    options.forEach(option => {
        if (option.checked) { //if the option is checked 

            if (option.id != 'space' || option.id != 'dublicate') {
                staticPassword += characters[option.id]; // or characters.lowercase
                // console.log(`${option.id} is selected`);
            }
            if (option.id == 'space') {
                staticPassword += '              '; //adding multiple space characters to increase probability
                console.log(`${option.id} is selected`);
            }// adding space as a character in the beggining and ending
            if (option.id == 'dublicate') {
                excludeDublicate = true;
                // console.log(`${option.id} is selected`);
            }// the password may include dublicates

        }

    });

    staticPassword = staticPassword.split(''); // making an array of the staticPassword for each character

    /* Generating final password */

    if (excludeDublicate == true) {
        console.log('true');
    }
    for (let i = 0; i < passLength; i++) {
        let random = Math.floor(Math.random() * staticPassword.length);

        // randomPassword += staticPassword[random];



        if (excludeDublicate == true && randomPassword.includes(random)) {
            // if dublicates are not allowed then we need to remove any possiblities of their occurance
            i--;
            continue;
        }
        console.log(staticPassword[random]);
        randomPassword += staticPassword[random];
        // console.log(randomPassword);


    }

    console.log(`random password : ${randomPassword}`);
    passOutput.value = randomPassword;


}


lengthSlider.addEventListener('input', updateSlider);//listening to slider input
generatebtn.addEventListener('click', generatePassword);
copy.addEventListener('click', copyPassword);