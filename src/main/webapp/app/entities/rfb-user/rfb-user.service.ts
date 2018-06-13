import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { RfbUser } from './rfb-user.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<RfbUser>;

@Injectable()
export class RfbUserService {

    private resourceUrl =  SERVER_API_URL + 'api/rfb-users';

    constructor(private http: HttpClient) { }

    create(rfbUser: RfbUser): Observable<EntityResponseType> {
        const copy = this.convert(rfbUser);
        return this.http.post<RfbUser>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(rfbUser: RfbUser): Observable<EntityResponseType> {
        const copy = this.convert(rfbUser);
        return this.http.put<RfbUser>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<RfbUser>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<RfbUser[]>> {
        const options = createRequestOption(req);
        return this.http.get<RfbUser[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<RfbUser[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: RfbUser = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<RfbUser[]>): HttpResponse<RfbUser[]> {
        const jsonResponse: RfbUser[] = res.body;
        const body: RfbUser[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to RfbUser.
     */
    private convertItemFromServer(rfbUser: RfbUser): RfbUser {
        const copy: RfbUser = Object.assign({}, rfbUser);
        return copy;
    }

    /**
     * Convert a RfbUser to a JSON which can be sent to the server.
     */
    private convert(rfbUser: RfbUser): RfbUser {
        const copy: RfbUser = Object.assign({}, rfbUser);
        return copy;
    }
}
