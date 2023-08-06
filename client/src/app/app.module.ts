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
import { AuthenticationService } from './authentication.service';
import { HomeComponent } from './home/home.component';
import { MerlegComponent } from './merleg/merleg.component';
import { RegisterComponent } from './register/register.component';
import { StreamService } from './stream.service';

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
    ],
    providers: [AuthenticationService, StreamService],
    bootstrap: [AppComponent],
})
export class AppModule {}
