import { BrowserModule } from '@angular/platform-browser';
import { NgModule, } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { AppRouterModule } from './app.routing.module';
import { RouterService } from './router.service';

// bold-reports
import '@boldreports/javascript-reporting-controls/Scripts/bold.report-viewer.min';
import '@boldreports/javascript-reporting-controls/Scripts/bold.report-designer.min';

// data-visualization
import '@boldreports/javascript-reporting-controls/Scripts/data-visualization/ej.bulletgraph.min';
import '@boldreports/javascript-reporting-controls/Scripts/data-visualization/ej.chart.min';
import '@boldreports/javascript-reporting-controls/Scripts/data-visualization/ej.circulargauge.min';
import '@boldreports/javascript-reporting-controls/Scripts/data-visualization/ej.lineargauge.min';
import '@boldreports/javascript-reporting-controls/Scripts/data-visualization/ej.map.min';

// code-mirror
import 'codemirror/lib/codemirror';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/sql-hint';
import 'codemirror/mode/sql/sql';
import 'codemirror/mode/vb/vb';

import * as CodeMirror from 'codemirror';
const codemirror = 'CodeMirror';
window[codemirror] = CodeMirror;

@NgModule({
  declarations: [
    MainComponent
  ],

  imports: [
    AppRouterModule,
    BrowserModule,
    HttpModule
  ],
  providers: [RouterService],
  exports: [RouterModule],
  bootstrap: [MainComponent]
})
export class AppModule { }
