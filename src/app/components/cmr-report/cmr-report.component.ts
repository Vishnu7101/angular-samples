/**
    * CMR report sample - This sample analyzes the legal document standardizing international road freight transport with random data.
 */
import { Component } from '@angular/core';
import { Globals } from '../globals';
@Component({
    selector: 'ej-sample',
    templateUrl: './cmr-report.component.html',
    styleUrls: ['./cmr-report.component.css']
})
export class CMRReportComponent {
    // Specifies the report Web API service URL. It is used to process the reports.
    public serviceUrl = Globals.SERVICE_URL;
    // Specifies the path of the RDL report file
    public reportPath: string;
    public toolbarSettings = Globals.TOOLBAR_OPTIONS;
    public onToolbarItemClick = Globals.EDIT_REPORT;
    public onExportItemClick = Globals.EXPORT_ITEM_CLICK;

    constructor() {
        this.reportPath = 'cmr-report.rdl';
    }
}
