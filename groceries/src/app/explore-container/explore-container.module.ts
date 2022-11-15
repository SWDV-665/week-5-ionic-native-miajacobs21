import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponent } from './explore-container.component';

import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule],
  declarations: [ExploreContainerComponent],
  exports: [ExploreContainerComponent],
  providers: [
    SocialSharing
  ]
})
export class ExploreContainerComponentModule {}
