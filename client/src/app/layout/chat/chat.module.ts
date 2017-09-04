import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatComponent } from './chat.component';
import { ChatRoutingModule } from './chat-routing.module';
import { PageHeaderModule } from './../../shared';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ChatRoutingModule,
        PageHeaderModule
    ],
    declarations: [ChatComponent]
})
export class ChatModule { }
