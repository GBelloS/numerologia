import * as tools from "./tools.js";

const
    analyzedName = 'GABRIEL BELLO SCHWARZBOLD',
    
    character = tools.nameNumber(analyzedName),
    mission = tools.nameNumber(
        tools.nameFilter(tools.vowels, analyzedName)
    ),
    personality = tools.nameNumber(
        tools.nameFilter(tools.consonants, analyzedName)
    ),

    analyzedBirthday = [14,3,1995],
    birthdayNumbers = analyzedBirthday.map(
        number=>tools.masterReducted(number)
    ),

    origin = tools.dateNumber(birthdayNumbers),
    nature = tools.dateNumber(birthdayNumbers.slice(0,1)), //day

    pinnacles = tools.pinnacles(birthdayNumbers),
    pyramid = tools.namePyramid(9,analyzedName);
