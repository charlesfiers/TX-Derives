import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WordsService {

	private names = {
		"objects" : [ "arbre", "panneaux", "voiture", "vélo", "buisson", "sapin", "piéton", "scooter", "route", "rivière"
		],
		"abstracts" : [ "rayon", "bruit", "odeur", "éclair", "rire", "cri", "lumière", "effluve"
		],
	};

	private verbs = {
		"actions" : [ "marche", "roule", "parle", "vend", "fond", "découvre", "coure"
		],
		"feelings" : [ "sen", "entend", "aperçoi", "touche", "goûte", "ressen"
		],

	};

  constructor() { }
}
