import * as tslib_1 from "tslib";
import { assertDefined } from './assert';
import { discoverDirectives, discoverLocalRefs, getContext, isComponentInstance } from './context_discovery';
import { NodeInjector } from './di';
import { CONTEXT, FLAGS, PARENT, TVIEW } from './interfaces/view';
import { getComponentViewByIndex, readPatchedLViewData } from './util';
/**
 * NOTE: The following functions might not be ideal for core usage in Angular...
 *
 * Each function below is designed
 */
/**
 * Returns the component instance associated with the target.
 *
 * If a DOM is used then it will return the component that
 *    owns the view where the element is situated.
 * If a component instance is used then it will return the
 *    instance of the parent component depending on where
 *    the component instance is exists in a template.
 * If a directive instance is used then it will return the
 *    component that contains that directive in it's template.
 */
export function getComponent(target) {
    var context = loadContext(target);
    if (context.component === undefined) {
        var lViewData = context.lViewData;
        while (lViewData) {
            var ctx = lViewData[CONTEXT];
            if (ctx && isComponentInstance(ctx)) {
                context.component = ctx;
                break;
            }
            lViewData = lViewData[PARENT];
        }
        if (context.component === undefined) {
            context.component = null;
        }
    }
    return context.component;
}
/**
 * Returns the host component instance associated with the target.
 *
 * This will only return a component instance of the DOM node
 * contains an instance of a component on it.
 */
export function getHostComponent(target) {
    var context = loadContext(target);
    var tNode = context.lViewData[TVIEW].data[context.nodeIndex];
    if (tNode.flags & 4096 /* isComponent */) {
        var componentView = getComponentViewByIndex(context.nodeIndex, context.lViewData);
        return componentView[CONTEXT];
    }
    return null;
}
/**
 * Returns the `RootContext` instance that is associated with
 * the application where the target is situated.
 */
export function getRootContext(target) {
    var context = loadContext(target);
    var rootLViewData = getRootView(context.lViewData);
    return rootLViewData[CONTEXT];
}
/**
 * Returns a list of all the components in the application
 * that are have been bootstrapped.
 */
export function getRootComponents(target) {
    return tslib_1.__spread(getRootContext(target).components);
}
/**
 * Returns the injector instance that is associated with
 * the element, component or directive.
 */
export function getInjector(target) {
    var context = loadContext(target);
    var tNode = context.lViewData[TVIEW].data[context.nodeIndex];
    return new NodeInjector(tNode, context.lViewData);
}
/**
 * Returns a list of all the directives that are associated
 * with the underlying target element.
 */
export function getDirectives(target) {
    var context = loadContext(target);
    if (context.directives === undefined) {
        context.directives = discoverDirectives(context.nodeIndex, context.lViewData, false);
    }
    return context.directives || [];
}
/**
 * Returns LContext associated with a target passed as an argument.
 * Throws if a given target doesn't have associated LContext.
 */
export function loadContext(target) {
    var context = getContext(target);
    if (!context) {
        throw new Error(ngDevMode ? 'Unable to find the given context data for the given target' :
            'Invalid ng target');
    }
    return context;
}
/**
 * Retrieve the root view from any component by walking the parent `LViewData` until
 * reaching the root `LViewData`.
 *
 * @param componentOrView any component or view
 */
export function getRootView(componentOrView) {
    var lViewData;
    if (Array.isArray(componentOrView)) {
        ngDevMode && assertDefined(componentOrView, 'lViewData');
        lViewData = componentOrView;
    }
    else {
        ngDevMode && assertDefined(componentOrView, 'component');
        lViewData = readPatchedLViewData(componentOrView);
    }
    while (lViewData && !(lViewData[FLAGS] & 64 /* IsRoot */)) {
        lViewData = lViewData[PARENT];
    }
    return lViewData;
}
/**
 *  Retrieve map of local references (local reference name => element or directive instance).
 */
export function getLocalRefs(target) {
    var context = loadContext(target);
    if (context.localRefs === undefined) {
        context.localRefs = discoverLocalRefs(context.lViewData, context.nodeIndex);
    }
    return context.localRefs || {};
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzY292ZXJ5X3V0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvcmVuZGVyMy9kaXNjb3ZlcnlfdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQVNBLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFDdkMsT0FBTyxFQUFDLGtCQUFrQixFQUFFLGlCQUFpQixFQUFFLFVBQVUsRUFBRSxtQkFBbUIsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQzNHLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFHbEMsT0FBTyxFQUFDLE9BQU8sRUFBRSxLQUFLLEVBQXlCLE1BQU0sRUFBZSxLQUFLLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNwRyxPQUFPLEVBQUMsdUJBQXVCLEVBQUUsb0JBQW9CLEVBQUMsTUFBTSxRQUFRLENBQUM7QUFHckU7Ozs7R0FJRztBQUVIOzs7Ozs7Ozs7O0dBVUc7QUFDSCxNQUFNLFVBQVUsWUFBWSxDQUFTLE1BQVU7SUFDN0MsSUFBTSxPQUFPLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBRyxDQUFDO0lBRXRDLElBQUksT0FBTyxDQUFDLFNBQVMsS0FBSyxTQUFTLEVBQUU7UUFDbkMsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQztRQUNsQyxPQUFPLFNBQVMsRUFBRTtZQUNoQixJQUFNLEdBQUcsR0FBRyxTQUFXLENBQUMsT0FBTyxDQUFPLENBQUM7WUFDdkMsSUFBSSxHQUFHLElBQUksbUJBQW1CLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ25DLE9BQU8sQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDO2dCQUN4QixNQUFNO2FBQ1A7WUFDRCxTQUFTLEdBQUcsU0FBVyxDQUFDLE1BQU0sQ0FBRyxDQUFDO1NBQ25DO1FBQ0QsSUFBSSxPQUFPLENBQUMsU0FBUyxLQUFLLFNBQVMs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Q0FBQyxlQUFlLENBQUcsQ0FBQztLQUNyRDtJQUNELE9BQU8sU0FBUyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLGtCQUFvQixDQUFDLEVBQUU7UUFDM0QsU0FBUyxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUcsQ0FBQztLQUNqQztJQUNELE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUM7QUFFRDs7R0FFRztBQUNILE1BQU0sVUFBVSxZQUFZLENBQUMsTUFBVTtJQUNyQyxJQUFNLE9BQU8sR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFHLENBQUM7SUFFdEMsSUFBSSxPQUFPLENBQUMsU0FBUyxLQUFLLFNBQVMsRUFBRTtRQUNuQyxPQUFPLENBQUMsU0FBUyxHQUFHLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0tBQzdFO0lBRUQsT0FBTyxPQUFPLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQztBQUNqQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHtJbmplY3Rvcn0gZnJvbSAnLi4vZGkvaW5qZWN0b3InO1xuXG5pbXBvcnQge2Fzc2VydERlZmluZWR9IGZyb20gJy4vYXNzZXJ0JztcbmltcG9ydCB7ZGlzY292ZXJEaXJlY3RpdmVzLCBkaXNjb3ZlckxvY2FsUmVmcywgZ2V0Q29udGV4dCwgaXNDb21wb25lbnRJbnN0YW5jZX0gZnJvbSAnLi9jb250ZXh0X2Rpc2NvdmVyeSc7XG5pbXBvcnQge05vZGVJbmplY3Rvcn0gZnJvbSAnLi9kaSc7XG5pbXBvcnQge0xDb250ZXh0fSBmcm9tICcuL2ludGVyZmFjZXMvY29udGV4dCc7XG5pbXBvcnQge1RFbGVtZW50Tm9kZSwgVE5vZGUsIFROb2RlRmxhZ3N9IGZyb20gJy4vaW50ZXJmYWNlcy9ub2RlJztcbmltcG9ydCB7Q09OVEVYVCwgRkxBR1MsIExWaWV3RGF0YSwgTFZpZXdGbGFncywgUEFSRU5ULCBSb290Q29udGV4dCwgVFZJRVd9IGZyb20gJy4vaW50ZXJmYWNlcy92aWV3JztcbmltcG9ydCB7Z2V0Q29tcG9uZW50Vmlld0J5SW5kZXgsIHJlYWRQYXRjaGVkTFZpZXdEYXRhfSBmcm9tICcuL3V0aWwnO1xuXG5cbi8qKlxuICogTk9URTogVGhlIGZvbGxvd2luZyBmdW5jdGlvbnMgbWlnaHQgbm90IGJlIGlkZWFsIGZvciBjb3JlIHVzYWdlIGluIEFuZ3VsYXIuLi5cbiAqXG4gKiBFYWNoIGZ1bmN0aW9uIGJlbG93IGlzIGRlc2lnbmVkXG4gKi9cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBjb21wb25lbnQgaW5zdGFuY2UgYXNzb2NpYXRlZCB3aXRoIHRoZSB0YXJnZXQuXG4gKlxuICogSWYgYSBET00gaXMgdXNlZCB0aGVuIGl0IHdpbGwgcmV0dXJuIHRoZSBjb21wb25lbnQgdGhhdFxuICogICAgb3ducyB0aGUgdmlldyB3aGVyZSB0aGUgZWxlbWVudCBpcyBzaXR1YXRlZC5cbiAqIElmIGEgY29tcG9uZW50IGluc3RhbmNlIGlzIHVzZWQgdGhlbiBpdCB3aWxsIHJldHVybiB0aGVcbiAqICAgIGluc3RhbmNlIG9mIHRoZSBwYXJlbnQgY29tcG9uZW50IGRlcGVuZGluZyBvbiB3aGVyZVxuICogICAgdGhlIGNvbXBvbmVudCBpbnN0YW5jZSBpcyBleGlzdHMgaW4gYSB0ZW1wbGF0ZS5cbiAqIElmIGEgZGlyZWN0aXZlIGluc3RhbmNlIGlzIHVzZWQgdGhlbiBpdCB3aWxsIHJldHVybiB0aGVcbiAqICAgIGNvbXBvbmVudCB0aGF0IGNvbnRhaW5zIHRoYXQgZGlyZWN0aXZlIGluIGl0J3MgdGVtcGxhdGUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb21wb25lbnQ8VCA9IHt9Pih0YXJnZXQ6IHt9KTogVHxudWxsIHtcbiAgY29uc3QgY29udGV4dCA9IGxvYWRDb250ZXh0KHRhcmdldCkgITtcblxuICBpZiAoY29udGV4dC5jb21wb25lbnQgPT09IHVuZGVmaW5lZCkge1xuICAgIGxldCBsVmlld0RhdGEgPSBjb250ZXh0LmxWaWV3RGF0YTtcbiAgICB3aGlsZSAobFZpZXdEYXRhKSB7XG4gICAgICBjb25zdCBjdHggPSBsVmlld0RhdGEgIVtDT05URVhUXSAhYXN7fTtcbiAgICAgIGlmIChjdHggJiYgaXNDb21wb25lbnRJbnN0YW5jZShjdHgpKSB7XG4gICAgICAgIGNvbnRleHQuY29tcG9uZW50ID0gY3R4O1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGxWaWV3RGF0YSA9IGxWaWV3RGF0YSAhW1BBUkVOVF0gITtcbiAgICB9XG4gICAgaWYgKGNvbnRleHQuY29tcG9uZW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnRleHQuY29tcG9uZW50ID0gbnVsbDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gY29udGV4dC5jb21wb25lbnQgYXMgVDtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBob3N0IGNvbXBvbmVudCBpbnN0YW5jZSBhc3NvY2lhdGVkIHdpdGggdGhlIHRhcmdldC5cbiAqXG4gKiBUaGlzIHdpbGwgb25seSByZXR1cm4gYSBjb21wb25lbnQgaW5zdGFuY2Ugb2YgdGhlIERPTSBub2RlXG4gKiBjb250YWlucyBhbiBpbnN0YW5jZSBvZiBhIGNvbXBvbmVudCBvbiBpdC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEhvc3RDb21wb25lbnQ8VCA9IHt9Pih0YXJnZXQ6IHt9KTogVHxudWxsIHtcbiAgY29uc3QgY29udGV4dCA9IGxvYWRDb250ZXh0KHRhcmdldCk7XG4gIGNvbnN0IHROb2RlID0gY29udGV4dC5sVmlld0RhdGFbVFZJRVddLmRhdGFbY29udGV4dC5ub2RlSW5kZXhdIGFzIFROb2RlO1xuICBpZiAodE5vZGUuZmxhZ3MgJiBUTm9kZUZsYWdzLmlzQ29tcG9uZW50KSB7XG4gICAgY29uc3QgY29tcG9uZW50VmlldyA9IGdldENvbXBvbmVudFZpZXdCeUluZGV4KGNvbnRleHQubm9kZUluZGV4LCBjb250ZXh0LmxWaWV3RGF0YSk7XG4gICAgcmV0dXJuIGNvbXBvbmVudFZpZXdbQ09OVEVYVF0gYXMgYW55IGFzIFQ7XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbi8qKlxuICogUmV0dXJucyB0aGUgYFJvb3RDb250ZXh0YCBpbnN0YW5jZSB0aGF0IGlzIGFzc29jaWF0ZWQgd2l0aFxuICogdGhlIGFwcGxpY2F0aW9uIHdoZXJlIHRoZSB0YXJnZXQgaXMgc2l0dWF0ZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRSb290Q29udGV4dCh0YXJnZXQ6IHt9KTogUm9vdENvbnRleHQge1xuICBjb25zdCBjb250ZXh0ID0gbG9hZENvbnRleHQodGFyZ2V0KSAhO1xuICBjb25zdCByb290TFZpZXdEYXRhID0gZ2V0Um9vdFZpZXcoY29udGV4dC5sVmlld0RhdGEpO1xuICByZXR1cm4gcm9vdExWaWV3RGF0YVtDT05URVhUXSBhcyBSb290Q29udGV4dDtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgbGlzdCBvZiBhbGwgdGhlIGNvbXBvbmVudHMgaW4gdGhlIGFwcGxpY2F0aW9uXG4gKiB0aGF0IGFyZSBoYXZlIGJlZW4gYm9vdHN0cmFwcGVkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Um9vdENvbXBvbmVudHModGFyZ2V0OiB7fSk6IGFueVtdIHtcbiAgcmV0dXJuIFsuLi5nZXRSb290Q29udGV4dCh0YXJnZXQpLmNvbXBvbmVudHNdO1xufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIGluamVjdG9yIGluc3RhbmNlIHRoYXQgaXMgYXNzb2NpYXRlZCB3aXRoXG4gKiB0aGUgZWxlbWVudCwgY29tcG9uZW50IG9yIGRpcmVjdGl2ZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEluamVjdG9yKHRhcmdldDoge30pOiBJbmplY3RvciB7XG4gIGNvbnN0IGNvbnRleHQgPSBsb2FkQ29udGV4dCh0YXJnZXQpO1xuICBjb25zdCB0Tm9kZSA9IGNvbnRleHQubFZpZXdEYXRhW1RWSUVXXS5kYXRhW2NvbnRleHQubm9kZUluZGV4XSBhcyBURWxlbWVudE5vZGU7XG5cbiAgcmV0dXJuIG5ldyBOb2RlSW5qZWN0b3IodE5vZGUsIGNvbnRleHQubFZpZXdEYXRhKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgbGlzdCBvZiBhbGwgdGhlIGRpcmVjdGl2ZXMgdGhhdCBhcmUgYXNzb2NpYXRlZFxuICogd2l0aCB0aGUgdW5kZXJseWluZyB0YXJnZXQgZWxlbWVudC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldERpcmVjdGl2ZXModGFyZ2V0OiB7fSk6IEFycmF5PHt9PiB7XG4gIGNvbnN0IGNvbnRleHQgPSBsb2FkQ29udGV4dCh0YXJnZXQpICE7XG5cbiAgaWYgKGNvbnRleHQuZGlyZWN0aXZlcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgY29udGV4dC5kaXJlY3RpdmVzID0gZGlzY292ZXJEaXJlY3RpdmVzKGNvbnRleHQubm9kZUluZGV4LCBjb250ZXh0LmxWaWV3RGF0YSwgZmFsc2UpO1xuICB9XG5cbiAgcmV0dXJuIGNvbnRleHQuZGlyZWN0aXZlcyB8fCBbXTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIExDb250ZXh0IGFzc29jaWF0ZWQgd2l0aCBhIHRhcmdldCBwYXNzZWQgYXMgYW4gYXJndW1lbnQuXG4gKiBUaHJvd3MgaWYgYSBnaXZlbiB0YXJnZXQgZG9lc24ndCBoYXZlIGFzc29jaWF0ZWQgTENvbnRleHQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBsb2FkQ29udGV4dCh0YXJnZXQ6IHt9KTogTENvbnRleHQge1xuICBjb25zdCBjb250ZXh0ID0gZ2V0Q29udGV4dCh0YXJnZXQpO1xuICBpZiAoIWNvbnRleHQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIG5nRGV2TW9kZSA/ICdVbmFibGUgdG8gZmluZCB0aGUgZ2l2ZW4gY29udGV4dCBkYXRhIGZvciB0aGUgZ2l2ZW4gdGFyZ2V0JyA6XG4gICAgICAgICAgICAgICAgICAgICdJbnZhbGlkIG5nIHRhcmdldCcpO1xuICB9XG4gIHJldHVybiBjb250ZXh0O1xufVxuXG4vKipcbiAqIFJldHJpZXZlIHRoZSByb290IHZpZXcgZnJvbSBhbnkgY29tcG9uZW50IGJ5IHdhbGtpbmcgdGhlIHBhcmVudCBgTFZpZXdEYXRhYCB1bnRpbFxuICogcmVhY2hpbmcgdGhlIHJvb3QgYExWaWV3RGF0YWAuXG4gKlxuICogQHBhcmFtIGNvbXBvbmVudE9yVmlldyBhbnkgY29tcG9uZW50IG9yIHZpZXdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFJvb3RWaWV3KGNvbXBvbmVudE9yVmlldzogTFZpZXdEYXRhIHwge30pOiBMVmlld0RhdGEge1xuICBsZXQgbFZpZXdEYXRhOiBMVmlld0RhdGE7XG4gIGlmIChBcnJheS5pc0FycmF5KGNvbXBvbmVudE9yVmlldykpIHtcbiAgICBuZ0Rldk1vZGUgJiYgYXNzZXJ0RGVmaW5lZChjb21wb25lbnRPclZpZXcsICdsVmlld0RhdGEnKTtcbiAgICBsVmlld0RhdGEgPSBjb21wb25lbnRPclZpZXcgYXMgTFZpZXdEYXRhO1xuICB9IGVsc2Uge1xuICAgIG5nRGV2TW9kZSAmJiBhc3NlcnREZWZpbmVkKGNvbXBvbmVudE9yVmlldywgJ2NvbXBvbmVudCcpO1xuICAgIGxWaWV3RGF0YSA9IHJlYWRQYXRjaGVkTFZpZXdEYXRhKGNvbXBvbmVudE9yVmlldykgITtcbiAgfVxuICB3aGlsZSAobFZpZXdEYXRhICYmICEobFZpZXdEYXRhW0ZMQUdTXSAmIExWaWV3RmxhZ3MuSXNSb290KSkge1xuICAgIGxWaWV3RGF0YSA9IGxWaWV3RGF0YVtQQVJFTlRdICE7XG4gIH1cbiAgcmV0dXJuIGxWaWV3RGF0YTtcbn1cblxuLyoqXG4gKiAgUmV0cmlldmUgbWFwIG9mIGxvY2FsIHJlZmVyZW5jZXMgKGxvY2FsIHJlZmVyZW5jZSBuYW1lID0+IGVsZW1lbnQgb3IgZGlyZWN0aXZlIGluc3RhbmNlKS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldExvY2FsUmVmcyh0YXJnZXQ6IHt9KToge1trZXk6IHN0cmluZ106IGFueX0ge1xuICBjb25zdCBjb250ZXh0ID0gbG9hZENvbnRleHQodGFyZ2V0KSAhO1xuXG4gIGlmIChjb250ZXh0LmxvY2FsUmVmcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgY29udGV4dC5sb2NhbFJlZnMgPSBkaXNjb3ZlckxvY2FsUmVmcyhjb250ZXh0LmxWaWV3RGF0YSwgY29udGV4dC5ub2RlSW5kZXgpO1xuICB9XG5cbiAgcmV0dXJuIGNvbnRleHQubG9jYWxSZWZzIHx8IHt9O1xufVxuIl19