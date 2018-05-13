/**********************************************************************************************
*
* Data arrays that hold the stops for each bus number and direction
*
* After careful consideration, I opted to hard code in the stop data for each stop
* I made the AJAX call for each stop which can be found at data/ajax.txt
* 
* The reasoning behind this is that these calls aren't necessary every single time on load,
* but it also is not worth the time/memory to cache this data either
*
* These stop ID's, stop names, and locations are very unlikely to change,
* and if they do change it will not be changed often
*
* I therefore believe that the best way to store this data was to make the ajax calls,
* but store the actual data in the source files.
*
* If any data is changed from the API, I will gladly be able to come back and 
* make the changes, but I am confident that changes will be rare and infrequent
*
* Another reason behind my choice to hard code this data is that the CTA API does not return
* back all the data I want.
* It only returns the stpid, the stpnm, the lat, and the lon. 
* I also wanted to keep track of route number and travel direction, since
* some bus routes use the same exact stops.
* 
**********************************************************************************************/

// stops that are shared by the 7 bus and the 60 bus
var sevenSixtyEast = [
	{rt: "7, 60", dir: "Eastbound", stpid: "14210", stpnm: "Canal & Harrison", lat: 41.874637890315, lon: -87.639527320862},
	{rt: "7, 60", dir: "Eastbound", stpid: "17995", stpnm: "Harrison & Jefferson", lat: 41.874344986696, lon: -87.641897334914},
	{rt: "7, 60", dir: "Eastbound", stpid: "6347", stpnm: "Harrison & Halsted", lat: 41.874246439513, lon: -87.647445201874},
	{rt: "7, 60", dir: "Eastbound", stpid: "201", stpnm: "900 W Harrison", lat: 41.874346299639, lon: -87.648807764053},
	{rt: "7, 60", dir: "Eastbound", stpid: "200", stpnm: "Harrison & Morgan", lat: 41.874286383582, lon: -87.651940584183}
];
var sevenSixtyWest = [
	{rt: "7, 60", dir: "Westbound", stpid: "6364", stpnm: "Clinton & Harrison", lat: 41.874438170818, lon: -87.640986442566},
	{rt: "7, 60", dir: "Westbound", stpid: "6365", stpnm: "Harrison & Jefferson", lat: 41.874410210038, lon: -87.642263174057},
	{rt: "7, 60", dir: "Westbound", stpid: "206", stpnm: "Harrison & Halsted", lat: 41.874442165214, lon: -87.647734880447},
	{rt: "7, 60", dir: "Westbound", stpid: "207", stpnm: "900 W Harrison", lat: 41.87449409234, lon: -87.649258375168},
	{rt: "7, 60", dir: "Westbound", stpid: "208", stpnm: "Harrison & Morgan", lat: 41.874450154005, lon: -87.651591897011}
];
var sevenEast = [
	{rt: "7", dir: "Eastbound", stpid: "18336", stpnm: "Harrison & Loomis", lat: 41.874141143355, lon: -87.661574504299},
	{rt: "7", dir: "Eastbound", stpid: "198", stpnm: "Harrison & Racine", lat: 41.874202501008, lon: -87.656666636467},
	{rt: "7", dir: "Eastbound", stpid: "18339", stpnm: "Harrison & Throop", lat: 41.874168445122, lon: -87.659573933194}
];
var sevenWest = [
	{rt: "7", dir: "Westbound", stpid: "18335", stpnm: "Harrison & Loomis", lat: 41.874255633116, lon: -87.661988906746},
	{rt: "7", dir: "Westbound", stpid: "210", stpnm: "Harrison & Racine", lat: 41.874354288443, lon: -87.657428383827},
	{rt: "7", dir: "Westbound", stpid: "18340", stpnm: "Harrison & Throop", lat: 41.874297368196, lon: -87.659625113009}
];
var eightSouth = [
	{rt: "8", dir: "Southbound", stpid: "5804", stpnm: "Halsted & 14th Place", lat: 41.862389936575, lon: -87.646812200546},
	{rt: "8", dir: "Southbound", stpid: "4638", stpnm: "Halsted & Harrison", lat: 41.873831019714, lon: -87.647214531898},
	{rt: "8", dir: "Southbound", stpid: "5799", stpnm: "Halsted & Jackson", lat: 41.878029032111, lon: -87.647313236666},
	{rt: "8", dir: "Southbound", stpid: "15008", stpnm: "Halsted & Madison", lat: 41.881503067986, lon: -87.647415161918},
	{rt: "8", dir: "Southbound", stpid: "5802", stpnm: "Halsted & Maxwell", lat: 41.864866881017, lon: -87.646881937981},
	{rt: "8", dir: "Southbound", stpid: "15352", stpnm: "Halsted & Monroe", lat: 41.88025454567, lon: -87.647378468173},
	{rt: "8", dir: "Southbound", stpid: "4639", stpnm: "Halsted & Polk", lat: 41.871937629893, lon: -87.647150158882},
	{rt: "8", dir: "Southbound", stpid: "17366", stpnm: "Halsted & Roosevelt", lat: 41.867215894509, lon: -87.646951675415},
	{rt: "8", dir: "Southbound", stpid: "4640", stpnm: "Halsted & Taylor", lat: 41.869896380997, lon: -87.647096514702},
	{rt: "8", dir: "Southbound", stpid: "205", stpnm: "UIC-Halsted Blue Line Station", lat: 41.875513453518, lon: -87.647277832293}
];
var eightNorth = [
	{rt: "8", dir: "Northbound", stpid: "5926", stpnm: "Halsted & 14th Place", lat: 41.862198169133, lon: -87.64672100544},
	{rt: "8", dir: "Northbound", stpid: "18009", stpnm: "Halsted & Jackson", lat: 41.878208885061, lon: -87.647189001581},
	{rt: "8", dir: "Northbound", stpid: "440", stpnm: "Halsted & Madison", lat: 41.882007103365, lon: -87.647316455841},
	{rt: "8", dir: "Northbound", stpid: "5928", stpnm: "Halsted & Maxwell", lat: 41.864655145968, lon: -87.646796107292},
	{rt: "8", dir: "Northbound", stpid: "5931", stpnm: "Halsted & Monroe", lat: 41.880271320896, lon: -87.647260665108},
	{rt: "8", dir: "Northbound", stpid: "4618", stpnm: "Halsted & Polk", lat: 41.871777847595, lon: -87.646887302399},
	{rt: "8", dir: "Northbound", stpid: "14777", stpnm: "Halsted & Roosevelt", lat: 41.867631357301, lon: -87.646871209145},
	{rt: "8", dir: "Northbound", stpid: "14487", stpnm: "Halsted & Taylor", lat: 41.869756567043, lon: -87.646833658218},
	{rt: "8", dir: "Northbound", stpid: "18184", stpnm: "UIC-Halsted Blue Line Station", lat: 41.875578047547, lon: -87.647168084553}
];
var twelveEast = [
	{rt: "12", dir: "Eastbound", stpid: "313", stpnm: "327 W Roosevelt", lat: 41.867199915117, lon: -87.635573744774},
	{rt: "12", dir: "Eastbound", stpid: "307", stpnm: "900 W Roosevelt", lat: 41.867020146681, lon: -87.649419307709},
	{rt: "12", dir: "Eastbound", stpid: "305", stpnm: "Roosevelt & Blue Island", lat: 41.86695223403, lon: -87.653641104698},
	{rt: "12", dir: "Eastbound", stpid: "312", stpnm: "Roosevelt & Canal", lat: 41.867151976917, lon: -87.638840675354},
	{rt: "12", dir: "Eastbound", stpid: "14459", stpnm: "Roosevelt & Halsted", lat: 41.867064090124, lon: -87.646324038506},
	{rt: "12", dir: "Eastbound", stpid: "310", stpnm: "Roosevelt & Jefferson", lat: 41.867120018097, lon: -87.642295360565},
	{rt: "12", dir: "Eastbound", stpid: "17003", stpnm: "Roosevelt & May", lat: 41.866924269976, lon: -87.65537917614},
	{rt: "12", dir: "Eastbound", stpid: "306", stpnm: "Roosevelt & Morgan", lat: 41.866996177518, lon: -87.651221752167}
];
var twelveWest = [
	{rt: "12", dir: "Westbound", stpid: "326", stpnm: "327 W Roosevelt", lat: 41.867393265591, lon: -87.635536193848},
	{rt: "12", dir: "Westbound", stpid: "332", stpnm: "900 W Roosevelt", lat: 41.867211899662, lon: -87.649462223053},
	{rt: "12", dir: "Westbound", stpid: "334", stpnm: "Roosevelt & Blue Island", lat: 41.867151976917, lon: -87.653083205223},
	{rt: "12", dir: "Westbound", stpid: "327", stpnm: "Roosevelt & Canal", lat: 41.867339734662, lon: -87.639044523239},
	{rt: "12", dir: "Westbound", stpid: "17396", stpnm: "Roosevelt & Halsted", lat: 41.867262250879, lon: -87.647493333335},
	{rt: "12", dir: "Westbound", stpid: "18174", stpnm: "Roosevelt & Jefferson", lat: 41.867300218619, lon: -87.642539020541},
	{rt: "12", dir: "Westbound", stpid: "335", stpnm: "Roosevelt & May", lat: 41.86711202839, lon: -87.655030488968},
	{rt: "12", dir: "Westbound", stpid: "333", stpnm: "Roosevelt & Morgan", lat: 41.867183935721, lon: -87.650862336159}

];
var sixtyEast = [
	{rt: "60", dir: "Eastbound", stpid: "6342", stpnm: "Racine & 13th Street", lat: 41.865110575204, lon: -87.65657544136},
	{rt: "60", dir: "Eastbound", stpid: "6341", stpnm: "Racine & 14th Street", lat: 41.863680356701, lon: -87.656543254852},
	{rt: "60", dir: "Eastbound", stpid: "6346", stpnm: "Racine & Harrison", lat: 41.874074679731, lon: -87.656720280647},
	{rt: "60", dir: "Eastbound", stpid: "15993", stpnm: "Racine & Lexington", lat: 41.871689967161, lon: -87.656725645065},
	{rt: "60", dir: "Eastbound", stpid: "15404", stpnm: "Racine & Roosevelt", lat: 41.867255842972, lon: -87.656655907631},
	{rt: "60", dir: "Eastbound", stpid: "6344", stpnm: "Racine & Taylor", lat: 41.869293181468, lon: -87.656731009483}
];
var sixtyWest = [
	{rt: "60", dir: "Westbound", stpid: "6370", stpnm: "Racine & 13th Street", lat: 41.865350273499, lon: -87.656666636467},
	{rt: "60", dir: "Westbound", stpid: "6371", stpnm: "Racine & 14th Street", lat: 41.863560504536, lon: -87.656623721123},
	{rt: "60", dir: "Westbound", stpid: "15402", stpnm: "Racine & Cabrini", lat: 41.871206622614, lon: -87.656854391098},
	{rt: "60", dir: "Westbound", stpid: "6366", stpnm: "Racine & Harrison", lat: 41.87403473553, lon: -87.656972408295},
	{rt: "60", dir: "Westbound", stpid: "15401", stpnm: "Racine & Lexington", lat: 41.872400996298, lon: -87.656972408295},
	{rt: "60", dir: "Westbound", stpid: "15403", stpnm: "Racine & Roosevelt", lat: 41.866776459772, lon: -87.656720280647},
	{rt: "60", dir: "Westbound", stpid: "15292", stpnm: "Racine & Taylor", lat: 41.869496911747, lon: -87.65682220459}
];
var onefiftysevenEast = [
	{rt: "157", dir: "Eastbound", stpid: "6700", stpnm: "900 W Taylor", lat: 41.869468948806, lon: -87.648759484291},
	{rt: "157", dir: "Eastbound", stpid: "6705", stpnm: "Canal & Taylor", lat: 41.869992253245, lon: -87.63925909996},
	{rt: "157", dir: "Eastbound", stpid: "6698", stpnm: "Taylor & Aberdeen", lat: 41.869436991144, lon: -87.654402852058},
	{rt: "157", dir: "Eastbound", stpid: "6701", stpnm: "Taylor & Halsted", lat: 41.869484927631, lon: -87.647375464439},
	{rt: "157", dir: "Eastbound", stpid: "6703", stpnm: "Taylor & Jefferson", lat: 41.869688657298, lon: -87.642402648926},
	{rt: "157", dir: "Eastbound", stpid: "6694", stpnm: "Taylor & Laflin", lat: 41.869265218438, lon: -87.664278745651},
	{rt: "157", dir: "Eastbound", stpid: "6695", stpnm: "Taylor & Loomis", lat: 41.869313155054, lon: -87.661719918251},
	{rt: "157", dir: "Eastbound", stpid: "6699", stpnm: "Taylor & Morgan", lat: 41.869480932925, lon: -87.651345133781},
	{rt: "157", dir: "Eastbound", stpid: "6697", stpnm: "Taylor & Racine", lat: 41.869389054621, lon: -87.656854391098},
	{rt: "157", dir: "Eastbound", stpid: "6696", stpnm: "Taylor & Throop", lat: 41.86935709692, lon: -87.659289836884}

];
var onefiftysevenWest = [
	{rt: "157", dir: "Westbound", stpid: "6627", stpnm: "900 W Taylor", lat: 41.869664689136, lon: -87.648534178734},
	{rt: "157", dir: "Westbound", stpid: "6623", stpnm: "Clinton & Taylor", lat: 41.869780535171, lon: -87.640820145607},
	{rt: "157", dir: "Westbound", stpid: "6629", stpnm: "Taylor & Aberdeen", lat: 41.869504901156, lon: -87.65401661396},
	{rt: "157", dir: "Westbound", stpid: "17277", stpnm: "Taylor & Halsted", lat: 41.869696646684, lon: -87.647370100021},
	{rt: "157", dir: "Westbound", stpid: "17275", stpnm: "Taylor & Jefferson", lat: 41.869748577665, lon: -87.642627954483},
	{rt: "157", dir: "Westbound", stpid: "6633", stpnm: "Taylor & Laflin", lat: 41.869333128633, lon: -87.663999795914},
	{rt: "157", dir: "Westbound", stpid: "6632", stpnm: "Taylor & Loomis", lat: 41.869373075773, lon: -87.661403417587},
	{rt: "157", dir: "Westbound", stpid: "6628", stpnm: "Taylor & Morgan", lat: 41.869536858784, lon: -87.651361227036},
	{rt: "157", dir: "Westbound", stpid: "15811", stpnm: "Taylor & Racine", lat: 41.869448975269, lon: -87.65684902668},
	{rt: "157", dir: "Westbound", stpid: "6631", stpnm: "Taylor & Throop", lat: 41.869417017597, lon: -87.659069895744}
];

var busStopsArr = {};

busStopsArr["007E"] = sevenEast;
busStopsArr["007W"] = sevenWest;
busStopsArr["008S"] = eightSouth;
busStopsArr["008N"] = eightNorth;
busStopsArr["012E"] = twelveEast;
busStopsArr["012W"] = twelveWest;
busStopsArr["060E"] = sixtyEast;
busStopsArr["060W"] = sixtyWest;
busStopsArr["157E"] = onefiftysevenEast;
busStopsArr["157W"] = onefiftysevenWest;
busStopsArr["SMEE"] = sevenSixtyEast;
busStopsArr["SMEW"] = sevenSixtyWest;

var bluelineFP = [
	{rt: "blue", dir: "Forest Park", stpid: "30374", stpnm: "Clarke/Lake", lat: 41.886017, lon: -87.630381},
	{rt: "blue", dir: "Forest Park", stpid: "30073", stpnm: "Washington", lat: 41.882624, lon: -87.629332},
	{rt: "blue", dir: "Forest Park", stpid: "30154", stpnm: "Monroe", lat: 41.880467, lon: -87.629398},
	{rt: "blue", dir: "Forest Park", stpid: "30015", stpnm: "Jackson", lat: 41.877382, lon: -87.62931},
	{rt: "blue", dir: "Forest Park", stpid: "30262", stpnm: "LaSalle", lat: 41.875762, lon: -87.633061},
	{rt: "blue", dir: "Forest Park", stpid: "30085", stpnm: "Clinton", lat: 41.876018, lon: -87.641299},
	{rt: "blue", dir: "Forest Park", stpid: "30069", stpnm: "UIC-Halsted", lat: 41.875897, lon: -87.647296},
	{rt: "blue", dir: "Forest Park", stpid: "30093", stpnm: "Racine", lat: 41.875818, lon: -87.657147},
	{rt: "blue", dir: "Forest Park", stpid: "30158", stpnm: "Illinois Medical District", lat: 41.875903, lon: -87.676512}
];

var bluelineOH = [
	{rt: "blue", dir: "O'Hare", stpid: "30375", stpnm: "Clarke/Lake", lat: 41.886017, lon: -87.630381},
	{rt: "blue", dir: "O'Hare", stpid: "30072", stpnm: "Washington", lat: 41.882624, lon: -87.629332},
	{rt: "blue", dir: "O'Hare", stpid: "30153", stpnm: "Monroe", lat: 41.880467, lon: -87.629398},
	{rt: "blue", dir: "O'Hare", stpid: "30014", stpnm: "Jackson", lat: 41.877382, lon: -87.62931},
	{rt: "blue", dir: "O'Hare", stpid: "30261", stpnm: "LaSalle", lat: 41.875762, lon: -87.633061},
	{rt: "blue", dir: "O'Hare", stpid: "30084", stpnm: "Clinton", lat: 41.876018, lon: -87.641299},
	{rt: "blue", dir: "O'Hare", stpid: "30068", stpnm: "UIC-Halsted", lat: 41.875897, lon: -87.647296},
	{rt: "blue", dir: "O'Hare", stpid: "30092", stpnm: "Racine", lat: 41.875818, lon: -87.657147},
	{rt: "blue", dir: "O'Hare", stpid: "30157", stpnm: "Illinois Medical District", lat: 41.875903, lon: -87.676512}
];

var trainStopsArr = {};

trainStopsArr["FP"] = bluelineFP;
trainStopsArr["OH"] = bluelineOH;

// array that holds the hex color for each bus/train route
colors = {
	// ROYAL BLUE: blue line
	"BLUE": "#0000FF",
	// RED: 7 bus
	"007E": "#FF0000",
	"007W": "#FF0000",
	// GREEN: 8 bus
	"008S": "#006600",
	"008N": "#006600",
	// PURPLE: 12 bus
	"012E": "#9400D3",
	"012W": "#9400D3",
	// ORANGE: 60 bus
	"060E": "#FF7F00",
	"060W": "#FF7F00",
	// BROWN: 157 bus
	"157E": "#663300",
	"157W": "#663300",
	// BLACK: stops that are the same for 7 and 60
	"SMEE": "#000000",
	"SMEW": "#000000"
};