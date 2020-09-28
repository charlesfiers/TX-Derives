export class WordsService {

	names = {
		"objects" : [ "arbre", "panneau", "voiture", "vélo", "buisson", "sapin", "piéton", "scooter", "route", "rivière"],
		"abstracts" : [ "rayon", "bruit", "odeur", "éclair", "rire", "cri", "lumière", "effluve"]
	};

	verbs = {
		"actions" : [ "marche", "roule", "parle", "vend", "fond", "découvre", "coure"],
		"feelings" : [ "sen", "entend", "aperçoi", "touche", "goûte", "ressen"]
	};

  constructor() { }

  pickWord(type : string){

  	var rand;

  	switch (type) {
  		case "objects":
  			rand = Math.floor(Math.random() * this.names.objects.length);
  			return this.names.objects[rand];
  			break;

  		case "abstracts":
  			rand = Math.floor(Math.random() * this.names.abstracts.length);
  			return this.names.abstracts[rand];
  			break;

  		case "actions":
  			rand = Math.floor(Math.random() * this.verbs.actions.length);
  			return this.verbs.actions[rand];
  			break;

  		case "feelings":
  			rand = Math.floor(Math.random() * this.verbs.feelings.length);
  			return this.verbs.feelings[rand];
  			break;
  		
  		default:
  			return "ERROR";
  			break;
  	};
  };

}
