import { Component, OnInit } from '@angular/core';

import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';import { map } from "rxjs/operators";
import { GlobalService } from './../global.service';
import { ViewEncapsulation} from '@angular/core';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  constructor(private localSt:LocalStorageService,public global: GlobalService,private http: Http) { }
  percent = 0
  status = ''
  lastupdate:any

  reset(){
  	this.runstart() 
  }
  ngOnInit() {
  	this.runstart()
  }
  runstart(){
  	this.localSt.clear();
  	console.log(this.localSt.retrieve('https://pokeapi.co/api/v2/region/'));
  	if(this.localSt.retrieve("https://pokeapi.co/api/v2/region/")!=null){
  		this.status=''
  		this.global.region=this.localSt.retrieve("https://pokeapi.co/api/v2/region/")
  		for (var x = 0; x < this.global.region.length; ++x) {

	      	this.global.region[x].regiondata=[]
	      	this.global.region[x].selectedpokedex='0'
  			if (this.localSt.retrieve(this.global.region[x].url+'selectedpokedex')!=null&&this.localSt.retrieve(this.global.region[x].url+'selectedpokedex')!='undefined') {
		      	this.global.region[x].regiondata=this.localSt.retrieve(this.global.region[x].url)
		      	this.global.region[x].selectedpokedex=this.localSt.retrieve(this.global.region[x].url+'selectedpokedex')
  			}

	      	for (var y = 0; y < this.global.region[x].regiondata.pokedexes.length; ++y) {

			  	this.global.region[x].regiondata.pokedexes[y].pokemon_entries=[]
			  	if (this.global.region[x].regiondata.pokedexes[y].url!=undefined&&this.localSt.retrieve(this.global.region[x].regiondata.pokedexes[y].url)!='undefined') {
		      		if (this.localSt.retrieve(this.global.region[x].regiondata.pokedexes[y].url)!=null) {
					  	this.global.region[x].regiondata.pokedexes[y].pokemon_entries=this.localSt.retrieve(this.global.region[x].regiondata.pokedexes[y].url)
					  	this.global.region[x].regiondata.pokedexes[y].percent=parseInt(this.localSt.retrieve(this.global.region[x].regiondata.pokedexes[y].url+'percent'))
		      		}
			  	}

			  	for (var z = 0; z < this.global.region[x].regiondata.pokedexes[y].pokemon_entries.length; ++z) {
				  	this.global.region[x].regiondata.pokedexes[y].percent =parseInt(this.localSt.retrieve(this.global.region[x].regiondata.pokedexes[y].url+'percent'))
				  	this.global.region[x].regiondata.pokedexes[y].pokemon_entries[z].details=[]
				  	if (this.global.region[x].regiondata.pokedexes[y].pokemon_entries[z].pokemon_species.url!=undefined&&localStorage.getItem(this.global.region[x].regiondata.pokedexes[y].pokemon_entries[z].pokemon_species.url)!='undefined') {
				  		if (this.localSt.retrieve(this.global.region[x].regiondata.pokedexes[y].pokemon_entries[z].pokemon_species.url)!=null) {
						  	this.global.region[x].regiondata.pokedexes[y].percent = parseInt(this.localSt.retrieve(this.global.region[x].regiondata.pokedexes[y].url+'percent'))
						  	this.global.region[x].regiondata.pokedexes[y].pokemon_entries[z].details=this.localSt.retrieve(this.global.region[x].regiondata.pokedexes[y].pokemon_entries[z].pokemon_species.url)
				  		}
				  	}
			  	}
	      	}
  			this.status='Pokedex saved'
  			var copy = new Date();
  			this.lastupdate=copy
  		}
  		console.log(this.global.region)
  	}else{
  		this.status = "Loading regions"
  	 	this.http.get('https://pokeapi.co/api/v2/region/')
	      .map(response => response.json())
	      .subscribe(res => {
	      	if (res.count!=undefined) {
        			this.localSt.store('https://pokeapi.co/api/v2/region/', res);
	      		this.global.region=res.results
  				//localStorage.setItem('https://pokeapi.co/api/v2/region/', JSON.stringify(this.global.region));  
	      		this.loadregion(0)
	      	}
	      });

  			var copy = new Date();
  			this.lastupdate=copy

  	}
  }
  loadregion(x){

  	if (x>=this.global.region.length) {
  		this.loadpokedexperregion(0,0)
  	}else{
  		this.status = "Loading regions pokedexes in "+this.global.region[x].name
	 	this.http.get(this.global.region[x].url)
	      .map(response => response.json())
	      .subscribe(res => {
	      	console.log(res)
	      	this.global.region[x].regiondata=res
	      	this.global.region[x].selectedpokedex=res.pokedexes[0].name
	      	this.loadregion(++x)
	      });
  	}  		
  }


  loadpokedexperregion(x,y){
  	if (x>=this.global.region.length) {
  		this.getpokemon_entries(0,0,0)
  	}else{
  		if (y>=this.global.region[x].regiondata.pokedexes.length) {
  			this.loadpokedexperregion(++x,0)
  		}else{
  			this.status = "Loading regions pokemon in "+this.global.region[x].name+"'s "+this.global.region[x].regiondata.pokedexes[y].name+" pokedex"
  			this.http.get(this.global.region[x].regiondata.pokedexes[y].url)
			  .map(response => response.json())
			  .subscribe(res => {

        			this.localSt.store(this.global.region[x].regiondata.pokedexes[y].url, res.pokemon_entries);
        			this.localSt.store(this.global.region[x].regiondata.pokedexes[y].url+'percent',  '0');
			  	this.global.region[x].regiondata.pokedexes[y].pokemon_entries=res.pokemon_entries
			  	this.global.region[x].regiondata.pokedexes[y].percent=0
			  	this.loadpokedexperregion(x,++y)
			  });
  		}
  	}
  }

  getpokemon_entries(x,y,z){
  	if (x>=this.global.region.length) {
  		console.log(this.global.region)
  		console.log(this.localSt.retrieve('boundValue'));
  		this.status = "Loading Complete!"
  		localStorage.setItem("lastupdate", JSON.stringify(this.global.region));

  	}else{
  		if (y>=this.global.region[x].regiondata.pokedexes.length) {
  			this.getpokemon_entries(++x,0,0)
  		}else{
  			if (z>=this.global.region[x].regiondata.pokedexes[y].pokemon_entries.length) {
  				this.getpokemon_entries(x,++y,0)
  			}else{
  				this.status = "Loading entry number "+this.global.region[x].regiondata.pokedexes[y].pokemon_entries[z].entry_number+" in "+this.global.region[x].name.toUpperCase()+"'s "+this.global.region[x].regiondata.pokedexes[y].name+" pokedex"
  				
  				this.http.get(this.global.region[x].regiondata.pokedexes[y].pokemon_entries[z].pokemon_species.url)
				  .map(response => response.json())
				  .subscribe(res => {			

        			this.localSt.store(this.global.region[x].regiondata.pokedexes[y].pokemon_entries[z].pokemon_species.url, res);
        			this.localSt.store(this.global.region[x].regiondata.pokedexes[y].url+'percent',  (z+1).toString());


				  	this.global.region[x].regiondata.pokedexes[y].percent = z+1
				  	this.global.region[x].regiondata.pokedexes[y].pokemon_entries[z].details=res
				  	this.getpokemon_entries(x,y,++z)
				  },error=>{
				  	console.log(error)
				  });
  			}

  		}
  	}
  }

  checkcolor(x){
  	if (x) {
  	 return "blue"
  	}
  	return 'red'
  }

}
