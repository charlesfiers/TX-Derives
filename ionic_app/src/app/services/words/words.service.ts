export class WordsService {

	private rand : number;

	names = {
		"objects" : [ "arbre", "panneaux", "voiture", "vélo", "buisson", "sapin", "piéton", "scooter", "route", "rivière"],
		"abstracts" : [ "rayon", "bruit", "odeur", "éclair", "rire", "cri", "lumière", "effluve"]
	};

	verbs = {
		"actions" : [ "marche", "roule", "parle", "vend", "fond", "découvre", "coure"],
		"feelings" : [ "sen", "entend", "aperçoi", "touche", "goûte", "ressen"]
	};

  constructor() { }

  pickWord(type : string){

  	switch (type) {
  		case "objects":
  			this.rand = Math.floor(Math.random() * this.names.objects.length);
  			console.log(this.rand);
  			return this.names.objects[0];
  			break;
  		
  		default:
  			return "ERROR";
  			break;
  	};
  };

}
