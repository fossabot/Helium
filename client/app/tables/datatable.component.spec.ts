import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MdProgressBarModule } from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { Observable } from 'rxjs/Observable';

import * as sinon from 'sinon';

import { By } from '@angular/platform-browser';
import { SqlRow, TableMeta } from '../common/api';
import { CoreModule } from '../core/core.module';
import { TableService } from '../core/table.service';
import { DatatableComponent } from './datatable.component';
import { createTableName } from '../common/util';

const expect = global['chai'].expect;

describe('DatatableComponent', () => {
    let fixture: ComponentFixture<DatatableComponent>;
    let comp: DatatableComponent;
    let de: DebugElement;
    let service: TableService;

    const tableServiceStub = {
        meta: (name: string): Observable<TableMeta> =>
            Observable.throw(new Error('not stubbed')),
        content: (name: string): Observable<SqlRow> =>
            Observable.throw(new Error('not stubbed')),
    };

    const mockTableMeta = (): TableMeta => ({
        headers: [],
        totalRows: 0,
        constraints: [],
        comment: 'description'
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                CoreModule,
                MdProgressBarModule,
                NgxDatatableModule
            ],
            declarations: [
                DatatableComponent
            ],
            providers: [
                { provide: TableService, useValue: tableServiceStub }
            ]
        });

        fixture = TestBed.createComponent(DatatableComponent);
        comp = fixture.componentInstance;
        de = fixture.debugElement;
        service = de.injector.get(TableService);
    });

    it('should pull in the metadata when given a name', () => {
        expect(comp.meta).to.be.null;
        comp.name = createTableName('foo');

        const stub = sinon.stub(service, 'meta')
            .returns(Observable.of<TableMeta>(mockTableMeta()));

        fixture.detectChanges();
        expect(stub).to.have.been.calledOnce;

        // Header
        expect(de.query(By.css('h1')).nativeElement.textContent.trim()).to.equal('foo');

        // Description right under the header
        expect(de.query(By.css('.table-description')).nativeElement.textContent).to.match(/description/);
    });
});