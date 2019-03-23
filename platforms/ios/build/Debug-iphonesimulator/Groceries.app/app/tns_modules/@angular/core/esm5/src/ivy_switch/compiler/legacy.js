/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as tslib_1 from "tslib";
import { defineInjectable, defineInjector, getInjectableDef } from '../../di/defs';
import { inject, injectArgs } from '../../di/injector';
import { ReflectionCapabilities } from '../../reflection/reflection_capabilities';
import { getClosureSafeProperty } from '../../util/property';
import * as ivyOn from './ivy_switch_on';
function noop() { }
export var R3_COMPILE_COMPONENT__POST_NGCC__ = ivyOn.R3_COMPILE_COMPONENT;
export var R3_COMPILE_DIRECTIVE__POST_NGCC__ = ivyOn.R3_COMPILE_DIRECTIVE;
export var R3_COMPILE_INJECTABLE__POST_NGCC__ = ivyOn.R3_COMPILE_INJECTABLE;
export var R3_COMPILE_NGMODULE__POST_NGCC__ = ivyOn.R3_COMPILE_NGMODULE;
export var R3_COMPILE_PIPE__POST_NGCC__ = ivyOn.R3_COMPILE_PIPE;
export var R3_COMPILE_NGMODULE_DEFS__POST_NGCC__ = ivyOn.R3_COMPILE_NGMODULE_DEFS;
export var R3_PATCH_COMPONENT_DEF_WTIH_SCOPE__POST_NGCC__ = ivyOn.R3_PATCH_COMPONENT_DEF_WTIH_SCOPE;
export var ivyEnable__POST_NGCC__ = ivyOn.ivyEnabled;
var R3_COMPILE_COMPONENT__PRE_NGCC__ = noop;
var R3_COMPILE_DIRECTIVE__PRE_NGCC__ = noop;
var R3_COMPILE_INJECTABLE__PRE_NGCC__ = preR3InjectableCompile;
var R3_COMPILE_NGMODULE__PRE_NGCC__ = preR3NgModuleCompile;
var R3_COMPILE_PIPE__PRE_NGCC__ = noop;
var R3_COMPILE_NGMODULE_DEFS__PRE_NGCC__ = noop;
var R3_PATCH_COMPONENT_DEF_WTIH_SCOPE__PRE_NGCC__ = noop;
var ivyEnable__PRE_NGCC__ = false;
export var ivyEnabled = ivyEnable__PRE_NGCC__;
export var R3_COMPILE_COMPONENT = R3_COMPILE_COMPONENT__PRE_NGCC__;
export var R3_COMPILE_DIRECTIVE = R3_COMPILE_DIRECTIVE__PRE_NGCC__;
export var R3_COMPILE_INJECTABLE = R3_COMPILE_INJECTABLE__PRE_NGCC__;
export var R3_COMPILE_NGMODULE = R3_COMPILE_NGMODULE__PRE_NGCC__;
export var R3_COMPILE_PIPE = R3_COMPILE_PIPE__PRE_NGCC__;
export var R3_COMPILE_NGMODULE_DEFS = R3_COMPILE_NGMODULE_DEFS__PRE_NGCC__;
export var R3_PATCH_COMPONENT_DEF_WTIH_SCOPE = R3_PATCH_COMPONENT_DEF_WTIH_SCOPE__PRE_NGCC__;
////////////////////////////////////////////////////////////
// Glue code which should be removed after Ivy is default //
////////////////////////////////////////////////////////////
function preR3NgModuleCompile(moduleType, metadata) {
    var imports = (metadata && metadata.imports) || [];
    if (metadata && metadata.exports) {
        imports = tslib_1.__spread(imports, [metadata.exports]);
    }
    moduleType.ngInjectorDef = defineInjector({
        factory: convertInjectableProviderToFactory(moduleType, { useClass: moduleType }),
        providers: metadata && metadata.providers,
        imports: imports,
    });
}
var ɵ0 = getClosureSafeProperty;
var USE_VALUE = getClosureSafeProperty({ provide: String, useValue: ɵ0 });
var EMPTY_ARRAY = [];
function convertInjectableProviderToFactory(type, provider) {
    if (!provider) {
        var reflectionCapabilities = new ReflectionCapabilities();
        var deps_1 = reflectionCapabilities.parameters(type);
        // TODO - convert to flags.
        return function () { return new (type.bind.apply(type, tslib_1.__spread([void 0], injectArgs(deps_1))))(); };
    }
    if (USE_VALUE in provider) {
        var valueProvider_1 = provider;
        return function () { return valueProvider_1.useValue; };
    }
    else if (provider.useExisting) {
        var existingProvider_1 = provider;
        return function () { return inject(existingProvider_1.useExisting); };
    }
    else if (provider.useFactory) {
        var factoryProvider_1 = provider;
        return function () { return factoryProvider_1.useFactory.apply(factoryProvider_1, tslib_1.__spread(injectArgs(factoryProvider_1.deps || EMPTY_ARRAY))); };
    }
    else if (provider.useClass) {
        var classProvider_1 = provider;
        var deps_2 = provider.deps;
        if (!deps_2) {
            var reflectionCapabilities = new ReflectionCapabilities();
            deps_2 = reflectionCapabilities.parameters(type);
        }
        return function () {
            var _a;
            return new ((_a = classProvider_1.useClass).bind.apply(_a, tslib_1.__spread([void 0], injectArgs(deps_2))))();
        };
    }
    else {
        var deps_3 = provider.deps;
        if (!deps_3) {
            var reflectionCapabilities = new ReflectionCapabilities();
            deps_3 = reflectionCapabilities.parameters(type);
        }
        return function () { return new (type.bind.apply(type, tslib_1.__spread([void 0], injectArgs(deps_3))))(); };
    }
}
/**
 * Supports @Injectable() in JIT mode for Render2.
 */
function preR3InjectableCompile(injectableType, options) {
    if (options && options.providedIn !== undefined && !getInjectableDef(injectableType)) {
        injectableType.ngInjectableDef = defineInjectable({
            providedIn: options.providedIn,
            factory: convertInjectableProviderToFactory(injectableType, options),
        });
    }
}
export { ɵ0 };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVnYWN5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvaXZ5X3N3aXRjaC9jb21waWxlci9sZWdhY3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILE9BQU8sRUFBK0IsZ0JBQWdCLEVBQUUsY0FBYyxFQUFFLGdCQUFnQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRS9HLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFHckQsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sMENBQTBDLENBQUM7QUFFaEYsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFFM0QsT0FBTyxLQUFLLEtBQUssTUFBTSxpQkFBaUIsQ0FBQztBQUV6QyxTQUFTLElBQUksS0FBSSxDQUFDO0FBSWxCLE1BQU0sQ0FBQyxJQUFNLGlDQUFpQyxHQUFzQixLQUFLLENBQUMsb0JBQW9CLENBQUM7QUFDL0YsTUFBTSxDQUFDLElBQU0saUNBQWlDLEdBQXNCLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQztBQUMvRixNQUFNLENBQUMsSUFBTSxrQ0FBa0MsR0FBc0IsS0FBSyxDQUFDLHFCQUFxQixDQUFDO0FBQ2pHLE1BQU0sQ0FBQyxJQUFNLGdDQUFnQyxHQUFzQixLQUFLLENBQUMsbUJBQW1CLENBQUM7QUFDN0YsTUFBTSxDQUFDLElBQU0sNEJBQTRCLEdBQXNCLEtBQUssQ0FBQyxlQUFlLENBQUM7QUFDckYsTUFBTSxDQUFDLElBQU0scUNBQXFDLEdBQzlDLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQztBQUNuQyxNQUFNLENBQUMsSUFBTSw4Q0FBOEMsR0FDdkQsS0FBSyxDQUFDLGlDQUFpQyxDQUFDO0FBRTVDLE1BQU0sQ0FBQyxJQUFNLHNCQUFzQixHQUFZLEtBQUssQ0FBQyxVQUFVLENBQUM7QUFF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LEVBQUUsT0FBTyxDQUFDLFVBQVU7WUFDOUIsT0FBTyxFQUFFLGtDQUFrQyxDQUFDLGNBQWMsRUFBRSxPQUFPLENBQUM7U0FDckUsQ0FBQyxDQUFDO0tBQ0o7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0luamVjdGFibGVUeXBlLCBJbmplY3RvclR5cGUsIGRlZmluZUluamVjdGFibGUsIGRlZmluZUluamVjdG9yLCBnZXRJbmplY3RhYmxlRGVmfSBmcm9tICcuLi8uLi9kaS9kZWZzJztcbmltcG9ydCB7SW5qZWN0YWJsZVByb3ZpZGVyfSBmcm9tICcuLi8uLi9kaS9pbmplY3RhYmxlJztcbmltcG9ydCB7aW5qZWN0LCBpbmplY3RBcmdzfSBmcm9tICcuLi8uLi9kaS9pbmplY3Rvcic7XG5pbXBvcnQge0NsYXNzU2Fuc1Byb3ZpZGVyLCBDb25zdHJ1Y3RvclNhbnNQcm92aWRlciwgRXhpc3RpbmdTYW5zUHJvdmlkZXIsIEZhY3RvcnlTYW5zUHJvdmlkZXIsIFN0YXRpY0NsYXNzU2Fuc1Byb3ZpZGVyLCBWYWx1ZVByb3ZpZGVyLCBWYWx1ZVNhbnNQcm92aWRlcn0gZnJvbSAnLi4vLi4vZGkvcHJvdmlkZXInO1xuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnLi4vLi4vbWV0YWRhdGEnO1xuaW1wb3J0IHtSZWZsZWN0aW9uQ2FwYWJpbGl0aWVzfSBmcm9tICcuLi8uLi9yZWZsZWN0aW9uL3JlZmxlY3Rpb25fY2FwYWJpbGl0aWVzJztcbmltcG9ydCB7VHlwZX0gZnJvbSAnLi4vLi4vdHlwZSc7XG5pbXBvcnQge2dldENsb3N1cmVTYWZlUHJvcGVydHl9IGZyb20gJy4uLy4uL3V0aWwvcHJvcGVydHknO1xuXG5pbXBvcnQgKiBhcyBpdnlPbiBmcm9tICcuL2l2eV9zd2l0Y2hfb24nO1xuXG5mdW5jdGlvbiBub29wKCkge31cblxuZXhwb3J0IGludGVyZmFjZSBEaXJlY3RpdmVDb21waWxlciB7ICh0eXBlOiBhbnksIG1ldGE6IGFueSk6IHZvaWQ7IH1cblxuZXhwb3J0IGNvbnN0IFIzX0NPTVBJTEVfQ09NUE9ORU5UX19QT1NUX05HQ0NfXzogRGlyZWN0aXZlQ29tcGlsZXIgPSBpdnlPbi5SM19DT01QSUxFX0NPTVBPTkVOVDtcbmV4cG9ydCBjb25zdCBSM19DT01QSUxFX0RJUkVDVElWRV9fUE9TVF9OR0NDX186IERpcmVjdGl2ZUNvbXBpbGVyID0gaXZ5T24uUjNfQ09NUElMRV9ESVJFQ1RJVkU7XG5leHBvcnQgY29uc3QgUjNfQ09NUElMRV9JTkpFQ1RBQkxFX19QT1NUX05HQ0NfXzogRGlyZWN0aXZlQ29tcGlsZXIgPSBpdnlPbi5SM19DT01QSUxFX0lOSkVDVEFCTEU7XG5leHBvcnQgY29uc3QgUjNfQ09NUElMRV9OR01PRFVMRV9fUE9TVF9OR0NDX186IERpcmVjdGl2ZUNvbXBpbGVyID0gaXZ5T24uUjNfQ09NUElMRV9OR01PRFVMRTtcbmV4cG9ydCBjb25zdCBSM19DT01QSUxFX1BJUEVfX1BPU1RfTkdDQ19fOiBEaXJlY3RpdmVDb21waWxlciA9IGl2eU9uLlIzX0NPTVBJTEVfUElQRTtcbmV4cG9ydCBjb25zdCBSM19DT01QSUxFX05HTU9EVUxFX0RFRlNfX1BPU1RfTkdDQ19fOiBEaXJlY3RpdmVDb21waWxlciA9XG4gICAgaXZ5T24uUjNfQ09NUElMRV9OR01PRFVMRV9ERUZTO1xuZXhwb3J0IGNvbnN0IFIzX1BBVENIX0NPTVBPTkVOVF9ERUZfV1RJSF9TQ09QRV9fUE9TVF9OR0NDX186IERpcmVjdGl2ZUNvbXBpbGVyID1cbiAgICBpdnlPbi5SM19QQVRDSF9DT01QT05FTlRfREVGX1dUSUhfU0NPUEU7XG5cbmV4cG9ydCBjb25zdCBpdnlFbmFibGVfX1BPU1RfTkdDQ19fOiBib29sZWFuID0gaXZ5T24uaXZ5RW5hYmxlZDtcblxuY29uc3QgUjNfQ09NUElMRV9DT01QT05FTlRfX1BSRV9OR0NDX186IERpcmVjdGl2ZUNvbXBpbGVyID0gbm9vcDtcbmNvbnN0IFIzX0NPTVBJTEVfRElSRUNUSVZFX19QUkVfTkdDQ19fOiBEaXJlY3RpdmVDb21waWxlciA9IG5vb3A7XG5jb25zdCBSM19DT01QSUxFX0lOSkVDVEFCTEVfX1BSRV9OR0NDX186IERpcmVjdGl2ZUNvbXBpbGVyID0gcHJlUjNJbmplY3RhYmxlQ29tcGlsZTtcbmNvbnN0IFIzX0NPTVBJTEVfTkdNT0RVTEVfX1BSRV9OR0NDX186IERpcmVjdGl2ZUNvbXBpbGVyID0gcHJlUjNOZ01vZHVsZUNvbXBpbGU7XG5jb25zdCBSM19DT01QSUxFX1BJUEVfX1BSRV9OR0NDX186IERpcmVjdGl2ZUNvbXBpbGVyID0gbm9vcDtcbmNvbnN0IFIzX0NPTVBJTEVfTkdNT0RVTEVfREVGU19fUFJFX05HQ0NfXzogRGlyZWN0aXZlQ29tcGlsZXIgPSBub29wO1xuY29uc3QgUjNfUEFUQ0hfQ09NUE9ORU5UX0RFRl9XVElIX1NDT1BFX19QUkVfTkdDQ19fOiBEaXJlY3RpdmVDb21waWxlciA9IG5vb3A7XG5cbmNvbnN0IGl2eUVuYWJsZV9fUFJFX05HQ0NfXyA9IGZhbHNlO1xuXG5leHBvcnQgY29uc3QgaXZ5RW5hYmxlZCA9IGl2eUVuYWJsZV9fUFJFX05HQ0NfXztcbmV4cG9ydCBsZXQgUjNfQ09NUElMRV9DT01QT05FTlQ6IERpcmVjdGl2ZUNvbXBpbGVyID0gUjNfQ09NUElMRV9DT01QT05FTlRfX1BSRV9OR0NDX187XG5leHBvcnQgbGV0IFIzX0NPTVBJTEVfRElSRUNUSVZFOiBEaXJlY3RpdmVDb21waWxlciA9IFIzX0NPTVBJTEVfRElSRUNUSVZFX19QUkVfTkdDQ19fO1xuZXhwb3J0IGxldCBSM19DT01QSUxFX0lOSkVDVEFCTEU6IERpcmVjdGl2ZUNvbXBpbGVyID0gUjNfQ09NUElMRV9JTkpFQ1RBQkxFX19QUkVfTkdDQ19fO1xuZXhwb3J0IGxldCBSM19DT01QSUxFX05HTU9EVUxFOiBEaXJlY3RpdmVDb21waWxlciA9IFIzX0NPTVBJTEVfTkdNT0RVTEVfX1BSRV9OR0NDX187XG5leHBvcnQgbGV0IFIzX0NPTVBJTEVfUElQRTogRGlyZWN0aXZlQ29tcGlsZXIgPSBSM19DT01QSUxFX1BJUEVfX1BSRV9OR0NDX187XG5leHBvcnQgbGV0IFIzX0NPTVBJTEVfTkdNT0RVTEVfREVGUzogRGlyZWN0aXZlQ29tcGlsZXIgPSBSM19DT01QSUxFX05HTU9EVUxFX0RFRlNfX1BSRV9OR0NDX187XG5leHBvcnQgbGV0IFIzX1BBVENIX0NPTVBPTkVOVF9ERUZfV1RJSF9TQ09QRTogRGlyZWN0aXZlQ29tcGlsZXIgPVxuICAgIFIzX1BBVENIX0NPTVBPTkVOVF9ERUZfV1RJSF9TQ09QRV9fUFJFX05HQ0NfXztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIEdsdWUgY29kZSB3aGljaCBzaG91bGQgYmUgcmVtb3ZlZCBhZnRlciBJdnkgaXMgZGVmYXVsdCAvL1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbmZ1bmN0aW9uIHByZVIzTmdNb2R1bGVDb21waWxlKG1vZHVsZVR5cGU6IEluamVjdG9yVHlwZTxhbnk+LCBtZXRhZGF0YTogTmdNb2R1bGUpOiB2b2lkIHtcbiAgbGV0IGltcG9ydHMgPSAobWV0YWRhdGEgJiYgbWV0YWRhdGEuaW1wb3J0cykgfHwgW107XG4gIGlmIChtZXRhZGF0YSAmJiBtZXRhZGF0YS5leHBvcnRzKSB7XG4gICAgaW1wb3J0cyA9IFsuLi5pbXBvcnRzLCBtZXRhZGF0YS5leHBvcnRzXTtcbiAgfVxuXG4gIG1vZHVsZVR5cGUubmdJbmplY3RvckRlZiA9IGRlZmluZUluamVjdG9yKHtcbiAgICBmYWN0b3J5OiBjb252ZXJ0SW5qZWN0YWJsZVByb3ZpZGVyVG9GYWN0b3J5KG1vZHVsZVR5cGUsIHt1c2VDbGFzczogbW9kdWxlVHlwZX0pLFxuICAgIHByb3ZpZGVyczogbWV0YWRhdGEgJiYgbWV0YWRhdGEucHJvdmlkZXJzLFxuICAgIGltcG9ydHM6IGltcG9ydHMsXG4gIH0pO1xufVxuXG5jb25zdCBVU0VfVkFMVUUgPVxuICAgIGdldENsb3N1cmVTYWZlUHJvcGVydHk8VmFsdWVQcm92aWRlcj4oe3Byb3ZpZGU6IFN0cmluZywgdXNlVmFsdWU6IGdldENsb3N1cmVTYWZlUHJvcGVydHl9KTtcbmNvbnN0IEVNUFRZX0FSUkFZOiBhbnlbXSA9IFtdO1xuXG5mdW5jdGlvbiBjb252ZXJ0SW5qZWN0YWJsZVByb3ZpZGVyVG9GYWN0b3J5KHR5cGU6IFR5cGU8YW55PiwgcHJvdmlkZXI/OiBJbmplY3RhYmxlUHJvdmlkZXIpOiAoKSA9PlxuICAgIGFueSB7XG4gIGlmICghcHJvdmlkZXIpIHtcbiAgICBjb25zdCByZWZsZWN0aW9uQ2FwYWJpbGl0aWVzID0gbmV3IFJlZmxlY3Rpb25DYXBhYmlsaXRpZXMoKTtcbiAgICBjb25zdCBkZXBzID0gcmVmbGVjdGlvbkNhcGFiaWxpdGllcy5wYXJhbWV0ZXJzKHR5cGUpO1xuICAgIC8vIFRPRE8gLSBjb252ZXJ0IHRvIGZsYWdzLlxuICAgIHJldHVybiAoKSA9PiBuZXcgdHlwZSguLi5pbmplY3RBcmdzKGRlcHMgYXMgYW55W10pKTtcbiAgfVxuXG4gIGlmIChVU0VfVkFMVUUgaW4gcHJvdmlkZXIpIHtcbiAgICBjb25zdCB2YWx1ZVByb3ZpZGVyID0gKHByb3ZpZGVyIGFzIFZhbHVlU2Fuc1Byb3ZpZGVyKTtcbiAgICByZXR1cm4gKCkgPT4gdmFsdWVQcm92aWRlci51c2VWYWx1ZTtcbiAgfSBlbHNlIGlmICgocHJvdmlkZXIgYXMgRXhpc3RpbmdTYW5zUHJvdmlkZXIpLnVzZUV4aXN0aW5nKSB7XG4gICAgY29uc3QgZXhpc3RpbmdQcm92aWRlciA9IChwcm92aWRlciBhcyBFeGlzdGluZ1NhbnNQcm92aWRlcik7XG4gICAgcmV0dXJuICgpID0+IGluamVjdChleGlzdGluZ1Byb3ZpZGVyLnVzZUV4aXN0aW5nKTtcbiAgfSBlbHNlIGlmICgocHJvdmlkZXIgYXMgRmFjdG9yeVNhbnNQcm92aWRlcikudXNlRmFjdG9yeSkge1xuICAgIGNvbnN0IGZhY3RvcnlQcm92aWRlciA9IChwcm92aWRlciBhcyBGYWN0b3J5U2Fuc1Byb3ZpZGVyKTtcbiAgICByZXR1cm4gKCkgPT4gZmFjdG9yeVByb3ZpZGVyLnVzZUZhY3RvcnkoLi4uaW5qZWN0QXJncyhmYWN0b3J5UHJvdmlkZXIuZGVwcyB8fCBFTVBUWV9BUlJBWSkpO1xuICB9IGVsc2UgaWYgKChwcm92aWRlciBhcyBTdGF0aWNDbGFzc1NhbnNQcm92aWRlciB8IENsYXNzU2Fuc1Byb3ZpZGVyKS51c2VDbGFzcykge1xuICAgIGNvbnN0IGNsYXNzUHJvdmlkZXIgPSAocHJvdmlkZXIgYXMgU3RhdGljQ2xhc3NTYW5zUHJvdmlkZXIgfCBDbGFzc1NhbnNQcm92aWRlcik7XG4gICAgbGV0IGRlcHMgPSAocHJvdmlkZXIgYXMgU3RhdGljQ2xhc3NTYW5zUHJvdmlkZXIpLmRlcHM7XG4gICAgaWYgKCFkZXBzKSB7XG4gICAgICBjb25zdCByZWZsZWN0aW9uQ2FwYWJpbGl0aWVzID0gbmV3IFJlZmxlY3Rpb25DYXBhYmlsaXRpZXMoKTtcbiAgICAgIGRlcHMgPSByZWZsZWN0aW9uQ2FwYWJpbGl0aWVzLnBhcmFtZXRlcnModHlwZSk7XG4gICAgfVxuICAgIHJldHVybiAoKSA9PiBuZXcgY2xhc3NQcm92aWRlci51c2VDbGFzcyguLi5pbmplY3RBcmdzKGRlcHMpKTtcbiAgfSBlbHNlIHtcbiAgICBsZXQgZGVwcyA9IChwcm92aWRlciBhcyBDb25zdHJ1Y3RvclNhbnNQcm92aWRlcikuZGVwcztcbiAgICBpZiAoIWRlcHMpIHtcbiAgICAgIGNvbnN0IHJlZmxlY3Rpb25DYXBhYmlsaXRpZXMgPSBuZXcgUmVmbGVjdGlvbkNhcGFiaWxpdGllcygpO1xuICAgICAgZGVwcyA9IHJlZmxlY3Rpb25DYXBhYmlsaXRpZXMucGFyYW1ldGVycyh0eXBlKTtcbiAgICB9XG4gICAgcmV0dXJuICgpID0+IG5ldyB0eXBlKC4uLmluamVjdEFyZ3MoZGVwcyAhKSk7XG4gIH1cbn1cblxuLyoqXG4gKiBTdXBwb3J0cyBASW5qZWN0YWJsZSgpIGluIEpJVCBtb2RlIGZvciBSZW5kZXIyLlxuICovXG5mdW5jdGlvbiBwcmVSM0luamVjdGFibGVDb21waWxlKFxuICAgIGluamVjdGFibGVUeXBlOiBJbmplY3RhYmxlVHlwZTxhbnk+LFxuICAgIG9wdGlvbnM6IHtwcm92aWRlZEluPzogVHlwZTxhbnk+fCAncm9vdCcgfCBudWxsfSAmIEluamVjdGFibGVQcm92aWRlcik6IHZvaWQge1xuICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLnByb3ZpZGVkSW4gIT09IHVuZGVmaW5lZCAmJiAhZ2V0SW5qZWN0YWJsZURlZihpbmplY3RhYmxlVHlwZSkpIHtcbiAgICBpbmplY3RhYmxlVHlwZS5uZ0luamVjdGFibGVEZWYgPSBkZWZpbmVJbmplY3RhYmxlKHtcbiAgICAgIHByb3ZpZGVkSW46IG9wdGlvbnMucHJvdmlkZWRJbixcbiAgICAgIGZhY3Rvcnk6IGNvbnZlcnRJbmplY3RhYmxlUHJvdmlkZXJUb0ZhY3RvcnkoaW5qZWN0YWJsZVR5cGUsIG9wdGlvbnMpLFxuICAgIH0pO1xuICB9XG59XG4iXX0=