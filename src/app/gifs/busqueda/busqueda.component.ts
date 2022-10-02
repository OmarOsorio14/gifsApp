import { Component,ViewChild,ElementRef} from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent{

	constructor(private gifsService: GifsService){

	}

	@ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;
	buscar(){
		if(this.txtBuscar.nativeElement.value.trim().length === 0){
			return;
		}
		this.gifsService.buscarGifs(this.txtBuscar.nativeElement.value )
		this.txtBuscar.nativeElement.value = ''
	}

}
