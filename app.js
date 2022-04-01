/*
    Author: devCodeCamp
    Description: Most Wanted Starter Code
*/
//////////////////////////////////////////* Beginning Of Starter Code *//////////////////////////////////////////

"use strict";
//? Utilize the hotkey to hide block level comment documentation
////* Mac: Press "CMD"+"K" and then "CMD"+"/"
////* PC: Press "CTRL"+"K" and then "CTRL"+"/"

/**
 * This is the main logic function being called in index.html.
 * It operates as the entry point for our entire application and allows
 * our user to decide whether to search by name or by traits.
 * @param {Array} people        A collection of person objects.
 */
function app(people) {
    let searchType = promptFor(
        "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
        yesNo
    ).toLowerCase();
    let searchResults;
    switch (searchType) {
        case "yes":
            searchResults = searchByName(people);
            break;
        case "no":
            searchResults = findByMultipleTraits(people);
            break;
        default:
            app(people);
            break;
    }
    mainMenu(searchResults, people);
}

/**
 * After finding a single person, we pass in the entire person-object that we found,
 * as well as the entire original dataset of people. We need people in order to find
 * descendants and other information that the user may want.
 * @param {Object[]} person     A singular object inside of an array.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            The valid string input retrieved from the user.
 */
function mainMenu(person, people) {
    if (!person[0]) {
        alert("Could not find that individual.");
        return app(people);
    }
    let displayOption = prompt(
        `Found ${person[0].firstName} ${person[0].lastName}. Do you want to know their 'info', 'family', 'test', or 'descendants'?\nType the option you want or type 'restart' or 'quit'.`
    );

    switch (displayOption) {
        case "info":
            let personInfo = displayPerson(person[0]);
            alert(personInfo);
            break;
        case "family":
            // //! TODO: Declare a findPersonFamily function //////////////////////////////////////////
            // // HINT: Look for a people-collection stringifier utility function to help
            // let personFamily = findPersonFamily(person[0], people);

            // displayPeople(personFamily);
            function findFamily(person, people, parentsArray = []) {
                let family = people.filter(function (personObject) {
                    let parentsArray = personObject.parents;
                    for (let index = 0; index < parentsArray.length; index++) {
                        if (personObject.id === person.parents[0] || personObject.id === person.parents[1])
                            return true;
                    }
                    if (personObject.id === person.currentSpouse) {
                        return true;
                    }

                    for (let index = 0; index < parentsArray.length; index++) {
                        if (personObject.parents[index] === person.parents[0] || personObject.parents[index] === person.parents[1]) {
                            return true;
                        }
                    }
                    for (let index = 0; index < parentsArray.length; index++) {
                        if (personObject.parents[index] === person.id)
                            return true;
                        }
                })
                return family;
            }

            let foundFamily = findFamily(person[0], people)
            displayPeople(foundFamily)
            // function recursiveFindFamily(person, people, subArray= []){
            //     let recurseFamily = people.filter(function(el){
            //         let subArray = el.parents;
            //         for (let i = 0; i < person.parents.length; i++){    
            //             if (el.id === person.parents[i])
            //             return true;

            //         }
            //         if (el.id === person.currentSpouse){
            //             return true;
            //         }
                
            //         for (let i = 0; i < subArray.length; i++){
            //             if (el.parents[i] === person.parents[0] || el.parents[i]===person.parents[1]){
            //                 return true;
            //             }       
            //         }
            //         for (let i = 0; i < subArray.length; i++){
            //             if (el.parents[i] === person.id)
            //             return true;
            //         }    
            //     })
            //     return recurseFamily;
            // }
            break;
        case "descendants":
            //! TODO: Declare a findPersonDescendants function //////////////////////////////////////////
            // HINT: Review recursion lecture + demo for bonus user story
            let personDescendants = findPersonDescendants(person[0], people);
            alert(personDescendants);
            break;
        case "test":
            let spouse = findSpouse(person[0], people)
            console.log(spouse)
            let parents = findParents(person[0], people)
            break;
        case "restart":
            // Restart app() from the very beginning
            app(people);
            break;
        case "quit":
            // Stop application execution
            return;
        default:
            // Prompt user again. Another instance of recursion
            return mainMenu(person, people);
    }
}
// End of mainMenu()

/**
 * This function is used when searching the people collection by
 * a person-object's firstName and lastName properties.
 * @param {Array} people        A collection of person objects.
 * @returns {Array}             An array containing the person-object (or empty array if no match)
 */
function searchByName(people) {
    let firstName = promptFor("What is the person's first name?", chars);
    let lastName = promptFor("What is the person's last name?", chars);

    // The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
    let foundPerson = people.filter(function (person) {
        if (person.firstName === firstName && person.lastName === lastName) {
            return true;
        }
    });
    return foundPerson;
}
// End of searchByName()

/**
 * This function will be useful for STRINGIFYING a collection of person-objects
 * first and last name properties in order to easily send the information
 * to the user in the form of an alert().
 * @param {Array} people        A collection of person objects.
 */
function displayPeople(people) {
    alert(
        people
            .map(function (person) {
                return `${person.firstName} ${person.lastName}`;
            })
            .join("\n")
    );
}
// End of displayPeople()

/**
 * This function will be useful for STRINGIFYING a person-object's properties
 * in order to easily send the information to the user in the form of an alert().
 * @param {Object} person       A singular object.
 */
function displayPerson(person) {
    let personInfo = `First Name: ${person.firstName}\n`;
    personInfo += `Last Name: ${person.lastName}\n`;
    personInfo += `Gender: ${person.gender}\n`;
    personInfo += `DOB: ${person.dob}\n`;
    personInfo += `Height: ${person.height}\n`;
    personInfo += `Weight: ${person.weight}\n`;
    personInfo += `Eye Color: ${person.eyeColor}\n`;
    personInfo += `Occupation: ${person.occupation}\n`;
    alert(personInfo);
}
// End of displayPerson()

/**
 * This function's purpose is twofold:
 * First, to generate a prompt with the value passed in to the question parameter.
 * Second, to ensure the user input response has been validated.
 * @param {String} question     A string that will be passed into prompt().
 * @param {Function} valid      A callback function used to validate basic user input.
 * @returns {String}            The valid string input retrieved from the user.
 */
function promptFor(question, valid) {
    do {
        var response = prompt(question).trim();
    } while (!response || !valid(response));
    return response;
}
// End of promptFor()

/**
 * This helper function checks to see if the value passed into input is a "yes" or "no."
 * @param {String} input        A string that will be normalized via .toLowerCase().
 * @returns {Boolean}           The result of our condition evaluation.
 */
function yesNo(input) {
    return input.toLowerCase() === "yes" || input.toLowerCase() === "no";
}
// End of yesNo()

/**
 * This helper function operates as a default callback for promptFor's validation.
 * Feel free to modify this to suit your needs.
 * @param {String} input        A string.
 * @returns {Boolean}           Default validation -- no logic yet.
 */
function chars(input) {
    return true; // Default validation only
}
// End of chars()

//////////////////////////////////////////* End Of Starter Code *//////////////////////////////////////////
// Any additional functions can be written below this line 👇. Happy Coding! 😁
function findPersonFamily(person, people) {
    let family = []
    {
        let spouse = findSpouse(person, people)
        family.push(spouse)
    } {
        let parents = findParents(person, people)
        family.push(parents)
    }
    return family
}
function findSpouse(person, people){
    let filteredSpouse = people.filter(function (potentialSpouse) {
        if (potentialSpouse.id === person.currentSpouse) {
            return true;
        }
    })
    return filteredSpouse;
}

function findById(idNumber, people) {
    let filteredPerson = people.filter(function (potentialPerson) {
        if (potentialPerson.id === idNumber) {
            return true;
        }
    })
    return filteredPerson;
}

function findParents(person, people) {  
    let results = people.filter(function(fm){
        if(person.parents.includes(fm.id)) {
            return true
        } 
        
    }) 
    return results
}

function findByGender(people) { 
    let personsGender = promptFor("What is the person's gender?", chars);

    let arrayOfFoundGender = people.filter(function (person) {
        if (person.gender === personsGender) {
            return true;
        }
    })
    return arrayOfFoundGender;
}

function findByOccupation(people) { 
    let personsOccupation = promptFor("What is the person's occupation?", chars);

    let arrayOfFoundOccupations = people.filter(function (person) {
        if (person.occupation === personsOccupation) {
            return true;
        }
    })
    return arrayOfFoundOccupations;
}

function searchByEyeColor(people) { 
    let personsEyeColor = promptFor("What is the person's eye color?", chars);

    let arrayOfFoundEyeColors = people.filter(function(potentialMatch) {
        if (potentialMatch.eyeColor === personsEyeColor) {
            return true;
        }
    })
    return arrayOfFoundEyeColors;
}

function searchByDOB(people) { 
    let personsDob = promptFor("What is the person's date of birth? (M/D/YYYY)", chars);
    
    let foundPerson = people.filter(function (potentialMatch) {
      if (potentialMatch.dob === personsDob) {
        return true;
      }
    })
    return  foundPerson;
}

function findByWeight(people) { 
    let personsWeight = parseInt(promptFor("What is the person's weight?", chars));

    let arrayOfFoundWeight = people.filter(function (person) {
        if (person.weight === personsWeight){
            return true;
        }
    })
    return arrayOfFoundWeight;
}

function findByHeight(people) { 
    let personsHeight = parseInt(promptFor("What is the person's height?", chars));
    
    let arrayOfFoundHeight = people.filter(function (person) {
        if (person.height === personsHeight){
            return true;
        }
    })
    return arrayOfFoundHeight;
}

function findByMultipleTraits(people) {
    let genderInput = promptFor("What gender would you like to search for? Press 's' to skip", chars);
    let heightInput = promptFor("What height would you like to search for? Press 's' to skip", chars);
    let intHeight = parseInt(heightInput)
    let weightInput = promptFor("What weight would you like to search for? Press 's' to skip", chars);
    let intWeight = parseInt(weightInput)
    let eyeColorInput = promptFor("What eye color would you like to search for? Press 's' to skip", chars);
    let occupationInput = promptFor("What occupation would you like to search for? Press 's' to skip", chars);
    let filteredSearch = people.filter(function(person){
      
        if (genderInput === person.gender || genderInput === "s"){
            return true;
        }
    }
    ).filter(function(person){
      
        if (intHeight === person.height || heightInput === "s"){
            return true;
        }
    }
    ).filter(function(person){
        if (intWeight === person.weight || weightInput === "s"){
            return true;    
        }
    }
    ).filter(function(person){
        if (eyeColorInput === person.eyeColor || eyeColorInput === "s"){
            return true;
        }
    }
    ).filter(function(person){
        if (occupationInput === person.occupation || occupationInput === "s"){
            return true;
        }
    }
    )

    return filteredSearch;
    }






// siblings = people.map(findSiblings)

// function findSiblings(personObject) {
//     resultsArrayOfSiblingIds = [];
//     if (chosenPerson.parent[0] === personObject.parents[0] || chosenPerson.parent[0] === personObject.parents[1]);
//      {
//         let siblingObject = {
//             id: personObject.id,
//             firstname: personObject.firstName,
//             lastname: personObject.lastName
//         }
//         resultsArrayOfSiblingIds.push(personObject.id)
//     }
//     if (chosenPerson.parent[1] === personObject.parents[0] || chosenPerson.parent[1] === personObject.parents[1]);
//     {
//         resultsArrayOfSiblingIds.push(personObject.id)
//     }
//     return resultsArrayOfSiblingIds
// }
