const StyleDictionaryPackage = require('style-dictionary');
const StyleDictionary = require("style-dictionary");

// HAVE THE STYLE DICTIONARY CONFIG DYNAMICALLY GENERATED

StyleDictionary.registerTransform({
    name: 'shadow/spreadShadow',
    type: 'value',
    matcher: function (token) {
        return token.type === 'boxShadow';
    },
    transformer: (token) => {
        const shadow = token.value;

        return `${shadow.x} ${shadow.y} ${shadow.blur} ${shadow.spread} ${shadow.color}`;
    }
});

StyleDictionary.registerTransform({
    name: 'any/px',
    type: 'value',
    matcher: function (token) {
        return ['borderRadius', 'spacing', 'borderWidth', 'fontSizes', 'fontSize',"lineHeight","lineHeights","paragraphSpacing"].includes(token.type || token.attributes.item);
    },
    transformer: (token) => {
        return `${token.value}px`;
    }
});


function getStyleDictionaryConfig(brand, platform) {
    return {
        "source": [
            `transformer-output/${brand}.json`,
        ],
        "platforms": {
            "scss": {
                "transformGroup": "scss",
                "transforms": ['shadow/spreadShadow', "attribute/cti", "name/cti/kebab", "color/hex", "any/px"],
                "buildPath": "build/scss/",
                "files": [{
                    "destination": `${brand}-variables.scss`,
                    "format": "scss/variables"
                }]
            },
            "css": {
                "transformGroup": "css",
                "transforms": ['shadow/spreadShadow', "attribute/cti", "name/cti/kebab", "color/hex","any/px"],
                "buildPath": "build/css/",
                "files": [{
                    "destination": `${brand}-variables.css`,
                    "format": "css/variables"
                }]
            },
            "ios": {
                "transformGroup": "ios",
                "transforms": ['shadow/spreadShadow', "attribute/cti", "name/cti/kebab", "color/hex","any/px"],
                "buildPath": `build/ios/${brand}/`,
                "files": [{
                    "destination": "tokens.h",
                    "format": "ios/macros"
                }]
            }
        }
    };
}

console.log('Build started...');

// PROCESS THE DESIGN TOKENS FOR THE DIFFEREN BRANDS AND PLATFORMS

['light', 'dark', 'global'].map(function (brand) {
    ['scss', 'css', 'ios'].map(function (platform) {

        console.log('\n==============================================');
        console.log(`\nProcessing: [${platform}] [${brand}]`);

        const StyleDictionary = StyleDictionaryPackage.extend(getStyleDictionaryConfig(brand, platform));

        StyleDictionary.buildPlatform(platform);

        console.log('\nEnd processing');

    })
})

console.log('\n==============================================');
console.log('\nBuild completed!');
/*const StyleDictionaryPackage = require('style-dictionary');*/

// HAVE THE STYLE DICTIONARY CONFIG DYNAMICALLY GENERATED
//Permet de créer les différents .json (je crois)

//Fonction permettant d'indiquer le type de size d'une valeur (rem pour lec coup)
/*StyleDictionaryPackage.registerTransform({
    name: 'size/rem',
    type: 'value',

    // Retourne un boolean indiquant si l'on doit appliquer la fonction transformer sur un token ()  
    matcher: function(prop) {
        // You can be more specific here if you only want 'em' units for font sizes    
        return ["fontSize", "spacing", "borderRadius", "borderWidth", "sizing"].includes(prop.attributes.category);
    },
    //Modifie le token en question. recoit le token en paramètre.
    transformer: function(prop) {
        // You can also modify the value here if you want to convert pixels to ems
        return parseFloat(prop.original.value) + 'rem';
    }
    });*/
    /*StyleDictionaryPackage.registerFormat({
        name: 'css/variables',
        formatter: function (dictionary, config) {
          return `${this.selector} {
            ${dictionary.allProperties.map(prop => `  --${prop.name}: ${prop.value};`).join('\n')}
          }`
        }
      });  */

   /* StyleDictionaryPackage.registerTransform({
    name: 'any/rem',
    type: 'value',
    matcher: function (token) {
        return Number.isInteger(token.value);
       // return ['borderRadius', 'spacing', 'borderWidth', 'fontSizes', 'fontSize','lineHeight'].includes(token.type);
    },
    transformer: (token) => {
        return `${token.value/16}rem`;
    }
});*/

/*function getStyleDictionaryConfig(theme) {
  return {
    "source": [
      `transformer-output/${theme}.json`,
    ],
    "platforms": {
      "web": {
        "transforms": ["attribute/cti", "name/cti/kebab", "any/rem",],
        "buildPath": `build/`,
        "files": [{
            "destination": `${theme}.css`,
            "format": "css/variables",
            "selector": `.${theme}-theme`
          }]
      }
    }
  };
}*/

/*console.log('Build started...');

// PROCESS THE DESIGN TOKENS FOR THE DIFFEREN BRANDS AND PLATFORMS

['global', 'dark', 'light'].map(function (theme) {

    console.log('\n==============================================');
    console.log(`\nProcessing: [${theme}]`);

    const StyleDictionary = StyleDictionaryPackage.extend(getStyleDictionaryConfig(theme));

    StyleDictionary.buildPlatform('web');

    console.log('\nEnd processing');
})

console.log('\n==============================================');
console.log('\nBuild completed!');*/
