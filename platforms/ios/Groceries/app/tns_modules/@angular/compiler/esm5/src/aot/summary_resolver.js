/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { deserializeSummaries } from './summary_serializer';
import { stripGeneratedFileSuffix, summaryFileName } from './util';
var AotSummaryResolver = /** @class */ (function () {
    function AotSummaryResolver(host, staticSymbolCache) {
        this.host = host;
        this.staticSymbolCache = staticSymbolCache;
        // Note: this will only contain StaticSymbols without members!
        this.summaryCache = new Map();
        this.loadedFilePaths = new Map();
        // Note: this will only contain StaticSymbols without members!
        this.importAs = new Map();
        this.knownFileNameToModuleNames = new Map();
    }
    AotSummaryResolver.prototype.isLibraryFile = function (filePath) {
        // Note: We need to strip the .ngfactory. file path,
        // so this method also works for generated files
        // (for which host.isSourceFile will always return false).
        return !this.host.isSourceFile(stripGeneratedFileSuffix(filePath));
    };
    AotSummaryResolver.prototype.toSummaryFileName = function (filePath, referringSrcFileName) {
        return this.host.toSummaryFileName(filePath, referringSrcFileName);
    };
    AotSummaryResolver.prototype.fromSummaryFileName = function (fileName, referringLibFileName) {
        return this.host.fromSummaryFileName(fileName, referringLibFileName);
    };
    AotSummaryResolver.prototype.resolveSummary = function (staticSymbol) {
        var rootSymbol = staticSymbol.members.length ?
            this.staticSymbolCache.get(staticSymbol.filePath, staticSymbol.name) :
            staticSymbol;
        var summary = this.summaryCache.get(rootSymbol);
        if (!summary) {
            this._loadSummaryFile(staticSymbol.filePath);
            summary = this.summaryCache.get(staticSymbol);
        }
        return (rootSymbol === staticSymbol && summary) || null;
    };
    AotSummaryResolver.prototype.getSymbolsOf = function (filePath) {
        if (this._loadSummaryFile(filePath)) {
            return Array.from(this.summaryCache.keys()).filter(function (symbol) { return symbol.filePath === filePath; });
        }
        return null;
    };
    AotSummaryResolver.prototype.getImportAs = function (staticSymbol) {
        staticSymbol.assertNoMembers();
        return this.importAs.get(staticSymbol);
    };
    /**
     * Converts a file path to a module name that can be used as an `import`.
     */
    AotSummaryResolver.prototype.getKnownModuleName = function (importedFilePath) {
        return this.knownFileNameToModuleNames.get(importedFilePath) || null;
    };
    AotSummaryResolver.prototype.addSummary = function (summary) { this.summaryCache.set(summary.symbol, summary); };
    AotSummaryResolver.prototype._loadSummaryFile = function (filePath) {
        var _this = this;
        var hasSummary = this.loadedFilePaths.get(filePath);
        if (hasSummary != null) {
            return hasSummary;
        }
        var json = null;
        if (this.isLibraryFile(filePath)) {
            var summaryFilePath = summaryFileName(filePath);
            try {
                json = this.host.loadSummary(summaryFilePath);
            }
            catch (e) {
                console.error("Error loading summary file " + summaryFilePath);
                throw e;
            }
        }
        hasSummary = json != null;
        this.loadedFilePaths.set(filePath, hasSummary);
        if (json) {
            var _a = deserializeSummaries(this.staticSymbolCache, this, filePath, json), moduleName = _a.moduleName, summaries = _a.summaries, importAs = _a.importAs;
            summaries.forEach(function (summary) { return _this.summaryCache.set(summary.symbol, summary); });
            if (moduleName) {
                this.knownFileNameToModuleNames.set(filePath, moduleName);
            }
            importAs.forEach(function (importAs) { _this.importAs.set(importAs.symbol, importAs.importAs); });
        }
        return hasSummary;
    };
    return AotSummaryResolver;
}());
export { AotSummaryResolver };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VtbWFyeV9yZXNvbHZlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbXBpbGVyL3NyYy9hb3Qvc3VtbWFyeV9yZXNvbHZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFLSCxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUMxRCxPQUFPLEVBQUMsd0JBQXdCLEVBQUUsZUFBZSxFQUFDLE1BQU0sUUFBUSxDQUFDO0FBNkJqRTtJQVFFLDRCQUFvQixJQUE0QixFQUFVLGlCQUFvQztRQUExRSxTQUFJLEdBQUosSUFBSSxDQUF3QjtRQUFVLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFQOUYsOERBQThEO1FBQ3RELGlCQUFZLEdBQUcsSUFBSSxHQUFHLEVBQXVDLENBQUM7UUFDOUQsb0JBQWUsR0FBRyxJQUFJLEdBQUcsRUFBbUIsQ0FBQztRQUNyRCw4REFBOEQ7UUFDdEQsYUFBUSxHQUFHLElBQUksR0FBRyxFQUE4QixDQUFDO1FBQ2pELCtCQUEwQixHQUFHLElBQUksR0FBRyxFQUFrQixDQUFDO0lBRWtDLENBQUM7SUFFbEcsMENBQWEsR0FBYixVQUFjLFFBQWdCO1FBQzVCLG9EQUFvRDtRQUNwRCxnREFBZ0Q7UUFDaEQsMERBQTBEO1FBQzFELE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyx3QkFBd0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFFRCw4Q0FBaUIsR0FBakIsVUFBa0IsUUFBZ0IsRUFBRSxvQkFBNEI7UUFDOUQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFFRCxnREFBbUIsR0FBbkIsVUFBb0IsUUFBZ0IsRUFBRSxvQkFBNEI7UUFDaEUsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFFRCwyQ0FBYyxHQUFkLFVBQWUsWUFBMEI7UUFDdkMsSUFBTSxVQUFVLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDdEUsWUFBWSxDQUFDO1FBQ2pCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDWixJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzdDLE9BQU8sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUcsQ0FBQztTQUNqRDtRQUNELE9BQU8sQ0FBQyxVQUFVLEtBQUssWUFBWSxJQUFJLE9BQU8sQ0FBQyxJQUFJLElBQUksQ0FBQztJQUMxRCxDQUFDO0lBRUQseUNBQVksR0FBWixVQUFhLFFBQWdCO1FBQzNCLElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ25DLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQUMsTUFBTSxJQUFLLE9BQUEsTUFBTSxDQUFDLFFBQVEsS0FBSyxRQUFRLEVBQTVCLENBQTRCLENBQUMsQ0FBQztTQUM5RjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELHdDQUFXLEdBQVgsVUFBWSxZQUEwQjtRQUNwQyxZQUFZLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDL0IsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUcsQ0FBQztJQUMzQyxDQUFDO0lBRUQ7O09BRUc7SUFDSCwrQ0FBa0IsR0FBbEIsVUFBbUIsZ0JBQXdCO1FBQ3pDLE9BQU8sSUFBSSxDQUFDLDBCQUEwQixDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLElBQUksQ0FBQztJQUN2RSxDQUFDO0lBRUQsdUNBQVUsR0FBVixVQUFXLE9BQThCLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFdEYsNkNBQWdCLEdBQXhCLFVBQXlCLFFBQWdCO1FBQXpDLGlCQTJCQztRQTFCQyxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNwRCxJQUFJLFVBQVUsSUFBSSxJQUFJLEVBQUU7WUFDdEIsT0FBTyxVQUFVLENBQUM7U0FDbkI7UUFDRCxJQUFJLElBQUksR0FBZ0IsSUFBSSxDQUFDO1FBQzdCLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNoQyxJQUFNLGVBQWUsR0FBRyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDbEQsSUFBSTtnQkFDRixJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLENBQUM7YUFDL0M7WUFBQyxPQUFPLENBQUMsRUFBRTtnQkFDVixPQUFPLENBQUMsS0FBSyxDQUFDLGdDQUE4QixlQUFpQixDQUFDLENBQUM7Z0JBQy9ELE1BQU0sQ0FBQyxDQUFDO2FBQ1Q7U0FDRjtRQUNELFVBQVUsR0FBRyxJQUFJLElBQUksSUFBSSxDQUFDO1FBQzFCLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUMvQyxJQUFJLElBQUksRUFBRTtZQUNGLElBQUEsdUVBQ2dFLEVBRC9ELDBCQUFVLEVBQUUsd0JBQVMsRUFBRSxzQkFDd0MsQ0FBQztZQUN2RSxTQUFTLENBQUMsT0FBTyxDQUFDLFVBQUMsT0FBTyxJQUFLLE9BQUEsS0FBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsRUFBOUMsQ0FBOEMsQ0FBQyxDQUFDO1lBQy9FLElBQUksVUFBVSxFQUFFO2dCQUNkLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO2FBQzNEO1lBQ0QsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFDLFFBQVEsSUFBTyxLQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzVGO1FBQ0QsT0FBTyxVQUFVLENBQUM7SUFDcEIsQ0FBQztJQUNILHlCQUFDO0FBQUQsQ0FBQyxBQXRGRCxJQXNGQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtTdW1tYXJ5LCBTdW1tYXJ5UmVzb2x2ZXJ9IGZyb20gJy4uL3N1bW1hcnlfcmVzb2x2ZXInO1xuXG5pbXBvcnQge1N0YXRpY1N5bWJvbCwgU3RhdGljU3ltYm9sQ2FjaGV9IGZyb20gJy4vc3RhdGljX3N5bWJvbCc7XG5pbXBvcnQge2Rlc2VyaWFsaXplU3VtbWFyaWVzfSBmcm9tICcuL3N1bW1hcnlfc2VyaWFsaXplcic7XG5pbXBvcnQge3N0cmlwR2VuZXJhdGVkRmlsZVN1ZmZpeCwgc3VtbWFyeUZpbGVOYW1lfSBmcm9tICcuL3V0aWwnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEFvdFN1bW1hcnlSZXNvbHZlckhvc3Qge1xuICAvKipcbiAgICogTG9hZHMgYW4gTmdNb2R1bGUvRGlyZWN0aXZlL1BpcGUgc3VtbWFyeSBmaWxlXG4gICAqL1xuICBsb2FkU3VtbWFyeShmaWxlUGF0aDogc3RyaW5nKTogc3RyaW5nfG51bGw7XG5cbiAgLyoqXG4gICAqIFJldHVybnMgd2hldGhlciBhIGZpbGUgaXMgYSBzb3VyY2UgZmlsZSBvciBub3QuXG4gICAqL1xuICBpc1NvdXJjZUZpbGUoc291cmNlRmlsZVBhdGg6IHN0cmluZyk6IGJvb2xlYW47XG4gIC8qKlxuICAgKiBDb252ZXJ0cyBhIGZpbGUgbmFtZSBpbnRvIGEgcmVwcmVzZW50YXRpb24gdGhhdCBzaG91bGQgYmUgc3RvcmVkIGluIGEgc3VtbWFyeSBmaWxlLlxuICAgKiBUaGlzIGhhcyB0byBpbmNsdWRlIGNoYW5naW5nIHRoZSBzdWZmaXggYXMgd2VsbC5cbiAgICogRS5nLlxuICAgKiBgc29tZV9maWxlLnRzYCAtPiBgc29tZV9maWxlLmQudHNgXG4gICAqXG4gICAqIEBwYXJhbSByZWZlcnJpbmdTcmNGaWxlTmFtZSB0aGUgc291cmUgZmlsZSB0aGF0IHJlZmVycyB0byBmaWxlTmFtZVxuICAgKi9cbiAgdG9TdW1tYXJ5RmlsZU5hbWUoZmlsZU5hbWU6IHN0cmluZywgcmVmZXJyaW5nU3JjRmlsZU5hbWU6IHN0cmluZyk6IHN0cmluZztcblxuICAvKipcbiAgICogQ29udmVydHMgYSBmaWxlTmFtZSB0aGF0IHdhcyBwcm9jZXNzZWQgYnkgYHRvU3VtbWFyeUZpbGVOYW1lYCBiYWNrIGludG8gYSByZWFsIGZpbGVOYW1lXG4gICAqIGdpdmVuIHRoZSBmaWxlTmFtZSBvZiB0aGUgbGlicmFyeSB0aGF0IGlzIHJlZmVycmlnIHRvIGl0LlxuICAgKi9cbiAgZnJvbVN1bW1hcnlGaWxlTmFtZShmaWxlTmFtZTogc3RyaW5nLCByZWZlcnJpbmdMaWJGaWxlTmFtZTogc3RyaW5nKTogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgQW90U3VtbWFyeVJlc29sdmVyIGltcGxlbWVudHMgU3VtbWFyeVJlc29sdmVyPFN0YXRpY1N5bWJvbD4ge1xuICAvLyBOb3RlOiB0aGlzIHdpbGwgb25seSBjb250YWluIFN0YXRpY1N5bWJvbHMgd2l0aG91dCBtZW1iZXJzIVxuICBwcml2YXRlIHN1bW1hcnlDYWNoZSA9IG5ldyBNYXA8U3RhdGljU3ltYm9sLCBTdW1tYXJ5PFN0YXRpY1N5bWJvbD4+KCk7XG4gIHByaXZhdGUgbG9hZGVkRmlsZVBhdGhzID0gbmV3IE1hcDxzdHJpbmcsIGJvb2xlYW4+KCk7XG4gIC8vIE5vdGU6IHRoaXMgd2lsbCBvbmx5IGNvbnRhaW4gU3RhdGljU3ltYm9scyB3aXRob3V0IG1lbWJlcnMhXG4gIHByaXZhdGUgaW1wb3J0QXMgPSBuZXcgTWFwPFN0YXRpY1N5bWJvbCwgU3RhdGljU3ltYm9sPigpO1xuICBwcml2YXRlIGtub3duRmlsZU5hbWVUb01vZHVsZU5hbWVzID0gbmV3IE1hcDxzdHJpbmcsIHN0cmluZz4oKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGhvc3Q6IEFvdFN1bW1hcnlSZXNvbHZlckhvc3QsIHByaXZhdGUgc3RhdGljU3ltYm9sQ2FjaGU6IFN0YXRpY1N5bWJvbENhY2hlKSB7fVxuXG4gIGlzTGlicmFyeUZpbGUoZmlsZVBhdGg6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIC8vIE5vdGU6IFdlIG5lZWQgdG8gc3RyaXAgdGhlIC5uZ2ZhY3RvcnkuIGZpbGUgcGF0aCxcbiAgICAvLyBzbyB0aGlzIG1ldGhvZCBhbHNvIHdvcmtzIGZvciBnZW5lcmF0ZWQgZmlsZXNcbiAgICAvLyAoZm9yIHdoaWNoIGhvc3QuaXNTb3VyY2VGaWxlIHdpbGwgYWx3YXlzIHJldHVybiBmYWxzZSkuXG4gICAgcmV0dXJuICF0aGlzLmhvc3QuaXNTb3VyY2VGaWxlKHN0cmlwR2VuZXJhdGVkRmlsZVN1ZmZpeChmaWxlUGF0aCkpO1xuICB9XG5cbiAgdG9TdW1tYXJ5RmlsZU5hbWUoZmlsZVBhdGg6IHN0cmluZywgcmVmZXJyaW5nU3JjRmlsZU5hbWU6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLmhvc3QudG9TdW1tYXJ5RmlsZU5hbWUoZmlsZVBhdGgsIHJlZmVycmluZ1NyY0ZpbGVOYW1lKTtcbiAgfVxuXG4gIGZyb21TdW1tYXJ5RmlsZU5hbWUoZmlsZU5hbWU6IHN0cmluZywgcmVmZXJyaW5nTGliRmlsZU5hbWU6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLmhvc3QuZnJvbVN1bW1hcnlGaWxlTmFtZShmaWxlTmFtZSwgcmVmZXJyaW5nTGliRmlsZU5hbWUpO1xuICB9XG5cbiAgcmVzb2x2ZVN1bW1hcnkoc3RhdGljU3ltYm9sOiBTdGF0aWNTeW1ib2wpOiBTdW1tYXJ5PFN0YXRpY1N5bWJvbD58bnVsbCB7XG4gICAgY29uc3Qgcm9vdFN5bWJvbCA9IHN0YXRpY1N5bWJvbC5tZW1iZXJzLmxlbmd0aCA/XG4gICAgICAgIHRoaXMuc3RhdGljU3ltYm9sQ2FjaGUuZ2V0KHN0YXRpY1N5bWJvbC5maWxlUGF0aCwgc3RhdGljU3ltYm9sLm5hbWUpIDpcbiAgICAgICAgc3RhdGljU3ltYm9sO1xuICAgIGxldCBzdW1tYXJ5ID0gdGhpcy5zdW1tYXJ5Q2FjaGUuZ2V0KHJvb3RTeW1ib2wpO1xuICAgIGlmICghc3VtbWFyeSkge1xuICAgICAgdGhpcy5fbG9hZFN1bW1hcnlGaWxlKHN0YXRpY1N5bWJvbC5maWxlUGF0aCk7XG4gICAgICBzdW1tYXJ5ID0gdGhpcy5zdW1tYXJ5Q2FjaGUuZ2V0KHN0YXRpY1N5bWJvbCkgITtcbiAgICB9XG4gICAgcmV0dXJuIChyb290U3ltYm9sID09PSBzdGF0aWNTeW1ib2wgJiYgc3VtbWFyeSkgfHwgbnVsbDtcbiAgfVxuXG4gIGdldFN5bWJvbHNPZihmaWxlUGF0aDogc3RyaW5nKTogU3RhdGljU3ltYm9sW118bnVsbCB7XG4gICAgaWYgKHRoaXMuX2xvYWRTdW1tYXJ5RmlsZShmaWxlUGF0aCkpIHtcbiAgICAgIHJldHVybiBBcnJheS5mcm9tKHRoaXMuc3VtbWFyeUNhY2hlLmtleXMoKSkuZmlsdGVyKChzeW1ib2wpID0+IHN5bWJvbC5maWxlUGF0aCA9PT0gZmlsZVBhdGgpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGdldEltcG9ydEFzKHN0YXRpY1N5bWJvbDogU3RhdGljU3ltYm9sKTogU3RhdGljU3ltYm9sIHtcbiAgICBzdGF0aWNTeW1ib2wuYXNzZXJ0Tm9NZW1iZXJzKCk7XG4gICAgcmV0dXJuIHRoaXMuaW1wb3J0QXMuZ2V0KHN0YXRpY1N5bWJvbCkgITtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0cyBhIGZpbGUgcGF0aCB0byBhIG1vZHVsZSBuYW1lIHRoYXQgY2FuIGJlIHVzZWQgYXMgYW4gYGltcG9ydGAuXG4gICAqL1xuICBnZXRLbm93bk1vZHVsZU5hbWUoaW1wb3J0ZWRGaWxlUGF0aDogc3RyaW5nKTogc3RyaW5nfG51bGwge1xuICAgIHJldHVybiB0aGlzLmtub3duRmlsZU5hbWVUb01vZHVsZU5hbWVzLmdldChpbXBvcnRlZEZpbGVQYXRoKSB8fCBudWxsO1xuICB9XG5cbiAgYWRkU3VtbWFyeShzdW1tYXJ5OiBTdW1tYXJ5PFN0YXRpY1N5bWJvbD4pIHsgdGhpcy5zdW1tYXJ5Q2FjaGUuc2V0KHN1bW1hcnkuc3ltYm9sLCBzdW1tYXJ5KTsgfVxuXG4gIHByaXZhdGUgX2xvYWRTdW1tYXJ5RmlsZShmaWxlUGF0aDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgbGV0IGhhc1N1bW1hcnkgPSB0aGlzLmxvYWRlZEZpbGVQYXRocy5nZXQoZmlsZVBhdGgpO1xuICAgIGlmIChoYXNTdW1tYXJ5ICE9IG51bGwpIHtcbiAgICAgIHJldHVybiBoYXNTdW1tYXJ5O1xuICAgIH1cbiAgICBsZXQganNvbjogc3RyaW5nfG51bGwgPSBudWxsO1xuICAgIGlmICh0aGlzLmlzTGlicmFyeUZpbGUoZmlsZVBhdGgpKSB7XG4gICAgICBjb25zdCBzdW1tYXJ5RmlsZVBhdGggPSBzdW1tYXJ5RmlsZU5hbWUoZmlsZVBhdGgpO1xuICAgICAgdHJ5IHtcbiAgICAgICAganNvbiA9IHRoaXMuaG9zdC5sb2FkU3VtbWFyeShzdW1tYXJ5RmlsZVBhdGgpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKGBFcnJvciBsb2FkaW5nIHN1bW1hcnkgZmlsZSAke3N1bW1hcnlGaWxlUGF0aH1gKTtcbiAgICAgICAgdGhyb3cgZTtcbiAgICAgIH1cbiAgICB9XG4gICAgaGFzU3VtbWFyeSA9IGpzb24gIT0gbnVsbDtcbiAgICB0aGlzLmxvYWRlZEZpbGVQYXRocy5zZXQoZmlsZVBhdGgsIGhhc1N1bW1hcnkpO1xuICAgIGlmIChqc29uKSB7XG4gICAgICBjb25zdCB7bW9kdWxlTmFtZSwgc3VtbWFyaWVzLCBpbXBvcnRBc30gPVxuICAgICAgICAgIGRlc2VyaWFsaXplU3VtbWFyaWVzKHRoaXMuc3RhdGljU3ltYm9sQ2FjaGUsIHRoaXMsIGZpbGVQYXRoLCBqc29uKTtcbiAgICAgIHN1bW1hcmllcy5mb3JFYWNoKChzdW1tYXJ5KSA9PiB0aGlzLnN1bW1hcnlDYWNoZS5zZXQoc3VtbWFyeS5zeW1ib2wsIHN1bW1hcnkpKTtcbiAgICAgIGlmIChtb2R1bGVOYW1lKSB7XG4gICAgICAgIHRoaXMua25vd25GaWxlTmFtZVRvTW9kdWxlTmFtZXMuc2V0KGZpbGVQYXRoLCBtb2R1bGVOYW1lKTtcbiAgICAgIH1cbiAgICAgIGltcG9ydEFzLmZvckVhY2goKGltcG9ydEFzKSA9PiB7IHRoaXMuaW1wb3J0QXMuc2V0KGltcG9ydEFzLnN5bWJvbCwgaW1wb3J0QXMuaW1wb3J0QXMpOyB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGhhc1N1bW1hcnk7XG4gIH1cbn1cbiJdfQ==