/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injectable, Injector, NgModule } from '@angular/core';
import { HttpBackend, HttpHandler } from './backend';
import { HttpClient } from './client';
import { HTTP_INTERCEPTORS, HttpInterceptorHandler, NoopInterceptor } from './interceptor';
import { JsonpCallbackContext, JsonpClientBackend, JsonpInterceptor } from './jsonp';
import { BrowserXhr, HttpXhrBackend, XhrFactory } from './xhr';
import { HttpXsrfCookieExtractor, HttpXsrfInterceptor, HttpXsrfTokenExtractor, XSRF_COOKIE_NAME, XSRF_HEADER_NAME } from './xsrf';
/**
 * An injectable `HttpHandler` that applies multiple interceptors
 * to a request before passing it to the given `HttpBackend`.
 *
 * The interceptors are loaded lazily from the injector, to allow
 * interceptors to themselves inject classes depending indirectly
 * on `HttpInterceptingHandler` itself.
 * @see `HttpInterceptor`
 */
export class HttpInterceptingHandler {
    /**
     * @param {?} backend
     * @param {?} injector
     */
    constructor(backend, injector) {
        this.backend = backend;
        this.injector = injector;
        this.chain = null;
    }
    /**
     * @param {?} req
     * @return {?}
     */
    handle(req) {
        if (this.chain === null) {
            /** @type {?} */
            const interceptors = this.injector.get(HTTP_INTERCEPTORS, []);
            this.chain = interceptors.reduceRight((next, interceptor) => new HttpInterceptorHandler(next, interceptor), this.backend);
        }
        return this.chain.handle(req);
    }
}
HttpInterceptingHandler.decorators = [
    { type: Injectable }
];
/** @nocollapse */
HttpInterceptingHandler.ctorParameters = () => [
    { type: HttpBackend },
    { type: Injector }
];
if (false) {
    /** @type {?} */
    HttpInterceptingHandler.prototype.chain;
    /** @type {?} */
    HttpInterceptingHandler.prototype.backend;
    /** @type {?} */
    HttpInterceptingHandler.prototype.injector;
}
/**
 * Constructs an `HttpHandler` that applies interceptors
 * to a request before passing it to the given `HttpBackend`.
 *
 * Use as a factory function within `HttpClientModule`.
 *
 *
 * @param {?} backend
 * @param {?=} interceptors
 * @return {?}
 */
export function interceptingHandler(backend, interceptors = []) {
    if (!interceptors) {
        return backend;
    }
    return interceptors.reduceRight((next, interceptor) => new HttpInterceptorHandler(next, interceptor), backend);
}
/**
 * Factory function that determines where to store JSONP callbacks.
 *
 * Ordinarily JSONP callbacks are stored on the `window` object, but this may not exist
 * in test environments. In that case, callbacks are stored on an anonymous object instead.
 *
 *
 * @return {?}
 */
export function jsonpCallbackContext() {
    if (typeof window === 'object') {
        return window;
    }
    return {};
}
/**
 * Configures XSRF protection support for outgoing requests.
 *
 * For a server that supports a cookie-based XSRF protection system,
 * use directly to configure XSRF protection with the correct
 * cookie and header names.
 *
 * If no names are supplied, the default cookie name is `XSRF-TOKEN`
 * and the default header name is `X-XSRF-TOKEN`.
 *
 *
 */
export class HttpClientXsrfModule {
    /**
     * Disable the default XSRF protection.
     * @return {?}
     */
    static disable() {
        return {
            ngModule: HttpClientXsrfModule,
            providers: [
                { provide: HttpXsrfInterceptor, useClass: NoopInterceptor },
            ],
        };
    }
    /**
     * Configure XSRF protection.
     * @param {?=} options An object that can specify either or both
     * cookie name or header name.
     * - Cookie name default is `XSRF-TOKEN`.
     * - Header name default is `X-XSRF-TOKEN`.
     *
     * @return {?}
     */
    static withOptions(options = {}) {
        return {
            ngModule: HttpClientXsrfModule,
            providers: [
                options.cookieName ? { provide: XSRF_COOKIE_NAME, useValue: options.cookieName } : [],
                options.headerName ? { provide: XSRF_HEADER_NAME, useValue: options.headerName } : [],
            ],
        };
    }
}
HttpClientXsrfModule.decorators = [
    { type: NgModule, args: [{
                providers: [
                    HttpXsrfInterceptor,
                    { provide: HTTP_INTERCEPTORS, useExisting: HttpXsrfInterceptor, multi: true },
                    { provide: HttpXsrfTokenExtractor, useClass: HttpXsrfCookieExtractor },
                    { provide: XSRF_COOKIE_NAME, useValue: 'XSRF-TOKEN' },
                    { provide: XSRF_HEADER_NAME, useValue: 'X-XSRF-TOKEN' },
                ],
            },] }
];
/**
 * Configures the [dependency injector](guide/glossary#injector) for `HttpClient`
 * with supporting services for XSRF. Automatically imported by `HttpClientModule`.
 *
 * You can add interceptors to the chain behind `HttpClient` by binding them to the
 * multiprovider for built-in [DI token](guide/glossary#di-token) `HTTP_INTERCEPTORS`.
 *
 *
 */
export class HttpClientModule {
}
HttpClientModule.decorators = [
    { type: NgModule, args: [{
                /**
                   * Optional configuration for XSRF protection.
                   */
                imports: [
                    HttpClientXsrfModule.withOptions({
                        cookieName: 'XSRF-TOKEN',
                        headerName: 'X-XSRF-TOKEN',
                    }),
                ],
                /**
                   * Configures the [dependency injector](guide/glossary#injector) where it is imported
                   * with supporting services for HTTP communications.
                   */
                providers: [
                    HttpClient,
                    { provide: HttpHandler, useClass: HttpInterceptingHandler },
                    HttpXhrBackend,
                    { provide: HttpBackend, useExisting: HttpXhrBackend },
                    BrowserXhr,
                    { provide: XhrFactory, useExisting: BrowserXhr },
                ],
            },] }
];
/**
 * Configures the [dependency injector](guide/glossary#injector) for `HttpClient`
 * with supporting services for JSONP.
 * Without this module, Jsonp requests reach the backend
 * with method JSONP, where they are rejected.
 *
 * You can add interceptors to the chain behind `HttpClient` by binding them to the
 * multiprovider for built-in [DI token](guide/glossary#di-token) `HTTP_INTERCEPTORS`.
 *
 *
 */
export class HttpClientJsonpModule {
}
HttpClientJsonpModule.decorators = [
    { type: NgModule, args: [{
                providers: [
                    JsonpClientBackend,
                    { provide: JsonpCallbackContext, useFactory: jsonpCallbackContext },
                    { provide: HTTP_INTERCEPTORS, useClass: JsonpInterceptor, multi: true },
                ],
            },] }
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29tbW9uL2h0dHAvc3JjL21vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVFBLE9BQU8sRUFBQyxVQUFVLEVBQUUsUUFBUSxFQUF1QixRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFHbEYsT0FBTyxFQUFDLFdBQVcsRUFBRSxXQUFXLEVBQUMsTUFBTSxXQUFXLENBQUM7QUFDbkQsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUNwQyxPQUFPLEVBQUMsaUJBQWlCLEVBQW1CLHNCQUFzQixFQUFFLGVBQWUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMxRyxPQUFPLEVBQUMsb0JBQW9CLEVBQUUsa0JBQWtCLEVBQUUsZ0JBQWdCLEVBQUMsTUFBTSxTQUFTLENBQUM7QUFHbkYsT0FBTyxFQUFDLFVBQVUsRUFBRSxjQUFjLEVBQUUsVUFBVSxFQUFDLE1BQU0sT0FBTyxDQUFDO0FBQzdELE9BQU8sRUFBQyx1QkFBdUIsRUFBRSxtQkFBbUIsRUFBRSxzQkFBc0IsRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBQyxNQUFNLFFBQVEsQ0FBQzs7Ozs7Ozs7OztBQVloSSxNQUFNLE9BQU8sdUJBQXVCOzs7OztJQUdsQyxZQUFvQixPQUFvQixFQUFVLFFBQWtCO1FBQWhELFlBQU8sR0FBUCxPQUFPLENBQWE7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFVO3FCQUZsQyxJQUFJO0tBRWtDOzs7OztJQUV4RSxNQUFNLENBQUMsR0FBcUI7UUFDMUIsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLElBQUksRUFBRTs7WUFDdkIsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDOUQsSUFBSSxDQUFDLEtBQUssR0FBRyxZQUFZLENBQUMsV0FBVyxDQUNqQyxDQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsRUFBRSxDQUFDLElBQUksc0JBQXNCLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUN6RjtRQUNELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDL0I7OztZQWJGLFVBQVU7Ozs7WUFsQkgsV0FBVztZQUhDLFFBQVE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTZDNUIsTUFBTSxVQUFVLG1CQUFtQixDQUMvQixPQUFvQixFQUFFLGVBQXlDLEVBQUU7SUFDbkUsSUFBSSxDQUFDLFlBQVksRUFBRTtRQUNqQixPQUFPLE9BQU8sQ0FBQztLQUNoQjtJQUNELE9BQU8sWUFBWSxDQUFDLFdBQVcsQ0FDM0IsQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLEVBQUUsQ0FBQyxJQUFJLHNCQUFzQixDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztDQUNwRjs7Ozs7Ozs7OztBQVVELE1BQU0sVUFBVSxvQkFBb0I7SUFDbEMsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQUU7UUFDOUIsT0FBTyxNQUFNLENBQUM7S0FDZjtJQUNELE9BQU8sRUFBRSxDQUFDO0NBQ1g7Ozs7Ozs7Ozs7Ozs7QUF1QkQsTUFBTSxPQUFPLG9CQUFvQjs7Ozs7SUFJL0IsTUFBTSxDQUFDLE9BQU87UUFDWixPQUFPO1lBQ0wsUUFBUSxFQUFFLG9CQUFvQjtZQUM5QixTQUFTLEVBQUU7Z0JBQ1QsRUFBQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsUUFBUSxFQUFFLGVBQWUsRUFBQzthQUMxRDtTQUNGLENBQUM7S0FDSDs7Ozs7Ozs7OztJQVVELE1BQU0sQ0FBQyxXQUFXLENBQUMsVUFHZixFQUFFO1FBQ0osT0FBTztZQUNMLFFBQVEsRUFBRSxvQkFBb0I7WUFDOUIsU0FBUyxFQUFFO2dCQUNULE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsVUFBVSxFQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ25GLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsVUFBVSxFQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7YUFDcEY7U0FDRixDQUFDO0tBQ0g7OztZQXpDRixRQUFRLFNBQUM7Z0JBQ1IsU0FBUyxFQUFFO29CQUNULG1CQUFtQjtvQkFDbkIsRUFBQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUM7b0JBQzNFLEVBQUMsT0FBTyxFQUFFLHNCQUFzQixFQUFFLFFBQVEsRUFBRSx1QkFBdUIsRUFBQztvQkFDcEUsRUFBQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBQztvQkFDbkQsRUFBQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBQztpQkFDdEQ7YUFDRjs7Ozs7Ozs7Ozs7QUFvRUQsTUFBTSxPQUFPLGdCQUFnQjs7O1lBdkI1QixRQUFRLFNBQUM7Ozs7Z0JBSVIsT0FBTyxFQUFFO29CQUNQLG9CQUFvQixDQUFDLFdBQVcsQ0FBQzt3QkFDL0IsVUFBVSxFQUFFLFlBQVk7d0JBQ3hCLFVBQVUsRUFBRSxjQUFjO3FCQUMzQixDQUFDO2lCQUNIOzs7OztnQkFLRCxTQUFTLEVBQUU7b0JBQ1QsVUFBVTtvQkFDVixFQUFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLHVCQUF1QixFQUFDO29CQUN6RCxjQUFjO29CQUNkLEVBQUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsY0FBYyxFQUFDO29CQUNuRCxVQUFVO29CQUNWLEVBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFDO2lCQUMvQzthQUNGOzs7Ozs7Ozs7Ozs7O0FBc0JELE1BQU0sT0FBTyxxQkFBcUI7OztZQVBqQyxRQUFRLFNBQUM7Z0JBQ1IsU0FBUyxFQUFFO29CQUNULGtCQUFrQjtvQkFDbEIsRUFBQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsVUFBVSxFQUFFLG9CQUFvQixFQUFDO29CQUNqRSxFQUFDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxRQUFRLEVBQUUsZ0JBQWdCLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBQztpQkFDdEU7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtJbmplY3RhYmxlLCBJbmplY3RvciwgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHtIdHRwQmFja2VuZCwgSHR0cEhhbmRsZXJ9IGZyb20gJy4vYmFja2VuZCc7XG5pbXBvcnQge0h0dHBDbGllbnR9IGZyb20gJy4vY2xpZW50JztcbmltcG9ydCB7SFRUUF9JTlRFUkNFUFRPUlMsIEh0dHBJbnRlcmNlcHRvciwgSHR0cEludGVyY2VwdG9ySGFuZGxlciwgTm9vcEludGVyY2VwdG9yfSBmcm9tICcuL2ludGVyY2VwdG9yJztcbmltcG9ydCB7SnNvbnBDYWxsYmFja0NvbnRleHQsIEpzb25wQ2xpZW50QmFja2VuZCwgSnNvbnBJbnRlcmNlcHRvcn0gZnJvbSAnLi9qc29ucCc7XG5pbXBvcnQge0h0dHBSZXF1ZXN0fSBmcm9tICcuL3JlcXVlc3QnO1xuaW1wb3J0IHtIdHRwRXZlbnR9IGZyb20gJy4vcmVzcG9uc2UnO1xuaW1wb3J0IHtCcm93c2VyWGhyLCBIdHRwWGhyQmFja2VuZCwgWGhyRmFjdG9yeX0gZnJvbSAnLi94aHInO1xuaW1wb3J0IHtIdHRwWHNyZkNvb2tpZUV4dHJhY3RvciwgSHR0cFhzcmZJbnRlcmNlcHRvciwgSHR0cFhzcmZUb2tlbkV4dHJhY3RvciwgWFNSRl9DT09LSUVfTkFNRSwgWFNSRl9IRUFERVJfTkFNRX0gZnJvbSAnLi94c3JmJztcblxuLyoqXG4gKiBBbiBpbmplY3RhYmxlIGBIdHRwSGFuZGxlcmAgdGhhdCBhcHBsaWVzIG11bHRpcGxlIGludGVyY2VwdG9yc1xuICogdG8gYSByZXF1ZXN0IGJlZm9yZSBwYXNzaW5nIGl0IHRvIHRoZSBnaXZlbiBgSHR0cEJhY2tlbmRgLlxuICpcbiAqIFRoZSBpbnRlcmNlcHRvcnMgYXJlIGxvYWRlZCBsYXppbHkgZnJvbSB0aGUgaW5qZWN0b3IsIHRvIGFsbG93XG4gKiBpbnRlcmNlcHRvcnMgdG8gdGhlbXNlbHZlcyBpbmplY3QgY2xhc3NlcyBkZXBlbmRpbmcgaW5kaXJlY3RseVxuICogb24gYEh0dHBJbnRlcmNlcHRpbmdIYW5kbGVyYCBpdHNlbGYuXG4gKiBAc2VlIGBIdHRwSW50ZXJjZXB0b3JgXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBIdHRwSW50ZXJjZXB0aW5nSGFuZGxlciBpbXBsZW1lbnRzIEh0dHBIYW5kbGVyIHtcbiAgcHJpdmF0ZSBjaGFpbjogSHR0cEhhbmRsZXJ8bnVsbCA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBiYWNrZW5kOiBIdHRwQmFja2VuZCwgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IpIHt9XG5cbiAgaGFuZGxlKHJlcTogSHR0cFJlcXVlc3Q8YW55Pik6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+IHtcbiAgICBpZiAodGhpcy5jaGFpbiA9PT0gbnVsbCkge1xuICAgICAgY29uc3QgaW50ZXJjZXB0b3JzID0gdGhpcy5pbmplY3Rvci5nZXQoSFRUUF9JTlRFUkNFUFRPUlMsIFtdKTtcbiAgICAgIHRoaXMuY2hhaW4gPSBpbnRlcmNlcHRvcnMucmVkdWNlUmlnaHQoXG4gICAgICAgICAgKG5leHQsIGludGVyY2VwdG9yKSA9PiBuZXcgSHR0cEludGVyY2VwdG9ySGFuZGxlcihuZXh0LCBpbnRlcmNlcHRvciksIHRoaXMuYmFja2VuZCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmNoYWluLmhhbmRsZShyZXEpO1xuICB9XG59XG5cbi8qKlxuICogQ29uc3RydWN0cyBhbiBgSHR0cEhhbmRsZXJgIHRoYXQgYXBwbGllcyBpbnRlcmNlcHRvcnNcbiAqIHRvIGEgcmVxdWVzdCBiZWZvcmUgcGFzc2luZyBpdCB0byB0aGUgZ2l2ZW4gYEh0dHBCYWNrZW5kYC5cbiAqXG4gKiBVc2UgYXMgYSBmYWN0b3J5IGZ1bmN0aW9uIHdpdGhpbiBgSHR0cENsaWVudE1vZHVsZWAuXG4gKlxuICpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGludGVyY2VwdGluZ0hhbmRsZXIoXG4gICAgYmFja2VuZDogSHR0cEJhY2tlbmQsIGludGVyY2VwdG9yczogSHR0cEludGVyY2VwdG9yW10gfCBudWxsID0gW10pOiBIdHRwSGFuZGxlciB7XG4gIGlmICghaW50ZXJjZXB0b3JzKSB7XG4gICAgcmV0dXJuIGJhY2tlbmQ7XG4gIH1cbiAgcmV0dXJuIGludGVyY2VwdG9ycy5yZWR1Y2VSaWdodChcbiAgICAgIChuZXh0LCBpbnRlcmNlcHRvcikgPT4gbmV3IEh0dHBJbnRlcmNlcHRvckhhbmRsZXIobmV4dCwgaW50ZXJjZXB0b3IpLCBiYWNrZW5kKTtcbn1cblxuLyoqXG4gKiBGYWN0b3J5IGZ1bmN0aW9uIHRoYXQgZGV0ZXJtaW5lcyB3aGVyZSB0byBzdG9yZSBKU09OUCBjYWxsYmFja3MuXG4gKlxuICogT3JkaW5hcmlseSBKU09OUCBjYWxsYmFja3MgYXJlIHN0b3JlZCBvbiB0aGUgYHdpbmRvd2Agb2JqZWN0LCBidXQgdGhpcyBtYXkgbm90IGV4aXN0XG4gKiBpbiB0ZXN0IGVudmlyb25tZW50cy4gSW4gdGhhdCBjYXNlLCBjYWxsYmFja3MgYXJlIHN0b3JlZCBvbiBhbiBhbm9ueW1vdXMgb2JqZWN0IGluc3RlYWQuXG4gKlxuICpcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGpzb25wQ2FsbGJhY2tDb250ZXh0KCk6IE9iamVjdCB7XG4gIGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiB3aW5kb3c7XG4gIH1cbiAgcmV0dXJuIHt9O1xufVxuXG4vKipcbiAqIENvbmZpZ3VyZXMgWFNSRiBwcm90ZWN0aW9uIHN1cHBvcnQgZm9yIG91dGdvaW5nIHJlcXVlc3RzLlxuICpcbiAqIEZvciBhIHNlcnZlciB0aGF0IHN1cHBvcnRzIGEgY29va2llLWJhc2VkIFhTUkYgcHJvdGVjdGlvbiBzeXN0ZW0sXG4gKiB1c2UgZGlyZWN0bHkgdG8gY29uZmlndXJlIFhTUkYgcHJvdGVjdGlvbiB3aXRoIHRoZSBjb3JyZWN0XG4gKiBjb29raWUgYW5kIGhlYWRlciBuYW1lcy5cbiAqXG4gKiBJZiBubyBuYW1lcyBhcmUgc3VwcGxpZWQsIHRoZSBkZWZhdWx0IGNvb2tpZSBuYW1lIGlzIGBYU1JGLVRPS0VOYFxuICogYW5kIHRoZSBkZWZhdWx0IGhlYWRlciBuYW1lIGlzIGBYLVhTUkYtVE9LRU5gLlxuICpcbiAqXG4gKi9cbkBOZ01vZHVsZSh7XG4gIHByb3ZpZGVyczogW1xuICAgIEh0dHBYc3JmSW50ZXJjZXB0b3IsXG4gICAge3Byb3ZpZGU6IEhUVFBfSU5URVJDRVBUT1JTLCB1c2VFeGlzdGluZzogSHR0cFhzcmZJbnRlcmNlcHRvciwgbXVsdGk6IHRydWV9LFxuICAgIHtwcm92aWRlOiBIdHRwWHNyZlRva2VuRXh0cmFjdG9yLCB1c2VDbGFzczogSHR0cFhzcmZDb29raWVFeHRyYWN0b3J9LFxuICAgIHtwcm92aWRlOiBYU1JGX0NPT0tJRV9OQU1FLCB1c2VWYWx1ZTogJ1hTUkYtVE9LRU4nfSxcbiAgICB7cHJvdmlkZTogWFNSRl9IRUFERVJfTkFNRSwgdXNlVmFsdWU6ICdYLVhTUkYtVE9LRU4nfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgSHR0cENsaWVudFhzcmZNb2R1bGUge1xuICAvKipcbiAgICogRGlzYWJsZSB0aGUgZGVmYXVsdCBYU1JGIHByb3RlY3Rpb24uXG4gICAqL1xuICBzdGF0aWMgZGlzYWJsZSgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPEh0dHBDbGllbnRYc3JmTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBIdHRwQ2xpZW50WHNyZk1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7cHJvdmlkZTogSHR0cFhzcmZJbnRlcmNlcHRvciwgdXNlQ2xhc3M6IE5vb3BJbnRlcmNlcHRvcn0sXG4gICAgICBdLFxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQ29uZmlndXJlIFhTUkYgcHJvdGVjdGlvbi5cbiAgICogQHBhcmFtIG9wdGlvbnMgQW4gb2JqZWN0IHRoYXQgY2FuIHNwZWNpZnkgZWl0aGVyIG9yIGJvdGhcbiAgICogY29va2llIG5hbWUgb3IgaGVhZGVyIG5hbWUuXG4gICAqIC0gQ29va2llIG5hbWUgZGVmYXVsdCBpcyBgWFNSRi1UT0tFTmAuXG4gICAqIC0gSGVhZGVyIG5hbWUgZGVmYXVsdCBpcyBgWC1YU1JGLVRPS0VOYC5cbiAgICpcbiAgICovXG4gIHN0YXRpYyB3aXRoT3B0aW9ucyhvcHRpb25zOiB7XG4gICAgY29va2llTmFtZT86IHN0cmluZyxcbiAgICBoZWFkZXJOYW1lPzogc3RyaW5nLFxuICB9ID0ge30pOiBNb2R1bGVXaXRoUHJvdmlkZXJzPEh0dHBDbGllbnRYc3JmTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBIdHRwQ2xpZW50WHNyZk1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICBvcHRpb25zLmNvb2tpZU5hbWUgPyB7cHJvdmlkZTogWFNSRl9DT09LSUVfTkFNRSwgdXNlVmFsdWU6IG9wdGlvbnMuY29va2llTmFtZX0gOiBbXSxcbiAgICAgICAgb3B0aW9ucy5oZWFkZXJOYW1lID8ge3Byb3ZpZGU6IFhTUkZfSEVBREVSX05BTUUsIHVzZVZhbHVlOiBvcHRpb25zLmhlYWRlck5hbWV9IDogW10sXG4gICAgICBdLFxuICAgIH07XG4gIH1cbn1cblxuLyoqXG4gKiBDb25maWd1cmVzIHRoZSBbZGVwZW5kZW5jeSBpbmplY3Rvcl0oZ3VpZGUvZ2xvc3NhcnkjaW5qZWN0b3IpIGZvciBgSHR0cENsaWVudGBcbiAqIHdpdGggc3VwcG9ydGluZyBzZXJ2aWNlcyBmb3IgWFNSRi4gQXV0b21hdGljYWxseSBpbXBvcnRlZCBieSBgSHR0cENsaWVudE1vZHVsZWAuXG4gKlxuICogWW91IGNhbiBhZGQgaW50ZXJjZXB0b3JzIHRvIHRoZSBjaGFpbiBiZWhpbmQgYEh0dHBDbGllbnRgIGJ5IGJpbmRpbmcgdGhlbSB0byB0aGVcbiAqIG11bHRpcHJvdmlkZXIgZm9yIGJ1aWx0LWluIFtESSB0b2tlbl0oZ3VpZGUvZ2xvc3NhcnkjZGktdG9rZW4pIGBIVFRQX0lOVEVSQ0VQVE9SU2AuXG4gKlxuICpcbiAqL1xuQE5nTW9kdWxlKHtcbiAgLyoqXG4gICAqIE9wdGlvbmFsIGNvbmZpZ3VyYXRpb24gZm9yIFhTUkYgcHJvdGVjdGlvbi5cbiAgICovXG4gIGltcG9ydHM6IFtcbiAgICBIdHRwQ2xpZW50WHNyZk1vZHVsZS53aXRoT3B0aW9ucyh7XG4gICAgICBjb29raWVOYW1lOiAnWFNSRi1UT0tFTicsXG4gICAgICBoZWFkZXJOYW1lOiAnWC1YU1JGLVRPS0VOJyxcbiAgICB9KSxcbiAgXSxcbiAgLyoqXG4gICAqIENvbmZpZ3VyZXMgdGhlIFtkZXBlbmRlbmN5IGluamVjdG9yXShndWlkZS9nbG9zc2FyeSNpbmplY3Rvcikgd2hlcmUgaXQgaXMgaW1wb3J0ZWRcbiAgICogd2l0aCBzdXBwb3J0aW5nIHNlcnZpY2VzIGZvciBIVFRQIGNvbW11bmljYXRpb25zLlxuICAgKi9cbiAgcHJvdmlkZXJzOiBbXG4gICAgSHR0cENsaWVudCxcbiAgICB7cHJvdmlkZTogSHR0cEhhbmRsZXIsIHVzZUNsYXNzOiBIdHRwSW50ZXJjZXB0aW5nSGFuZGxlcn0sXG4gICAgSHR0cFhockJhY2tlbmQsXG4gICAge3Byb3ZpZGU6IEh0dHBCYWNrZW5kLCB1c2VFeGlzdGluZzogSHR0cFhockJhY2tlbmR9LFxuICAgIEJyb3dzZXJYaHIsXG4gICAge3Byb3ZpZGU6IFhockZhY3RvcnksIHVzZUV4aXN0aW5nOiBCcm93c2VyWGhyfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgSHR0cENsaWVudE1vZHVsZSB7XG59XG5cbi8qKlxuICogQ29uZmlndXJlcyB0aGUgW2RlcGVuZGVuY3kgaW5qZWN0b3JdKGd1aWRlL2dsb3NzYXJ5I2luamVjdG9yKSBmb3IgYEh0dHBDbGllbnRgXG4gKiB3aXRoIHN1cHBvcnRpbmcgc2VydmljZXMgZm9yIEpTT05QLlxuICogV2l0aG91dCB0aGlzIG1vZHVsZSwgSnNvbnAgcmVxdWVzdHMgcmVhY2ggdGhlIGJhY2tlbmRcbiAqIHdpdGggbWV0aG9kIEpTT05QLCB3aGVyZSB0aGV5IGFyZSByZWplY3RlZC5cbiAqXG4gKiBZb3UgY2FuIGFkZCBpbnRlcmNlcHRvcnMgdG8gdGhlIGNoYWluIGJlaGluZCBgSHR0cENsaWVudGAgYnkgYmluZGluZyB0aGVtIHRvIHRoZVxuICogbXVsdGlwcm92aWRlciBmb3IgYnVpbHQtaW4gW0RJIHRva2VuXShndWlkZS9nbG9zc2FyeSNkaS10b2tlbikgYEhUVFBfSU5URVJDRVBUT1JTYC5cbiAqXG4gKlxuICovXG5ATmdNb2R1bGUoe1xuICBwcm92aWRlcnM6IFtcbiAgICBKc29ucENsaWVudEJhY2tlbmQsXG4gICAge3Byb3ZpZGU6IEpzb25wQ2FsbGJhY2tDb250ZXh0LCB1c2VGYWN0b3J5OiBqc29ucENhbGxiYWNrQ29udGV4dH0sXG4gICAge3Byb3ZpZGU6IEhUVFBfSU5URVJDRVBUT1JTLCB1c2VDbGFzczogSnNvbnBJbnRlcmNlcHRvciwgbXVsdGk6IHRydWV9LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBIdHRwQ2xpZW50SnNvbnBNb2R1bGUge1xufVxuIl19