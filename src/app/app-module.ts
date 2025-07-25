import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';

// Auth Components
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';

// Dashboard Components
import { Group } from './dashboard/group/group';
import { Board } from './dashboard/board/board';
import { Column } from './dashboard/column/column';
import { TaskCard } from './dashboard/task-card/task-card';

// Shared Components
import { Input } from './shared/input/input';
import { Button } from './shared/button/button';
import { Modal } from './shared/modal/modal';

@NgModule({
  declarations: [
    App,
    Login,
    Register,
    Group,
    Board,
    Column,
    TaskCard,
    Input,
    Button,
    Modal
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, 
    FormsModule,         
    HttpClientModule     
  ],
  providers: [],
  bootstrap: [App]
})
export class AppModule { }
