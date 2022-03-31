

/// Define global variables

people = [{}, {}, {}]
let selectedPerson = {
    id: "123456",
    firstname: "Cash",
    parents: [
        "456789",
        "888318"
    ]
}
siblings = people.map(findSiblings)  // [{id: "123796", firstname: "Guy", lastname:"Myers"   },"798764", "364189"]  // Array of objects

function findSiblings(personRecord) {

    // Take the person = need the parent id(s) ? WHO IS THE PRIMARY into this function
    resultsArrayOfSiblingIds = []

    // take each reacord compare parent 1 to see if there is a match (DAD)
    if (selectedPerson.parents[0] = personRecord.parents[0] || selectedPerson.parents[0] = personRecord.parents[1])
    {
        let siblingObject = {
            id: personRecord.id,
            firstname: personRecord.firstName,
            lastname: personRecord.lastname
        }
        resultsArrayOfSiblingIds.push(siblingObject)
    }
    // take each reacord compare parent 2 to see if there is a match (MOM)
    if (selectedPerson.parents[1] = personRecord.parents[0] || selectedPerson.parents[1] = personRecord.parents[1])
    {
        resultsArrayOfSiblingIds.push(personRecord.id)
    }

    return resultsArrayOfSiblingIds
}

// Now WHAT?
// Iterate over sibling /// for each record find the names and display them
function displaySibings(someArray) {
    // for loop or MAP or something else (filter)
}

displaySibings(siblings)