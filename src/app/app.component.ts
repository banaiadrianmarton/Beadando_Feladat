import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PlayersModel } from './models/player.model';
import { DataService } from './services/data.service';
import { TeamComponent } from "./team/team.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TeamComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  registrations: PlayersModel[] = [];
  modify: PlayersModel | undefined = undefined;
  new: PlayersModel | undefined = undefined;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getRegistrations().subscribe({
      next: (data: PlayersModel[]) => {
        this.registrations = data;
      },
      error: (err) => console.log(err),
    });
  }

  newReg() {
    this.new = {
      id: undefined,
      player: '',
      gameCategory: '',
      email: '',
      teamName: '',
    };
  }

  saveNew(reg: PlayersModel){
    this.dataService.addRegistration(reg).subscribe({
      next: (data: PlayersModel) => {
        this.registrations.push(data);
        this.new = undefined;
      },
      error: (err) => console.log(err),
    });
  }

  modifyReg(reg: PlayersModel) {
    this.modify = JSON.parse(JSON.stringify(reg));
  }

  saveModify(reg: PlayersModel) {
    this.dataService.modifyARegistration(reg).subscribe({
      next: (data: PlayersModel) => {
        const index = this.registrations.findIndex((r) => r.id == data.id);
        this.registrations[index] = data;
        this.modify = undefined;
      },
      error: (err) => console.log(err),
    });
  }
  deleteReg(reg: PlayersModel) {
      this.dataService.deleteRegistration(reg).subscribe({
      next: (data: PlayersModel) => {
        const index = this.registrations.findIndex((r) => r.id == data.id);
        this.registrations.splice(index, 1);
      },
      error: (err) => console.log(err),
    });
  }
}
