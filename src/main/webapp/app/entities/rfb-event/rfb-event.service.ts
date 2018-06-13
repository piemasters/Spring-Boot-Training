import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { RfbEvent } from './rfb-event.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<RfbEvent>;

@Injectable()
export class RfbEventService {

    private resourceUrl =  SERVER_API_URL + 'api/rfb-events';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(rfbEvent: RfbEvent): Observable<EntityResponseType> {
        const copy = this.convert(rfbEvent);
        return this.http.post<RfbEvent>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(rfbEvent: RfbEvent): Observable<EntityResponseType> {
        const copy = this.convert(rfbEvent);
        return this.http.put<RfbEvent>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<RfbEvent>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<RfbEvent[]>> {
        const options = createRequestOption(req);
        return this.http.get<RfbEvent[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<RfbEvent[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: RfbEvent = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<RfbEvent[]>): HttpResponse<RfbEvent[]> {
        const jsonResponse: RfbEvent[] = res.body;
        const body: RfbEvent[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to RfbEvent.
     */
    private convertItemFromServer(rfbEvent: RfbEvent): RfbEvent {
        const copy: RfbEvent = Object.assign({}, rfbEvent);
        copy.eventDate = this.dateUtils
            .convertLocalDateFromServer(rfbEvent.eventDate);
        return copy;
    }

    /**
     * Convert a RfbEvent to a JSON which can be sent to the server.
     */
    private convert(rfbEvent: RfbEvent): RfbEvent {
        const copy: RfbEvent = Object.assign({}, rfbEvent);
        copy.eventDate = this.dateUtils
            .convertLocalDateToServer(rfbEvent.eventDate);
        return copy;
    }
}
