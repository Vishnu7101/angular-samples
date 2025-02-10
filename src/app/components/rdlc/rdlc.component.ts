/**
 * Report designer control
 */
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Globals } from '../globals';
import { Router, Params } from '@angular/router';
import { EJBarcode } from './../extensions/report-item-extensions/barcode.reportitem';
import { EJQRBarcode } from './../extensions/report-item-extensions/qrbarcode.reportitem';
import { EJSignature } from './../extensions/report-item-extensions/signature.reportitem';
import { SignatureDialog } from './../extensions/report-item-extensions/signature.dialog';
import { rdlcData } from '../rdlcData';

const barcode = 'EJBarcode';
const qrBarcode = 'EJQRBarcode';
window[barcode] = EJBarcode;
window[qrBarcode] = EJQRBarcode;

const signature = 'EJSignature';
const signatureDialog = 'SignatureDialog';
window[signature] = EJSignature;
window[signatureDialog] = SignatureDialog;

@Component({
  selector: 'ej-sample',
  templateUrl: './rdlc.component.html',
  styleUrls: ['./rdlc.component.css']
})
export class RDLCComponent implements AfterViewInit {
  @ViewChild('designer') designerInst;
  // Specifies the URL of the WebAPI service. It will be used for processing the report.
  public serviceUrl = Globals.DESIGNER_SERVICE_URL;
  public reportPath: string;
  public isServerReport = false;
  public reportControlId = Globals.REPORT_CONTROL_ID;
  public toolbarSettings: ej.ReportDesigner.ToolbarSettings = {
    items: ej.ReportDesigner.ToolbarItems.All & ~ej.ReportDesigner.ToolbarItems.New & ~ej.ReportDesigner.ToolbarItems.Save & ~ej.ReportDesigner.ToolbarItems.Open
  };
  public permissionSettings: ej.ReportDesigner.PermissionSettings;
  public itemExtensions: any;

  constructor(private router: Router) {
    var url = window.location.host;
    this.permissionSettings = url.indexOf("demos.boldreports.com") !== -1 ? { dataSource: ej.ReportDesigner.Permission.All & ~ej.ReportDesigner.Permission.Create } : { dataSource: ej.ReportDesigner.Permission.All };
    const params: Params = this.router.parseUrl(this.router.url).queryParams;
    const paramName = 'report-name';
    this.reportPath = params[paramName];
    this.itemExtensions = [{
      name: 'barcode',
      className: 'EJBarcode',
      imageClass: 'customitem-barcode',
      displayName: '1D Barcode',
      category: 'Barcodes'
    }, {
      name: 'matrixbarcode',
      className: 'EJQRBarcode',
      imageClass: 'customitem-qrbarcode',
      displayName: '2D Barcode',
      category: 'Barcodes'
    }, {
      name: 'ESignature',
      className: 'EJSignature',
      imageClass: 'customitem-signature',
      displayName: 'Electronic',
      category: 'Signature'
    }];
  }

  public toolbarRendering(args): void {
    if (args?.target && $(args.target)?.hasClass('e-rptdesigner-toolbarcontainer')) {
      if (args.action === 'beforeCreate') {
        args.items.splice(0, 0, {
          GroupName: 'customfileactionitems',
          GroupId: this.reportControlId + '_custom_fileaction_group',
          Items: [
            {
              prefixIcon: 'b-toolbar-item e-rptdesigner-toolbar-icon e-toolbarfonticonbasic e-rptdesigner-toolbar-new',
              tooltipText: 'New',
              id: this.reportControlId + '_custom_toolbar_btn_new',
              htmlAttributes: {
                id: this.reportControlId + '_custom_toolbar_new',
                'aria-label': 'New'
              }
            },
            {
              prefixIcon: 'b-toolbar-item e-toolbarfonticonbasic e-rptdesigner-toolbar-save',
              tooltipText: 'Save',
              id: this.reportControlId + '_custom_toolbar_btn_save',
              htmlAttributes: {
                id: this.reportControlId + '_custom_toolbar_save',
                'aria-label': 'Save'
              }
            }
          ]
        });
      }
    }
  }

  public toolbarClick(args): void {
    if (args.event.click === 'Save') {
      args.event.cancel = true;
      args.designerInst.widget.saveToDevice();
    }
  }

  public onAjaxBeforeLoad(args): void {
    args.data = JSON.stringify({ reportType: 'RDLC' });
  }

  public onReportOpened(args): void {
    this.isServerReport = args.isServerReport;
  }

  public previewReport(args): void {
    if (this.isServerReport) {
      let reportPath = args.model.reportPath;
      reportPath = reportPath.indexOf('//') !== -1 ? reportPath.substring(2) : reportPath;
      const reportNameWithoutExt = reportPath.split('.rdlc')[0];
      const datasource = rdlcData[reportNameWithoutExt];
      args.dataSets = datasource;
      args.cancelDataInputDialog = true;
    }
  }

  ngAfterViewInit(): void {
    this.designerInst.widget.setModel({
      reportType: 'RDLC',
      previewReport: this.previewReport.bind(this),
      previewOptions: {
        exportItemClick: Globals.EXPORT_ITEM_CLICK,
        toolbarSettings: {
          items: ej.ReportViewer.ToolbarItems.All & ~ej.ReportViewer.ToolbarItems.Find
        }
      }
    });
    if (this.reportPath) {
      this.designerInst.widget.openReport(this.reportPath);
    }
  }
}
