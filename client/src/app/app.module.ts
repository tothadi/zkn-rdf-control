import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from './auth.service';
import { HomeComponent } from './home/home.component';
import { MerlegComponent } from './merleg/merleg.component';
import { RegisterComponent } from './register/register.component';
import { StreamService } from './stream.service';
import { ApiService } from './api.service';

@NgModule({
    declarations: [AppComponent, HomeComponent, MerlegComponent, RegisterComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
    ],
    providers: [ApiService, AuthService, StreamService],
    bootstrap: [AppComponent],
})
export class AppModule {}
