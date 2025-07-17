import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { Group } from './dashboard/group/group';
import { Board } from './dashboard/board/board';
import { Column } from './dashboard/column/column';
import { TaskCard } from './dashboard/task-card/task-card';
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
    AppRoutingModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }