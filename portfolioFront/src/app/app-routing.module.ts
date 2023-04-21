import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditExperienciaComponent } from './components/experiencia/edit-experiencia/edit-experiencia.component';
import { NewExperienciaComponent } from './components/experiencia/new-experiencia/new-experiencia.component';
import { LoginComponent } from './components/login/login.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { EditEducacionComponent } from './components/educacion/edit-educacion/edit-educacion.component';
import { NewEducacionComponent } from './components/educacion/new-educacion/new-educacion.component';

const routes: Routes = [
  {path: '', component:PortfolioComponent},
  {path: 'login', component:LoginComponent},
  {path: 'nuevaExp', component:NewExperienciaComponent},
  {path: 'editExp/:id', component:EditExperienciaComponent},
  {path: 'nuevaEdu', component: NewEducacionComponent},
  {path: 'editEdu/:id', component:EditEducacionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
