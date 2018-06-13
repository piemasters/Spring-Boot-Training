import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { RfbEventAttendance } from './rfb-event-attendance.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<RfbEventAttendance>;

@Injectable()
export class RfbEventAttendanceService {

    private resourceUrl =  SERVER_API_URL + 'api/rfb-event-attendances';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(rfbEventAttendance: RfbEventAttendance): Observable<EntityResponseType> {
        const copy = this.convert(rfbEventAttendance);
        return this.http.post<RfbEventAttendance>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(rfbEventAttendance: RfbEventAttendance): Observable<EntityResponseType> {
        const copy = this.convert(rfbEventAttendance);
        return this.http.put<RfbEventAttendance>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<RfbEventAttendance>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<RfbEventAttendance[]>> {
        const options = createRequestOption(req);
        return this.http.get<RfbEventAttendance[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<RfbEventAttendance[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: RfbEventAttendance = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<RfbEventAttendance[]>): HttpResponse<RfbEventAttendance[]> {
        const jsonResponse: RfbEventAttendance[] = res.body;
        const body: RfbEventAttendance[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to RfbEventAttendance.
     */
    private convertItemFromServer(rfbEventAttendance: RfbEventAttendance): RfbEventAttendance {
        const copy: RfbEventAttendance = Object.assign({}, rfbEventAttendance);
        copy.attendanceDate = this.dateUtils
            .convertLocalDateFromServer(rfbEventAttendance.attendanceDate);
        return copy;
    }

    /**
     * Convert a RfbEventAttendance to a JSON which can be sent to the server.
     */
    private convert(rfbEventAttendance: RfbEventAttendance): RfbEventAttendance {
        const copy: RfbEventAttendance = Object.assign({}, rfbEventAttendance);
        copy.attendanceDate = this.dateUtils
            .convertLocalDateToServer(rfbEventAttendance.attendanceDate);
        return copy;
    }
}
