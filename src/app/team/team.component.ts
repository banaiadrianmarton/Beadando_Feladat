import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PlayersModel } from '../models/player.model';

@Component({
  selector: 'app-team',
  imports: [],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})
export class TeamComponent {
  @Input() model: PlayersModel | undefined = undefined;
  @Output() saved = new EventEmitter<PlayersModel>();

  getValue(event: any): string{
    return event.target.value;
  }

  save(){
    //TODO: kötelező mezők ellenzőrzése...
    this.saved.emit(this.model)
  }
}
