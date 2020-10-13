import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { LiheApiSharedModule } from 'app/shared/shared.module';
import { LiheApiCoreModule } from 'app/core/core.module';
import { LiheApiAppRoutingModule } from './app-routing.module';
import { LiheApiHomeModule } from './home/home.module';
import { LiheApiEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    LiheApiSharedModule,
    LiheApiCoreModule,
    LiheApiHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    LiheApiEntityModule,
    LiheApiAppRoutingModule,
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [MainComponent],
})
export class LiheApiAppModule {}
