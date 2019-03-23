/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { CompileReflector, DirectiveResolver, ERROR_COMPONENT_TYPE, NgModuleResolver, PipeResolver } from '@angular/compiler';
import { MockDirectiveResolver, MockNgModuleResolver, MockPipeResolver } from '@angular/compiler/testing';
import { Component, Directive, NgModule, Pipe, ɵstringify as stringify } from '@angular/core';
import { MetadataOverrider } from './metadata_overrider';
export var COMPILER_PROVIDERS = [
    { provide: MockPipeResolver, deps: [CompileReflector] },
    { provide: PipeResolver, useExisting: MockPipeResolver },
    { provide: MockDirectiveResolver, deps: [CompileReflector] },
    { provide: DirectiveResolver, useExisting: MockDirectiveResolver },
    { provide: MockNgModuleResolver, deps: [CompileReflector] },
    { provide: NgModuleResolver, useExisting: MockNgModuleResolver },
];
var TestingCompilerFactoryImpl = /** @class */ (function () {
    function TestingCompilerFactoryImpl(_injector, _compilerFactory) {
        this._injector = _injector;
        this._compilerFactory = _compilerFactory;
    }
    TestingCompilerFactoryImpl.prototype.createTestingCompiler = function (options) {
        var compiler = this._compilerFactory.createCompiler(options);
        return new TestingCompilerImpl(compiler, compiler.injector.get(MockDirectiveResolver), compiler.injector.get(MockPipeResolver), compiler.injector.get(MockNgModuleResolver));
    };
    return TestingCompilerFactoryImpl;
}());
export { TestingCompilerFactoryImpl };
var TestingCompilerImpl = /** @class */ (function () {
    function TestingCompilerImpl(_compiler, _directiveResolver, _pipeResolver, _moduleResolver) {
        this._compiler = _compiler;
        this._directiveResolver = _directiveResolver;
        this._pipeResolver = _pipeResolver;
        this._moduleResolver = _moduleResolver;
        this._overrider = new MetadataOverrider();
    }
    Object.defineProperty(TestingCompilerImpl.prototype, "injector", {
        get: function () { return this._compiler.injector; },
        enumerable: true,
        configurable: true
    });
    TestingCompilerImpl.prototype.compileModuleSync = function (moduleType) {
        return this._compiler.compileModuleSync(moduleType);
    };
    TestingCompilerImpl.prototype.compileModuleAsync = function (moduleType) {
        return this._compiler.compileModuleAsync(moduleType);
    };
    TestingCompilerImpl.prototype.compileModuleAndAllComponentsSync = function (moduleType) {
        return this._compiler.compileModuleAndAllComponentsSync(moduleType);
    };
    TestingCompilerImpl.prototype.compileModuleAndAllComponentsAsync = function (moduleType) {
        return this._compiler.compileModuleAndAllComponentsAsync(moduleType);
    };
    TestingCompilerImpl.prototype.getComponentFactory = function (component) {
        return this._compiler.getComponentFactory(component);
    };
    TestingCompilerImpl.prototype.checkOverrideAllowed = function (type) {
        if (this._compiler.hasAotSummary(type)) {
            throw new Error(stringify(type) + " was AOT compiled, so its metadata cannot be changed.");
        }
    };
    TestingCompilerImpl.prototype.overrideModule = function (ngModule, override) {
        this.checkOverrideAllowed(ngModule);
        var oldMetadata = this._moduleResolver.resolve(ngModule, false);
        this._moduleResolver.setNgModule(ngModule, this._overrider.overrideMetadata(NgModule, oldMetadata, override));
        this.clearCacheFor(ngModule);
    };
    TestingCompilerImpl.prototype.overrideDirective = function (directive, override) {
        this.checkOverrideAllowed(directive);
        var oldMetadata = this._directiveResolver.resolve(directive, false);
        this._directiveResolver.setDirective(directive, this._overrider.overrideMetadata(Directive, oldMetadata, override));
        this.clearCacheFor(directive);
    };
    TestingCompilerImpl.prototype.overrideComponent = function (component, override) {
        this.checkOverrideAllowed(component);
        var oldMetadata = this._directiveResolver.resolve(component, false);
        this._directiveResolver.setDirective(component, this._overrider.overrideMetadata(Component, oldMetadata, override));
        this.clearCacheFor(component);
    };
    TestingCompilerImpl.prototype.overridePipe = function (pipe, override) {
        this.checkOverrideAllowed(pipe);
        var oldMetadata = this._pipeResolver.resolve(pipe, false);
        this._pipeResolver.setPipe(pipe, this._overrider.overrideMetadata(Pipe, oldMetadata, override));
        this.clearCacheFor(pipe);
    };
    TestingCompilerImpl.prototype.loadAotSummaries = function (summaries) { this._compiler.loadAotSummaries(summaries); };
    TestingCompilerImpl.prototype.clearCache = function () { this._compiler.clearCache(); };
    TestingCompilerImpl.prototype.clearCacheFor = function (type) { this._compiler.clearCacheFor(type); };
    TestingCompilerImpl.prototype.getComponentFromError = function (error) { return error[ERROR_COMPONENT_TYPE] || null; };
    TestingCompilerImpl.prototype.getModuleId = function (moduleType) {
        return this._moduleResolver.resolve(moduleType, true).id;
    };
    return TestingCompilerImpl;
}());
export { TestingCompilerImpl };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZXJfZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3BsYXRmb3JtLWJyb3dzZXItZHluYW1pYy90ZXN0aW5nL3NyYy9jb21waWxlcl9mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxnQkFBZ0IsRUFBRSxpQkFBaUIsRUFBRSxvQkFBb0IsRUFBRSxnQkFBZ0IsRUFBRSxZQUFZLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUM1SCxPQUFPLEVBQUMscUJBQXFCLEVBQUUsb0JBQW9CLEVBQUUsZ0JBQWdCLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUN4RyxPQUFPLEVBQW1DLFNBQVMsRUFBb0IsU0FBUyxFQUEwQyxRQUFRLEVBQW1CLElBQUksRUFBd0IsVUFBVSxJQUFJLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUkvTixPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUV2RCxNQUFNLENBQUMsSUFBTSxrQkFBa0IsR0FBcUI7SUFDbEQsRUFBQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxFQUFFLENBQUMsZ0JBQWdCLENBQUMsRUFBQztJQUNyRCxFQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLGdCQUFnQixFQUFDO0lBQ3RELEVBQUMsT0FBTyxFQUFFLHFCQUFxQixFQUFFLElBQUksRUFBRSxDQUFDLGdCQUFnQixDQUFDLEVBQUM7SUFDMUQsRUFBQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLHFCQUFxQixFQUFDO0lBQ2hFLEVBQUMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLElBQUksRUFBRSxDQUFDLGdCQUFnQixDQUFDLEVBQUM7SUFDekQsRUFBQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsV0FBVyxFQUFFLG9CQUFvQixFQUFD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SUFBSSxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUNELDhDQUFnQixHQUFoQixVQUFpQixTQUFzQixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hGLHdDQUFVLEdBQVYsY0FBcUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDbkQsMkNBQWEsR0FBYixVQUFjLElBQWUsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFdEUsbURBQXFCLEdBQXJCLFVBQXNCLEtBQVksSUFBSSxPQUFRLEtBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7SUFFNUYseUNBQVcsR0FBWCxVQUFZLFVBQXFCO1FBQy9CLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUMzRCxDQUFDO0lBQ0gsMEJBQUM7QUFBRCxDQUFDLEFBckVELElBcUVDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0NvbXBpbGVSZWZsZWN0b3IsIERpcmVjdGl2ZVJlc29sdmVyLCBFUlJPUl9DT01QT05FTlRfVFlQRSwgTmdNb2R1bGVSZXNvbHZlciwgUGlwZVJlc29sdmVyfSBmcm9tICdAYW5ndWxhci9jb21waWxlcic7XG5pbXBvcnQge01vY2tEaXJlY3RpdmVSZXNvbHZlciwgTW9ja05nTW9kdWxlUmVzb2x2ZXIsIE1vY2tQaXBlUmVzb2x2ZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvbXBpbGVyL3Rlc3RpbmcnO1xuaW1wb3J0IHtDb21waWxlckZhY3RvcnksIENvbXBpbGVyT3B0aW9ucywgQ29tcG9uZW50LCBDb21wb25lbnRGYWN0b3J5LCBEaXJlY3RpdmUsIEluamVjdG9yLCBNb2R1bGVXaXRoQ29tcG9uZW50RmFjdG9yaWVzLCBOZ01vZHVsZSwgTmdNb2R1bGVGYWN0b3J5LCBQaXBlLCBTdGF0aWNQcm92aWRlciwgVHlwZSwgybVzdHJpbmdpZnkgYXMgc3RyaW5naWZ5fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWV0YWRhdGFPdmVycmlkZSwgybVUZXN0aW5nQ29tcGlsZXIgYXMgVGVzdGluZ0NvbXBpbGVyLCDJtVRlc3RpbmdDb21waWxlckZhY3RvcnkgYXMgVGVzdGluZ0NvbXBpbGVyRmFjdG9yeX0gZnJvbSAnQGFuZ3VsYXIvY29yZS90ZXN0aW5nJztcbmltcG9ydCB7ybVDb21waWxlckltcGwgYXMgQ29tcGlsZXJJbXBsfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyLWR5bmFtaWMnO1xuXG5pbXBvcnQge01ldGFkYXRhT3ZlcnJpZGVyfSBmcm9tICcuL21ldGFkYXRhX292ZXJyaWRlcic7XG5cbmV4cG9ydCBjb25zdCBDT01QSUxFUl9QUk9WSURFUlM6IFN0YXRpY1Byb3ZpZGVyW10gPSBbXG4gIHtwcm92aWRlOiBNb2NrUGlwZVJlc29sdmVyLCBkZXBzOiBbQ29tcGlsZVJlZmxlY3Rvcl19LFxuICB7cHJvdmlkZTogUGlwZVJlc29sdmVyLCB1c2VFeGlzdGluZzogTW9ja1BpcGVSZXNvbHZlcn0sXG4gIHtwcm92aWRlOiBNb2NrRGlyZWN0aXZlUmVzb2x2ZXIsIGRlcHM6IFtDb21waWxlUmVmbGVjdG9yXX0sXG4gIHtwcm92aWRlOiBEaXJlY3RpdmVSZXNvbHZlciwgdXNlRXhpc3Rpbmc6IE1vY2tEaXJlY3RpdmVSZXNvbHZlcn0sXG4gIHtwcm92aWRlOiBNb2NrTmdNb2R1bGVSZXNvbHZlciwgZGVwczogW0NvbXBpbGVSZWZsZWN0b3JdfSxcbiAge3Byb3ZpZGU6IE5nTW9kdWxlUmVzb2x2ZXIsIHVzZUV4aXN0aW5nOiBNb2NrTmdNb2R1bGVSZXNvbHZlcn0sXG5dO1xuXG5leHBvcnQgY2xhc3MgVGVzdGluZ0NvbXBpbGVyRmFjdG9yeUltcGwgaW1wbGVtZW50cyBUZXN0aW5nQ29tcGlsZXJGYWN0b3J5IHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfaW5qZWN0b3I6IEluamVjdG9yLCBwcml2YXRlIF9jb21waWxlckZhY3Rvcnk6IENvbXBpbGVyRmFjdG9yeSkge31cblxuICBjcmVhdGVUZXN0aW5nQ29tcGlsZXIob3B0aW9uczogQ29tcGlsZXJPcHRpb25zW10pOiBUZXN0aW5nQ29tcGlsZXIge1xuICAgIGNvbnN0IGNvbXBpbGVyID0gPENvbXBpbGVySW1wbD50aGlzLl9jb21waWxlckZhY3RvcnkuY3JlYXRlQ29tcGlsZXIob3B0aW9ucyk7XG4gICAgcmV0dXJuIG5ldyBUZXN0aW5nQ29tcGlsZXJJbXBsKFxuICAgICAgICBjb21waWxlciwgY29tcGlsZXIuaW5qZWN0b3IuZ2V0KE1vY2tEaXJlY3RpdmVSZXNvbHZlciksXG4gICAgICAgIGNvbXBpbGVyLmluamVjdG9yLmdldChNb2NrUGlwZVJlc29sdmVyKSwgY29tcGlsZXIuaW5qZWN0b3IuZ2V0KE1vY2tOZ01vZHVsZVJlc29sdmVyKSk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFRlc3RpbmdDb21waWxlckltcGwgaW1wbGVtZW50cyBUZXN0aW5nQ29tcGlsZXIge1xuICBwcml2YXRlIF9vdmVycmlkZXIgPSBuZXcgTWV0YWRhdGFPdmVycmlkZXIoKTtcbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIF9jb21waWxlcjogQ29tcGlsZXJJbXBsLCBwcml2YXRlIF9kaXJlY3RpdmVSZXNvbHZlcjogTW9ja0RpcmVjdGl2ZVJlc29sdmVyLFxuICAgICAgcHJpdmF0ZSBfcGlwZVJlc29sdmVyOiBNb2NrUGlwZVJlc29sdmVyLCBwcml2YXRlIF9tb2R1bGVSZXNvbHZlcjogTW9ja05nTW9kdWxlUmVzb2x2ZXIpIHt9XG4gIGdldCBpbmplY3RvcigpOiBJbmplY3RvciB7IHJldHVybiB0aGlzLl9jb21waWxlci5pbmplY3RvcjsgfVxuXG4gIGNvbXBpbGVNb2R1bGVTeW5jPFQ+KG1vZHVsZVR5cGU6IFR5cGU8VD4pOiBOZ01vZHVsZUZhY3Rvcnk8VD4ge1xuICAgIHJldHVybiB0aGlzLl9jb21waWxlci5jb21waWxlTW9kdWxlU3luYyhtb2R1bGVUeXBlKTtcbiAgfVxuXG4gIGNvbXBpbGVNb2R1bGVBc3luYzxUPihtb2R1bGVUeXBlOiBUeXBlPFQ+KTogUHJvbWlzZTxOZ01vZHVsZUZhY3Rvcnk8VD4+IHtcbiAgICByZXR1cm4gdGhpcy5fY29tcGlsZXIuY29tcGlsZU1vZHVsZUFzeW5jKG1vZHVsZVR5cGUpO1xuICB9XG4gIGNvbXBpbGVNb2R1bGVBbmRBbGxDb21wb25lbnRzU3luYzxUPihtb2R1bGVUeXBlOiBUeXBlPFQ+KTogTW9kdWxlV2l0aENvbXBvbmVudEZhY3RvcmllczxUPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbXBpbGVyLmNvbXBpbGVNb2R1bGVBbmRBbGxDb21wb25lbnRzU3luYyhtb2R1bGVUeXBlKTtcbiAgfVxuXG4gIGNvbXBpbGVNb2R1bGVBbmRBbGxDb21wb25lbnRzQXN5bmM8VD4obW9kdWxlVHlwZTogVHlwZTxUPik6XG4gICAgICBQcm9taXNlPE1vZHVsZVdpdGhDb21wb25lbnRGYWN0b3JpZXM8VD4+IHtcbiAgICByZXR1cm4gdGhpcy5fY29tcGlsZXIuY29tcGlsZU1vZHVsZUFuZEFsbENvbXBvbmVudHNBc3luYyhtb2R1bGVUeXBlKTtcbiAgfVxuXG4gIGdldENvbXBvbmVudEZhY3Rvcnk8VD4oY29tcG9uZW50OiBUeXBlPFQ+KTogQ29tcG9uZW50RmFjdG9yeTxUPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbXBpbGVyLmdldENvbXBvbmVudEZhY3RvcnkoY29tcG9uZW50KTtcbiAgfVxuXG4gIGNoZWNrT3ZlcnJpZGVBbGxvd2VkKHR5cGU6IFR5cGU8YW55Pikge1xuICAgIGlmICh0aGlzLl9jb21waWxlci5oYXNBb3RTdW1tYXJ5KHR5cGUpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7c3RyaW5naWZ5KHR5cGUpfSB3YXMgQU9UIGNvbXBpbGVkLCBzbyBpdHMgbWV0YWRhdGEgY2Fubm90IGJlIGNoYW5nZWQuYCk7XG4gICAgfVxuICB9XG5cbiAgb3ZlcnJpZGVNb2R1bGUobmdNb2R1bGU6IFR5cGU8YW55Piwgb3ZlcnJpZGU6IE1ldGFkYXRhT3ZlcnJpZGU8TmdNb2R1bGU+KTogdm9pZCB7XG4gICAgdGhpcy5jaGVja092ZXJyaWRlQWxsb3dlZChuZ01vZHVsZSk7XG4gICAgY29uc3Qgb2xkTWV0YWRhdGEgPSB0aGlzLl9tb2R1bGVSZXNvbHZlci5yZXNvbHZlKG5nTW9kdWxlLCBmYWxzZSk7XG4gICAgdGhpcy5fbW9kdWxlUmVzb2x2ZXIuc2V0TmdNb2R1bGUoXG4gICAgICAgIG5nTW9kdWxlLCB0aGlzLl9vdmVycmlkZXIub3ZlcnJpZGVNZXRhZGF0YShOZ01vZHVsZSwgb2xkTWV0YWRhdGEsIG92ZXJyaWRlKSk7XG4gICAgdGhpcy5jbGVhckNhY2hlRm9yKG5nTW9kdWxlKTtcbiAgfVxuICBvdmVycmlkZURpcmVjdGl2ZShkaXJlY3RpdmU6IFR5cGU8YW55Piwgb3ZlcnJpZGU6IE1ldGFkYXRhT3ZlcnJpZGU8RGlyZWN0aXZlPik6IHZvaWQge1xuICAgIHRoaXMuY2hlY2tPdmVycmlkZUFsbG93ZWQoZGlyZWN0aXZlKTtcbiAgICBjb25zdCBvbGRNZXRhZGF0YSA9IHRoaXMuX2RpcmVjdGl2ZVJlc29sdmVyLnJlc29sdmUoZGlyZWN0aXZlLCBmYWxzZSk7XG4gICAgdGhpcy5fZGlyZWN0aXZlUmVzb2x2ZXIuc2V0RGlyZWN0aXZlKFxuICAgICAgICBkaXJlY3RpdmUsIHRoaXMuX292ZXJyaWRlci5vdmVycmlkZU1ldGFkYXRhKERpcmVjdGl2ZSwgb2xkTWV0YWRhdGEgISwgb3ZlcnJpZGUpKTtcbiAgICB0aGlzLmNsZWFyQ2FjaGVGb3IoZGlyZWN0aXZlKTtcbiAgfVxuICBvdmVycmlkZUNvbXBvbmVudChjb21wb25lbnQ6IFR5cGU8YW55Piwgb3ZlcnJpZGU6IE1ldGFkYXRhT3ZlcnJpZGU8Q29tcG9uZW50Pik6IHZvaWQge1xuICAgIHRoaXMuY2hlY2tPdmVycmlkZUFsbG93ZWQoY29tcG9uZW50KTtcbiAgICBjb25zdCBvbGRNZXRhZGF0YSA9IHRoaXMuX2RpcmVjdGl2ZVJlc29sdmVyLnJlc29sdmUoY29tcG9uZW50LCBmYWxzZSk7XG4gICAgdGhpcy5fZGlyZWN0aXZlUmVzb2x2ZXIuc2V0RGlyZWN0aXZlKFxuICAgICAgICBjb21wb25lbnQsIHRoaXMuX292ZXJyaWRlci5vdmVycmlkZU1ldGFkYXRhKENvbXBvbmVudCwgb2xkTWV0YWRhdGEgISwgb3ZlcnJpZGUpKTtcbiAgICB0aGlzLmNsZWFyQ2FjaGVGb3IoY29tcG9uZW50KTtcbiAgfVxuICBvdmVycmlkZVBpcGUocGlwZTogVHlwZTxhbnk+LCBvdmVycmlkZTogTWV0YWRhdGFPdmVycmlkZTxQaXBlPik6IHZvaWQge1xuICAgIHRoaXMuY2hlY2tPdmVycmlkZUFsbG93ZWQocGlwZSk7XG4gICAgY29uc3Qgb2xkTWV0YWRhdGEgPSB0aGlzLl9waXBlUmVzb2x2ZXIucmVzb2x2ZShwaXBlLCBmYWxzZSk7XG4gICAgdGhpcy5fcGlwZVJlc29sdmVyLnNldFBpcGUocGlwZSwgdGhpcy5fb3ZlcnJpZGVyLm92ZXJyaWRlTWV0YWRhdGEoUGlwZSwgb2xkTWV0YWRhdGEsIG92ZXJyaWRlKSk7XG4gICAgdGhpcy5jbGVhckNhY2hlRm9yKHBpcGUpO1xuICB9XG4gIGxvYWRBb3RTdW1tYXJpZXMoc3VtbWFyaWVzOiAoKSA9PiBhbnlbXSkgeyB0aGlzLl9jb21waWxlci5sb2FkQW90U3VtbWFyaWVzKHN1bW1hcmllcyk7IH1cbiAgY2xlYXJDYWNoZSgpOiB2b2lkIHsgdGhpcy5fY29tcGlsZXIuY2xlYXJDYWNoZSgpOyB9XG4gIGNsZWFyQ2FjaGVGb3IodHlwZTogVHlwZTxhbnk+KSB7IHRoaXMuX2NvbXBpbGVyLmNsZWFyQ2FjaGVGb3IodHlwZSk7IH1cblxuICBnZXRDb21wb25lbnRGcm9tRXJyb3IoZXJyb3I6IEVycm9yKSB7IHJldHVybiAoZXJyb3IgYXMgYW55KVtFUlJPUl9DT01QT05FTlRfVFlQRV0gfHwgbnVsbDsgfVxuXG4gIGdldE1vZHVsZUlkKG1vZHVsZVR5cGU6IFR5cGU8YW55Pik6IHN0cmluZ3x1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLl9tb2R1bGVSZXNvbHZlci5yZXNvbHZlKG1vZHVsZVR5cGUsIHRydWUpLmlkO1xuICB9XG59XG4iXX0=