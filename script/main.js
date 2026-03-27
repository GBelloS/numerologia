import * as tools from "./tools/export.js";
import * as analysis from "./analysis/export.js";

document.getElementById('generateBtn')
    .addEventListener('click',function(){
        const
            analyzedName=
                document.getElementById('name')
                    .value.toUpperCase(),
            analyzedNameObject = tools.abstract.nameAsObject(analyzedName),
            nameVowelsObject = tools.abstract.nameAsObject(
                tools.filterLetters(tools.vowels, analyzedName)
            ),
            nameConsonantsObject = tools.abstract.nameAsObject(
                tools.filterLetters(tools.consonants, analyzedName)
            ),
            
            character = analyzedNameObject.numberObject,
            mission = nameVowelsObject.numberObject,
            personality = nameConsonantsObject.numberObject,

            analyzedBirthday=
                document.getElementById('birthday')
                    .valueAsDate,
            birthdayObject = tools.abstract.dateAsObject(analyzedBirthday),

            origin = birthdayObject.numberObject,
            nature = birthdayObject.date.day.numberObject,

            pinnacles = tools.abstract.pinnacles(birthdayObject),
            pyramid = tools.abstract.nameAsPyramid(9,analyzedName),
            quantities = analyzedNameObject.numberAmounts;
//Δ\\
        console.log({analyzedName,analyzedNameObject,nameVowelsObject,nameConsonantsObject,character,mission,personality,analyzedBirthday,birthdayObject,origin,nature,pinnacles,pyramid,quantities});

        const analysisDiv = document.getElementById('analysis');
        
        analysis.name(analysisDiv,analyzedNameObject);
        analysis.feat(analysisDiv,character,'Caráter');

        analysis.filteredName(analysisDiv,nameVowelsObject);
        analysis.feat(analysisDiv,mission,'Missão');
        
        analysis.filteredName(analysisDiv,nameConsonantsObject);
        analysis.feat(analysisDiv,personality,'Personalidade');

        analysis.birthday(analysisDiv,birthdayObject);
        analysis.feat(analysisDiv,origin,'Origem');
        analysis.feat(analysisDiv,nature,'Natureza');

        analysis.pinnacles(analysisDiv, pinnacles, origin);
    })
