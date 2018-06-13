import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { RfbLocation } from './rfb-location.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<RfbLocation>;

@Injectable()
export class RfbLocationService {

    private resourceUrl =  SERVER_API_URL + 'api/rfb-locations';

    constructor(private http: HttpClient) { }

    create(rfbLocation: RfbLocation): Observable<EntityResponseType> {
        const copy = this.convert(rfbLocation);
        return this.http.post<RfbLocation>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(rfbLocation: RfbLocation): Observable<EntityResponseType> {
        const copy = this.convert(rfbLocation);
        return this.http.put<RfbLocation>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<RfbLocation>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<RfbLocation[]>> {
        const options = createRequestOption(req);
        return this.http.get<RfbLocation[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<RfbLocation[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: RfbLocation = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<RfbLocation[]>): HttpResponse<RfbLocation[]> {
        const jsonResponse: RfbLocation[] = res.body;
        const body: RfbLocation[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to RfbLocation.
     */
    private convertItemFromServer(rfbLocation: RfbLocation): RfbLocation {
        const copy: RfbLocation = Object.assign({}, rfbLocation);
        return copy;
    }

    /**
     * Convert a RfbLocation to a JSON which can be sent to the server.
     */
    private convert(rfbLocation: RfbLocation): RfbLocation {
        const copy: RfbLocation = Object.assign({}, rfbLocation);
        return copy;
    }
}
