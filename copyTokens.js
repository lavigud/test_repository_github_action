//Script d'installation de la story dans Storybook.
const destinationModule = "../ds-tokens-test/tokens";


//Copie les fichiers de Tokens de Build vers ds-tokens-test
function copyModuleFile(){
	var copyfiles = require('copyfiles');
	
	var options = {"up":1};
	copyfiles(["build/*/**",destinationModule], options, function(){
		console.log('Copie des définitions réussie');
		
		});
}

//Détection du module où la composante est installé
function getModuleName(){
	var data;

	try {
		data = require(process.env.INIT_CWD+'package.json');
		return data.name;
	} 
	catch (ex) {
		return '';
	}
}

//Installation de la composante
var moduleName = getModuleName();
var sitename;
if (moduleName != ''){
	console.log('Copie des tokens vers Package Tokens NPM.');
	copyModuleFile();
}else{
	console.log('Aucun script à rouler dans le module même.');
}
