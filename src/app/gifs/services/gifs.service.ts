import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
	private _historial: string[] = [];
	private apiKey: string = 'mrUbopNZbr6OdU87tpSDVPhtM0N9bsNO'
	private servicioUrl: string = 'https://api.giphy.com/v1/gifs'

	public resultados: 	Gif[] = [];

	get historial(){
		return [...this._historial]
	}
	constructor(private http : HttpClient){
		if(localStorage.getItem('historial')){
			this._historial = JSON.parse(localStorage.getItem('historial')!)
		}
		if(localStorage.getItem('resultados')){
			this.resultados = JSON.parse(localStorage.getItem('resultados')!)
		}
	}

	buscarGifs(query: string){
		if(!this._historial.includes(query)){
			this._historial.unshift(query);
		}
		this._historial = this._historial.slice(0,10)
		localStorage.setItem('historial', JSON.stringify(this._historial));

		const params = new HttpParams()
			.set('api_key', this.apiKey)
			.set('q', query)
			.set('limit', '10');
		this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`,{params})
		.subscribe((resp)=>{
			this.resultados = resp.data;
			localStorage.setItem('resultados', JSON.stringify(this.resultados));

		})
	}
}
